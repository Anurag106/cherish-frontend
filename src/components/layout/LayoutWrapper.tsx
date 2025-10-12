'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import { sessionUtils } from '@/utils/api/session';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  
  // Check if we should show the header (only on authenticated pages)
  const isAuthenticated = sessionUtils.isAuthenticated();
  
  // Routes where we don't show the header
  const publicRoutes = ['/', '/login', '/register', '/forgot-password'];
  const isPublicRoute = publicRoutes.includes(pathname);
  
  const showHeader = isAuthenticated && !isPublicRoute;

  return (
    <>
      {showHeader && <Header />}
      {children}
    </>
  );
}

