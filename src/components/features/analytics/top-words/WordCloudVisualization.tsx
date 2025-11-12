/**
 * Word Cloud Visualization Component
 * Displays frequently used words with varying sizes
 */

import React from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { WordCloudData } from '@/types/api/analytics';
import { downloadCSV, getExportTimestamp } from '@/utils/export/exportData';

interface WordCloudVisualizationProps {
  data: WordCloudData[];
}

export const WordCloudVisualization: React.FC<WordCloudVisualizationProps> = ({ data }) => {
  const handleExport = () => {
    const exportData = data.map(item => ({
      Word: item.word,
      'Usage Count': item.value,
    }));
    downloadCSV(exportData, `word_cloud_${getExportTimestamp()}`);
  };

  // Calculate font sizes based on value
  const maxValue = Math.max(...data.map(d => d.value));
  const getFontSize = (value: number) => {
    const minSize = 16;
    const maxSize = 60;
    return minSize + ((value / maxValue) * (maxSize - minSize));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Word Cloud</h3>
          <p className="text-sm text-gray-500 mt-1">Most frequently used words in recognition messages</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <span>Export</span>
          <ArrowDownTrayIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Word Cloud */}
      <div className="flex flex-wrap items-center justify-center gap-6 py-12 min-h-[400px] bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg">
        {data.map((word, index) => (
          <span
            key={index}
            className="cursor-pointer hover:opacity-80 transition-opacity font-bold"
            style={{
              fontSize: `${getFontSize(word.value)}px`,
              color: word.color,
              lineHeight: 1.2,
            }}
          >
            {word.word}
          </span>
        ))}
      </div>
    </div>
  );
};

