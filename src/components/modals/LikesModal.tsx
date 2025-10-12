'use client';

import React from 'react';
import { Like } from '@/types/api/recognition';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface LikesModalProps {
  isOpen: boolean;
  onClose: () => void;
  likes: Like[];
  className?: string;
}

const reactionEmojis = {
  like: '👍',
  love: '❤️',
  laugh: '😂',
  wow: '😮',
  sad: '😢',
  angry: '😠',
};

const reactionLabels = {
  like: 'liked',
  love: 'loved',
  laugh: 'laughed',
  wow: 'was amazed',
  sad: 'felt sad',
  angry: 'was angry',
};

export const LikesModal: React.FC<LikesModalProps> = ({
  isOpen,
  onClose,
  likes,
  className = '',
}) => {
  if (!isOpen) return null;

  // Group likes by reaction type
  const groupedLikes = likes.reduce((acc, like) => {
    if (!acc[like.reactionType]) {
      acc[like.reactionType] = [];
    }
    acc[like.reactionType].push(like);
    return acc;
  }, {} as Record<string, Like[]>);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Reactions ({likes.length})
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-1">
            <XMarkIcon className="w-6 h-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[60vh]">
          {Object.entries(groupedLikes).map(([reactionType, reactionLikes]) => (
            <div key={reactionType} className="p-4 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-2xl">{reactionEmojis[reactionType as keyof typeof reactionEmojis]}</span>
                <span className="font-medium text-gray-900">
                  {reactionLabels[reactionType as keyof typeof reactionLabels]} ({reactionLikes.length})
                </span>
              </div>
              
              <div className="space-y-3">
                {reactionLikes.map((like) => (
                  <div key={like.id} className="flex items-center space-x-3">
                    <Avatar
                      src={like.user.avatarUrl}
                      initials={like.user.initials}
                      size="md"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {like.user.fullName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(like.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <Button
            onClick={onClose}
            className="w-full"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
