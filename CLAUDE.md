# Rill (Taskcafe Fork)

Open-source project management tool with Kanban board interface. Built with Go backend and React frontend.

## Project Structure

```
frontend_v2/          # React 19 frontend (active development)
frontend/             # Legacy frontend (deprecated)
internal/             # Go backend services
cmd/                  # Go CLI entrypoints
migrations/           # Database migrations
```

## Frontend V2 (`frontend_v2/`)

**Stack:** React 19, TypeScript, Vite, Bun, Apollo Client, Zustand, styled-components

### Key Directories
```
src/
├── features/         # Feature-based modules (auth, projects, tasks, etc.)
├── components/       # Shared components
├── hooks/            # Global hooks
├── stores/           # Zustand stores
├── graphql/          # GraphQL queries/mutations
└── providers/        # Context providers
```

### Commands
```bash
bun run dev           # Start dev server
bun run build         # Build for production
bun run lint          # Run ESLint + Prettier check
bun run format        # Format with Prettier
bun run codegen       # Generate GraphQL types
```

## Backend (Go)

Uses Mage for build tasks. See `magefile.go` for available commands.

```bash
go run cmd/mage/main.go build    # Build binary
go run cmd/mage/main.go test     # Run tests
```

## For detailed guides, see:
- State management patterns: @frontend_v2/docs/state-management.md
- Architecture patterns: @frontend_v2/docs/architecture.md
- Styling guidelines: @frontend_v2/docs/styling.md
