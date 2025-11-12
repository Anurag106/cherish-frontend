'use client';

import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { FeedFilter } from './FeedFilter';
import { AddFeedModal } from '../../modals/AddFeedModal';
import { PostsList } from '../posts/PostsList';
import YourTeam from '../team/YourTeam';
import RewardsCard from '../rewards/RewardsCard';
import CelebrationsCard from '../celebrations/CelebrationsCard';
import TrendingCard from '../trending/TrendingCard';
import { useFeedFilter } from '@/hooks/ui/useFeedFilter';

interface FeedLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const FeedLayout: React.FC<FeedLayoutProps> = ({
  children,
  className = '',
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {
    selectedFilter,
    isAddFeedModalOpen,
    handleFilterChange,
    handleAddFeed,
    handleCloseModal,
    handleSelectFeed,
    getApiFilters,
  } = useFeedFilter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-20 left-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-3 bg-white rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200 interactive"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="w-6 h-6 text-gray-700" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`
        lg:hidden fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 space-y-6 overflow-y-auto h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button
              onClick={closeMobileMenu}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="space-y-6">
            <FeedFilter
              selectedFilter={selectedFilter}
              onFilterChange={(filter) => {
                handleFilterChange(filter);
                closeMobileMenu();
              }}
              onAddFeed={() => {
                handleAddFeed();
                closeMobileMenu();
              }}
            />
            <YourTeam />
            <RewardsCard />
            <CelebrationsCard />
            <TrendingCard />
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex gap-6">
        {/* Left Sidebar */}
        <div className="w-64 flex-shrink-0 space-y-6 animate-slide-in-right">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <FeedFilter
              selectedFilter={selectedFilter}
              onFilterChange={handleFilterChange}
              onAddFeed={handleAddFeed}
            />
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <YourTeam />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="space-y-6">
            {children}
            <PostsList feedFilters={getApiFilters()} />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-64 flex-shrink-0 space-y-6 animate-slide-in-right" style={{ animationDirection: 'reverse' }}>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <RewardsCard />
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <CelebrationsCard />
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <TrendingCard />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
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
