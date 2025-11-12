/**
 * Participation Analytics Page
 * Displays user participation and engagement analytics
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { AnalyticsLayout } from '@/components/features/analytics/AnalyticsLayout';
import { AnalyticsPageHeader } from '@/components/features/analytics/AnalyticsPageHeader';
import { ParticipationMetricsCards } from '@/components/features/analytics/participation/ParticipationMetricsCards';
import { ActivityTrendsChart } from '@/components/features/analytics/participation/ActivityTrendsChart';
import { DepartmentParticipationTable } from '@/components/features/analytics/participation/DepartmentParticipationTable';
import { EngagementLevelsChart } from '@/components/features/analytics/participation/EngagementLevelsChart';
import { UserSegmentsCard } from '@/components/features/analytics/participation/UserSegmentsCard';
import { mockAnalyticsApi } from '@/services/api/analytics/mockAnalyticsData';
import { sessionUtils } from '@/utils/api/session';
import { navigationManager } from '@/utils/navigation';
import { DATE_RANGE_OPTIONS, DateRangeValue } from '@/constants/analytics';

export default function ParticipationPage() {
  const router = useRouter();
  const [dateRange, setDateRange] = useState<DateRangeValue>('30d');
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!sessionUtils.isAuthenticated()) {
      router.push('/login?redirect=/analytics/participation');
      return;
    }
    navigationManager.setCurrentPage('analytics');
  }, [router]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const result = await mockAnalyticsApi.getParticipation();
      setData(result);
      setIsLoading(false);
    };
    loadData();
  }, [dateRange]);

  if (!sessionUtils.isAuthenticated()) {
    return null;
  }

  if (isLoading || !data) {
    return (
      <AnalyticsLayout>
        <AnalyticsPageHeader
          title="Participation Analytics"
          description="User engagement and activity patterns across your organization"
        />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <ArrowPathIcon className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Loading participation analytics...</p>
          </div>
        </div>
      </AnalyticsLayout>
    );
  }

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const actionButtons = (
    <>
      <select
        value={dateRange}
        onChange={(e) => setDateRange(e.target.value as DateRangeValue)}
        className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        {DATE_RANGE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button
        onClick={handleRefresh}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-sm font-medium text-sm"
      >
        <ArrowPathIcon className="w-4 h-4" />
        <span>Refresh</span>
      </button>
    </>
  );

  return (
    <AnalyticsLayout>
      <AnalyticsPageHeader
        title="Participation Analytics"
        description="Track user engagement, activity patterns, and participation rates across your organization"
        actionButtons={actionButtons}
      />

      {/* Metrics Cards */}
      <ParticipationMetricsCards metrics={data.metrics} />

      {/* Activity Trends Chart */}
      <ActivityTrendsChart data={data.activityTrends} />

      {/* Engagement Levels and User Segments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <EngagementLevelsChart data={data.engagementLevels} />
        <UserSegmentsCard segments={data.userSegments} />
      </div>

      {/* Department Participation Table */}
      <div className="mt-6">
        <DepartmentParticipationTable data={data.departmentParticipation} />
      </div>
    </AnalyticsLayout>
  );
}
