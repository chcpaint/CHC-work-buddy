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

# Caddyfile: serve dist, fall back to index.html for SPA routes.
# Bind to whatever port Railway sets via PORT env var (defaults to 8080 if unset).
# Caddy v2 supports {$ENV_VAR} substitution natively.
RUN echo $':{$PORT:8080} {\n\
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

# Railway typically sets PORT to 8080. EXPOSE is documentation; Railway uses
# the actually-bound port from runtime, not EXPOSE.
EXPOSE 8080

# Healthcheck must use the same port. Use a shell so $PORT expands at runtime.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD sh -c 'wget -qO- http://localhost:${PORT:-8080}/ > /dev/null || exit 1'
