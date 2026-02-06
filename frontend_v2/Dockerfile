# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1.3.8-slim AS base
WORKDIR /app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install

# install dev dependencies (needed for build)
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# install production dependencies only
RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# development stage
FROM base AS dev
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=development
EXPOSE 5173/tcp

CMD ["bun", "run", "dev", "--host", "0.0.0.0"]

# build the app
FROM base AS build
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=production
RUN bun run build

# final production image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=build /app/build build
COPY --from=build /app/package.json .

USER bun
EXPOSE 3000/tcp

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

ENTRYPOINT ["bun", "run", "build/index.js"]
