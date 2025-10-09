'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { sessionUtils } from '@/utils/session';

export default function DashboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [expiresAt, setExpiresAt] = useState<string>('');

  useEffect(() => {
    // Check authentication on component mount
    if (!sessionUtils.isAuthenticated()) {
      router.push('/login');
      return;
    }

    // Get user data from session
    const storedUsername = sessionUtils.getUsername();
    const storedExpiresAt = sessionUtils.getExpiresAt();
    
    if (storedUsername) setUsername(storedUsername);
    if (storedExpiresAt) setExpiresAt(storedExpiresAt);
  }, [router]);

  const handleLogout = () => {
    sessionUtils.clearSession();
    router.push('/login');
  };

  const formatExpiryTime = (expiryString: string) => {
    if (!expiryString) return 'Unknown';
    try {
      return new Date(expiryString).toLocaleString();
    } catch {
      return 'Invalid date';
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="glass rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-light text-white mb-2">
                Welcome to Dashboard
              </h1>
              <p className="text-white/70">
                Hello, <span className="text-white font-medium">{username}</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="glass rounded-lg px-6 py-2 text-white hover:bg-white/10 transition-all duration-300 border border-white/20"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-medium text-white mb-2">Session Info</h3>
            <p className="text-white/70 text-sm">
              Token expires: {formatExpiryTime(expiresAt)}
            </p>
          </div>
          
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-medium text-white mb-2">User Status</h3>
            <p className="text-green-400 text-sm">● Active</p>
          </div>
          
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-medium text-white mb-2">Last Login</h3>
            <p className="text-white/70 text-sm">Just now</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="glass rounded-xl p-6">
            <h2 className="text-xl font-medium text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full glass rounded-lg p-4 text-left text-white hover:bg-white/10 transition-all duration-300 border border-white/20">
                <div className="font-medium">View Profile</div>
                <div className="text-sm text-white/70">Manage your account settings</div>
              </button>
              <button className="w-full glass rounded-lg p-4 text-left text-white hover:bg-white/10 transition-all duration-300 border border-white/20">
                <div className="font-medium">Settings</div>
                <div className="text-sm text-white/70">Configure your preferences</div>
              </button>
              <button className="w-full glass rounded-lg p-4 text-left text-white hover:bg-white/10 transition-all duration-300 border border-white/20">
                <div className="font-medium">Help & Support</div>
                <div className="text-sm text-white/70">Get assistance when you need it</div>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass rounded-xl p-6">
            <h2 className="text-xl font-medium text-white mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 glass rounded-lg border border-white/10">
                <div>
                  <div className="text-white text-sm font-medium">Logged in successfully</div>
                  <div className="text-white/70 text-xs">Just now</div>
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between p-3 glass rounded-lg border border-white/10">
                <div>
                  <div className="text-white text-sm font-medium">Session started</div>
                  <div className="text-white/70 text-xs">A few seconds ago</div>
                </div>
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-white/50 text-sm">
            Dashboard • Secure Session Active
          </p>
        </div>
      </div>
    </div>
  );
}
