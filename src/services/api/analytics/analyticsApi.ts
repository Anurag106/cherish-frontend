/**
 * Analytics API Service
 * Handles all analytics-related API calls
 */

import { BaseApiService } from '../base';
import { apiEndpoints } from '@/config/env';
import {
  AnalyticsApiResponse,
  TeamDashboardData,
  LeaderboardData,
  LeaderboardWithHashtagsRequest,
  LeaderboardWithHashtagsResponse,
  ParticipationData,
  RecognitionAnalyticsRequest,
  RecognitionAnalyticsResponse,
  OrganizationGraphData,
  TopWordsData,
  BaseAnalyticsRequest,
} from '@/types/api/analytics';

class AnalyticsApiService extends BaseApiService {
  /**
   * Get team dashboard data
   */
  async getTeamDashboard(
    request: BaseAnalyticsRequest = {},
    token?: string
  ): Promise<TeamDashboardData> {
    const params = new URLSearchParams();
    
    if (request.dateRange) {
      params.append('dateRange', request.dateRange);
    }
    if (request.startDate) {
      params.append('startDate', request.startDate);
    }
    if (request.endDate) {
      params.append('endDate', request.endDate);
    }

    const queryString = params.toString();
    const url = `${apiEndpoints.ANALYTICS_TEAM_DASHBOARD}${queryString ? `?${queryString}` : ''}`;

    const response = await this.authenticatedRequest<AnalyticsApiResponse<TeamDashboardData>>(
      url,
      { method: 'GET' },
      token
    );

    return response.data;
  }

  /**
   * Get leaderboard data
   */
  async getLeaderboard(
    request: BaseAnalyticsRequest = {},
    token?: string
  ): Promise<LeaderboardData> {
    const params = new URLSearchParams();
    
    if (request.dateRange) {
      params.append('dateRange', request.dateRange);
    }
    if (request.startDate) {
      params.append('startDate', request.startDate);
    }
    if (request.endDate) {
      params.append('endDate', request.endDate);
    }

    const queryString = params.toString();
    const url = `${apiEndpoints.ANALYTICS_LEADERBOARD}${queryString ? `?${queryString}` : ''}`;

    const response = await this.authenticatedRequest<AnalyticsApiResponse<LeaderboardData>>(
      url,
      { method: 'GET' },
      token
    );

    return response.data;
  }

  /**
   * Get leaderboard with hashtag breakdown
   */
  async getLeaderboardWithHashtags(
    request: LeaderboardWithHashtagsRequest = {},
    token?: string
  ): Promise<LeaderboardWithHashtagsResponse> {
    const params = new URLSearchParams();
    
    // Date range parameters
    if (request.dateRange) {
      params.append('dateRange', request.dateRange);
    }
    if (request.startDate) {
      params.append('startDate', request.startDate);
    }
    if (request.endDate) {
      params.append('endDate', request.endDate);
    }

    // Filter parameters
    if (request.department && request.department !== 'all') {
      params.append('department', request.department);
    }
    if (request.hashtag && request.hashtag !== 'all') {
      params.append('hashtag', request.hashtag);
    }
    if (request.recognitionType) {
      params.append('recognitionType', request.recognitionType);
    }
    if (request.searchQuery) {
      params.append('searchQuery', request.searchQuery);
    }

    const queryString = params.toString();
    const url = `${apiEndpoints.ANALYTICS_LEADERBOARD_HASHTAGS}${queryString ? `?${queryString}` : ''}`;

    const response = await this.authenticatedRequest<AnalyticsApiResponse<LeaderboardWithHashtagsResponse>>(
      url,
      { method: 'GET' },
      token
    );

    return response.data;
  }

  /**
   * Get participation data
   */
  async getParticipation(
    request: BaseAnalyticsRequest = {},
    token?: string
  ): Promise<ParticipationData> {
    const params = new URLSearchParams();
    
    if (request.dateRange) {
      params.append('dateRange', request.dateRange);
    }
    if (request.startDate) {
      params.append('startDate', request.startDate);
    }
    if (request.endDate) {
      params.append('endDate', request.endDate);
    }

    const queryString = params.toString();
    const url = `${apiEndpoints.ANALYTICS_PARTICIPATION}${queryString ? `?${queryString}` : ''}`;

    const response = await this.authenticatedRequest<AnalyticsApiResponse<ParticipationData>>(
      url,
      { method: 'GET' },
      token
    );

    return response.data;
  }

  /**
   * Get recognition analytics data
   */
  async getRecognitionAnalytics(
    request: RecognitionAnalyticsRequest = {},
    token?: string
  ): Promise<RecognitionAnalyticsResponse> {
    const params = new URLSearchParams();
    
    // Date range parameters
    if (request.dateRange) {
      params.append('dateRange', request.dateRange);
    }
    if (request.startDate) {
      params.append('startDate', request.startDate);
    }
    if (request.endDate) {
      params.append('endDate', request.endDate);
    }

    // Filter parameters
    if (request.department && request.department !== 'all') {
      params.append('department', request.department);
    }
    if (request.hashtag && request.hashtag !== 'all') {
      params.append('hashtag', request.hashtag);
    }

    const queryString = params.toString();
    const url = `${apiEndpoints.ANALYTICS_RECOGNITION}${queryString ? `?${queryString}` : ''}`;

    const response = await this.authenticatedRequest<AnalyticsApiResponse<RecognitionAnalyticsResponse>>(
      url,
      { method: 'GET' },
      token
    );

    return response.data;
  }

  /**
   * Get organization graph data
   */
  async getOrganizationGraph(
    request: BaseAnalyticsRequest = {},
    token?: string
  ): Promise<OrganizationGraphData> {
    const params = new URLSearchParams();
    
    if (request.dateRange) {
      params.append('dateRange', request.dateRange);
    }
    if (request.startDate) {
      params.append('startDate', request.startDate);
    }
    if (request.endDate) {
      params.append('endDate', request.endDate);
    }

    const queryString = params.toString();
    const url = `${apiEndpoints.ANALYTICS_ORGANIZATION_GRAPH}${queryString ? `?${queryString}` : ''}`;

    const response = await this.authenticatedRequest<AnalyticsApiResponse<OrganizationGraphData>>(
      url,
      { method: 'GET' },
      token
    );

    return response.data;
  }

  /**
   * Get top words data
   */
  async getTopWords(
    request: BaseAnalyticsRequest = {},
    token?: string
  ): Promise<TopWordsData> {
    const params = new URLSearchParams();
    
    if (request.dateRange) {
      params.append('dateRange', request.dateRange);
    }
    if (request.startDate) {
      params.append('startDate', request.startDate);
    }
    if (request.endDate) {
      params.append('endDate', request.endDate);
    }

    const queryString = params.toString();
    const url = `${apiEndpoints.ANALYTICS_TOP_WORDS}${queryString ? `?${queryString}` : ''}`;

    const response = await this.authenticatedRequest<AnalyticsApiResponse<TopWordsData>>(
      url,
      { method: 'GET' },
      token
    );

    return response.data;
  }
}

export const analyticsApi = new AnalyticsApiService();

