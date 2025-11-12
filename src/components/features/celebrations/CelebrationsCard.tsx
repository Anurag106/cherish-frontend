'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { InformationCircleIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { celebrationsApi, CelebrationsData, Celebration } from '@/services/api/celebrations/celebrationsApi';
import { sessionUtils } from '@/utils/api/session';
import { Avatar } from '../../ui/Avatar';

interface CelebrationsCardProps {
  className?: string;
}

interface CelebrationItemProps {
  celebration: Celebration;
}

const CelebrationItem: React.FC<CelebrationItemProps> = ({ celebration }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getInitials = (fullName: string): string => {
    if (!fullName) return '??';
    const words = fullName.split(' ').filter(Boolean);
    if (words.length === 0) return '??';
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <div 
      className="flex items-center gap-3 py-2 px-3 rounded-lg transition-all duration-200 hover:bg-gray-50 cursor-pointer interactive group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`transition-transform duration-200 ${isHovered ? 'scale-110' : ''}`}>
        <Avatar
          src={undefined}
          initials={getInitials(celebration.userFullName)}
          size="md"
          className={`${celebration.avatarColor} shadow-lg`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 text-sm truncate group-hover:text-gray-700 transition-colors">
          {celebration.userFullName}
        </p>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 bg-blue-400 rounded-full flex-shrink-0 transition-all duration-200 ${isHovered ? 'animate-pulse' : ''}`}></div>
          <p className="text-xs text-gray-600 truncate group-hover:text-gray-500 transition-colors">
            {celebration.context}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function CelebrationsCard({ className = '' }: CelebrationsCardProps) {
  const router = useRouter();
  const [celebrationsData, setCelebrationsData] = useState<CelebrationsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCelebrationsData = async () => {
      // Ensure we're on the client side
      if (typeof window === 'undefined') {
        return;
      }

      try {
        const token = sessionUtils.getToken();
        if (!token) {
          setError('No authentication token available');
          setIsLoading(false);
          return;
        }

        console.log('🎉 Loading celebrations data...');
        const data = await celebrationsApi.getCelebrations(token);
        console.log('✅ Celebrations data loaded:', data);
        setCelebrationsData(data);
      } catch (err: any) {
        console.error('❌ Error loading celebrations data:', err);
        let errorMessage = 'Failed to load celebrations data';
        if (err.message) {
          errorMessage = `Failed to load celebrations data: ${err.message}`;
        }
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    loadCelebrationsData();
  }, []);

  const handleExploreAll = () => {
    router.push('/celebrations');
  };

  if (isLoading) {
    return (
      <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              <div className="h-6 w-24 bg-gray-200 rounded"></div>
            </div>
            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
          </div>
          <div className="h-4 w-16 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                  <div className="h-3 w-32 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${className}`}>
        <div className="text-center text-gray-500">
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!celebrationsData || celebrationsData.celebrations.length === 0) {
    return (
      <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${className}`}>
        <div className="text-center text-gray-500">
          <p className="text-sm">No celebrations data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`modern-card p-6 ${className} group hover:shadow-strong`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 gradient-warning rounded-full flex items-center justify-center shadow-lg floating">
            <span className="text-white text-sm">🎉</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
            Celebrations
          </h2>
        </div>
        <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-200 hover:scale-110 interactive">
          <InformationCircleIcon className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Recent Section */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-4">
          RECENT
        </h3>
        <div className="space-y-2">
          {celebrationsData.celebrations.map((celebration, index) => (
            <div 
              key={celebration.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <CelebrationItem celebration={celebration} />
            </div>
          ))}
        </div>
      </div>

      {/* Explore All Button */}
      <div className="text-center">
        <button
          onClick={handleExploreAll}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-semibold transition-all duration-200 hover:gap-3 interactive group/btn"
        >
          Explore all this month
          <ChevronRightIcon className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
