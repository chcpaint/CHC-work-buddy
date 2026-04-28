// authFetch.js — Auth-aware fetch with automatic token refresh
// Prevents blank tabs when Supabase access tokens expire (default 1hr)

import { API_BASE } from "./config.js";

export async function authFetch(url, options = {}) {
  const token = localStorage.getItem("bsai_token");
  if (!token) throw new Error("NO_TOKEN");

  const headers = { ...options.headers, Authorization: `Bearer ${token}` };
  let res = await fetch(url, { ...options, headers });

  // If 401, try refreshing the token once
  if (res.status === 401) {
    const refreshToken = localStorage.getItem("bsai_refresh");
    if (!refreshToken) throw new Error("SESSION_EXPIRED");

    try {
      const refreshRes = await fetch(`${API_BASE}/api/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!refreshRes.ok) throw new Error("REFRESH_FAILED");

      const refreshData = await refreshRes.json();
      if (!refreshData.token) throw new Error("REFRESH_FAILED");

      // Save new tokens
      localStorage.setItem("bsai_token", refreshData.token);
      if (refreshData.refreshToken) localStorage.setItem("bsai_refresh", refreshData.refreshToken);

      // Retry original request with new token
      const retryHeaders = { ...options.headers, Authorization: `Bearer ${refreshData.token}` };
      res = await fetch(url, { ...options, headers: retryHeaders });

      // Dispatch event so React state picks up the new token
      window.dispatchEvent(new CustomEvent("bsai_token_refreshed", { detail: refreshData }));
    } catch {
      // Refresh failed — clear everything, force re-login
      localStorage.removeItem("bsai_token");
      localStorage.removeItem("bsai_refresh");
      window.dispatchEvent(new CustomEvent("bsai_session_expired"));
      throw new Error("SESSION_EXPIRED");
    }
  }

  return res;
}
