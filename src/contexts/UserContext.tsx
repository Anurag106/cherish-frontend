'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfileResponse } from '@/types/auth';
import { apiService } from '@/services/api';
import { sessionUtils } from '@/utils/session';

interface UserContextType {
  userProfile: UserProfileResponse | null;
  isLoading: boolean;
  error: string | null;
  loadUserProfile: () => Promise<void>;
  clearUserProfile: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUserProfile = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const token = sessionUtils.getToken();
      if (token) {
        const profile = await apiService.getUserProfile(token);
        setUserProfile(profile);
      }
    } catch (err) {
      const errorMessage = (err as any)?.message || 'Failed to load user profile';
      setError(errorMessage);
      console.error('Failed to load user profile:', err);
      
      // If 401, clear session
      if ((err as any)?.status === 401) {
        sessionUtils.clearSession();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearUserProfile = () => {
    setUserProfile(null);
    setError(null);
  };

  return (
    <UserContext.Provider 
      value={{ 
        userProfile, 
        isLoading, 
        error, 
        loadUserProfile, 
        clearUserProfile 
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

