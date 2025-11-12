/**
 * User Segments Card Component
 * Shows different user segment breakdowns
 */

import React from 'react';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, MinusIcon } from '@heroicons/react/24/outline';
import { UserSegment } from '@/types/api/analytics';

interface UserSegmentsCardProps {
  segments: UserSegment[];
}

export const UserSegmentsCard: React.FC<UserSegmentsCardProps> = ({ segments }) => {
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <ArrowTrendingUpIcon className="w-4 h-4 text-green-600" />;
      case 'down':
        return <ArrowTrendingDownIcon className="w-4 h-4 text-red-600" />;
      case 'stable':
        return <MinusIcon className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      case 'stable':
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">User Segments</h3>
        <p className="text-sm text-gray-500 mt-1">Breakdown of users by activity patterns</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {segments.map((segment) => (
          <div key={segment.segment} className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-4 border border-gray-100">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">{segment.segment}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold text-gray-900">{segment.userCount}</span>
                  <span className="text-sm text-gray-500">users</span>
                </div>
              </div>
              <div className={`flex items-center gap-1 ${getTrendColor(segment.trend)}`}>
                {getTrendIcon(segment.trend)}
                <span className="text-sm font-medium">
                  {segment.trend === 'up' ? '+' : segment.trend === 'down' ? '' : ''}
                  {Math.abs(segment.trendValue).toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all"
                style={{ width: `${segment.percentage}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-2">{segment.percentage.toFixed(1)}% of total users</div>
          </div>
        ))}
      </div>
    </div>
  );
};

