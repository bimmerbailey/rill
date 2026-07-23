# Rill (Taskcafe Fork)

Personal project management tool with a Kanban board. Go backend (GraphQL API) + React 19 frontend.

## Structure

```
frontend/       # React 19, TypeScript, Vite, Tailwind CSS v4, Apollo Client, Zustand — Bun, not npm
internal/       # Go backend: graph/ (gqlgen), db/ (sqlc-generated), route/ (chi), commands/ (Cobra), jobs/ (worker)
cmd/rill/       # Main binary (subcommands: web, worker, migrate, seed, token, reset-password)
cmd/mage/       # Build tool entrypoint
migrations/     # PostgreSQL migrations (golang-migrate), embedded into the binary via vfsgen
```

## Commands

Frontend (from `frontend/`, uses Bun):

```bash
bun run dev           # Dev server (port 5173)
bun run build         # tsc + vite build
bun run lint          # Prettier check + ESLint
bun run format        # Prettier write
bun run codegen       # Regenerate src/graphql/generated/graphql.tsx
```

Backend (mage, from repo root):

```bash
go run cmd/mage/main.go build                   # Build binary → dist/rill
go run cmd/mage/main.go backend:test            # go test ./...
go run cmd/mage/main.go backend:schema          # Regenerate gqlgen code from internal/graph/schema/
go run cmd/mage/main.go backend:genMigrations   # Re-embed migrations/ into Go
sqlc generate                                   # Regenerate internal/db/ from internal/db/query/
```

There is no top-level `test` target — use `backend:test`. Frontend has no test runner.

## Codegen — three separate pipelines

1. **GraphQL schema change** (`internal/graph/schema/`): run `backend:schema`, then `bun run codegen` for the frontend
   types.
2. **SQL query change** (`internal/db/query/`): run `sqlc generate`.
3. **New migration** (`migrations/`): run `backend:genMigrations` — migrations ship embedded in the binary; skipping
   this means the migration silently isn't included.

## Gotchas

- Config via Viper: `conf/rill.toml` or env vars prefixed `RILL_` (key `database.host` → `RILL_DATABASE_HOST`). Example:
  `conf/rill.example.toml`.
- Ports: backend 3333, frontend dev 5173. GraphQL at `/graphql` (auth-required), playground at `/__graphql`.
- Redis is required (message queue + background jobs); the worker runs as a separate process (`rill worker`).
- Migrations apply via `rill migrate` or `web --migrate` / `RILL_MIGRATE=true`.
- Frontend imports use the `@/` path alias (→ `frontend/src/`), not relative paths.
- Styling is Tailwind CSS v4 — do not use styled-components (it is not installed).

## Detailed guides

- State management patterns: @frontend/docs/state-management.md
- Architecture patterns: @frontend/docs/architecture.md
- Styling guidelines: @frontend/docs/styling.md
