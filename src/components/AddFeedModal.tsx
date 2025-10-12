'use client';

import React from 'react';
import { UserGroupIcon, BuildingOfficeIcon, MapPinIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from './ui/Button';

export type FeedOptionType = 'teams' | 'departments' | 'locations';

interface FeedOption {
  id: FeedOptionType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface AddFeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFeed: (feedType: FeedOptionType) => void;
}

const feedOptions: FeedOption[] = [
  {
    id: 'teams',
    label: 'Teams',
    icon: UserGroupIcon,
    description: 'Follow specific teams and their activities',
  },
  {
    id: 'departments',
    label: 'Departments',
    icon: BuildingOfficeIcon,
    description: 'Follow department-wide updates and news',
  },
  {
    id: 'locations',
    label: 'Locations',
    icon: MapPinIcon,
    description: 'Follow posts from specific office locations',
  },
];

export const AddFeedModal: React.FC<AddFeedModalProps> = ({
  isOpen,
  onClose,
  onSelectFeed,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Select a feed</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </Button>
        </div>

        {/* Feed Options */}
        <div className="space-y-3">
          {feedOptions.map((option) => {
            const Icon = option.icon;
            
            return (
              <button
                key={option.id}
                onClick={() => onSelectFeed(option.id)}
                className="w-full flex items-center space-x-4 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-medium text-gray-900 group-hover:text-blue-900">
                    {option.label}
                  </h3>
                  <p className="text-sm text-gray-500 group-hover:text-blue-700">
                    {option.description}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full text-gray-600 hover:text-gray-900"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
