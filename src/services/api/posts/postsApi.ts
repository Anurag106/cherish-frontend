/**
 * Posts API service
 */

import { BaseApiService } from '../base';
import { PostResponse, PostsResponse, PostFilterRequest } from '@/types/api/recognition';
import { ApiResponse } from '@/types/api/recognition';
import { apiEndpoints } from '@/config/env';

export class PostsApiService extends BaseApiService {
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
      filters.hashtagIds.forEach((id: number) => queryParams.append('hashtagIds', id.toString()));
    }
    if (filters?.hashtagNames && filters.hashtagNames.length > 0) {
      filters.hashtagNames.forEach((name: string) => queryParams.append('hashtagNames', name));
    }
    if (filters?.sortOrder) queryParams.append('sortOrder', filters.sortOrder);

    const queryString = queryParams.toString();
    const url = queryString ? `${apiEndpoints.POST_LIST}?${queryString}` : apiEndpoints.POST_LIST;
    
    const response = await this.authenticatedRequest<ApiResponse<PostsResponse>>(url, {
      method: 'GET',
    }, token);
    
    return response.data;
  }
}

// Export singleton instance
export const postsApi = new PostsApiService();
