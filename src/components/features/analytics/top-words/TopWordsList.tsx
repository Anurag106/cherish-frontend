/**
 * Top Words List Component
 * Detailed breakdown of most frequently used words
 */

import React from 'react';

interface TopWordsListProps {
  words: Array<{
    rank: number;
    word: string;
    count: number;
    percentage: number;
  }>;
}

export const TopWordsList: React.FC<TopWordsListProps> = ({ words }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Top Words List</h3>
        <p className="text-sm text-gray-500 mt-1">Detailed breakdown of the most frequently used words</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {words.map((word) => (
          <div key={word.rank} className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500 text-white font-bold text-sm">
                  {word.rank}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{word.word}</div>
                  <div className="text-xs text-gray-500">Used {word.count.toLocaleString()} times</div>
                </div>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${word.percentage * 10}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

