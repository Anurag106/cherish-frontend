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
    const response = await this.authenticatedRequest<UserProfileResponse>(apiEndpoints.USER_PROFILE, {
      method: 'GET',
    }, token);
    
    console.log('👤 Raw user profile API response:', response);
    console.log('👤 Points in API response:', {
      totalPoints: response.totalPoints,
      availablePoints: response.availablePoints,
      type: typeof response.totalPoints
    });
    
    return response;
  }
}

// Export singleton instance
export const authApi = new AuthApiService();
