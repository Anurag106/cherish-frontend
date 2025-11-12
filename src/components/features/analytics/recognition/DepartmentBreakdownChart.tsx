/**
 * Department Breakdown Chart Component
 * Grouped bar chart showing recognitions given/received by department
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
import { DepartmentRecognitionData } from '@/types/api/analytics';
import { CHART_COLORS } from '@/constants/analytics';

interface DepartmentBreakdownChartProps {
  data: DepartmentRecognitionData[];
}

export const DepartmentBreakdownChart: React.FC<DepartmentBreakdownChartProps> = ({
  data,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Recognition by Department
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="department"
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
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
          <Bar
            dataKey="given"
            fill={CHART_COLORS.primary}
            radius={[8, 8, 0, 0]}
            name="Given"
          />
          <Bar
            dataKey="received"
            fill={CHART_COLORS.success}
            radius={[8, 8, 0, 0]}
            name="Received"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

