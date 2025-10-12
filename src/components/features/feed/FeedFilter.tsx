'use client';

import React, { useState } from 'react';
import { BuildingOfficeIcon, UserGroupIcon, UserIcon, PlusIcon } from '@heroicons/react/24/outline';

export type FeedFilterType = 'company' | 'team' | 'forYou';

interface FeedFilterProps {
  selectedFilter: FeedFilterType;
  onFilterChange: (filter: FeedFilterType) => void;
  onAddFeed: () => void;
  className?: string;
}

interface FilterItem {
  id: FeedFilterType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  hasNotification?: boolean;
}

const filterItems: FilterItem[] = [
  {
    id: 'company',
    label: 'Company',
    icon: BuildingOfficeIcon,
  },
  {
    id: 'team',
    label: 'Team',
    icon: UserGroupIcon,
  },
  {
    id: 'forYou',
    label: 'For You',
    icon: UserIcon,
  },
];

export const FeedFilter: React.FC<FeedFilterProps> = ({
  selectedFilter,
  onFilterChange,
  onAddFeed,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-4 ${className}`}>
      {/* Filter Items */}
      <div className="space-y-1">
        {filterItems.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedFilter === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onFilterChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${
                isSelected
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-5 h-5 ${isSelected ? 'text-gray-900' : 'text-gray-600'}`} />
                <span className="font-medium text-sm">{item.label}</span>
              </div>
              {item.hasNotification && (
                <div className="w-2 h-2 bg-black rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Add Feed Button */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <button
          onClick={onAddFeed}
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <PlusIcon className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-sm">Add feed</span>
        </button>
      </div>
    </div>
  );
};
