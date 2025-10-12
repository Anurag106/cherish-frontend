'use client';

import React, { useState } from 'react';
import { CommentCreateRequest } from '@/types/recognition';
import { Button } from './ui/Button';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CommentCreateRequest) => void;
  postId: string;
}

export const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  postId,
}) => {
  const [content, setContent] = useState('');
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState('');
  const [includeGiver, setIncludeGiver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        postId,
        content: content.trim(),
        amount,
        hashtags: hashtags.length > 0 ? hashtags : undefined,
        includeGiver,
      });
      
      // Reset form
      setContent('');
      setAmount(undefined);
      setHashtags([]);
      setHashtagInput('');
      setIncludeGiver(false);
      onClose();
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddHashtag = () => {
    if (hashtagInput.trim() && !hashtags.includes(hashtagInput.trim())) {
      setHashtags([...hashtags, hashtagInput.trim()]);
      setHashtagInput('');
    }
  };

  const handleRemoveHashtag = (hashtag: string) => {
    setHashtags(hashtags.filter(h => h !== hashtag));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit(e);
    } else if (e.key === 'Enter' && hashtagInput.trim()) {
      e.preventDefault();
      handleAddHashtag();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add Comment</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-1">
            <XMarkIcon className="w-6 h-6" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Amount Input */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Amount (optional)
            </label>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-green-600">+</span>
              <input
                type="number"
                id="amount"
                value={amount || ''}
                onChange={(e) => setAmount(e.target.value ? parseInt(e.target.value) : undefined)}
                min="1"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter amount"
              />
            </div>
          </div>

          {/* Comment Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Comment
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyPress}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Write your comment..."
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Press Ctrl+Enter to submit
            </p>
          </div>

          {/* Hashtags */}
          <div>
            <label htmlFor="hashtags" className="block text-sm font-medium text-gray-700 mb-2">
              Hashtags (optional)
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={hashtagInput}
                onChange={(e) => setHashtagInput(e.target.value.replace('#', ''))}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddHashtag())}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add hashtag (without #)"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddHashtag}
                disabled={!hashtagInput.trim()}
              >
                Add
              </Button>
            </div>
            {hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {hashtags.map((hashtag) => (
                  <span
                    key={hashtag}
                    className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    #{hashtag}
                    <button
                      type="button"
                      onClick={() => handleRemoveHashtag(hashtag)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Include Giver Toggle */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="includeGiver"
              checked={includeGiver}
              onChange={(e) => setIncludeGiver(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="includeGiver" className="text-sm font-medium text-gray-700">
              Include giver in the comment
            </label>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={!content.trim() || isSubmitting}
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
