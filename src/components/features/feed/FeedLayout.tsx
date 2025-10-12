'use client';

import React from 'react';
import { FeedFilter } from './FeedFilter';
import { AddFeedModal } from '../../modals/AddFeedModal';
import { PostsList } from '../posts/PostsList';
import { useFeedFilter } from '@/hooks/ui/useFeedFilter';

interface FeedLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const FeedLayout: React.FC<FeedLayoutProps> = ({
  children,
  className = '',
}) => {
  const {
    selectedFilter,
    isAddFeedModalOpen,
    handleFilterChange,
    handleAddFeed,
    handleCloseModal,
    handleSelectFeed,
    getApiFilters,
  } = useFeedFilter();

  return (
    <div className={`flex gap-6 ${className}`}>
      {/* Feed Filter Sidebar */}
      <div className="w-64 flex-shrink-0">
        <FeedFilter
          selectedFilter={selectedFilter}
          onFilterChange={handleFilterChange}
          onAddFeed={handleAddFeed}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="space-y-6">
          {children}
          <PostsList feedFilters={getApiFilters()} />
        </div>
      </div>

      {/* Add Feed Modal */}
      <AddFeedModal
        isOpen={isAddFeedModalOpen}
        onClose={handleCloseModal}
        onSelectFeed={handleSelectFeed}
      />
    </div>
  );
};
