//go:build mage
// +build mage

package main

import (
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"regexp"
	"strings"
	"time"

	"github.com/magefile/mage/mg"
	"github.com/magefile/mage/sh"
	"github.com/shurcooL/vfsgen"
)

const (
	packageName = "github.com/bimmerbailey/rill"
)

var semverRegex = regexp.MustCompile(`^(?P<major>0|[1-9]\d*)\.(?P<minor>0|[1-9]\d*)\.(?P<patch>0|[1-9]\d*)(?:-(?P<prerelease>(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+(?P<buildmetadata>[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$`)

var ldflags = "-s -w -X $PACKAGE/internal/utils.commitHash=$COMMIT_HASH -X $PACKAGE/internal/utils.buildDate=$BUILD_DATE -X $PACKAGE/internal/utils.version=$VERSION"

func runWith(env map[string]string, cmd string, inArgs ...interface{}) error {
	s := argsToStrings(inArgs...)
	return sh.RunWith(env, cmd, s...)
}

// Aliases is a list of short names for often used commands
var Aliases = map[string]interface{}{
	"s":  Backend.Schema,
	"up": Docker.Up,
	"w":  Dev.Watch,
}

// Frontend is the namespace for all commands that interact with the frontend
type Frontend mg.Namespace

// Install the npm dependencies for the React frontend
func (Frontend) Install() error {
	return sh.RunV("bun", "run", "--cwd", "frontend", "install")
}

// Lint runs eslint on the frontend source
func (Frontend) Lint() error {
	return sh.RunV("bun", "run", "--cwd", "frontend", "lint")
}

// Format runs prettier formatting
func (Frontend) Format() error {
	return sh.RunV("bun", "run", "--cwd", "frontend", "format")
}

// Build the React frontend
func (Frontend) Build() error {
	return sh.RunV("bun", "run", "--cwd", "frontend", "build")
}

func (Frontend) Dev() error {
	return sh.RunV("bun", "run", "--cwd", "frontend", "dev")
}

// Backend is the namespace for all commands that interact with the backend
type Backend mg.Namespace

// GenMigrations embeds schema migration files into Go source code
func (Backend) GenMigrations() error {
	if _, err := os.Stat("internal/migrations"); os.IsNotExist(err) {
		os.Mkdir("internal/migrations/", 0755)
	}
	var fs http.FileSystem = http.Dir("migrations")
	err := vfsgen.Generate(fs, vfsgen.Options{
		Filename:     "internal/migrations/migrations_generated.go",
		PackageName:  "migrations",
		VariableName: "Migrations",
	})
	if err != nil {
		panic(err)
	}
	return nil
}

func flagEnv() map[string]string {
	hash, _ := sh.Output("git", "rev-parse", "--short", "HEAD")
	tag, _ := sh.Output("bash", "-c", "git describe --tags 2>/dev/null")
	if tag == "" {
		tag = "nightly"
	}

	// Allow environment variables to override git-derived values.
	// This is used during Docker builds where build args are passed as env vars.
	if v := os.Getenv("VERSION"); v != "" {
		tag = v
	}
	if v := os.Getenv("COMMIT_HASH"); v != "" {
		hash = v
	}
	buildDate := time.Now().Format("2006-01-02T15:04:05Z0700")
	if v := os.Getenv("BUILD_DATE"); v != "" {
		buildDate = v
	}

	return map[string]string{
		"PACKAGE":     packageName,
		"COMMIT_HASH": hash,
		"BUILD_DATE":  buildDate,
		"VERSION":     tag,
	}
}

// Build the Go api service
func (Backend) Build() error {
	fmt.Println("compiling binary dist/rill")
	env := flagEnv()
	env["CGO_ENABLED"] = "0"
	return runWith(env, "go", "build", "-trimpath", "-ldflags", ldflags, "-tags", "prod", "-o", "dist/rill", "./cmd/rill/")
}

// Schema merges GraphQL schema files into single schema & runs gqlgen
func (Backend) Schema() error {
	folders, err := os.ReadDir("internal/graph/schema/")
	if err != nil {
		panic(err)
	}
	for _, folder := range folders {
		if !folder.IsDir() {
			continue
		}
		var schema strings.Builder
		filename := "internal/graph/schema/" + folder.Name()
		files, err := os.ReadDir(filename)
		if err != nil {
			panic(err)
		}
		for _, file := range files {
			f, err := os.Open(filename + "/" + file.Name())
			if err != nil {
				panic(err)
			}
			content, err := io.ReadAll(f)
			if err != nil {
				panic(err)
			}
			fmt.Fprintln(&schema, string(content))
		}
		err = os.WriteFile("internal/graph/schema/"+folder.Name()+".gql", []byte(schema.String()), os.FileMode(0644))
	}
	if err != nil {
		panic(err)
	}
	return sh.Run("gqlgen")
}

// Test run golang unit tests
func (Backend) Test() error {
	fmt.Println("running rill backend unit tests")
	return sh.RunV("go", "test", "./...")
}

// Install runs frontend:install
func Install() {
	mg.SerialDeps(Frontend.Install)
}

// Build runs backend:genMigrations, backend:build
func Build() {
	mg.SerialDeps(Backend.GenMigrations, Backend.Build)
}

const (
	backendImage  = "ghcr.io/bimmerbailey/rill"
	frontendImage = "ghcr.io/bimmerbailey/rill-frontend"
	platforms     = "linux/amd64,linux/arm64"
)

// buildxPush builds a multi-platform Docker image and pushes it to the registry.
func buildxPush(image, version, target, context string, extraBuildArgs []string) error {
	args := []string{
		"buildx", "build",
		"--platform", platforms,
	}
	if target != "" {
		args = append(args, "--target", target)
	}
	args = append(args, extraBuildArgs...)
	args = append(args,
		"-t", image+":"+version,
		"-t", image+":latest",
		"--push",
		context,
	)
	return sh.RunV("docker", args...)
}

// Release validates, tags, builds multi-platform Docker images, and pushes them.
//
// Requires RILL_RELEASE_VERSION to be set to a valid SemVer string (e.g. "1.2.3").
//
// Two images are built and pushed:
//   - ghcr.io/bimmerbailey/rill          (backend + worker, from ./Dockerfile)
//   - ghcr.io/bimmerbailey/rill-frontend (frontend, from ./frontend/Dockerfile)
//
// The release process:
//  1. Runs backend tests and frontend lint as pre-flight checks
//  2. Validates the version is valid SemVer
//  3. Creates a git tag (vX.Y.Z) and pushes it
//  4. Builds multi-platform Docker images with version info embedded
//  5. Pushes images tagged as both the version and "latest"
func Release() error {
	// --- Pre-flight validation ---
	mg.SerialDeps(Frontend.Lint, Backend.Test)

	version, ok := os.LookupEnv("RILL_RELEASE_VERSION")
	if !ok || strings.TrimSpace(version) == "" {
		return errors.New("RILL_RELEASE_VERSION must be set (e.g. RILL_RELEASE_VERSION=1.0.0)")
	}
	if !semverRegex.MatchString(version) {
		return fmt.Errorf("RILL_RELEASE_VERSION=%q is not valid SemVer", version)
	}
	fmt.Println("Preparing release v" + version + "...")

	// --- Git tag ---
	tag := "v" + version
	err := sh.RunV("git", "tag", "-a", tag, "-m", "Release "+tag)
	if err != nil {
		return fmt.Errorf("creating git tag %s: %w", tag, err)
	}
	err = sh.RunV("git", "push", "origin", tag)
	if err != nil {
		return fmt.Errorf("pushing git tag %s: %w", tag, err)
	}

	// --- Build args for version embedding (backend only) ---
	env := flagEnv()
	env["VERSION"] = version // override with release version

	backendBuildArgs := []string{
		"--build-arg", "VERSION=" + env["VERSION"],
		"--build-arg", "COMMIT_HASH=" + env["COMMIT_HASH"],
		"--build-arg", "BUILD_DATE=" + env["BUILD_DATE"],
	}

	// --- Ensure buildx builder exists ---
	_ = sh.RunV("docker", "buildx", "create", "--name", "rill-builder", "--use")
	_ = sh.RunV("docker", "buildx", "use", "rill-builder")

	// --- Build & push backend image (backend + worker) ---
	fmt.Println("Building backend image...")
	err = buildxPush(backendImage, version, "production", ".", backendBuildArgs)
	if err != nil {
		return fmt.Errorf("building backend image: %w", err)
	}

	// --- Build & push frontend image ---
	fmt.Println("Building frontend image...")
	err = buildxPush(frontendImage, version, "release", "./frontend", nil)
	if err != nil {
		return fmt.Errorf("building frontend image: %w", err)
	}

	fmt.Printf("Released v%s (%s)\n", version, platforms)
	fmt.Printf("  %s:%s\n", backendImage, version)
	fmt.Printf("  %s:%s\n", frontendImage, version)
	return nil
}

// Dev is namespace for commands interacting with docker test setups
type Dev mg.Namespace

// Up starts the docker-compose file using the current files
func (Dev) Up() error {
	return sh.RunV("docker-compose", "-p", "rill-dev", "-f", "testing/docker-compose.dev.yml", "up")
}

// Watch starts Air for hot-reloading the web server (local development)
func (Dev) Watch() error {
	return sh.RunV("go", "tool", "air", "-c", ".air.toml")
}

// Docker is namespace for commands interacting with docker
type Docker mg.Namespace

// Up runs the main docker compose file
func (Docker) Up() error {
	return sh.RunV("docker", "compose", "up", "frontend", "backend", "worker")
}

// Migrate runs the migration command for the docker-compose network
func (Docker) Migrate() error {
	return sh.RunV("docker", "compose", "backend", "run", "--rm", "migrate")
}

func argsToStrings(v ...interface{}) []string {
	var args []string
	for _, arg := range v {
		switch v := arg.(type) {
		case string:
			if v != "" {
				args = append(args, v)
			}
		case []string:
			if v != nil {
				args = append(args, v...)
			}
		default:
			panic("invalid type")
		}
	}

	return args
}
