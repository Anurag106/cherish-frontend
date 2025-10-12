/**
 * Authentication API service
 */

import { BaseApiService } from '../base';
import { LoginCredentials, LoginResponse, UserProfileResponse } from '@/types/api/auth';
import { apiEndpoints } from '@/config/env';

export class AuthApiService extends BaseApiService {
  /**
   * Login API call
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    return this.fetchWithErrorHandling<LoginResponse>(apiEndpoints.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  /**
   * Get user profile
   */
  async getUserProfile(token: string): Promise<UserProfileResponse> {
    return this.authenticatedRequest<UserProfileResponse>(apiEndpoints.USER_PROFILE, {
      method: 'GET',
    }, token);
  }
}

// Export singleton instance
export const authApi = new AuthApiService();
