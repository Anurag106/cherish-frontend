/**
 * Base API service with common functionality
 */

import { env, apiEndpoints } from '@/config/env';
import { ApiError } from '@/types/api/auth';

export class BaseApiService {
  protected baseURL: string;

  constructor() {
    this.baseURL = env.API_BASE_URL;
  }

  /**
   * Generic fetch wrapper with error handling
   */
  protected async fetchWithErrorHandling<T>(
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
   * Add authorization header to requests
   */
  protected getAuthHeaders(token?: string): Record<string, string> {
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
  protected async authenticatedRequest<T>(
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
}
