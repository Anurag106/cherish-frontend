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
      
      // Store login data in session
      sessionUtils.setLoginData({
        token: response.token,
        username: response.username,
        expiresAt: response.expiresAt,
      });

      // Also set cookie for middleware
      document.cookie = `auth_token=${response.token}; path=/; secure; samesite=strict`;

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
    // Clear cookie
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
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
