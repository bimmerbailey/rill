FROM golang:1.25.5-alpine AS builder

# Build arguments for version embedding
ARG VERSION=dev
ARG COMMIT_HASH=none
ARG BUILD_DATE=unknown

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache git

# Copy go mod files first for better caching
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Pass version info through environment so flagEnv() / ldflags pick it up
ENV VERSION=${VERSION} COMMIT_HASH=${COMMIT_HASH} BUILD_DATE=${BUILD_DATE}
RUN go run cmd/mage/main.go backend:genMigrations backend:build

# Development stage with Air for hot-reload
FROM golang:1.25.5-alpine AS dev

WORKDIR /app

# Install Air for hot-reloading
RUN go install github.com/air-verse/air@latest

# Install git for go mod download
RUN apk add --no-cache git

# Copy go mod files first for better caching
COPY go.mod go.sum ./
RUN go mod download

# Copy source code (will be overridden by volume mount in dev)
COPY . .

# Expose the application port
EXPOSE 3333

# Run Air for hot-reloading
ENTRYPOINT ["air", "-c"]
CMD [".air.toml"]

FROM alpine:3.21 AS production

WORKDIR /root/

COPY --from=builder /app/dist/rill /rill

ENTRYPOINT ["/rill"]
CMD ["web"]
