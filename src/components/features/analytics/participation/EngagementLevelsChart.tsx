/**
 * Engagement Levels Chart Component
 * Displays user engagement distribution
 */

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { EngagementLevel } from '@/types/api/analytics';

interface EngagementLevelsChartProps {
  data: EngagementLevel[];
}

export const EngagementLevelsChart: React.FC<EngagementLevelsChartProps> = ({ data }) => {
  // Transform data for Recharts compatibility
  const chartData = data.map(item => ({
    name: item.level,
    value: item.userCount,
    color: item.color,
    percentage: item.percentage,
    description: item.description,
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Engagement Levels</h3>
        <p className="text-sm text-gray-500 mt-1">Distribution of users by engagement level</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => `${entry.percentage.toFixed(1)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend with Details */}
        <div className="flex flex-col justify-center gap-3">
          {data.map((level) => (
            <div key={level.level} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: level.color }}
                />
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{level.level}</div>
                  <div className="text-xs text-gray-500">{level.description}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">{level.userCount}</div>
                <div className="text-xs text-gray-500">{level.percentage.toFixed(1)}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

