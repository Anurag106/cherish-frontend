/**
 * Hashtags API service
 */

import { BaseApiService } from '../base';
import { HashtagResponse, ApiResponse } from '@/types/api/recognition';
import { apiEndpoints } from '@/config/env';

export class HashtagsApiService extends BaseApiService {
  /**
   * Get hashtags for autocomplete
   */
  async getHashtags(token: string, query?: string): Promise<HashtagResponse[]> {
    const url = apiEndpoints.HASHTAGS;
    
    const response = await this.authenticatedRequest<ApiResponse<HashtagResponse[]>>(url, {
      method: 'GET',
    }, token);
    
    console.log(response, response.data);
    return response.data;
  }
}

// Export singleton instance
export const hashtagsApi = new HashtagsApiService();
