'use client';

import { useState } from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { useUser } from '@/contexts/UserContext';
import GiveRecognitionModal from '../../modals/GiveRecognitionModal';

interface PostCreationPlaceholderProps {
  hashtags?: string[];
}

export default function PostCreationPlaceholder({ hashtags = [] }: PostCreationPlaceholderProps) {
  const { userProfile } = useUser();
  const [isRecognitionModalOpen, setIsRecognitionModalOpen] = useState(false);

  const getUserInitials = () => {
    if (userProfile?.firstName && userProfile?.lastName) {
      return `${userProfile.firstName[0]}${userProfile.lastName[0]}`.toUpperCase();
    }
    return userProfile?.firstName?.[0]?.toUpperCase() || 'U';
  };

  const availablePoints = userProfile?.availablePoints;

  return (
    <>
      {/* Main Card */}
      <div className="modern-card p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* User Avatar */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-500 flex items-center justify-center">
              <span className="text-white font-semibold text-sm sm:text-lg">
                {getUserInitials()}
              </span>
            </div>
          </div>

          {/* Post Input Field - Opens Recognition Modal */}
          <button
            onClick={() => setIsRecognitionModalOpen(true)}
            className="flex-1 w-full text-left px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-sm">Start a post...</span>
              <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
            </div>
          </button>

          {/* Points Display and Give Recognition Button */}
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
            {/* Points Display */}
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-50 rounded-lg">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">$</span>
              </div>
              <span className="text-gray-900 font-semibold text-sm sm:text-lg">{availablePoints}</span>
            </div>

            {/* Give Recognition Button */}
            <button
              onClick={() => setIsRecognitionModalOpen(true)}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-xl transition-colors shadow-sm text-sm sm:text-base"
            >
              <span className="hidden sm:inline">Give Recognition</span>
              <span className="sm:hidden">Give</span>
            </button>
          </div>
        </div>
      </div>

      {/* Give Recognition Modal */}
      <GiveRecognitionModal
        isOpen={isRecognitionModalOpen}
        onClose={() => setIsRecognitionModalOpen(false)}
        hashtags={hashtags}
      />
    </>
  );
}

