/**
 * Custom hook for fetching top words analytics data
 */

import { useState, useEffect } from 'react';
import { analyticsApi } from '@/services/api/analytics/analyticsApi';
import { mockAnalyticsApi } from '@/services/api/analytics/mockAnalyticsData';
import { sessionUtils } from '@/utils/api/session';
import { USE_MOCK_ANALYTICS_DATA } from '@/config/analytics';

interface TopWordsFilters {
  dateRange?: string;
  startDate?: string;
  endDate?: string;
  overall?: string;
  location?: string;
  currencyCode?: string;
  group?: string;
  role?: string;
  managersTeam?: string;
  tier?: string;
  title?: string;
}

export const useTopWords = (filters: TopWordsFilters = {}) => {
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
        result = await mockAnalyticsApi.getTopWords();
      } else {
        // Use real API
        const token = sessionUtils.getToken();
        if (!token) {
          throw new Error('Authentication required');
        }
        result = await analyticsApi.getTopWords(filters, token);
      }

      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch top words data');
      console.error('Error fetching top words:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    filters.dateRange,
    filters.startDate,
    filters.endDate,
    filters.overall,
    filters.location,
    filters.currencyCode,
    filters.group,
    filters.role,
    filters.managersTeam,
    filters.tier,
    filters.title,
  ]);

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

