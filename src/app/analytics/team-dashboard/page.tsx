/**
 * Team Dashboard Page
 * Main analytics page showing team performance metrics with funky UI
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { AnalyticsLayout } from '@/components/features/analytics/AnalyticsLayout';
import { AnalyticsPageHeader } from '@/components/features/analytics/AnalyticsPageHeader';
import { ParticipationCard } from '@/components/features/analytics/team-dashboard/ParticipationCard';
import { OrganizationGraphCard } from '@/components/features/analytics/team-dashboard/OrganizationGraphCard';
import { LeaderboardCard } from '@/components/features/analytics/team-dashboard/LeaderboardCard';
import { RecognitionStatsCard } from '@/components/features/analytics/team-dashboard/RecognitionStatsCard';
import { TopWordsCard } from '@/components/features/analytics/team-dashboard/TopWordsCard';
import { useTeamDashboard } from '@/hooks/api/useTeamDashboard';
import { sessionUtils } from '@/utils/api/session';
import { navigationManager } from '@/utils/navigation';
import { DATE_RANGE_OPTIONS, DateRangeValue } from '@/constants/analytics';

export default function TeamDashboardPage() {
  const router = useRouter();
  const [dateRange, setDateRange] = useState<DateRangeValue>('30d');
  const { data, isLoading, error, refetch } = useTeamDashboard({ dateRange });

  useEffect(() => {
    // Check authentication
    if (!sessionUtils.isAuthenticated()) {
      router.push('/login?redirect=/analytics/team-dashboard');
      return;
    }

    // Set current page in navigation state
    navigationManager.setCurrentPage('analytics');
  }, [router]);

  // Show nothing while checking auth
  if (!sessionUtils.isAuthenticated()) {
    return null;
  }

  // Loading state
  if (isLoading) {
    return (
      <AnalyticsLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <ArrowPathIcon className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Loading analytics...</p>
          </div>
        </div>
      </AnalyticsLayout>
    );
  }

  // Error state
  if (error || !data) {
    return (
      <AnalyticsLayout>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <p className="text-red-600 font-medium text-lg">
            {error || 'Failed to load dashboard data'}
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

  // Prepare data for components
  const participationData = data.recognitionTrends.map((trend) => ({
    date: trend.date,
    value: Math.floor((trend.count / data.metrics.totalRecognitions) * 100),
  }));

  const leaderboardEntries = data.topPerformers.slice(0, 5).map((performer, index) => ({
    userId: performer.userId,
    username: performer.username,
    fullName: performer.fullName,
    score: performer.recognitionsReceived,
    maxScore: data.topPerformers[0].recognitionsReceived,
    color: [
      '#10b981', // green
      '#ec4899', // pink
      '#8b5cf6', // purple
      '#3b82f6', // blue
      '#06b6d4', // cyan
    ][index % 5],
    initials: performer.fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase(),
  }));

  const hashtagData = [
    { name: '#consciously-evolve', value: 25, color: '#06b6d4' },
    { name: '#ownership', value: 22, color: '#3b82f6' },
    { name: '#its-us-vs-the-problem', value: 18, color: '#8b5cf6' },
    { name: '#bias-for-action', value: 20, color: '#ec4899' },
    { name: 'other', value: 15, color: '#10b981' },
  ];

  const topWords = [
    { text: 'churn', size: 24, color: '#6366f1' },
    { text: 'monitor', size: 20, color: '#14b8a6' },
    { text: 'test', size: 18, color: '#10b981' },
    { text: 'congrats', size: 32, color: '#10b981' },
    { text: 'e2e', size: 22, color: '#374151' },
    { text: 'moving', size: 20, color: '#374151' },
    { text: 'cx', size: 18, color: '#374151' },
    { text: 'keeping', size: 24, color: '#ef4444' },
    { text: 'dashboard', size: 28, color: '#dc2626' },
    { text: 'attentive', size: 24, color: '#6366f1' },
    { text: 'future', size: 22, color: '#ec4899' },
    { text: 'quick', size: 18, color: '#fbbf24' },
    { text: 'mb', size: 16, color: '#374151' },
    { text: 'launch', size: 26, color: '#a855f7' },
    { text: 'super', size: 20, color: '#6366f1' },
    { text: 'cases', size: 18, color: '#f97316' },
    { text: 'analytics', size: 30, color: '#f97316' },
    { text: 'data', size: 24, color: '#f97316' },
    { text: 'update', size: 22, color: '#f97316' },
  ];

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
        onClick={refetch}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-sm font-medium text-sm"
      >
        <ArrowPathIcon className="w-4 h-4" />
        <span>Refresh</span>
      </button>
    </>
  );

  return (
    <AnalyticsLayout>
      {/* Page Header */}
      <AnalyticsPageHeader
        title="Team Analytics Dashboard"
        description="Comprehensive insights and performance metrics across recognition activities."
        actionButtons={actionButtons}
      />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Participation Card */}
        <ParticipationCard
          percentage={Math.round(data.metrics.participationRate)}
          data={participationData}
          subtitle="have received recognition"
        />

        {/* Organization Graph */}
        <OrganizationGraphCard />

        {/* Leaderboard */}
        <LeaderboardCard
          entries={leaderboardEntries}
          subtitle="Recognition received in the last 30 days"
        />

        {/* Recognition Stats with Hashtags */}
        <RecognitionStatsCard
          given={36}
          received={38}
          points={735}
          hashtagData={hashtagData}
          totalHashtags={10}
        />
      </div>

      {/* Top Words - Full Width */}
      <div className="mt-6">
        <TopWordsCard words={topWords} />
      </div>
    </AnalyticsLayout>
  );
}

