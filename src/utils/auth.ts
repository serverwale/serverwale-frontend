/**
 * ============================================================
 *   SERVERWALE — Admin Auth Utility
 *   JWT token management for admin panel security
 * ============================================================
 */

const TOKEN_KEY = "sw_admin_token";
const USERNAME_KEY = "sw_admin_user";

export const setAdminToken = (token: string, username: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USERNAME_KEY, username);
};

export const getAdminToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getAdminUsername = (): string => {
  return localStorage.getItem(USERNAME_KEY) || "Admin";
};

export const removeAdminToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY);
};

export const isAdminAuthenticated = (): boolean => {
  const token = getAdminToken();
  if (!token) return false;

  // Check if token is expired by decoding payload (client-side check)
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const isExpired = payload.exp * 1000 < Date.now();
    if (isExpired) {
      removeAdminToken();
      return false;
    }
    return true;
  } catch {
    removeAdminToken();
    return false;
  }
};

/** Returns headers with Authorization token for API calls */
export const authHeaders = (): Record<string, string> => {
  const token = getAdminToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};
