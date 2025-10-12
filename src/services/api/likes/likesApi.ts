/**
 * Likes/Reactions API service
 */

import { BaseApiService } from '../base';
import { LikeRequest } from '@/types/api/recognition';
import { apiEndpoints } from '@/config/env';

export class LikesApiService extends BaseApiService {
  /**
   * Like or react to a post
   */
  async likePost(token: string, likeData: LikeRequest): Promise<unknown> {
    return this.authenticatedRequest<unknown>(apiEndpoints.LIKE_POST, {
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
export const likesApi = new LikesApiService();
