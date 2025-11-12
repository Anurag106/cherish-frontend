/**
 * Time Distribution Chart Component
 * Shows when recognitions are most commonly given
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
  ResponsiveContainer,
} from 'recharts';
import { RecognitionByTimeData } from '@/types/api/analytics';
import { CHART_COLORS } from '@/constants/analytics';

interface TimeDistributionChartProps {
  data: RecognitionByTimeData[];
}

export const TimeDistributionChart: React.FC<TimeDistributionChartProps> = ({
  data,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Recognition Distribution by Time of Day
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="timeSlot"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis
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
            cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
          />
          <Bar
            dataKey="count"
            fill={CHART_COLORS.info}
            radius={[8, 8, 0, 0]}
            name="Recognitions"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

