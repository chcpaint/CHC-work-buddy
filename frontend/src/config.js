// frontend/src/config.js — Single source of truth for runtime config.
// Both App.jsx, AdminPanel.jsx, and authFetch.js import API_BASE from here
// so we never have drift between fallback URLs.

export const API_BASE =
  import.meta.env.VITE_API_URL || 'https://chc-work-buddy-production.up.railway.app';
