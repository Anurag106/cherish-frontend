/**
 * Recognition Stats Card Component
 * Shows given, received, and points with hashtag donut chart
 */

'use client';

import React from 'react';
import { HashtagDonutChart } from './HashtagDonutChart';

interface RecognitionStatsCardProps {
  given: number;
  received: number;
  points: number;
  hashtagData: {
    name: string;
    value: number;
    color: string;
  }[];
  totalHashtags: number;
}

export const RecognitionStatsCard: React.FC<RecognitionStatsCardProps> = ({
  given,
  received,
  points,
  hashtagData,
  totalHashtags,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recognition</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View more
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900">{given}</div>
          <div className="text-sm text-gray-500 mt-1">Given</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900">{received}</div>
          <div className="text-sm text-gray-500 mt-1">Received</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900">{points}</div>
          <div className="text-sm text-gray-500 mt-1">Points Given</div>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="mt-6">
        <HashtagDonutChart data={hashtagData} totalHashtags={totalHashtags} />
      </div>
    </div>
  );
};

