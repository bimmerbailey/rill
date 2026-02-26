<p align="center">
  <img src="./.github/rill-banner.svg" alt="Rill" width="600" />
</p>

<p align="center">
  A personal project management tool with a Kanban board interface.<br/>
  Forked from <a href="https://github.com/JordanKnott/taskcafe">Taskcafe</a> and rebuilt to fit my workflow.
</p>

> **rill** (noun): a small stream -- chosen for its reference to nature and the steady flow of work.

**This project is in active development.**

## Features

- Manage tasks through a Kanban board interface (due dates, labels, checklists)
- View all current assigned tasks through the My Tasks view
- Personal projects
- Task comments and activity

## Project Structure

```
frontend/          # React 19 frontend (TypeScript, Vite, Bun, Apollo Client, Zustand)
internal/          # Go backend services
cmd/               # Go CLI entrypoints
migrations/        # Database migrations (PostgreSQL)
```

## Getting Started

### With Docker Compose

Requires [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/install/).

```bash
git clone https://github.com/bimmerbailey/rill.git && cd rill
docker compose up -d
```

This starts a PostgreSQL database, Redis, and the Rill backend + frontend services.

Visit [http://localhost:5173](http://localhost:5173) for the frontend dev server,
or [http://localhost:3333](http://localhost:3333) for the backend API.

### From Source

#### Backend

You'll need [Go](https://golang.org/dl/) installed. This project uses [Mage](https://magefile.org/) as its build tool.

```bash
go run cmd/mage/main.go install
go run cmd/mage/main.go build
```

#### Frontend

You'll need [Bun](https://bun.sh/) installed.

```bash
cd frontend
bun install
bun run dev
```

## Development

| Command                         | Description                   |
|---------------------------------|-------------------------------|
| `bun run dev`                   | Start frontend dev server     |
| `bun run build`                 | Build frontend for production |
| `bun run lint`                  | Run ESLint + Prettier check   |
| `bun run format`                | Format with Prettier          |
| `bun run codegen`               | Generate GraphQL types        |
| `go run cmd/mage/main.go build` | Build Go backend              |
| `go run cmd/mage/main.go test`  | Run backend tests             |

## License

[MIT License](LICENSE)
