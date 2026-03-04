package main

import (
	"github.com/bimmerbailey/rill/internal/commands"
	_ "github.com/lib/pq"
)

func main() {
	commands.Execute()
}
