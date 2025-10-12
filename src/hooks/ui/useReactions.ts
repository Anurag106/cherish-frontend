'use client';

import { useState, useEffect } from 'react';
import { Like } from '@/types/api/recognition';

interface ClientReaction {
  postId: string;
  reactionType: Like['reactionType'];
  timestamp: number;
}

const REACTIONS_STORAGE_KEY = 'cherish_reactions';

export const useReactions = () => {
  const [clientReactions, setClientReactions] = useState<ClientReaction[]>([]);

  // Load reactions from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(REACTIONS_STORAGE_KEY);
      if (stored) {
        setClientReactions(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading reactions from localStorage:', error);
    }
  }, []);

  // Save reactions to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(REACTIONS_STORAGE_KEY, JSON.stringify(clientReactions));
    } catch (error) {
      console.error('Error saving reactions to localStorage:', error);
    }
  }, [clientReactions]);

  const addReaction = (postId: string, reactionType: Like['reactionType']) => {
    setClientReactions(prev => {
      // Remove any existing reaction for this post
      const filtered = prev.filter(r => r.postId !== postId);
      // Add new reaction
      return [...filtered, { postId, reactionType, timestamp: Date.now() }];
    });
  };

  const removeReaction = (postId: string) => {
    setClientReactions(prev => prev.filter(r => r.postId !== postId));
  };

  const getReaction = (postId: string): Like['reactionType'] | null => {
    const reaction = clientReactions.find(r => r.postId === postId);
    return reaction ? reaction.reactionType : null;
  };

  const hasReaction = (postId: string): boolean => {
    return clientReactions.some(r => r.postId === postId);
  };

  const clearAllReactions = () => {
    setClientReactions([]);
  };

  return {
    addReaction,
    removeReaction,
    getReaction,
    hasReaction,
    clearAllReactions,
    clientReactions,
  };
};
