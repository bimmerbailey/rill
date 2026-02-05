//go:build prod
// +build prod

package commands

import (
	"github.com/bimmerbailey/rill/internal/migrations"
)

func init() {
	migration = migrations.Migrations
}
