'use client';

import React, { useEffect, useState } from 'react';
import { InformationCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { trendingApi, TrendingData, TrendingItem } from '@/services/api/trending/trendingApi';
import { sessionUtils } from '@/utils/api/session';

interface TrendingCardProps {
  className?: string;
}

interface TrendingItemComponentProps {
  item: TrendingItem;
}

const TrendingItemComponent: React.FC<TrendingItemComponentProps> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="flex items-center justify-between py-2 px-3 rounded-lg transition-all duration-200 hover:bg-gray-50 cursor-pointer interactive group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={`text-sm font-medium ${item.color} truncate flex-1 mr-2 group-hover:scale-105 transition-transform duration-200`}>
        {item.name}
      </span>
      <span className={`text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${isHovered ? 'bg-gray-200 scale-110' : ''}`}>
        {item.count}
      </span>
    </div>
  );
};

export default function TrendingCard({ className = '' }: TrendingCardProps) {
  const [trendingData, setTrendingData] = useState<TrendingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllCompanyValues, setShowAllCompanyValues] = useState(false);
  const [showAllCustomTags, setShowAllCustomTags] = useState(false);

  useEffect(() => {
    const loadTrendingData = async () => {
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

        console.log('📈 Loading trending data...');
        const data = await trendingApi.getTrending(token);
        console.log('✅ Trending data loaded:', data);
        setTrendingData(data);
      } catch (err: any) {
        console.error('❌ Error loading trending data:', err);
        let errorMessage = 'Failed to load trending data';
        if (err.message) {
          errorMessage = `Failed to load trending data: ${err.message}`;
        }
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    loadTrendingData();
  }, []);

  const handleShowMoreCompanyValues = () => {
    setShowAllCompanyValues(!showAllCompanyValues);
  };

  const handleShowMoreCustomTags = () => {
    setShowAllCustomTags(!showAllCustomTags);
  };

  if (isLoading) {
    return (
      <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              <div className="h-6 w-20 bg-gray-200 rounded"></div>
            </div>
            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
          </div>
          <div className="space-y-6">
            <div>
              <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    <div className="h-6 w-12 bg-gray-200 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-px bg-gray-200"></div>
            <div>
              <div className="h-4 w-20 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    <div className="h-6 w-8 bg-gray-200 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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

  if (!trendingData) {
    return (
      <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${className}`}>
        <div className="text-center text-gray-500">
          <p className="text-sm">No trending data available</p>
        </div>
      </div>
    );
  }

  const displayedCompanyValues = showAllCompanyValues 
    ? trendingData.companyValues 
    : trendingData.companyValues.slice(0, 3);

  const displayedCustomTags = showAllCustomTags 
    ? trendingData.customTags 
    : trendingData.customTags.slice(0, 3);

  return (
    <div className={`modern-card p-6 ${className} group hover:shadow-strong`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center shadow-lg floating">
            <span className="text-white text-sm">📈</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
            Trending
          </h2>
        </div>
        <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-200 hover:scale-110 interactive">
          <InformationCircleIcon className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Company Values Section */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-4">
          COMPANY VALUES
        </h3>
        <div className="space-y-2">
          {displayedCompanyValues.map((item, index) => (
            <div 
              key={item.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <TrendingItemComponent item={item} />
            </div>
          ))}
        </div>
        {trendingData.companyValues.length > 3 && (
          <button
            onClick={handleShowMoreCompanyValues}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm font-semibold mt-3 transition-all duration-200 hover:gap-3 interactive group/btn"
          >
            Show more
            <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${showAllCompanyValues ? 'rotate-180' : ''} group-hover/btn:scale-110`} />
          </button>
        )}
      </div>

      {/* Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6"></div>

      {/* Custom Tags Section */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-4">
          CUSTOM TAGS
        </h3>
        <div className="space-y-2">
          {displayedCustomTags.map((item, index) => (
            <div 
              key={item.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${0.1 * (index + 3)}s` }}
            >
              <TrendingItemComponent item={item} />
            </div>
          ))}
        </div>
        {trendingData.customTags.length > 3 && (
          <button
            onClick={handleShowMoreCustomTags}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm font-semibold mt-3 transition-all duration-200 hover:gap-3 interactive group/btn"
          >
            Show more
            <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${showAllCustomTags ? 'rotate-180' : ''} group-hover/btn:scale-110`} />
          </button>
        )}
      </div>
    </div>
  );
}
