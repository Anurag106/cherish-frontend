/**
 * API service layer
 * Handles all API calls and HTTP requests
 */

import { env, apiEndpoints } from '@/config/env';
import { LoginCredentials, LoginResponse, ApiError, UserProfileResponse } from '@/types/auth';
import { ApiResponse, HashtagResponse, PostResponse } from '@/types/recognition';

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = env.API_BASE_URL;
  }

  /**
   * Generic fetch wrapper with error handling
   */
  private async fetchWithErrorHandling<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
          message: errorData.message || `HTTP error! status: ${response.status}`,
          status: response.status,
        } as ApiError;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw {
          message: error.message,
          status: 0,
        } as ApiError;
      }
      throw error;
    }
  }

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
   * Add authorization header to requests
   */
  private getAuthHeaders(token?: string): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Authenticated request wrapper
   */
  async authenticatedRequest<T>(
    url: string,
    options: RequestInit = {},
    token?: string
  ): Promise<T> {
    return this.fetchWithErrorHandling<T>(url, {
      ...options,
      headers: {
        ...this.getAuthHeaders(token),
        ...options.headers,
      },
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

  /**
   * Submit a recognition/post
   */
  async submitRecognition(token: string, postData: {
    context: string;
    visibility: number;
  }): Promise<PostResponse> {
    const response = await this.authenticatedRequest<ApiResponse<PostResponse>>(apiEndpoints.POST_CREATE, {
      method: 'POST',
      body: JSON.stringify(postData),
    }, token);
    
    return response.data;
  }

  /**
   * Get list of recognitions
   */
  async getRecognitions(token: string, filters?: {
    page?: number;
    limit?: number;
    userId?: string;
  }): Promise<any> {
    const queryParams = new URLSearchParams();
    if (filters?.page) queryParams.append('page', filters.page.toString());
    if (filters?.limit) queryParams.append('limit', filters.limit.toString());
    if (filters?.userId) queryParams.append('userId', filters.userId);

    const queryString = queryParams.toString();
    const url = queryString ? `${apiEndpoints.POST_LIST}?${queryString}` : apiEndpoints.POST_LIST;

    return this.authenticatedRequest<any>(url, {
      method: 'GET',
    }, token);
  }

  /**
   * Get hashtags for autocomplete
   */
  async getHashtags(token: string, query?: string): Promise<HashtagResponse[]> {
    const url = apiEndpoints.HASHTAGS;
    
    const response = await this.authenticatedRequest<ApiResponse<HashtagResponse[]>>(url, {
      method: 'GET',
    }, token);
    console.log(response,  response.data);
    return response.data;
  }

  /**
   * Get user recipients for mentions (no search query)
   */
  async getUserRecipients(token: string): Promise<any[]> {
    return this.authenticatedRequest<any[]>(apiEndpoints.USER_RECIPIENTS, {
      method: 'GET',
    }, token);
  }

  /**
   * Autocomplete users for mentions (with search query)
   */
  async autocompleteUsers(token: string, search: string): Promise<any[]> {
    return this.authenticatedRequest<any[]>(`${apiEndpoints.USER_AUTOCOMPLETE}?search=${encodeURIComponent(search)}`, {
      method: 'GET',
    }, token);
  }
}

// Export singleton instance
export const apiService = new ApiService();
