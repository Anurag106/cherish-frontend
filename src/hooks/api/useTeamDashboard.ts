/**
 * Team Dashboard Hook
 * Custom hook for fetching team dashboard analytics data
 */

'use client';

import { useState, useEffect } from 'react';
import { analyticsApi } from '@/services/api/analytics/analyticsApi';
import { mockAnalyticsApi } from '@/services/api/analytics/mockAnalyticsData';
import { TeamDashboardData, BaseAnalyticsRequest } from '@/types/api/analytics';
import { sessionUtils } from '@/utils/api/session';
import { USE_MOCK_ANALYTICS_DATA } from '@/config/analytics';

export const useTeamDashboard = (request: BaseAnalyticsRequest = {}) => {
  const [data, setData] = useState<TeamDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      let result: TeamDashboardData;

      if (USE_MOCK_ANALYTICS_DATA) {
        // Use mock data for development/demo
        result = await mockAnalyticsApi.getTeamDashboard();
      } else {
        // Use real API
        const token = sessionUtils.getToken();
        if (!token) {
          throw new Error('Authentication required');
        }
        result = await analyticsApi.getTeamDashboard(request, token);
      }

      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch team dashboard data';
      setError(errorMessage);
      console.error('Error fetching team dashboard:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [request.dateRange, request.startDate, request.endDate]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
};

