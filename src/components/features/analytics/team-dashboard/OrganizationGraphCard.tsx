/**
 * Organization Graph Card Component
 * Shows network visualization placeholder
 */

'use client';

import React from 'react';

export const OrganizationGraphCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Organization Graph</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View more
        </button>
      </div>

      <div className="flex items-center justify-center h-[300px]">
        {/* Network visualization placeholder */}
        <div className="relative w-full h-full flex items-center justify-center">
          <svg width="300" height="250" viewBox="0 0 300 250">
            {/* Center node (main user) */}
            <circle cx="150" cy="125" r="30" fill="#ef4444" />
            <text x="150" y="130" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
              AK
            </text>

            {/* Top node */}
            <line x1="150" y1="95" x2="150" y2="60" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="150" cy="40" r="20" fill="#10b981" />
            <text x="150" y="45" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
              RS
            </text>

            {/* Top right node */}
            <line x1="177" y1="107" x2="215" y2="75" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="230" cy="60" r="20" fill="#10b981" />
            <text x="230" y="65" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
              CH
            </text>

            {/* Bottom right node */}
            <line x1="177" y1="143" x2="215" y2="175" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="230" cy="190" r="20" fill="#10b981" />
            <text x="230" y="195" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
              GL
            </text>

            {/* Bottom left node */}
            <line x1="123" y1="143" x2="85" y2="175" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="70" cy="190" r="20" fill="#3b82f6" />
            <text x="70" y="195" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
              BC
            </text>

            {/* Far bottom node */}
            <circle cx="150" cy="220" r="15" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
};

