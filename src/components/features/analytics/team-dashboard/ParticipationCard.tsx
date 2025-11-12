/**
 * Participation Card Component
 * Shows participation percentage with trend chart
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
  ResponsiveContainer,
} from 'recharts';

interface ParticipationDataPoint {
  date: string;
  value: number;
}

interface ParticipationCardProps {
  percentage: number;
  data: ParticipationDataPoint[];
  subtitle: string;
}

export const ParticipationCard: React.FC<ParticipationCardProps> = ({
  percentage,
  data,
  subtitle,
}) => {
  const latestDataPoint = data[data.length - 1];
  const formattedDate = new Date(latestDataPoint.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Participation</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View more
        </button>
      </div>

      <div className="mb-2">
        <div className="text-5xl font-bold text-gray-900">{percentage}%</div>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>

      <div className="relative mt-4">
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tick={{ fill: '#9ca3af', fontSize: 10 }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.toLocaleDateString('en-US', { month: 'short' })} ${date.getDate()}`;
              }}
            />
            <YAxis hide />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm">
                      <p>{`${formattedDate}: ${payload[0].value}%`}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: '#3b82f6' }}
            />
          </LineChart>
        </ResponsiveContainer>
        
        {/* Tooltip indicator */}
        <div className="absolute top-2 right-4 bg-gray-900 text-white px-3 py-1 rounded-lg text-xs">
          {formattedDate}: {latestDataPoint.value}%
        </div>
      </div>
    </div>
  );
};

