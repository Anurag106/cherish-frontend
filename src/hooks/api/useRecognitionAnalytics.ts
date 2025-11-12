/**
 * Recognition Analytics Hook
 * Custom hook for fetching recognition analytics data
 */

'use client';

import { useState, useEffect } from 'react';
import { analyticsApi } from '@/services/api/analytics/analyticsApi';
import { mockAnalyticsApi } from '@/services/api/analytics/mockAnalyticsData';
import { 
  RecognitionAnalyticsRequest,
  RecognitionAnalyticsResponse,
} from '@/types/api/analytics';
import { sessionUtils } from '@/utils/api/session';
import { USE_MOCK_ANALYTICS_DATA } from '@/config/analytics';

export const useRecognitionAnalytics = (request: RecognitionAnalyticsRequest = {}) => {
  const [data, setData] = useState<RecognitionAnalyticsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      let result: RecognitionAnalyticsResponse;

      if (USE_MOCK_ANALYTICS_DATA) {
        // Use mock data for development/demo
        result = await mockAnalyticsApi.getRecognitionAnalytics();
      } else {
        // Use real API
        const token = sessionUtils.getToken();
        if (!token) {
          throw new Error('Authentication required');
        }
        result = await analyticsApi.getRecognitionAnalytics(request, token);
      }

      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch recognition analytics';
      setError(errorMessage);
      console.error('Error fetching recognition analytics:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [request.dateRange, request.startDate, request.endDate, request.department, request.hashtag]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
};

