/**
 * Recognition Analytics Page
 * Company-wide analytics comparing P2P recognition and Awards
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { AnalyticsLayout } from '@/components/features/analytics/AnalyticsLayout';
import { P2PVsAwardsMetricsCards } from '@/components/features/analytics/recognition/P2PVsAwardsMetrics';
import { StackedAreaChart } from '@/components/features/analytics/recognition/StackedAreaChart';
import { NumberOfUsersChart } from '@/components/features/analytics/recognition/NumberOfUsersChart';
import { mockAnalyticsApi } from '@/services/api/analytics/mockAnalyticsData';
import { sessionUtils } from '@/utils/api/session';
import { navigationManager } from '@/utils/navigation';

type TabType = 'overview' | 'compare-rates';
type CategoryType = 'recognition-received' | 'recognition-rates' | 'hashtags' | 'add-ons';

export default function RecognitionPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [activeCategory, setActiveCategory] = useState<CategoryType>('recognition-received');
  const [timeRange, setTimeRange] = useState('12m');
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!sessionUtils.isAuthenticated()) {
      router.push('/login?redirect=/analytics/recognition');
      return;
    }
    navigationManager.setCurrentPage('analytics');
  }, [router]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const result = await mockAnalyticsApi.getP2PVsAwardsAnalytics();
      setData(result);
      setIsLoading(false);
    };
    loadData();
  }, [timeRange]);

  if (!sessionUtils.isAuthenticated()) {
    return null;
  }

  if (isLoading || !data) {
    return (
      <AnalyticsLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Loading recognition analytics...</p>
          </div>
        </div>
      </AnalyticsLayout>
    );
  }

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview' },
    { id: 'compare-rates' as TabType, label: 'Compare Rates' },
  ];

  const categories = [
    { id: 'recognition-received' as CategoryType, label: 'Recognition Received' },
    { id: 'recognition-rates' as CategoryType, label: 'Recognition Rates' },
    { id: 'hashtags' as CategoryType, label: 'Hashtags' },
    { id: 'add-ons' as CategoryType, label: 'Add-ons' },
  ];

  const timeRangeOptions = [
    { value: '3m', label: '3 Months' },
    { value: '6m', label: '6 Months' },
    { value: '12m', label: '12 Months' },
    { value: '24m', label: '24 Months' },
  ];

  return (
    <AnalyticsLayout>
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Recognition Analytics</h1>
        <p className="text-gray-600 mb-6">
          Analyze and track recognition patterns, engagement metrics, and performance insights across your organization.
        </p>

        {/* Main Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Tabs and Time Range */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeCategory === category.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Time Range</span>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {timeRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex items-start gap-3">
        <InformationCircleIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-900">
          <span className="font-semibold">Tip:</span> Sustained recognition growth is excellent to observe. To maintain momentum and avoid stagnation, consider implementing{' '}
          <a href="#" className="text-blue-600 underline hover:text-blue-700">
            distinctive organizational awards
          </a>.
        </div>
      </div>

      {/* Metrics Cards */}
      <P2PVsAwardsMetricsCards metrics={data.metrics} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <StackedAreaChart
          data={data.recognitionReceivedChart}
          title="Recognition Received"
        />
        <StackedAreaChart
          data={data.pointReceivedChart}
          title="Point Received"
        />
      </div>

      {/* Number of Users Chart */}
      <NumberOfUsersChart data={data.numberOfUsersChart} />
    </AnalyticsLayout>
  );
}

