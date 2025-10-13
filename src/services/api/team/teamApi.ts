/**
 * Team API service
 */

import { BaseApiService } from '../base';
import { apiEndpoints } from '@/config/env';

export interface Employee {
  id: string;
  fullName: string;
}

export interface TeamResponse {
  id: string;
  name: string;
  managerId: string;
  companyId: string;
  employeeIds: string[];
  employees: Employee[];
  createdAt: string;
  updatedAt: string;
}

export class TeamApiService extends BaseApiService {
  /**
   * Get team details with employees by team ID
   */
  async getTeam(token: string, teamId: string): Promise<TeamResponse> {
    const url = `${apiEndpoints.TEAM}/${teamId}`;
    console.log('🌐 Making team API request to:', url);
    console.log('🌐 Base URL:', this.baseURL);
    console.log('🌐 Full URL:', `${this.baseURL}${url}`);
    
    try {
      const response = await this.authenticatedRequest<{ success: boolean; message: string; data: TeamResponse }>(url, {
        method: 'GET',
      }, token);
      
      console.log('📦 Raw API response:', response);
      
      // Validate response structure
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response: response is not an object');
      }
      
      // Extract data from the nested response structure
      if (response.success === true && response.data && typeof response.data === 'object') {
        return response.data;
      } else {
        const errorMessage = response?.message || 'Invalid response structure';
        console.error('❌ Invalid response structure:', { response, success: response?.success, hasData: !!response?.data });
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('❌ Team API error:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const teamApi = new TeamApiService();
