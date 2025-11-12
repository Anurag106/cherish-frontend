/**
 * Custom hook for fetching organization graph data
 */

import { useState, useEffect } from 'react';
import { analyticsApi } from '@/services/api/analytics/analyticsApi';
import { mockAnalyticsApi } from '@/services/api/analytics/mockAnalyticsData';
import { sessionUtils } from '@/utils/api/session';
import { USE_MOCK_ANALYTICS_DATA } from '@/config/analytics';

interface OrganizationGraphFilters {
  teamId?: string;
  managerId?: string;
  dateRange?: string;
}

export const useOrganizationGraph = (filters: OrganizationGraphFilters = {}) => {
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
        result = await mockAnalyticsApi.getOrganizationGraph();
      } else {
        // Use real API
        const token = sessionUtils.getToken();
        if (!token) {
          throw new Error('Authentication required');
        }
        result = await analyticsApi.getOrganizationGraph(filters, token);
      }

      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch organization graph data');
      console.error('Error fetching organization graph:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters.teamId, filters.managerId, filters.dateRange]);

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

