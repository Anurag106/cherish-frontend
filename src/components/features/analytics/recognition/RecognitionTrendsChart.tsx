/**
 * Recognition Trends Chart Component
 * Line chart showing recognition trends over time
 */

'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { RecognitionTrendData } from '@/types/api/analytics';
import { CHART_COLORS } from '@/constants/analytics';

interface RecognitionTrendsChartProps {
  data: RecognitionTrendData[];
}

export const RecognitionTrendsChart: React.FC<RecognitionTrendsChartProps> = ({
  data,
}) => {
  const formattedData = data.map((item) => ({
    date: new Date(item.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    recognitions: item.count,
    points: item.points,
  }));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Recognition Trends Over Time
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis
            yAxisId="left"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickLine={{ stroke: '#e5e7eb' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="recognitions"
            stroke={CHART_COLORS.primary}
            strokeWidth={3}
            dot={{ fill: CHART_COLORS.primary, r: 4 }}
            activeDot={{ r: 6 }}
            name="Recognitions"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="points"
            stroke={CHART_COLORS.secondary}
            strokeWidth={3}
            dot={{ fill: CHART_COLORS.secondary, r: 4 }}
            activeDot={{ r: 6 }}
            name="Points"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

