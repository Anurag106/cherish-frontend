/**
 * Analytics Page Header Component
 * Header with title and description
 */

'use client';

import React from 'react';

interface AnalyticsPageHeaderProps {
  title: string;
  description?: string;
  actionButtons?: React.ReactNode;
}

export const AnalyticsPageHeader: React.FC<AnalyticsPageHeaderProps> = ({
  title,
  description,
  actionButtons,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          {description && (
            <p className="text-gray-600">{description}</p>
          )}
        </div>

        {/* Action Buttons */}
        {actionButtons && (
          <div className="flex items-center gap-3">
            {actionButtons}
          </div>
        )}
      </div>
    </div>
  );
};

