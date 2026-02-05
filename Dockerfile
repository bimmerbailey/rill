FROM golang:1.24-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache git

# Copy go mod files first for better caching
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

RUN go run cmd/mage/main.go backend:genMigrations backend:build

FROM alpine:3.21 AS production

WORKDIR /root/

COPY --from=builder /app/dist/taskcafe /taskcafe

ENTRYPOINT ["/taskcafe"]
CMD ["web"]
