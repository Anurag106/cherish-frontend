/**
 * Top Words Analytics Page
 * Displays word cloud and analytics of frequently used words
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnalyticsLayout } from '@/components/features/analytics/AnalyticsLayout';
import { WordCloudVisualization } from '@/components/features/analytics/top-words/WordCloudVisualization';
import { TopWordsFilters } from '@/components/features/analytics/top-words/TopWordsFilters';
import { TopWordsMetrics } from '@/components/features/analytics/top-words/TopWordsMetrics';
import { TopWordsList } from '@/components/features/analytics/top-words/TopWordsList';
import { mockAnalyticsApi } from '@/services/api/analytics/mockAnalyticsData';
import { sessionUtils } from '@/utils/api/session';
import { navigationManager } from '@/utils/navigation';

export default function TopWordsPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);

  useEffect(() => {
    if (!sessionUtils.isAuthenticated()) {
      router.push('/login?redirect=/analytics/top-words');
      return;
    }
    navigationManager.setCurrentPage('analytics');
  }, [router]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const result = await mockAnalyticsApi.getTopWords();
      setData(result);
      // Don't pre-apply filters - start with empty array
      setAppliedFilters([]);
      setIsLoading(false);
    };
    loadData();
  }, []);

  if (!sessionUtils.isAuthenticated()) {
    return null;
  }

  if (isLoading || !data) {
    return (
      <AnalyticsLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Loading top words analytics...</p>
          </div>
        </div>
      </AnalyticsLayout>
    );
  }

  const handleRemoveFilter = (filter: string) => {
    setAppliedFilters(appliedFilters.filter((f) => f !== filter));
  };

  const handleAddFilter = (filterType: string, filterValue: string) => {
    if (!appliedFilters.includes(filterValue)) {
      setAppliedFilters([...appliedFilters, filterValue]);
    }
  };

  return (
    <AnalyticsLayout>
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Top Words Analytics</h1>
        <p className="text-gray-600">
          Discover the most frequently used words in recognition messages across your organization
        </p>
      </div>

      {/* Filters */}
      <TopWordsFilters 
        appliedFilters={appliedFilters}
        onRemoveFilter={handleRemoveFilter}
        onAddFilter={handleAddFilter}
      />

      {/* Word Cloud */}
      <WordCloudVisualization data={data.wordCloud} />

      {/* Metrics */}
      <div className="mt-6">
        <TopWordsMetrics
          mostUsedWord={data.metrics.mostUsedWord}
          totalUniqueWords={data.metrics.totalUniqueWords}
          averageWordsPerMessage={data.metrics.averageWordsPerMessage}
        />
      </div>

      {/* Top Words List */}
      <TopWordsList words={data.topWordsList} />
    </AnalyticsLayout>
  );
}
