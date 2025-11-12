/**
 * Organization Graph Page
 * Displays recognition network and team connections
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeftIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { AnalyticsLayout } from '@/components/features/analytics/AnalyticsLayout';
import { NetworkGraph } from '@/components/features/analytics/organization-graph/NetworkGraph';
import { RecognitionTable } from '@/components/features/analytics/organization-graph/RecognitionTable';
import { mockAnalyticsApi } from '@/services/api/analytics/mockAnalyticsData';
import { sessionUtils } from '@/utils/api/session';
import { navigationManager } from '@/utils/navigation';
import { OrganizationGraphData } from '@/types/api/analytics';

export default function OrganizationGraphPage() {
  const router = useRouter();
  const [data, setData] = useState<OrganizationGraphData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!sessionUtils.isAuthenticated()) {
      router.push('/login?redirect=/analytics/organization-graph');
      return;
    }
    navigationManager.setCurrentPage('analytics');
  }, [router]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const result = await mockAnalyticsApi.getOrganizationGraph();
      setData(result);
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
            <p className="text-gray-600 text-lg">Loading organization graph...</p>
          </div>
        </div>
      </AnalyticsLayout>
    );
  }

  return (
    <AnalyticsLayout>
      {/* Header with Breadcrumb */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => router.back()}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
          </button>
          <InformationCircleIcon className="w-5 h-5 text-gray-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Organization Graph</h1>
        <p className="text-gray-600 mb-4">
          Visualize recognition networks and team interaction patterns within your organization.
        </p>

        {/* Breadcrumb */}
        {data.breadcrumb && data.breadcrumb.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            {data.breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span>›</span>}
                <span className={index === data.breadcrumb.length - 1 ? 'font-medium text-gray-900' : ''}>
                  {item}
                </span>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Network Visualization */}
      <NetworkGraph nodes={data.nodes} />

      {/* Recognition Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecognitionTable
          title="Recognition Within Alex's Team"
          data={data.withinTeam}
        />
        <RecognitionTable
          title="Recognition Outside of Alex's Team"
          data={data.outsideTeam}
        />
      </div>
    </AnalyticsLayout>
  );
}
