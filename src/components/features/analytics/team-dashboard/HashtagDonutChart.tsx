/**
 * Hashtag Donut Chart Component
 * Donut chart showing hashtag distribution
 */

'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface HashtagData {
  name: string;
  value: number;
  color: string;
}

interface HashtagDonutChartProps {
  data: HashtagData[];
  totalHashtags: number;
}

export const HashtagDonutChart: React.FC<HashtagDonutChartProps> = ({
  data,
  totalHashtags,
}) => {
  const renderCustomizedLabel = () => {
    return (
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-gray-900"
      >
        <tspan x="50%" dy="-0.5em" fontSize="32" fontWeight="bold">
          {totalHashtags}
        </tspan>
        <tspan x="50%" dy="1.5em" fontSize="12" className="fill-gray-500">
          Unique
        </tspan>
        <tspan x="50%" dy="1.2em" fontSize="12" className="fill-gray-500">
          Hashtags Used
        </tspan>
      </text>
    );
  };

  const chartData = data.map((item) => ({
    name: item.name,
    value: item.value,
  }));

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          {renderCustomizedLabel()}
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-gray-700 truncate">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

