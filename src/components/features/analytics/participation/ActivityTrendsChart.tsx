/**
 * Activity Trends Chart Component
 * Shows user activity over time
 */

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
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { UserActivityTrend } from '@/types/api/analytics';
import { downloadCSV, getExportTimestamp } from '@/utils/export/exportData';

interface ActivityTrendsChartProps {
  data: UserActivityTrend[];
}

export const ActivityTrendsChart: React.FC<ActivityTrendsChartProps> = ({ data }) => {
  const handleExport = () => {
    const exportData = data.map(item => ({
      Date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      'Active Users': item.activeUsers,
      'New Users': item.newUsers,
      'Recognitions Given': item.recognitionsGiven,
      'Recognitions Received': item.recognitionsReceived,
    }));
    downloadCSV(exportData, `activity_trends_${getExportTimestamp()}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">User Activity Trends</h3>
          <p className="text-sm text-gray-500 mt-1">Active users and recognition activity over the last 30 days</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <span>Export</span>
          <ArrowDownTrayIcon className="w-4 h-4" />
        </button>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="date"
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            }}
          />
          <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            labelFormatter={(label) => {
              const date = new Date(label);
              return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Line
            type="monotone"
            dataKey="activeUsers"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            name="Active Users"
          />
          <Line
            type="monotone"
            dataKey="newUsers"
            stroke="#10B981"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            name="New Users"
          />
          <Line
            type="monotone"
            dataKey="recognitionsGiven"
            stroke="#F59E0B"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            name="Recognitions Given"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

