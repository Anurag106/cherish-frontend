'use client';

import React, { useState } from 'react';
import { CommentCreateRequest, AddOnRequest } from '@/types/recognition';
import { Avatar } from './ui/Avatar';

interface UnifiedCommentFormProps {
  postId: string;
  onSubmitComment: (data: CommentCreateRequest) => Promise<void>;
  onSubmitAddOn: (data: AddOnRequest) => Promise<void>;
  onCancel: () => void;
  onSuccess: () => void;
  isSubmitting?: boolean;
  availablePoints?: number;
  userAvatar?: string;
  userInitials?: string;
  userName?: string;
}

const POINT_OPTIONS = [10, 15, 20, 25, 30, 50];

export const UnifiedCommentForm: React.FC<UnifiedCommentFormProps> = ({
  postId,
  onSubmitComment,
  onSubmitAddOn,
  onCancel,
  onSuccess,
  isSubmitting = false,
  availablePoints = 101,
  userAvatar,
  userInitials = 'AK',
  userName = 'Alex Klein',
}) => {
  const [value, setValue] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [showAmountPopup, setShowAmountPopup] = useState(false);
  const [includeGiver, setIncludeGiver] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);

  const handleSubmit = async () => {
    if (!value.trim() && !selectedAmount) return;

    try {
      // For now, submit as comment
      await onSubmitComment({
        postId,
        content: value.trim(),
        amount: selectedAmount || undefined,
        hashtags: undefined,
        includeGiver,
      });
      
      // Only reset form and close on success
      setValue('');
      setSelectedAmount(null);
      setShowAmountPopup(false);
      setIncludeGiver(false);
      onSuccess();
    } catch (error) {
      // Keep form open and data intact on failure
      console.error('Failed to submit comment:', error);
    }
  };

  const handleAmountClick = () => {
    setShowAmountPopup(!showAmountPopup);
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setShowAmountPopup(false);
  };

  const handleEmojiClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiSelect = (emoji: string) => {
    setValue(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO: Handle image upload
      console.log('Image selected:', file);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-start space-x-3">
        <Avatar
          src={userAvatar}
          initials={userInitials}
          size="md"
          className="bg-orange-500 mt-1"
        />
        
        <div className="flex-1">
          {/* Amount Button and Include Giver Toggle */}
          <div className="flex items-center gap-3 mb-3">
            <div className="relative">
              <button
                type="button"
                onClick={handleAmountClick}
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  selectedAmount 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className={selectedAmount ? 'text-white' : 'text-green-600'}>+</span>
                <span className="ml-1">{selectedAmount ? `${selectedAmount}` : 'Amount'}</span>
              </button>
              
              {/* Amount Options Popup */}
              {showAmountPopup && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-10 min-w-[280px]">
                  <div className="mb-2">
                    <input
                      type="number"
                      value={selectedAmount || ''}
                      onChange={(e) => setSelectedAmount(e.target.value ? parseInt(e.target.value) : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+10"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {POINT_OPTIONS.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => handleAmountSelect(amount)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                          selectedAmount === amount
                            ? 'bg-green-600 text-white'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        +{amount}
                      </button>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 text-center">
                    {availablePoints} points available to give!
                  </div>
                </div>
              )}
            </div>
            
            {/* Include Giver Toggle */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeGiver}
                onChange={(e) => setIncludeGiver(e.target.checked)}
                className="sr-only"
              />
              <div className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                includeGiver ? 'bg-blue-600' : 'bg-gray-300'
              }`}>
                <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                  includeGiver ? 'translate-x-5' : 'translate-x-1'
                }`} />
              </div>
              <span className="text-sm text-gray-700">Include giver</span>
            </label>
          </div>
          
          {/* Comment Input */}
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write a comment..."
            className="w-full text-sm text-gray-800 border-none outline-none resize-none focus:ring-0 min-h-[60px]"
            rows={3}
          />
          
          {/* Footer with Icons and Submit */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              {/* Emoji */}
              <div className="relative">
                <button
                  type="button"
                  onClick={handleEmojiClick}
                  className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                  title="Add emoji"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* Simple Emoji Picker */}
                {showEmojiPicker && (
                  <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-10">
                    <div className="grid grid-cols-6 gap-2">
                      {['😀', '😂', '😍', '🤔', '👍', '❤️', '🎉', '🔥', '💯', '👏', '🙌', '😊'].map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => handleEmojiSelect(emoji)}
                          className="p-2 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* GIF */}
              <button
                type="button"
                onClick={() => setShowGifPicker(!showGifPicker)}
                className="px-2 py-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                title="Add GIF"
              >
                GIF
              </button>
              
              {/* Image */}
              <label className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            
            <button
              type="button"
              onClick={handleSubmit}
              disabled={(!value.trim() && !selectedAmount) || isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              {isSubmitting ? 'Adding...' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};