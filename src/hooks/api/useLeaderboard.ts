/**
 * Leaderboard Hook
 * Custom hook for fetching leaderboard analytics data
 */

'use client';

import { useState, useEffect } from 'react';
import { analyticsApi } from '@/services/api/analytics/analyticsApi';
import { mockAnalyticsApi } from '@/services/api/analytics/mockAnalyticsData';
import { 
  LeaderboardWithHashtagsRequest,
  LeaderboardEntryWithHashtags,
} from '@/types/api/analytics';
import { sessionUtils } from '@/utils/api/session';
import { USE_MOCK_ANALYTICS_DATA } from '@/config/analytics';

export const useLeaderboard = (options: LeaderboardWithHashtagsRequest = {}) => {
  const [data, setData] = useState<LeaderboardEntryWithHashtags[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availableHashtags, setAvailableHashtags] = useState<string[]>([]);
  const [availableDepartments, setAvailableDepartments] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (USE_MOCK_ANALYTICS_DATA) {
        // Use mock data for development/demo
        const result = await mockAnalyticsApi.getLeaderboardWithHashtags();
        setData(result.leaderboard);
        setAvailableHashtags(result.availableHashtags);
        setAvailableDepartments(result.availableDepartments);
      } else {
        // Use real API
        const token = sessionUtils.getToken();
        if (!token) {
          throw new Error('Authentication required');
        }

        const result = await analyticsApi.getLeaderboardWithHashtags(options, token);
        setData(result.leaderboard);
        setAvailableHashtags(result.availableHashtags || []);
        setAvailableDepartments(result.availableDepartments || []);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch leaderboard data';
      setError(errorMessage);
      console.error('Error fetching leaderboard:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    options.dateRange,
    options.startDate,
    options.endDate,
    options.department,
    options.hashtag,
    options.recognitionType,
    options.searchQuery,
  ]);

  return {
    data,
    isLoading,
    error,
    availableHashtags,
    availableDepartments,
    refetch: fetchData,
  };
};
