/**
 * Trending API service
 */

import { BaseApiService } from '../base';
import { apiEndpoints } from '@/config/env';

export interface TrendingItem {
  id: string;
  name: string;
  count: number;
  color: string;
}

export interface TrendingData {
  companyValues: TrendingItem[];
  customTags: TrendingItem[];
  totalCompanyValues: number;
  totalCustomTags: number;
}

export interface TrendingResponse {
  success: boolean;
  message: string;
  data: TrendingData;
}

export class TrendingApiService extends BaseApiService {
  /**
   * Get trending data with demo data
   */
  async getTrending(token: string): Promise<TrendingData> {
    const url = `${apiEndpoints.TRENDING}`;
    console.log('📈 Making trending API request to:', url);
    console.log('📈 Base URL:', this.baseURL);
    console.log('📈 Full URL:', `${this.baseURL}${url}`);
    
    try {
      // For now, return demo data
      // In production, this would make an actual API call:
      // const response = await this.authenticatedRequest<TrendingResponse>(url, {
      //   method: 'GET',
      // }, token);
      // return response.data;

      console.log('📦 Returning demo trending data');
      
      // Demo data matching the UI design
      const demoData: TrendingData = {
        companyValues: [
          {
            id: '1',
            name: '#be-so-good-they-can-not-ignore-you',
            count: 593,
            color: 'text-blue-600'
          },
          {
            id: '2',
            name: '#its-us-vs-the-problem',
            count: 415,
            color: 'text-purple-600'
          },
          {
            id: '3',
            name: '#work-hard-live-well',
            count: 412,
            color: 'text-green-600'
          }
        ],
        customTags: [
          {
            id: '4',
            name: '#teamwork',
            count: 14,
            color: 'text-purple-600'
          },
          {
            id: '5',
            name: '#better-together',
            count: 10,
            color: 'text-green-600'
          },
          {
            id: '6',
            name: '#volunteer-day',
            count: 8,
            color: 'text-orange-600'
          }
        ],
        totalCompanyValues: 12,
        totalCustomTags: 8
      };

      return demoData;
    } catch (error) {
      console.error('❌ Trending API error:', error);
      throw error;
    }
  }

  /**
   * Get all company values
   */
  async getAllCompanyValues(token: string): Promise<TrendingItem[]> {
    // Demo data for all company values
    const allCompanyValues: TrendingItem[] = [
      {
        id: '1',
        name: '#be-so-good-they-can-not-ignore-you',
        count: 593,
        color: 'text-blue-600'
      },
      {
        id: '2',
        name: '#its-us-vs-the-problem',
        count: 415,
        color: 'text-purple-600'
      },
      {
        id: '3',
        name: '#work-hard-live-well',
        count: 412,
        color: 'text-green-600'
      },
      {
        id: '7',
        name: '#customer-first',
        count: 298,
        color: 'text-indigo-600'
      },
      {
        id: '8',
        name: '#innovate-everyday',
        count: 267,
        color: 'text-cyan-600'
      }
    ];

    return allCompanyValues;
  }

  /**
   * Get all custom tags
   */
  async getAllCustomTags(token: string): Promise<TrendingItem[]> {
    // Demo data for all custom tags
    const allCustomTags: TrendingItem[] = [
      {
        id: '4',
        name: '#teamwork',
        count: 14,
        color: 'text-purple-600'
      },
      {
        id: '5',
        name: '#better-together',
        count: 10,
        color: 'text-green-600'
      },
      {
        id: '6',
        name: '#volunteer-day',
        count: 8,
        color: 'text-orange-600'
      },
      {
        id: '9',
        name: '#innovation',
        count: 6,
        color: 'text-blue-600'
      },
      {
        id: '10',
        name: '#leadership',
        count: 5,
        color: 'text-red-600'
      }
    ];

    return allCustomTags;
  }
}

// Export singleton instance
export const trendingApi = new TrendingApiService();
