FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./

# Accept env vars as build args so Vite can bake them in
ARG VITE_API_URL
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY

RUN npm run build

# Serve with Caddy — gzip/brotli compression, proper SPA fallback, no extra config needed.
FROM caddy:2-alpine AS production

# Caddyfile: serve dist, fall back to index.html for SPA routes,
# disable on-disk access logs (Railway captures stdout)
RUN echo $':80 {\n\
    root * /usr/share/caddy\n\
    encode gzip zstd\n\
    try_files {path} /index.html\n\
    file_server\n\
    log {\n\
        output stdout\n\
        format console\n\
    }\n\
}\n' > /etc/caddy/Caddyfile

COPY --from=build /app/dist /usr/share/caddy

EXPOSE 80

# Caddy is its own healthcheck-friendly server.
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:80/ > /dev/null || exit 1
