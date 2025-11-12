/**
 * Analytics Layout Component
 * Main layout wrapper for analytics pages without sidebar
 */

'use client';

import React from 'react';

interface AnalyticsLayoutProps {
  children: React.ReactNode;
}

export const AnalyticsLayout: React.FC<AnalyticsLayoutProps> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </div>
    </div>
  );
};

