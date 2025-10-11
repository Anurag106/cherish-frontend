'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { sessionUtils } from '@/utils/session';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect authenticated users to home page
    if (sessionUtils.isAuthenticated()) {
      router.push('/home');
    } else {
      // Redirect unauthenticated users to login
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass rounded-2xl p-8 md:p-12 max-w-2xl w-full text-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-light text-white mb-4">
            Frontend v2
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed">
            A modern, minimal Next.js application with a glassy design
          </p>
          
          <div className="pt-8 space-y-4">
            <div className="glass rounded-lg p-4 border border-white/10">
              <h2 className="text-xl font-medium text-white mb-2">
                Features
              </h2>
              <ul className="text-white/70 space-y-1 text-sm">
                <li>• Next.js 15 with App Router</li>
                <li>• TypeScript for type safety</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Responsive glass morphism design</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/login">
                <button className="glass rounded-full px-6 py-3 text-white hover:bg-white/10 transition-all duration-300 border border-white/20">
                  Get Started
                </button>
              </Link>
              <button className="glass rounded-full px-6 py-3 text-white hover:bg-white/10 transition-all duration-300 border border-white/20">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
