/**
 * Recognition Metrics Cards Component
 * Displays key recognition metrics in card format
 */

'use client';

import React from 'react';
import {
  ChartBarIcon,
  TrophyIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { RecognitionMetrics } from '@/types/api/analytics';

interface RecognitionMetricsCardsProps {
  metrics: RecognitionMetrics;
}

export const RecognitionMetricsCards: React.FC<RecognitionMetricsCardsProps> = ({
  metrics,
}) => {
  const cards = [
    {
      title: 'Total Recognitions',
      value: metrics.totalRecognitions.toLocaleString(),
      icon: ChartBarIcon,
      color: 'bg-blue-500',
      trend: metrics.growthRate >= 0 ? `+${metrics.growthRate.toFixed(1)}%` : `${metrics.growthRate.toFixed(1)}%`,
      trendColor: metrics.growthRate >= 0 ? 'text-green-600' : 'text-red-600',
    },
    {
      title: 'Total Points',
      value: metrics.totalPoints.toLocaleString(),
      icon: TrophyIcon,
      color: 'bg-purple-500',
      subtitle: `Avg ${metrics.averagePointsPerRecognition.toFixed(1)} per recognition`,
    },
    {
      title: 'Most Used Hashtag',
      value: `#${metrics.mostUsedHashtags[0] || 'N/A'}`,
      icon: ArrowTrendingUpIcon,
      color: 'bg-green-500',
      subtitle: `Top ${metrics.mostUsedHashtags.length} tracked`,
    },
    {
      title: 'Peak Time',
      value: metrics.peakRecognitionTime,
      icon: ClockIcon,
      color: 'bg-orange-500',
      subtitle: 'Most active period',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
              <div className={`p-3 ${card.color} rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {card.value}
            </div>
            {card.trend && (
              <div className={`text-sm font-medium ${card.trendColor}`}>
                {card.trend} vs last period
              </div>
            )}
            {card.subtitle && (
              <div className="text-sm text-gray-500 mt-1">{card.subtitle}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

