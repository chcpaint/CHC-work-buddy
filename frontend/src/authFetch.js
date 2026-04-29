// authFetch.js — Auth-aware fetch with self-healing token recovery.
//
// Order of operations on a request:
//   1. If localStorage has a token, send the request with it.
//   2. If response is 401, try the refresh token.
//   3. If refresh fails (or no refresh token), try the intranet-login bypass.
//      (Returns 404 in multi-tenant mode — falls through to step 4.)
//   4. If all recovery attempts fail, clear tokens and throw SESSION_EXPIRED.
//
// If localStorage has NO token at all (cold click before auto-login completed,
// or after a clear), we try intranet-login first before throwing NO_TOKEN.
//
// This eliminates the "Failed to load document — NO_TOKEN" error staff were
// seeing when their Supabase JWT silently expired mid-session.

import { API_BASE } from "./config.js";

// Try the intranet-login bypass. Returns the new token, or null on failure.
// (Used both when no token exists and when refresh fails.)
async function tryIntranetLogin() {
  try {
    const res = await fetch(`${API_BASE}/api/auth/intranet-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.token) return null;
    localStorage.setItem("bsai_token", data.token);
    if (data.refreshToken) localStorage.setItem("bsai_refresh", data.refreshToken);
    window.dispatchEvent(new CustomEvent("bsai_token_refreshed", { detail: data }));
    return data.token;
  } catch {
    return null;
  }
}

// Try refreshing with the refresh token. Returns new token or null.
async function tryRefresh() {
  const refreshToken = localStorage.getItem("bsai_refresh");
  if (!refreshToken) return null;
  try {
    const res = await fetch(`${API_BASE}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.token) return null;
    localStorage.setItem("bsai_token", data.token);
    if (data.refreshToken) localStorage.setItem("bsai_refresh", data.refreshToken);
    window.dispatchEvent(new CustomEvent("bsai_token_refreshed", { detail: data }));
    return data.token;
  } catch {
    return null;
  }
}

export async function authFetch(url, options = {}) {
  let token = localStorage.getItem("bsai_token");

  // No token in storage — could be a cold click before auto-login completed,
  // or storage was cleared. Try the intranet bypass first.
  if (!token) {
    token = await tryIntranetLogin();
    if (!token) throw new Error("NO_TOKEN");
  }

  const headers = { ...options.headers, Authorization: `Bearer ${token}` };
  let res = await fetch(url, { ...options, headers });

  // 401 = token expired or invalid. Try recovery in order: refresh → intranet bypass.
  if (res.status === 401) {
    let newToken = await tryRefresh();
    if (!newToken) {
      newToken = await tryIntranetLogin();
    }

    if (!newToken) {
      // All recovery paths exhausted — surface a clean session-expired error.
      localStorage.removeItem("bsai_token");
      localStorage.removeItem("bsai_refresh");
      window.dispatchEvent(new CustomEvent("bsai_session_expired"));
      throw new Error("SESSION_EXPIRED");
    }

    // Retry the original request with the new token.
    const retryHeaders = { ...options.headers, Authorization: `Bearer ${newToken}` };
    res = await fetch(url, { ...options, headers: retryHeaders });
  }

  return res;
}
