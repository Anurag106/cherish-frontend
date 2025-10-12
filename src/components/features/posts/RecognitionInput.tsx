/**
 * Recognition Input Component
 * 
 * A rich text input that supports @mentions, +points, and #hashtags for employee recognition.
 * Built with react-mentions for accessibility and keyboard navigation.
 * 
 * MARKUP FORMAT:
 * - Mentions: @[John Doe](u-1)
 * - Hashtags: #[teamwork](teamwork)
 * - Points:   +[10](10)
 * 
 * USAGE:
 * ```tsx
 * import RecognitionInput from '@/components/RecognitionInput';
 * 
 * function Page() {
 *   return (
 *     <RecognitionInput
 *       onSubmit={(payload) => {
 *         // payload has mentions, hashtags, points, plainText
 *         console.log('Recognition data:', payload);
 *         fetch('/api/recognitions', { 
 *           method: 'POST', 
 *           body: JSON.stringify(payload) 
 *         });
 *       }}
 *       initialValue="@[John Doe](u-1) Great work on the project! +[10](10) #[teamwork](teamwork)"
 *       maxPoints={100}
 *       allowedPointValues={[5, 10, 20, 50]}
 *     />
 *   );
 * }
 * ```
 * 
 * FEATURES:
 * - Type @ to mention users (fetches from /api/users)
 * - Type # for hashtags (fetches from /api/hashtags)
 * - Type + for points menu (5, 10, 20, 50)
 * - Quick-add buttons for common point values
 * - Client-side validation with error messages
 * - Accessible keyboard navigation
 * - Debounced API calls with AbortController
 */

'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { MentionsInput, Mention as MentionComponent } from 'react-mentions';
import type { SuggestionDataItem } from 'react-mentions';
import { validateRecognitionText } from '@/utils/ui/parseRecognitionMarkup';
import { sessionUtils } from '@/utils/api/session';
import { usersApi } from '@/services/api/users/usersApi';
import { Popover } from '@headlessui/react';
import { FaceSmileIcon, GifIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Grid } from '@giphy/react-components';
import type { IGif } from '@giphy/js-types';

// Dynamically import emoji picker to avoid SSR issues
const EmojiPicker = dynamic(
  () => import('emoji-picker-react'),
  { ssr: false }
);

// Initialize Giphy API
const giphyFetch = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_API_KEY || 'YOUR_GIPHY_API_KEY_HERE');

interface RecognitionInputProps {
  onSubmit: (payload: { context: string; visibility: number }) => void;
  initialValue?: string;
  placeholder?: string;
  maxPoints?: number;
  allowedPointValues?: number[];
  className?: string;
  hashtags?: string[]; // Hashtags from API
  privacyLevel: number; // Privacy level from parent
}

export default function RecognitionInput({
  onSubmit,
  initialValue = '',
  placeholder = '@recipient Great work on the project! +10 #teamwork',
  maxPoints = 100,
  allowedPointValues = [5, 10, 20, 50],
  className = '',
  hashtags = [],
  privacyLevel,
}: RecognitionInputProps) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedGif, setSelectedGif] = useState<string | null>(null);
  const [selectedVisibility, setSelectedVisibility] = useState<number>(privacyLevel || 0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Force re-render when value changes to update button text
  const [forceRender, setForceRender] = useState(0);
  
  useEffect(() => {
    setForceRender(prev => prev + 1);
  }, [value]);

  // Debounced user search
  const fetchUsers = useCallback(
    async (query: string, callback: (data: SuggestionDataItem[]) => void) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      abortControllerRef.current = new AbortController();
      setIsLoadingUsers(true);

      try {
        const loginData = sessionUtils.getLoginData();
        if (!loginData?.token) {
          throw new Error('Authentication required');
        }

        let apiResponse;
        if (query.trim() === '') {
          // Fetch all recipients when no query
          apiResponse = await usersApi.getUserRecipients(loginData.token);
        } else {
          // Use autocomplete when there's a query
          apiResponse = await usersApi.autocompleteUsers(loginData.token, query);
        }
        
        // Handle the ApiResponse<List<UserMentionResponse>> format
        const userData = (apiResponse as any)?.Data || (apiResponse as any)?.data || apiResponse || [];
        
        // Get already mentioned users from the current text
        const mentionedUsers = value.match(/@\[([^\]]+)\]\(([^)]+)\)/g) || [];
        const mentionedUserIds = mentionedUsers.map(match => {
          const idMatch = match.match(/\(([^)]+)\)/);
          return idMatch ? idMatch[1] : '';
        });
        
        // Map users to format expected by react-mentions and filter out already mentioned users
        const users = (Array.isArray(userData) ? userData : [])
          .map((user: any) => ({
            id: user.UserId || user.userId,
            display: user.Username || user.username,
            department: user.Department || user.department,
          }))
          .filter((user: any) => !mentionedUserIds.includes(user.id)); // Filter out already mentioned users
        
        callback(users);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching users:', err);
          callback([]);
        }
      } finally {
        setIsLoadingUsers(false);
      }
    },
    [value] // Add value as dependency to re-filter when text changes
  );

  // Fetch hashtags for # - Use static hashtags from props
  const fetchHashtags = useCallback(
    (query: string, callback: (data: SuggestionDataItem[]) => void) => {
      // Get already used hashtags from the current text
      const usedHashtags = value.match(/#\[([^\]]+)\]\(([^)]+)\)/g) || [];
      const usedHashtagNames = usedHashtags.map(match => {
        const nameMatch = match.match(/#\[([^\]]+)\]/);
        return nameMatch ? nameMatch[1] : '';
      });
      
      // Filter hashtags based on query and exclude already used hashtags
      const filtered = hashtags
        .filter(tag => !query || tag.toLowerCase().includes(query.toLowerCase()))
        .filter(tag => !usedHashtagNames.includes(tag)) // Filter out already used hashtags
        .slice(0, 10)
        .map(tag => ({
          id: tag,
          display: tag,
        }));
      
      callback(filtered);
    },
    [hashtags, value] // Add value as dependency to re-filter when text changes
  );

  // Fetch points for + - Allow custom points and show suggestions
  const fetchPoints = useCallback(
    (query: string, callback: (data: SuggestionDataItem[]) => void) => {
      // Check if points have already been added
      const pointMatches = value.match(/\+(\d+)/g);
      const hasPoints = pointMatches && pointMatches.length > 0;
      
      if (hasPoints) {
        // If points already exist, don't show any suggestions
        callback([]);
        return;
      }
      
      // Show predefined point values as suggestions
      const suggestions = allowedPointValues.map((value) => ({
        id: value.toString(),
        display: value.toString(),
      }));
      callback(suggestions);
    },
    [allowedPointValues, value] // Add value as dependency to re-check when text changes
  );

  // Add points to editor as plain text
  const addPoints = (points: number) => {
    const pointsText = `+${points}`;
    setValue((prev) => {
      const trimmed = prev.trim();
      return trimmed ? `${trimmed} ${pointsText} ` : `${pointsText} `;
    });
    setError('');
  };

  // Image compression and handling
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (file.size > 5 * 1024 * 1024) {
        reject('File size should be less than 5MB');
        return;
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        const size = 250;
        canvas.width = size;
        canvas.height = size;

        if (ctx) {
          ctx.drawImage(img, 0, 0, size, size);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          resolve(compressedDataUrl);
        } else {
          reject('Failed to compress image');
        }
      };

      img.onerror = () => reject('Failed to load image');
      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedImage = await compressImage(file);
      setSelectedImage(compressedImage);
    } catch (error: any) {
      console.error('Error compressing image:', error);
      alert(error.message || 'Failed to compress image');
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEmojiSelect = (emojiData: any) => {
    setValue(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleGifSelect = (gif: IGif, e: React.SyntheticEvent<HTMLElement, Event>) => {
    e.preventDefault();
    setSelectedGif(gif.images.fixed_height.url);
    setShowGifPicker(false);
  };

  const fetchGifs = (offset: number) => giphyFetch.trending({ offset, limit: 10 });

  // Calculate total points from the text: (unique users mentioned) × (point value)
  const getTotalPoints = () => {
    // Get unique user mentions (both formats: @[display](id) and @username)
    const mentionedUsersMarkup = value.match(/@\[([^\]]+)\]\(([^)]+)\)/g) || [];
    const mentionedUsersSimple = value.match(/@\w+/g) || [];
    const uniqueUserCount = Math.max(
      new Set(mentionedUsersMarkup).size,
      new Set(mentionedUsersSimple).size
    );
    
    // Get the point value (first + value)
    const pointMatches = value.match(/\+(\d+)/g) || [];
    if (pointMatches.length === 0) return 0;
    
    const firstMatch = pointMatches[0];
    if (!firstMatch) return 0;
    
    const pointValue = parseInt(firstMatch.substring(1), 10);
    if (isNaN(pointValue)) return 0;
    
    // Total = unique users × point value
    const total = uniqueUserCount * pointValue;
    console.log('getTotalPoints calculation:', { value, uniqueUserCount, pointValue, total });
    return total;
  };

  // Handle form submission
  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setError('');

    // Convert markup to plain text for validation and submission
    const plainText = value
      .replace(/@\[([^\]]+)\]\(([^)]+)\)/g, '@$1') // Convert @[name](id) to @name
      .replace(/#\[([^\]]+)\]\(([^)]+)\)/g, '#$1') // Convert #[tag](tag) to #tag
      .replace(/\+([^\[\s]+)/g, '+$1') // Keep +values as is (already plain text)
      .trim();

    // Validate plain text for recognition requirements
    const validation = validateRecognitionText(plainText, {
      maxPoints,
      allowedPointValues,
    });

    if (!validation.isValid) {
      setError(validation.error || 'Invalid recognition');
      return;
    }

    setIsSubmitting(true);
    try {
      // Submit context and visibility to the API
      onSubmit({
        context: plainText, // Send plain text without IDs
        visibility: selectedVisibility
      });
      
      // Clear form on success
      setValue('');
      setSelectedImage(null);
      setSelectedGif(null);
      setError('');
    } catch (err) {
      setError('Failed to submit recognition. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg">
        {/* Pill Selection Area */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex gap-2 mb-3">
            {/* Recipient Pill */}
            <button
              type="button"
              onClick={() => {
                const textarea = document.querySelector('.mentions-input textarea') as HTMLTextAreaElement;
                if (textarea) {
                  const currentValue = textarea.value;
                  const cursorPos = textarea.selectionStart;
                  const newValue = currentValue.slice(0, cursorPos) + '@' + currentValue.slice(cursorPos);
                  setValue(newValue);
                  setTimeout(() => {
                    textarea.focus();
                    textarea.setSelectionRange(cursorPos + 1, cursorPos + 1);
                  }, 0);
                }
              }}
              className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors cursor-pointer"
            >
              <span>@</span>
              <span>Recipient</span>
            </button>
            
            {/* Amount Pill */}
            <button
              type="button"
              onClick={() => {
                const textarea = document.querySelector('.mentions-input textarea') as HTMLTextAreaElement;
                if (textarea) {
                  const currentValue = textarea.value;
                  const cursorPos = textarea.selectionStart;
                  const newValue = currentValue.slice(0, cursorPos) + '+' + currentValue.slice(cursorPos);
                  setValue(newValue);
                  setTimeout(() => {
                    textarea.focus();
                    textarea.setSelectionRange(cursorPos + 1, cursorPos + 1);
                  }, 0);
                }
              }}
              className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600 transition-colors cursor-pointer"
            >
              <span>+</span>
              <span>Amount</span>
            </button>
            
            {/* Hashtag Pill */}
            <button
              type="button"
              onClick={() => {
                const textarea = document.querySelector('.mentions-input textarea') as HTMLTextAreaElement;
                if (textarea) {
                  const currentValue = textarea.value;
                  const cursorPos = textarea.selectionStart;
                  const newValue = currentValue.slice(0, cursorPos) + '#' + currentValue.slice(cursorPos);
                  setValue(newValue);
                  setTimeout(() => {
                    textarea.focus();
                    textarea.setSelectionRange(cursorPos + 1, cursorPos + 1);
                  }, 0);
                }
              }}
              className="flex items-center gap-1 px-3 py-2 bg-purple-500 text-white rounded-full text-sm font-medium hover:bg-purple-600 transition-colors cursor-pointer"
            >
              <span>#</span>
              <span>Hashtag</span>
            </button>
          </div>
        </div>

        {/* Main Input Area */}
        <div className="relative px-4">
          <MentionsInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className="mentions-input"
            style={{
              control: {
                fontSize: '16px',
                fontWeight: 'normal',
                minHeight: '60px',
              },
              '&multiLine': {
                control: {
                  fontFamily: 'inherit',
                  fontSize: '16px',
                  minHeight: '60px',
                  padding: '12px',
                  border: 'none',
                  outline: 'none',
                  resize: 'none',
                  borderRadius: '12px',
                },
                highlighter: {
                  padding: '12px',
                  border: 'none',
                  borderRadius: '12px',
                  minHeight: '60px',
                  overflow: 'hidden',
                },
                input: {
                  padding: '12px',
                  border: 'none',
                  outline: 'none',
                  borderRadius: '12px',
                  minHeight: '60px',
                  resize: 'none',
                },
              },
              suggestions: {
                list: {
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  fontSize: '14px',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  zIndex: 50,
                },
                item: {
                  padding: '12px',
                  borderBottom: '1px solid #f3f4f6',
                  '&focused': {
                    backgroundColor: '#f3f4f6',
                  },
                },
              },
            }}
            a11ySuggestionsListLabel="Recognition suggestions"
          >
            {/* @mentions */}
            <MentionComponent
              trigger="@"
              data={fetchUsers}
              markup="@[__display__](__id__)"
              displayTransform={(id: string, display: string) => `@${display}`}
              style={{}}
              renderSuggestion={(suggestion: any) => {
                return (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                      {suggestion.display.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium">{suggestion.display}</div>
                      {suggestion.department && (
                        <div className="text-xs text-gray-500">{suggestion.department}</div>
                      )}
                    </div>
                  </div>
                );
              }}
            />

            {/* #hashtags */}
            <MentionComponent
              trigger="#"
              data={fetchHashtags}
              markup="#[__display__](__id__)"
              displayTransform={(id: string, display: string) => `#${display}`}
              style={{}}
            />

            {/* +points */}
            <MentionComponent
              trigger="+"
              data={fetchPoints}
              markup="+__display__"
              displayTransform={(id: string, display: string) => `+${display}`}
              style={{}}
            />
          </MentionsInput>
          
          {/* Loading Indicator */}
          {isLoadingUsers && (
            <div className="absolute top-2 right-4 flex items-center gap-1 text-xs text-gray-500">
              <div className="animate-spin rounded-full h-3 w-3 border-b border-blue-600"></div>
              Loading...
            </div>
          )}
        </div>

        {/* Media Attachments */}
        {(selectedImage || selectedGif) && (
          <div className="px-4 pb-4">
            <div className="relative inline-block">
              {(selectedImage || selectedGif) && (
                <img
                  src={selectedImage || selectedGif || ''}
                  alt="Attachment"
                  className="w-20 h-20 object-cover rounded-lg"
                />
              )}
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setSelectedGif(null);
                }}
                className="absolute top-1 right-1 p-1 bg-black/60 hover:bg-black/80 rounded-full transition-colors cursor-pointer"
              >
                <XMarkIcon className="w-3 h-3 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* Bottom Controls */}
        <div className="flex items-center justify-between px-4 py-4 border-t border-gray-100">
          {/* Media Buttons */}
          <div className="flex items-center gap-3">
            <Popover className="relative">
              <Popover.Button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <FaceSmileIcon className="w-5 h-5 text-gray-600" />
              </Popover.Button>
              {showEmojiPicker && (
                <Popover.Panel className="absolute bottom-full left-0 mb-2 z-50">
                  <EmojiPicker onEmojiClick={handleEmojiSelect} />
                </Popover.Panel>
              )}
            </Popover>

            <Popover className="relative">
              <Popover.Button
                type="button"
                onClick={() => setShowGifPicker(!showGifPicker)}
                className="flex flex-col items-center gap-1 p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                
                <GifIcon className="w-5 h-5 text-gray-600" />
              </Popover.Button>
              {showGifPicker && (
                <Popover.Panel className="absolute bottom-full left-0 mb-2 z-50">
                  <div className="w-80 h-60 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    <Grid
                      width={320}
                      columns={2}
                      gutter={6}
                      fetchGifs={fetchGifs}
                      onGifClick={handleGifSelect}
                    />
                  </div>
                </Popover.Panel>
              )}
            </Popover>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <PhotoIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={() => handleSubmit()}
            disabled={isSubmitting || !value.trim()}
            className="px-6 py-3 bg-teal-500 text-white text-sm font-medium rounded-xl hover:bg-teal-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2 min-w-[140px] justify-center cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Submitting...
              </>
            ) : (
              <>
                {getTotalPoints() > 0 ? (
                  `Give ${getTotalPoints()} points`
                ) : (
                  'Give Recognition'
                )}
              </>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="px-4 pb-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}