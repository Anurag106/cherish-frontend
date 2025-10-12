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
  }, [router]);

  // Show nothing while checking auth
  if (!sessionUtils.isAuthenticated()) {
    return null;
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <div className="glass rounded-2xl p-6">
          <h1 className="text-3xl font-light text-white text-center">
            Analytics
          </h1>
          <p className="text-white/70 text-center mt-2">
            View your analytics and insights
          </p>
        </div>
      </div>
    </div>
  );
}
