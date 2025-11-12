/**
 * Hashtag Trends Card Component
 * Shows trending hashtags with usage statistics
 */

'use client';

import React from 'react';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, MinusIcon } from '@heroicons/react/24/solid';
import { HashtagUsageData } from '@/types/api/analytics';

interface HashtagTrendsCardProps {
  data: HashtagUsageData[];
}

export const HashtagTrendsCard: React.FC<HashtagTrendsCardProps> = ({ data }) => {
  const getTrendIcon = (direction: 'up' | 'down' | 'stable') => {
    switch (direction) {
      case 'up':
        return <ArrowTrendingUpIcon className="w-4 h-4 text-green-600" />;
      case 'down':
        return <ArrowTrendingDownIcon className="w-4 h-4 text-red-600" />;
      case 'stable':
        return <MinusIcon className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTrendColor = (direction: 'up' | 'down' | 'stable') => {
    switch (direction) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      case 'stable':
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Trending Hashtags
      </h3>
      <div className="space-y-4">
        {data.map((hashtag, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-semibold text-sm">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900">
                    #{hashtag.hashtag}
                  </span>
                  {getTrendIcon(hashtag.trendDirection)}
                </div>
                <div className="text-sm text-gray-500">
                  {hashtag.count} recognitions · {hashtag.totalPoints.toLocaleString()} points
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-sm font-semibold ${getTrendColor(hashtag.trendDirection)}`}>
                {hashtag.percentageChange > 0 ? '+' : ''}
                {hashtag.percentageChange.toFixed(1)}%
              </div>
              <div className="text-xs text-gray-500 mt-1">vs last period</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

