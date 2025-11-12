/**
 * Leaderboard Card Component
 * Horizontal bar chart showing top performers
 */

'use client';

import React from 'react';
import { Avatar } from '@/components/ui/Avatar';

interface LeaderboardEntry {
  userId: string;
  username: string;
  fullName: string;
  score: number;
  maxScore: number;
  color: string;
  initials: string;
}

interface LeaderboardCardProps {
  entries: LeaderboardEntry[];
  subtitle: string;
}

export const LeaderboardCard: React.FC<LeaderboardCardProps> = ({
  entries,
  subtitle,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Leaderboard</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View more
        </button>
      </div>

      <div className="space-y-4">
        {entries.map((entry) => {
          const percentage = (entry.score / entry.maxScore) * 100;

          return (
            <div key={entry.userId} className="flex items-center gap-3">
              <Avatar initials={entry.initials} size="md" />
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    {entry.fullName.split(' ')[0]}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {entry.score}
                  </span>
                </div>
                
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: entry.color,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-sm text-gray-500 text-center mt-4">{subtitle}</p>
    </div>
  );
};

