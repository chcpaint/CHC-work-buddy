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

# Serve with the lightweight `serve` static server.
# This was the original working configuration before April 21. We tried Caddy
# for gzip/SPA-fallback, but Railway's port binding didn't play well with it.
# Reverting to known-good. Caddy migration is a follow-up.
FROM node:20-alpine AS production

RUN npm install -g serve

COPY --from=build /app/dist /app/dist

# Railway's public domain for this service routes to Port 3000 (see
# service Settings -> Networking). Hard-bind to 3000 so the container,
# EXPOSE, and Railway's proxy all agree. `serve -s` enables SPA fallback
# (sends index.html for unknown paths so React Router works).
EXPOSE 3000

CMD ["serve", "-s", "/app/dist", "-l", "3000"]
