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
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const getBadgeIcon = () => {
    switch (badge.type) {
      case 'bonus':
        return <span className="text-white font-bold text-sm">{badge.value}</span>;
      case 'special':
        return <SparklesIcon className={`w-4 h-4 text-white transition-transform duration-200 ${isHovered ? 'animate-spin' : ''}`} />;
      case 'achievement':
        return <span className="text-white text-sm">🏆</span>;
      default:
        return <span className="text-white text-sm">{badge.icon}</span>;
    }
  };

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <div 
      className={`
        w-10 h-10 rounded-full ${badge.color} flex items-center justify-center 
        border-2 border-white shadow-lg cursor-pointer transition-all duration-300
        hover:scale-110 hover:shadow-xl hover:shadow-purple-200/50
        ${isAnimating ? 'animate-bounce' : ''}
        ${isHovered ? 'ring-2 ring-purple-300 ring-opacity-50' : ''}
        interactive
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className={`transition-transform duration-200 ${isHovered ? 'scale-110' : ''}`}>
        {getBadgeIcon()}
      </div>
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
    <div className={`modern-card p-6 ${className} group hover:shadow-strong`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 gradient-success rounded-full flex items-center justify-center shadow-lg floating">
            <ShoppingCartIcon className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
            Rewards
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-2 shadow-lg">
            <span className="text-lg font-bold text-white">
              {displayPoints.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Reward Badges */}
      <div className="flex gap-3 mb-6">
        {generateBadges().map((badge, index) => (
          <div 
            key={badge.id} 
            className="animate-fade-in-up" 
            style={{ animationDelay: `${0.1 * index}s` }}
          >
            <RewardBadgeComponent badge={badge} />
          </div>
        ))}
      </div>

      {/* Shop Rewards Button */}
      <button
        onClick={handleShopRewards}
        className="w-full btn-primary py-3 px-4 rounded-xl font-semibold text-white relative overflow-hidden group/btn"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <ShoppingCartIcon className="w-5 h-5" />
          Shop rewards
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
      </button>
    </div>
  );
}
