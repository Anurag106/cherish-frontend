/**
 * Top Words Metrics Component
 * Displays key metrics for word usage
 */

import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

interface TopWordsMetricsProps {
  mostUsedWord: {
    word: string;
    count: number;
  };
  totalUniqueWords: number;
  averageWordsPerMessage: number;
}

export const TopWordsMetrics: React.FC<TopWordsMetricsProps> = ({
  mostUsedWord,
  totalUniqueWords,
  averageWordsPerMessage,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {/* Most Used Word */}
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600">Most Used Word</h3>
          <InformationCircleIcon className="w-4 h-4 text-gray-400" />
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-1">{mostUsedWord.word}</div>
        <div className="text-sm text-gray-500">Used {mostUsedWord.count.toLocaleString()} times</div>
      </div>

      {/* Total Unique Words */}
      <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600">Total Unique Words</h3>
          <InformationCircleIcon className="w-4 h-4 text-gray-400" />
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-1">{totalUniqueWords.toLocaleString()}</div>
        <div className="text-sm text-gray-500">Across all messages</div>
      </div>

      {/* Average Words per Message */}
      <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600">Average Words per Message</h3>
          <InformationCircleIcon className="w-4 h-4 text-gray-400" />
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-1">{averageWordsPerMessage}</div>
        <div className="text-sm text-gray-500">Words per recognition</div>
      </div>
    </div>
  );
};

