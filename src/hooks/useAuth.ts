/**
 * Authentication hook
 * Provides authentication state and methods
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '@/services/api';
import { sessionUtils } from '@/utils/session';
import { LoginCredentials, LoginResponse, ApiError } from '@/types/auth';

export const useAuth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status on mount
    setIsAuthenticated(sessionUtils.isAuthenticated());
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response: LoginResponse = await apiService.login(credentials);
      
      // Extract data from nested response
      const { token, username, expiresAt } = response.data;
      
      // Store login data in session
      sessionUtils.setLoginData({
        token,
        username,
        expiresAt,
      });

      // Also set cookies for middleware (token, expires, username)
      document.cookie = `auth_token=${token}; path=/; secure; samesite=strict`;
      document.cookie = `auth_expires=${expiresAt}; path=/; secure; samesite=strict`;
      document.cookie = `auth_username=${username}; path=/; secure; samesite=strict`;

      setIsAuthenticated(true);
      return true;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Login failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    sessionUtils.clearSession();
    // Clear all auth cookies
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'auth_expires=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'auth_username=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setIsAuthenticated(false);
    router.push('/login');
  };

  const clearError = () => {
    setError(null);
  };

  return {
    isLoading,
    error,
    isAuthenticated,
    login,
    logout,
    clearError,
  };
};
