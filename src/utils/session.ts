/**
 * Session management utilities
 * Handles token storage and retrieval from sessionStorage
 */

const SESSION_TOKEN_KEY = 'auth_token';
const SESSION_USERNAME_KEY = 'auth_username';
const SESSION_EXPIRES_KEY = 'auth_expires';

export const sessionUtils = {
  /**
   * Store authentication token in session storage
   */
  setToken: (token: string): void => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(SESSION_TOKEN_KEY, token);
    }
  },

  /**
   * Get authentication token from session storage
   */
  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(SESSION_TOKEN_KEY);
    }
    return null;
  },

  /**
   * Remove authentication token from session storage
   */
  removeToken: (): void => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(SESSION_TOKEN_KEY);
    }
  },

  /**
   * Store username in session storage
   */
  setUsername: (username: string): void => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(SESSION_USERNAME_KEY, username);
    }
  },

  /**
   * Get username from session storage
   */
  getUsername: (): string | null => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(SESSION_USERNAME_KEY);
    }
    return null;
  },

  /**
   * Store token expiration time in session storage
   */
  setExpiresAt: (expiresAt: string): void => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(SESSION_EXPIRES_KEY, expiresAt);
    }
  },

  /**
   * Get token expiration time from session storage
   */
  getExpiresAt: (): string | null => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(SESSION_EXPIRES_KEY);
    }
    return null;
  },

  /**
   * Clear all session data
   */
  clearSession: (): void => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(SESSION_TOKEN_KEY);
      sessionStorage.removeItem(SESSION_USERNAME_KEY);
      sessionStorage.removeItem(SESSION_EXPIRES_KEY);
    }
  },

  /**
   * Store complete login response data
   */
  setLoginData: (loginResponse: { token: string; username: string; expiresAt: string }): void => {
    sessionUtils.setToken(loginResponse.token);
    sessionUtils.setUsername(loginResponse.username);
    sessionUtils.setExpiresAt(loginResponse.expiresAt);
  },

  /**
   * Check if token is expired
   */
  isTokenExpired: (): boolean => {
    const expiresAt = sessionUtils.getExpiresAt();
    if (!expiresAt) return true;
    
    return new Date() >= new Date(expiresAt);
  },

  /**
   * Check if user is authenticated (has valid token and not expired)
   */
  isAuthenticated: (): boolean => {
    return !!sessionUtils.getToken() && !sessionUtils.isTokenExpired();
  }
};
