/**
 * Rewards API service
 */

import { BaseApiService } from '../base';
import { apiEndpoints } from '@/config/env';

export interface RewardPoints {
  total: number;
  recentGain: number;
  lastUpdated: string;
}

export interface RewardBadge {
  id: string;
  type: 'bonus' | 'achievement' | 'special';
  value: string;
  icon: string;
  color: string;
}

export interface RewardsData {
  points: RewardPoints;
  badges: RewardBadge[];
  hasSpecialRewards: boolean;
}

export interface RewardsResponse {
  success: boolean;
  message: string;
  data: RewardsData;
}

export class RewardsApiService extends BaseApiService {
  /**
   * Get user rewards data (for future use when rewards API is available)
   */
  async getRewards(token: string): Promise<RewardsData> {
    const url = `${apiEndpoints.REWARDS}`;
    console.log('🏆 Making rewards API request to:', url);
    console.log('🏆 Base URL:', this.baseURL);
    console.log('🏆 Full URL:', `${this.baseURL}${url}`);
    
    try {
      // This will be used when the rewards API is available
      const response = await this.authenticatedRequest<RewardsResponse>(url, {
        method: 'GET',
      }, token);
      
      console.log('📦 Rewards API response:', response);
      
      if (response.success && response.data) {
        return response.data;
      } else {
        throw new Error(response.message || 'Invalid rewards response structure');
      }
    } catch (error) {
      console.error('❌ Rewards API error:', error);
      throw error;
    }
  }

  /**
   * Get available rewards for shopping
   */
  async getAvailableRewards(token: string): Promise<unknown[]> {
    // Demo data for available rewards
    return [
      {
        id: '1',
        name: 'Coffee Gift Card',
        points: 500,
        image: '/images/coffee-gift-card.jpg',
        category: 'Food & Beverage'
      },
      {
        id: '2',
        name: 'Amazon Gift Card',
        points: 1000,
        image: '/images/amazon-gift-card.jpg',
        category: 'Shopping'
      },
      {
        id: '3',
        name: 'Extra Day Off',
        points: 2000,
        image: '/images/day-off.jpg',
        category: 'Time Off'
      }
    ];
  }
}

// Export singleton instance
export const rewardsApi = new RewardsApiService();
