/**
 * Participation Metrics Cards Component
 * Displays key participation metrics
 */

import React from 'react';
import { 
  UsersIcon, 
  UserGroupIcon, 
  ChartBarIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import { ParticipationMetrics } from '@/types/api/analytics';

interface ParticipationMetricsCardsProps {
  metrics: ParticipationMetrics;
}

export const ParticipationMetricsCards: React.FC<ParticipationMetricsCardsProps> = ({ metrics }) => {
  const formatNumber = (num: number) => (num || 0).toLocaleString();
  const formatPercentage = (num: number) => `${(num || 0).toFixed(1)}%`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {/* Total Users */}
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="p-3 bg-blue-100 rounded-lg">
            <UsersIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{formatNumber(metrics.totalUsers)}</div>
            <div className="text-sm text-gray-500">Total Users</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-green-600 font-medium">+{metrics.newUsersThisMonth} new</span>
          <span className="text-gray-500">this month</span>
        </div>
      </div>

      {/* Participation Rate */}
      <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="p-3 bg-green-100 rounded-lg">
            <ChartBarIcon className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{formatPercentage(metrics.participationRate)}</div>
            <div className="text-sm text-gray-500">Participation Rate</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-green-600 font-medium">{formatNumber(metrics.activeUsers)} active</span>
          <span className="text-gray-500">users</span>
        </div>
      </div>

      {/* Average Recognitions */}
      <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="p-3 bg-purple-100 rounded-lg">
            <UserGroupIcon className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{metrics.averageRecognitionsPerUser}</div>
            <div className="text-sm text-gray-500">Avg per User</div>
          </div>
        </div>
        <div className="text-sm text-gray-500">recognitions/month</div>
      </div>

      {/* Growth Rate */}
      <div className="bg-gradient-to-br from-cyan-50 to-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="p-3 bg-cyan-100 rounded-lg">
            <ArrowTrendingUpIcon className="w-6 h-6 text-cyan-600" />
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">+{formatPercentage(metrics.growthRate)}</div>
            <div className="text-sm text-gray-500">Growth Rate</div>
          </div>
        </div>
        <div className="text-sm text-gray-500">month over month</div>
      </div>
    </div>
  );
};

