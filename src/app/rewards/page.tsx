'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { navigationManager } from '@/utils/navigation';
import { useUser } from '@/contexts/UserContext';
import { sessionUtils } from '@/utils/api/session';

export default function RewardsPage() {
  const router = useRouter();
  const { userProfile } = useUser();

  useEffect(() => {
    // Check authentication
    if (!sessionUtils.isAuthenticated()) {
      router.push('/login?redirect=/rewards');
      return;
    }
    
    // Set current page in navigation state
    navigationManager.setCurrentPage('rewards');
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
            Rewards
          </h1>
          <p className="text-white/70 text-center mt-2">
            Manage your rewards and points
          </p>
          {userProfile && (
            <div className="mt-6 text-center">
              <div className="glass rounded-lg p-6 border border-white/10 inline-block">
                <p className="text-white/50 text-sm mb-2">Your Available Points</p>
                <p className="text-white text-4xl font-light">{userProfile.availablePoints}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
