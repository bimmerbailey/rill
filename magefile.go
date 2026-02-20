//go:build mage
// +build mage

package main

import (
	"errors"
	"fmt"
	"io/ioutil"
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

var ldflags = "-X $PACKAGE/internal/utils.commitHash=$COMMIT_HASH -X $PACKAGE/internal/utils.buildDate=$BUILD_DATE -X $PACKAGE/internal/utils.version=$VERSION"

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
	return sh.RunV("bun", "run", "--cwd", "frontend_v2", "install")
}

// Lint runs eslint on the frontend source
func (Frontend) Lint() error {
	return sh.RunV("bun", "run", "--cwd", "frontend_v2", "lint")
}

// Format runs prettier formatting
func (Frontend) Format() error {
	return sh.RunV("bun", "run", "--cwd", "frontend_v2", "format")
}

// Build the React frontend
func (Frontend) Build() error {
	return sh.RunV("bun", "run", "--cwd", "frontend_v2", "build")
}

func (Frontend) Dev() error {
	return sh.RunV("bun", "run", "--cwd", "frontend_v2", "dev")
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
	hash, err := sh.Output("git", "rev-parse", "--short", "HEAD")
	if err != nil {
		fmt.Println("[ignore] fatal: no tag matches")
	}
	tag, err := sh.Output("git", "describe", "--exact-match", "--tags")
	if err != nil {
		tag = "nightly"
	}
	return map[string]string{
		"PACKAGE":     packageName,
		"COMMIT_HASH": hash,
		"BUILD_DATE":  time.Now().Format("2006-01-02T15:04:05Z0700"),
		"VERSION":     tag,
	}
}

// Build the Go api service
func (Backend) Build() error {
	fmt.Println("compiling binary dist/taskcafe")
	return runWith(flagEnv(), "go", "build", "-ldflags", ldflags, "-tags", "prod", "-o", "dist/taskcafe", "cmd/taskcafe/main.go")
}

// Schema merges GraphQL schema files into single schema & runs gqlgen
func (Backend) Schema() error {
	folders, err := ioutil.ReadDir("internal/graph/schema/")
	if err != nil {
		panic(err)
	}
	for _, folder := range folders {
		if !folder.IsDir() {
			continue
		}
		var schema strings.Builder
		filename := "internal/graph/schema/" + folder.Name()
		files, err := ioutil.ReadDir(filename)
		if err != nil {
			panic(err)
		}
		for _, file := range files {
			f, err := os.Open(filename + "/" + file.Name())
			if err != nil {
				panic(err)
			}
			content, err := ioutil.ReadAll(f)
			if err != nil {
				panic(err)
			}
			fmt.Fprintln(&schema, string(content))
		}
		err = ioutil.WriteFile("internal/graph/schema/"+folder.Name()+".gql", []byte(schema.String()), os.FileMode(0644))
	}
	if err != nil {
		panic(err)
	}
	return sh.Run("gqlgen")
}

// Test run golang unit tests
func (Backend) Test() error {
	fmt.Println("running taskcafe backend unit tests")
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

// Release tags, builds, and upload a new release docker image
func Release() error {
	// mg.SerialDeps(Frontend.Eslint, Frontend.Tsc, Backend.Test)
	version, ok := os.LookupEnv("TASKCAFE_RELEASE_VERSION")
	if !ok {
		return errors.New("TASKCAFE_RELEASE_VERSION must be set")
	}
	if !semverRegex.MatchString(version) {
		return errors.New("TASKCAFE_RELEASE_VERSION must be a valid SemVer")
	}
	fmt.Println("Preparing " + version + " release...")

	err := sh.RunV("git", "tag", version, "-m", "v"+version)
	if err != nil {
		return err
	}
	err = sh.RunV("git", "push", "origin", version)
	if err != nil {
		return err
	}
	err = sh.RunV("docker", "build", ".", "-t", "taskcafe/taskcafe:latest", "-t", "taskcafe/taskcafe:"+version)
	if err != nil {
		return err
	}
	err = sh.RunV("docker", "push", "taskcafe/taskcafe:latest")
	if err != nil {
		return err
	}
	err = sh.RunV("docker", "push", "taskcafe/taskcafe:"+version)
	if err != nil {
		return err
	}
	fmt.Println("Released version " + version)
	return nil
}

// Latest is namespace for commands interacting with docker test setups
type Latest mg.Namespace

// Up starts the docker-compose file using the `latest` taskcafe image
func (Latest) Up() error {
	return sh.RunV("docker-compose", "-p", "taskcafe-latest", "-f", "testing/docker-compose.latest.yml", "up")
}

// Dev is namespace for commands interacting with docker test setups
type Dev mg.Namespace

// Up starts the docker-compose file using the current files
func (Dev) Up() error {
	return sh.RunV("docker-compose", "-p", "taskcafe-dev", "-f", "testing/docker-compose.dev.yml", "up")
}

// Watch starts Air for hot-reloading the web server (local development)
func (Dev) Watch() error {
	return sh.RunV("go", "tool", "air", "-c", ".air.toml")
}

// DockerWatch starts the backend-dev service with Air in Docker
func (Dev) DockerWatch() error {
	fmt.Println("Starting Docker development environment with Air hot-reload...")
	fmt.Println("Backend will be available at http://localhost:3334")
	return sh.RunV("docker-compose", "-p", "taskcafe-dev", "up", "backend-dev", "postgres", "redis")
}

// Docker is namespace for commands interacting with docker
type Docker mg.Namespace

// Up runs the main docker compose file
func (Docker) Up() error {
	return sh.RunV("docker", "compose", "up", "frontend", "backend", "worker")
}

// Migrate runs the migration command for the docker-compose network
func (Docker) Migrate() error {
	return sh.RunV("docker-compose", "-p", "taskcafe", "-f", "docker-compose.yml", "-f", "docker-compose.migrate.yml", "run", "--rm", "migrate")
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
