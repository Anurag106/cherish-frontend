/**
 * Leaderboard Filters Component
 * Filters for department, hashtag, recognition type, and date range
 */

'use client';

import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface LeaderboardFiltersProps {
  selectedDepartment: string;
  selectedHashtag: string;
  recognitionType: 'received' | 'given';
  dateRange: string;
  searchQuery: string;
  onDepartmentChange: (value: string) => void;
  onHashtagChange: (value: string) => void;
  onRecognitionTypeChange: (type: 'received' | 'given') => void;
  onDateRangeChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  departments: string[];
  hashtags: string[];
}

export const LeaderboardFilters: React.FC<LeaderboardFiltersProps> = ({
  selectedDepartment,
  selectedHashtag,
  recognitionType,
  dateRange,
  searchQuery,
  onDepartmentChange,
  onHashtagChange,
  onRecognitionTypeChange,
  onDateRangeChange,
  onSearchChange,
  departments,
  hashtags,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      {/* Top Row - Dropdowns and Tabs */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* Department Dropdown */}
        <select
          value={selectedDepartment}
          onChange={(e) => onDepartmentChange(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[180px]"
        >
          <option value="all">Entire Company</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        {/* Hashtag Dropdown */}
        <select
          value={selectedHashtag}
          onChange={(e) => onHashtagChange(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[180px]"
        >
          <option value="all">Any Hashtag</option>
          {hashtags.map((tag) => (
            <option key={tag} value={tag}>
              #{tag}
            </option>
          ))}
        </select>

        {/* Recognition Type Tabs */}
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onRecognitionTypeChange('received')}
            className={`px-6 py-1.5 rounded-md text-sm font-medium transition-all ${
              recognitionType === 'received'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Received
          </button>
          <button
            onClick={() => onRecognitionTypeChange('given')}
            className={`px-6 py-1.5 rounded-md text-sm font-medium transition-all ${
              recognitionType === 'given'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Given
          </button>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Date Range Dropdown */}
        <select
          value={dateRange}
          onChange={(e) => onDateRangeChange(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="7d">7 days</option>
          <option value="30d">30 days</option>
          <option value="90d">90 days</option>
          <option value="1y">1 year</option>
          <option value="all">All time</option>
        </select>
      </div>

      {/* Bottom Row - Search */}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search employees..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

