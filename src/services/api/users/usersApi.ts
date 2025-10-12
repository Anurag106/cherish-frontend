/**
 * Users API service
 */

import { BaseApiService } from '../base';
import { apiEndpoints } from '@/config/env';

export class UsersApiService extends BaseApiService {
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
export const usersApi = new UsersApiService();
