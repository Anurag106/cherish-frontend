/**
 * Custom hook for fetching participation analytics data
 */

import { useState, useEffect } from 'react';
import { analyticsApi } from '@/services/api/analytics/analyticsApi';
import { mockAnalyticsApi } from '@/services/api/analytics/mockAnalyticsData';
import { sessionUtils } from '@/utils/api/session';
import { USE_MOCK_ANALYTICS_DATA } from '@/config/analytics';
import { BaseAnalyticsRequest } from '@/types/api/analytics';

export const useParticipation = (filters: BaseAnalyticsRequest = {}) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      let result;

      if (USE_MOCK_ANALYTICS_DATA) {
        // Use mock data for development/demo
        result = await mockAnalyticsApi.getParticipation();
      } else {
        // Use real API
        const token = sessionUtils.getToken();
        if (!token) {
          throw new Error('Authentication required');
        }
        result = await analyticsApi.getParticipation(filters, token);
      }

      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch participation data');
      console.error('Error fetching participation:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters.dateRange, filters.startDate, filters.endDate]);

  const refetch = () => {
    fetchData();
  };

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

