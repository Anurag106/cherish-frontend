/**
 * Authentication related type definitions
 */

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  expiresAt: string; // ISO date string from DateTime
}

export interface ApiError {
  message: string;
  status: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  username: string | null;
  expiresAt: string | null;
}
