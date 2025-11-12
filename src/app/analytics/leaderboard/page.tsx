/**
 * Leaderboard Page
 * Displays top performers and rankings with hashtag breakdown
 */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { AnalyticsLayout } from '@/components/features/analytics/AnalyticsLayout';
import { AnalyticsPageHeader } from '@/components/features/analytics/AnalyticsPageHeader';
import { LeaderboardFilters } from '@/components/features/analytics/leaderboard/LeaderboardFilters';
import { RecognitionStackedChart } from '@/components/features/analytics/leaderboard/RecognitionStackedChart';
import { useLeaderboard } from '@/hooks/api/useLeaderboard';
import { sessionUtils } from '@/utils/api/session';
import { navigationManager } from '@/utils/navigation';
import {
  availableHashtags,
  availableDepartments,
} from '@/services/api/analytics/mockAnalyticsData';

export default function LeaderboardPage() {
  const router = useRouter();
  const { data, isLoading, error, refetch } = useLeaderboard();

  // Filter states
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedHashtag, setSelectedHashtag] = useState('all');
  const [recognitionType, setRecognitionType] = useState<'received' | 'given'>('received');
  const [dateRange, setDateRange] = useState('30d');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!sessionUtils.isAuthenticated()) {
      router.push('/login?redirect=/analytics/leaderboard');
      return;
    }
    navigationManager.setCurrentPage('analytics');
  }, [router]);

  // Filter data based on selections
  const filteredData = useMemo(() => {
    if (!data) return [];

    let filtered = [...data];

    // Filter by department
    if (selectedDepartment !== 'all') {
      filtered = filtered.filter((entry) => entry.department === selectedDepartment);
    }

    // Filter by hashtag
    if (selectedHashtag !== 'all') {
      filtered = filtered.filter((entry) =>
        entry.values.some((val: any) => val.hashtag === selectedHashtag)
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((entry) =>
        entry.name.toLowerCase().includes(query)
      );
    }

    // Sort by total recognitions (descending)
    filtered.sort((a, b) => b.total - a.total);

    return filtered;
  }, [data, selectedDepartment, selectedHashtag, searchQuery]);

  if (!sessionUtils.isAuthenticated()) {
    return null;
  }

  // Loading state
  if (isLoading) {
    return (
      <AnalyticsLayout>
        <AnalyticsPageHeader
          title="Leaderboard"
          description="Top performers and recognition rankings"
        />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <ArrowPathIcon className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Loading leaderboard...</p>
          </div>
        </div>
      </AnalyticsLayout>
    );
  }

  // Error state
  if (error || !data) {
    return (
      <AnalyticsLayout>
        <AnalyticsPageHeader
          title="Leaderboard"
          description="Top performers and recognition rankings"
        />
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <p className="text-red-600 font-medium text-lg">
            {error || 'Failed to load leaderboard data'}
          </p>
          <button
            onClick={refetch}
            className="mt-4 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </AnalyticsLayout>
    );
  }

  const chartTitle = `Most Recognition ${
    recognitionType === 'received' ? 'Received' : 'Given'
  } For ${selectedDepartment === 'all' ? 'Entire Company' : selectedDepartment}`;

  return (
    <AnalyticsLayout>
      <AnalyticsPageHeader
        title="Leaderboard"
        description="Top performers and recognition rankings across the organization"
        actionButtons={
          <button
            onClick={refetch}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-sm font-medium text-sm"
          >
            <ArrowPathIcon className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        }
      />

      {/* Filters */}
      <LeaderboardFilters
        selectedDepartment={selectedDepartment}
        selectedHashtag={selectedHashtag}
        recognitionType={recognitionType}
        dateRange={dateRange}
        searchQuery={searchQuery}
        onDepartmentChange={setSelectedDepartment}
        onHashtagChange={setSelectedHashtag}
        onRecognitionTypeChange={setRecognitionType}
        onDateRangeChange={setDateRange}
        onSearchChange={setSearchQuery}
        departments={availableDepartments}
        hashtags={availableHashtags}
      />

      {/* Chart */}
      {filteredData.length > 0 ? (
        <RecognitionStackedChart
          data={filteredData}
          title={chartTitle}
        />
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-500 text-lg">
            No data found matching your filters. Try adjusting your search criteria.
          </p>
        </div>
      )}
    </AnalyticsLayout>
  );
}

