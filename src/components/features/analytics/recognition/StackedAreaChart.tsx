/**
 * Stacked Area Chart Component
 * Displays P2P vs Awards data as stacked area chart
 */

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { P2PVsAwardsChartData } from '@/types/api/analytics';
import { exportP2PVsAwardsData } from '@/utils/export/exportData';

interface StackedAreaChartProps {
  data: P2PVsAwardsChartData[];
  title: string;
  dataKey1?: string;
  dataKey2?: string;
}

export const StackedAreaChart: React.FC<StackedAreaChartProps> = ({
  data,
  title,
  dataKey1 = 'p2p',
  dataKey2 = 'awards',
}) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toString();
  };

  const handleExport = () => {
    const filename = title.toLowerCase().replace(/\s+/g, '_');
    exportP2PVsAwardsData(data, filename);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <span>Export</span>
          <ArrowDownTrayIcon className="w-4 h-4" />
        </button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorP2P" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#60A5FA" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorAwards" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34D399" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#34D399" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="date"
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
            }}
          />
          <YAxis
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
            tickFormatter={formatNumber}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value: number) => formatNumber(value)}
            labelFormatter={(label) => {
              const date = new Date(label);
              return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            wrapperStyle={{ paddingTop: '20px' }}
          />
          <Area
            type="monotone"
            dataKey={dataKey1}
            stackId="1"
            stroke="#60A5FA"
            fill="url(#colorP2P)"
            name="P2P"
          />
          <Area
            type="monotone"
            dataKey={dataKey2}
            stackId="1"
            stroke="#34D399"
            fill="url(#colorAwards)"
            name="Awards"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

