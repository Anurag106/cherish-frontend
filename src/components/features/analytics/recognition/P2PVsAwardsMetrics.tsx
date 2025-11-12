/**
 * P2P vs Awards Metrics Component
 * Displays key metrics comparing P2P recognition and Awards
 */

import React from 'react';
import { 
  ArrowUpIcon, 
  ArrowDownIcon,
  InformationCircleIcon 
} from '@heroicons/react/24/outline';
import { P2PVsAwardsMetrics } from '@/types/api/analytics';

interface P2PVsAwardsMetricsProps {
  metrics: P2PVsAwardsMetrics;
}

export const P2PVsAwardsMetricsCards: React.FC<P2PVsAwardsMetricsProps> = ({ metrics }) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {/* Recognition Received Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600">Recognition Received</h3>
          <InformationCircleIcon className="w-4 h-4 text-gray-400" />
        </div>
        <div className="mt-2">
          <div className="text-3xl font-bold text-gray-900">
            {formatNumber(metrics.recognitionReceived.total)}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Total recognition received during period
          </div>
          <div className="flex items-center gap-2 mt-3">
            <div className={`flex items-center gap-1 text-sm font-medium ${
              metrics.recognitionReceived.trend.value >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {metrics.recognitionReceived.trend.value >= 0 ? (
                <ArrowUpIcon className="w-3 h-3" />
              ) : (
                <ArrowDownIcon className="w-3 h-3" />
              )}
              <span>{Math.abs(metrics.recognitionReceived.trend.value)}% in {metrics.recognitionReceived.trend.period}</span>
            </div>
            <span className="text-2xl">🎉</span>
          </div>
          <div className="text-sm text-gray-500 mt-2">
            {formatNumber(metrics.recognitionReceived.perMonth)} / month
          </div>
        </div>
      </div>

      {/* Point Received Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600">Point Received</h3>
          <InformationCircleIcon className="w-4 h-4 text-gray-400" />
        </div>
        <div className="mt-2">
          <div className="text-3xl font-bold text-gray-900">
            {formatNumber(metrics.pointReceived.total)}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Total point received during period
          </div>
          <div className="flex items-center gap-2 mt-3">
            <div className={`flex items-center gap-1 text-sm font-medium ${
              metrics.pointReceived.trend.value >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {metrics.pointReceived.trend.value >= 0 ? (
                <ArrowUpIcon className="w-3 h-3" />
              ) : (
                <ArrowDownIcon className="w-3 h-3" />
              )}
              <span>{Math.abs(metrics.pointReceived.trend.value)}% in {metrics.pointReceived.trend.period}</span>
            </div>
            <span className="text-2xl">🎊</span>
          </div>
          <div className="text-sm text-gray-500 mt-2">
            {formatNumber(metrics.pointReceived.perMonth)} / month
          </div>
        </div>
      </div>

      {/* P2P v Awards Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600">P2P v Awards</h3>
          <InformationCircleIcon className="w-4 h-4 text-gray-400" />
        </div>
        <div className="mt-2">
          <div className="text-sm text-gray-500 mb-3">
            User given recognition versus awards
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-medium text-gray-500 mb-1">P2P</div>
              <div className="text-2xl font-bold text-blue-600">
                {formatNumber(metrics.p2pVsAwards.p2p.count)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {formatNumber(metrics.p2pVsAwards.p2p.points)} point
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500 mb-1">Awards</div>
              <div className="text-2xl font-bold text-purple-600">
                {formatNumber(metrics.p2pVsAwards.awards.count)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {formatNumber(metrics.p2pVsAwards.awards.points)} point
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

