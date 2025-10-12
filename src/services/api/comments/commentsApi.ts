/**
 * Comments API service
 */

import { BaseApiService } from '../base';
import { Comment, CommentCreateRequest } from '@/types/api/recognition';
import { apiEndpoints } from '@/config/env';

export class CommentsApiService extends BaseApiService {
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
  async addOn(token: string, addOnData: CommentCreateRequest): Promise<Comment> {
    return this.authenticatedRequest<Comment>(apiEndpoints.COMMENT_CREATE, {
      method: 'POST',
      body: JSON.stringify(addOnData),
    }, token);
  }
}

// Export singleton instance
export const commentsApi = new CommentsApiService();
