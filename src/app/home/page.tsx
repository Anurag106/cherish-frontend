'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { navigationManager } from '@/utils/navigation';
import { useUser } from '@/contexts/UserContext';
import { sessionUtils } from '@/utils/session';
import { apiService } from '@/services/api';
import PostCreationPlaceholder from '@/components/PostCreationPlaceholder';
import { PostsList } from '@/components/PostsList';

export default function HomePage() {
  const router = useRouter();
  const { userProfile, isLoading: isLoadingProfile, loadUserProfile } = useUser();
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isLoadingHashtags, setIsLoadingHashtags] = useState(true);
  const [isPageReady, setIsPageReady] = useState(false);
  const [hasLoadedData, setHasLoadedData] = useState(false);

  useEffect(() => {
    // Check authentication immediately
    if (!sessionUtils.isAuthenticated()) {
      console.log('❌ Not authenticated - redirecting to login');
      router.push('/login?redirect=/home');
      return;
    }

    // Prevent multiple loads
    if (hasLoadedData) {
      return;
    }

    console.log('✅ Authenticated - loading page data');
    
    // Set current page in navigation state
    navigationManager.setCurrentPage('home');
    
    // Load all required data on page load
    const loadPageData = async () => {
      try {
        const loginData = sessionUtils.getLoginData();
        if (!loginData?.token) {
          router.push('/login?redirect=/home');
          return;
        }

        setHasLoadedData(true);

        // Load user profile if not already loaded
        if (!userProfile && !isLoadingProfile) {
          try {
            await loadUserProfile();
          } catch (profileError) {
            console.error('Failed to load user profile:', profileError);
            // Continue anyway - page can still work without profile
          }
        }

        // Load hashtags from API (only once)
        setIsLoadingHashtags(true);
        try {
          const hashtagsData = await apiService.getHashtags(loginData.token);
          const hashtagsList = Array.isArray(hashtagsData) 
            ? hashtagsData.map((h) => h.name)
            : [];
          setHashtags(hashtagsList);
          console.log('✅ Hashtags loaded:', hashtagsList.length);
        } catch (hashtagError: any) {
          console.warn('Hashtags API not available (404), using fallback hashtags');

        }
        setIsLoadingHashtags(false);

        // Mark page as ready
        setIsPageReady(true);
      } catch (error) {
        console.error('Error loading page data:', error);
        setIsLoadingHashtags(false);
        setIsPageReady(true); // Still show page even if hashtags fail
      }
    };
    console.log('Loading page data', hasLoadedData, router);
    loadPageData();
  }, [hasLoadedData]); // ✅ Removed router from dependencies

  // Show nothing while checking auth
  if (!sessionUtils.isAuthenticated()) {
    return null;
  }

  // Show loading state while data is being fetched
  if (isLoadingProfile || isLoadingHashtags || !isPageReady) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
          {isLoadingProfile && <p className="text-sm text-gray-500">Loading profile...</p>}
          {isLoadingHashtags && <p className="text-sm text-gray-500">Loading hashtags...</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto pt-6 space-y-6">
        <PostCreationPlaceholder hashtags={hashtags} />
        <PostsList />
      </div>
    </div>
  );
}
