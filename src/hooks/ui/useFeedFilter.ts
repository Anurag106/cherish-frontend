import { useState, useCallback } from 'react';
import { FeedFilterType } from '@/components/features/feed/FeedFilter';
import { FeedOptionType } from '@/components/modals/AddFeedModal';
import { useUser } from '@/contexts/UserContext';

export const useFeedFilter = () => {
  const { userProfile } = useUser();
  const [selectedFilter, setSelectedFilter] = useState<FeedFilterType>('company');
  const [isAddFeedModalOpen, setIsAddFeedModalOpen] = useState(false);

  const handleFilterChange = useCallback((filter: FeedFilterType) => {
    setSelectedFilter(filter);
  }, []);

  const handleAddFeed = useCallback(() => {
    setIsAddFeedModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsAddFeedModalOpen(false);
  }, []);

  const handleSelectFeed = useCallback((feedType: FeedOptionType) => {
    // Here you would implement the logic for adding the selected feed
    console.log('Selected feed type:', feedType);
    setIsAddFeedModalOpen(false);
    
    // TODO: Implement actual feed addition logic
    // This could involve API calls to add the feed to user's preferences
  }, []);

  // Map feed filter to API filter parameters
  const getApiFilters = useCallback(() => {
    switch (selectedFilter) {
      case 'team':
        return { filterByTeam: true };
      case 'forYou':
        return { filterByUserId: userProfile?.username };
      case 'company':
      default:
        return { filterByTeam: false };
    }
  }, [selectedFilter, userProfile?.username]);

  return {
    selectedFilter,
    isAddFeedModalOpen,
    handleFilterChange,
    handleAddFeed,
    handleCloseModal,
    handleSelectFeed,
    getApiFilters,
  };
};
