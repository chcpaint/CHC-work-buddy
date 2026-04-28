import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Body Shop Wiz',
        short_name: 'Body Shop Wiz',
        description: 'Professional AI assistant for body shop technicians',
        theme_color: '#f97316',
        background_color: '#080e1a',
        display: 'standalone',
        orientation: 'any',
        scope: '/',
        start_url: '/',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        // Don't cache auth/REST API responses cross-user (shared shop computers).
        // Storage assets (PDFs, videos) are still cached aggressively.
        navigateFallbackDenylist: [/\/api\//, /\/auth\//],
        runtimeCaching: [
          {
            // REST + Auth API: always go to network so user A's data
            // doesn't leak to user B on the same device.
            urlPattern: /^https:\/\/.*\.supabase\.co\/(rest|auth)\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'sb-api',
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 5 },
              networkTimeoutSeconds: 10,
            },
          },
          {
            // Bulk media in Supabase Storage — heavy, safe to cache long.
            urlPattern: /^https:\/\/.*\.supabase\.co\/storage\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'sb-storage',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 7 },
            },
          },
        ],
      },
    }),
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      input: { main: 'index.html' },
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
})
