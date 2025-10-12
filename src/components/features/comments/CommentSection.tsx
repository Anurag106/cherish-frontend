'use client';

import React, { useState } from 'react';
import { Comment as CommentType } from '@/types/api/recognition';
import { Avatar } from '../../ui/Avatar';
import { Button } from '../../ui/Button';
import { formatDistanceToNow } from 'date-fns';

interface CommentSectionProps {
  comments: CommentType[];
  onAddComment: () => void;
  className?: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  onAddComment,
  className = '',
}) => {
  const formatTimeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return 'Unknown time';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Comment Actions */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          onClick={onAddComment}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>Comment</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add-On</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          <span>Like</span>
        </Button>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <Avatar
              src={comment.user.avatarUrl}
              initials={comment.user.initials}
              size="md"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-gray-900">{comment.user.fullName}</span>
                {comment.amount && (
                  <span className="text-lg font-semibold text-green-600">
                    {comment.amount}
                  </span>
                )}
                <span className="text-sm text-gray-500">{formatTimeAgo(comment.createdAt)}</span>
              </div>
              <p className="text-gray-800">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Comment Button */}
      <div className="pt-3">
        <button
          onClick={onAddComment}
          className="w-full text-left p-3 rounded-lg border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors"
        >
          Add a comment
        </button>
      </div>
    </div>
  );
};
