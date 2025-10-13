/**
 * Celebrations API service
 */

import { BaseApiService } from '../base';
import { apiEndpoints } from '@/config/env';

export interface Celebration {
  id: string;
  userFullName: string;
  context: string;
  date: string;
  type: 'birthday' | 'anniversary' | 'achievement' | 'milestone';
  avatarColor: string;
}

export interface CelebrationsData {
  celebrations: Celebration[];
  totalCount: number;
  currentMonth: string;
}

export interface CelebrationsResponse {
  success: boolean;
  message: string;
  data: CelebrationsData;
}

export class CelebrationsApiService extends BaseApiService {
  /**
   * Get celebrations data with demo data
   */
  async getCelebrations(token: string): Promise<CelebrationsData> {
    const url = `${apiEndpoints.CELEBRATIONS}`;
    console.log('🎉 Making celebrations API request to:', url);
    console.log('🎉 Base URL:', this.baseURL);
    console.log('🎉 Full URL:', `${this.baseURL}${url}`);
    
    try {
      // For now, return demo data
      // In production, this would make an actual API call:
      // const response = await this.authenticatedRequest<CelebrationsResponse>(url, {
      //   method: 'GET',
      // }, token);
      // return response.data;

      console.log('📦 Returning demo celebrations data');
      
      // Demo data matching the UI design
      const demoData: CelebrationsData = {
        celebrations: [
          {
            id: '1',
            userFullName: 'Alex Thompson',
            context: '4 year anniversary on Aug 16',
            date: '2024-08-16',
            type: 'anniversary',
            avatarColor: 'bg-purple-500'
          },
          {
            id: '2',
            userFullName: 'Jessica Martinez',
            context: 'Birthday on Aug 17',
            date: '2024-08-17',
            type: 'birthday',
            avatarColor: 'bg-blue-500'
          },
          {
            id: '3',
            userFullName: 'Ryan O\'Connor',
            context: 'Birthday on Aug 27',
            date: '2024-08-27',
            type: 'birthday',
            avatarColor: 'bg-blue-500'
          }
        ],
        totalCount: 12,
        currentMonth: 'August 2024'
      };

      return demoData;
    } catch (error) {
      console.error('❌ Celebrations API error:', error);
      throw error;
    }
  }

  /**
   * Get all celebrations for the current month
   */
  async getAllCelebrations(token: string): Promise<Celebration[]> {
    // Demo data for all celebrations in the month
    const allCelebrations: Celebration[] = [
      {
        id: '1',
        userFullName: 'Alex Thompson',
        context: '4 year anniversary on Aug 16',
        date: '2024-08-16',
        type: 'anniversary',
        avatarColor: 'bg-purple-500'
      },
      {
        id: '2',
        userFullName: 'Jessica Martinez',
        context: 'Birthday on Aug 17',
        date: '2024-08-17',
        type: 'birthday',
        avatarColor: 'bg-blue-500'
      },
      {
        id: '3',
        userFullName: 'Ryan O\'Connor',
        context: 'Birthday on Aug 27',
        date: '2024-08-27',
        type: 'birthday',
        avatarColor: 'bg-blue-500'
      },
      {
        id: '4',
        userFullName: 'Sarah Johnson',
        context: '2 year anniversary on Aug 5',
        date: '2024-08-05',
        type: 'anniversary',
        avatarColor: 'bg-green-500'
      },
      {
        id: '5',
        userFullName: 'Michael Chen',
        context: 'Birthday on Aug 12',
        date: '2024-08-12',
        type: 'birthday',
        avatarColor: 'bg-orange-500'
      }
    ];

    return allCelebrations;
  }
}

// Export singleton instance
export const celebrationsApi = new CelebrationsApiService();
