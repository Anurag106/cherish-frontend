/**
 * Top Words Card Component
 * Word cloud visualization
 */

'use client';

import React from 'react';

interface Word {
  text: string;
  size: number;
  color: string;
}

interface TopWordsCardProps {
  words: Word[];
}

export const TopWordsCard: React.FC<TopWordsCardProps> = ({ words }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Top Words</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View more
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 min-h-[200px] py-8">
        {words.map((word, index) => (
          <span
            key={index}
            style={{
              fontSize: `${word.size}px`,
              color: word.color,
            }}
            className="font-semibold hover:scale-110 transition-transform cursor-pointer select-none"
          >
            {word.text}
          </span>
        ))}
      </div>
    </div>
  );
};

