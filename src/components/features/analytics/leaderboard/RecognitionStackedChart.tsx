/**
 * Recognition Stacked Chart Component
 * Horizontal stacked bar chart showing recognition by hashtags
 */

'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { downloadCSV, getExportTimestamp } from '@/utils/export/exportData';

interface HashtagValue {
  hashtag: string;
  value: number;
  color: string;
}

interface RecognitionEntry {
  name: string;
  values: HashtagValue[];
  total: number;
}

interface RecognitionStackedChartProps {
  data: RecognitionEntry[];
  title: string;
  subtitle?: string;
}

export const RecognitionStackedChart: React.FC<RecognitionStackedChartProps> = ({
  data,
  title,
  subtitle,
}) => {
  // Transform data for Recharts
  const chartData = data.map((entry) => {
    const dataPoint: any = {
      name: entry.name,
    };
    entry.values.forEach((val) => {
      dataPoint[val.hashtag] = val.value;
    });
    return dataPoint;
  });

  // Get all unique hashtags with their colors
  const allHashtags = Array.from(
    new Set(data.flatMap((entry) => entry.values.map((v) => v.hashtag)))
  );

  const hashtagColors = new Map<string, string>();
  data.forEach((entry) => {
    entry.values.forEach((val) => {
      if (!hashtagColors.has(val.hashtag)) {
        hashtagColors.set(val.hashtag, val.color);
      }
    });
  });

  const handleExport = () => {
    // Prepare data for export
    const exportData = data.map((entry) => {
      const row: any = {
        Name: entry.name,
        Total: entry.total,
      };
      // Add each hashtag as a column
      entry.values.forEach((val) => {
        row[val.hashtag] = val.value;
      });
      return row;
    });
    
    const filename = title.toLowerCase().replace(/\s+/g, '_');
    downloadCSV(exportData, `${filename}_${getExportTimestamp()}`);
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-gray-700">#{entry.name}</span>
              </div>
              <span className="font-medium text-gray-900">{entry.value}</span>
            </div>
          ))}
          <div className="border-t border-gray-200 mt-2 pt-2">
            <div className="flex justify-between text-sm font-semibold">
              <span>Total:</span>
              <span>{payload.reduce((sum: number, entry: any) => sum + entry.value, 0)}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom legend with better styling
  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-700">#{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-gray-900">{title}</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <span>Export</span>
            <ArrowDownTrayIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={true} vertical={false} />
          <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 12 }} />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: '#374151', fontSize: 13 }}
            width={110}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }} />
          <Legend content={<CustomLegend />} />
          {allHashtags.map((hashtag) => (
            <Bar
              key={hashtag}
              dataKey={hashtag}
              stackId="a"
              fill={hashtagColors.get(hashtag) || '#94a3b8'}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

