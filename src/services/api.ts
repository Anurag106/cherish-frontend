/**
 * API service layer
 * Handles all API calls and HTTP requests
 */

import { env, apiEndpoints } from '@/config/env';
import { LoginCredentials, LoginResponse, ApiError, UserProfileResponse } from '@/types/auth';
import { ApiResponse, HashtagResponse, PostResponse, PostsResponse, PostFilterRequest, Comment, CommentCreateRequest, LikeRequest } from '@/types/recognition';

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
   * Get list of posts with cursor-based pagination
   */
  async getPosts(token: string, filters?: PostFilterRequest): Promise<PostsResponse> {
    // Build query parameters
    const queryParams = new URLSearchParams();
    if (filters?.pageSize) queryParams.append('pageSize', filters.pageSize.toString());
    if (filters?.cursor) queryParams.append('cursor', filters.cursor);
    if (filters?.filterByTeam !== undefined) queryParams.append('filterByTeam', filters.filterByTeam.toString());
    if (filters?.filterByUserId) queryParams.append('filterByUserId', filters.filterByUserId);
    if (filters?.hashtagIds && filters.hashtagIds.length > 0) {
      filters.hashtagIds.forEach(id => queryParams.append('hashtagIds', id.toString()));
    }
    if (filters?.hashtagNames && filters.hashtagNames.length > 0) {
      filters.hashtagNames.forEach(name => queryParams.append('hashtagNames', name));
    }
    if (filters?.sortOrder) queryParams.append('sortOrder', filters.sortOrder);

    const queryString = queryParams.toString();
    const url = queryString ? `${apiEndpoints.POST_LIST}?${queryString}` : apiEndpoints.POST_LIST;
    
    const response = await this.authenticatedRequest<ApiResponse<PostsResponse>>(url, {
      method: 'GET',
    }, token);
    
    return response.data;
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

  /**
   * Create a comment on a post
   */
  async createComment(token: string, commentData: CommentCreateRequest): Promise<Comment> {
    return this.authenticatedRequest<Comment>(apiEndpoints.COMMENT_CREATE, {
      method: 'POST',
      body: JSON.stringify(commentData),
    }, token);
  }

  /**
   * Get comments for a post
   */
  async getComments(token: string, postId: string, limit: number = 5): Promise<Comment[]> {
    return this.authenticatedRequest<Comment[]>(`${apiEndpoints.COMMENT_LIST}?postId=${postId}&limit=${limit}`, {
      method: 'GET',
    }, token);
  }

  /**
   * Add an add-on to a post (uses the same comment endpoint)
   */
  async addOn(token: string, addOnData: CommentCreateRequest): Promise<any> {
    return this.authenticatedRequest<any>(apiEndpoints.COMMENT_CREATE, {
      method: 'POST',
      body: JSON.stringify(addOnData),
    }, token);
  }

  /**
   * Like or react to a post
   */
  async likePost(token: string, likeData: LikeRequest): Promise<any> {
    return this.authenticatedRequest<any>(apiEndpoints.LIKE_POST, {
      method: 'POST',
      body: JSON.stringify(likeData),
    }, token);
  }

  /**
   * Remove like/reaction from a post
   */
  async unlikePost(token: string, postId: string): Promise<any> {
    return this.authenticatedRequest<any>(`${apiEndpoints.LIKE_POST}?postId=${postId}`, {
      method: 'DELETE',
    }, token);
  }

  /**
   * Get likes for a post
   */
  async getLikes(token: string, postId: string): Promise<any[]> {
    return this.authenticatedRequest<any[]>(`${apiEndpoints.LIKE_LIST}?postId=${postId}`, {
      method: 'GET',
    }, token);
  }
}

// Export singleton instance
export const apiService = new ApiService();
