'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { navigationManager } from '@/utils/navigation';
import { sessionUtils } from '@/utils/api/session';

export default function AnalyticsPage() {
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    if (!sessionUtils.isAuthenticated()) {
      router.push('/login?redirect=/analytics');
      return;
    }
    
    // Set current page in navigation state
    navigationManager.setCurrentPage('analytics');
    
    // Redirect to team dashboard as default analytics page
    router.push('/analytics/team-dashboard');
  }, [router]);

  // Show nothing while redirecting
  return null;
}
