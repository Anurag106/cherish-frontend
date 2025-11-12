/**
 * Top Performers Card Component
 * Displays top performing team members
 */

'use client';

import React from 'react';
import { TrophyIcon } from '@heroicons/react/24/solid';
import { TopPerformer } from '@/types/api/analytics';
import { Avatar } from '@/components/ui/Avatar';

interface TopPerformersCardProps {
  data: TopPerformer[];
}

export const TopPerformersCard: React.FC<TopPerformersCardProps> = ({ data }) => {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'text-yellow-500 bg-yellow-50';
      case 2:
        return 'text-gray-400 bg-gray-50';
      case 3:
        return 'text-amber-600 bg-amber-50';
      default:
        return 'text-gray-300 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Top Performers</h3>
        <TrophyIcon className="w-6 h-6 text-yellow-500" />
      </div>
      <div className="space-y-3">
        {data.slice(0, 5).map((performer) => (
          <div
            key={performer.userId}
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {/* Rank Badge */}
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${getRankColor(
                performer.rank
              )}`}
            >
              {performer.rank}
            </div>

            {/* Avatar */}
            <Avatar
              initials={performer.fullName
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)}
              size="md"
              className="flex-shrink-0"
            />

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {performer.fullName}
              </p>
              <p className="text-xs text-gray-500 truncate">
                @{performer.username}
              </p>
            </div>

            {/* Stats */}
            <div className="flex-shrink-0 text-right">
              <p className="text-sm font-semibold text-blue-600">
                {performer.totalPoints} pts
              </p>
              <p className="text-xs text-gray-500">
                {performer.recognitionsReceived} recognitions
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

