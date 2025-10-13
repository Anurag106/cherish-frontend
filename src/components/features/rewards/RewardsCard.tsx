'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCartIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { rewardsApi, RewardsData, RewardBadge } from '@/services/api/rewards/rewardsApi';
import { useUser } from '@/contexts/UserContext';

interface RewardsCardProps {
  className?: string;
}

interface RewardBadgeComponentProps {
  badge: RewardBadge;
}

const RewardBadgeComponent: React.FC<RewardBadgeComponentProps> = ({ badge }) => {
  const getBadgeIcon = () => {
    switch (badge.type) {
      case 'bonus':
        return <span className="text-white font-bold text-sm">{badge.value}</span>;
      case 'special':
        return <SparklesIcon className="w-4 h-4 text-white" />;
      case 'achievement':
        return <span className="text-white text-sm">🏆</span>;
      default:
        return <span className="text-white text-sm">{badge.icon}</span>;
    }
  };

  return (
    <div className={`w-10 h-10 rounded-full ${badge.color} flex items-center justify-center border-2 border-white shadow-sm`}>
      {getBadgeIcon()}
    </div>
  );
};

export default function RewardsCard({ className = '' }: RewardsCardProps) {
  const router = useRouter();
  const { userProfile, isLoading: isUserLoading } = useUser();
  const [recentGain, setRecentGain] = useState<number>(10); // Demo recent gain, could be calculated from user activity

  // Generate demo badges based on user points
  const generateBadges = (): RewardBadge[] => {
    const badges: RewardBadge[] = [
      {
        id: 'recent-bonus',
        type: 'bonus',
        value: `+${recentGain}`,
        icon: '💰',
        color: 'bg-green-500'
      }
    ];

    // Add special badge if user has high points
    if (userProfile?.totalPoints && userProfile.totalPoints > 1000) {
      badges.push({
        id: 'special-reward',
        type: 'special',
        value: '⭐',
        icon: '✨',
        color: 'bg-blue-500'
      });
    }

    return badges;
  };

  const handleShopRewards = () => {
    router.push('/rewards');
  };

  if (isUserLoading) {
    return (
      <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-6">
            <div className="h-6 w-20 bg-gray-200 rounded"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="h-6 w-16 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="flex gap-3 mb-6">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          </div>
          <div className="h-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${className}`}>
        <div className="text-center text-gray-500">
          <p className="text-sm">No user data available</p>
        </div>
      </div>
    );
  }

  // Debug logging to check points value
  console.log('🏆 User profile points:', {
    totalPoints: userProfile.totalPoints,
    availablePoints: userProfile.availablePoints,
    totalPointsType: typeof userProfile.totalPoints,
    availablePointsType: typeof userProfile.availablePoints,
    fullProfile: userProfile
  });

  // Check if points are being doubled somehow
  const displayPoints = Number(userProfile.availablePoints);
  console.log('🏆 Display points calculation:', {
    original: userProfile.totalPoints,
    asNumber: displayPoints,
    isNaN: isNaN(displayPoints)
  });

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Rewards</h2>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <ShoppingCartIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">
            {displayPoints.toLocaleString()}
          </span>
          
        </div>
      </div>

      {/* Reward Badges */}
      <div className="flex gap-3 mb-6">
        {generateBadges().map((badge) => (
          <RewardBadgeComponent key={badge.id} badge={badge} />
        ))}
      </div>

      {/* Shop Rewards Button */}
      <button
        onClick={handleShopRewards}
        className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
      >
        Shop rewards
      </button>
    </div>
  );
}
