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

# Railway sets PORT at runtime; default to 3000 for local. `serve -s` enables
# SPA fallback (sends index.html for unknown paths so React Router works).
EXPOSE 3000

CMD sh -c 'serve -s /app/dist -l ${PORT:-3000}'
