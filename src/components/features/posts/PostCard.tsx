'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Post, Like, Comment, CommentResponse } from '@/types/api/recognition';
import { Avatar } from '../../ui/Avatar';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { useReactions } from '@/hooks/ui/useReactions';
import { UnifiedCommentForm } from '../comments/UnifiedCommentForm';
import { HeartIcon, ChatBubbleLeftIcon, PlusIcon, BookmarkIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { HandThumbUpIcon, HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { formatDistanceToNow } from 'date-fns';
import { getInitialsFromDisplay } from '@/utils/ui/initials';

interface PostCardProps {
  post: Post;
  onComment: (data: any) => void;
  onAddOn: (data: any) => void;
  onLike: (postId: string, reactionType: Like['reactionType']) => void;
  onUnlike: (postId: string) => void;
  onShowLikes: (postId: string) => void;
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

const reactionColors = {
  like: 'hover:bg-blue-100',
  love: 'hover:bg-red-100',
  laugh: 'hover:bg-yellow-100',
  wow: 'hover:bg-purple-100',
  sad: 'hover:bg-gray-100',
  angry: 'hover:bg-red-100',
};

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onComment,
  onAddOn,
  onLike,
  onUnlike,
  onShowLikes,
  className = '',
}) => {
  const { addReaction, removeReaction, getReaction, hasReaction } = useReactions();
  const [showReactions, setShowReactions] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const likeButtonRef = useRef<HTMLButtonElement>(null);
  
  // Check if user has reacted to this post
  const userReaction = getReaction(post.id);
  const userHasReacted = hasReaction(post.id);

  const handleLikeHover = () => {
    const timeout = setTimeout(() => {
      setShowReactions(true);
    }, 300);
    setHoverTimeout(timeout);
  };

  const handleLikeLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    // Don't hide immediately, let user click
    setTimeout(() => {
      if (!showReactions) {
        setShowReactions(false);
      }
    }, 200);
  };

  const handleReactionPopupMouseEnter = () => {
    // Keep popup open when hovering over it
    setShowReactions(true);
  };

  const handleReactionPopupMouseLeave = () => {
    setShowReactions(false);
  };

  const handleReactionClick = (reactionType: Like['reactionType']) => {
    if (userHasReacted && userReaction === reactionType) {
      removeReaction(post.id);
      onUnlike(post.id);
    } else {
      addReaction(post.id, reactionType);
      onLike(post.id, reactionType);
    }
    setShowReactions(false);
  };

  const handleDirectLike = () => {
    if (userHasReacted) {
      removeReaction(post.id);
      onUnlike(post.id);
    } else {
      addReaction(post.id, 'like');
      onLike(post.id, 'like');
    }
  };

  const formatTimeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return 'Unknown time';
    }
  };

  const handleCommentSubmit = async (data: any) => {
    await onComment(data);
  };

  const handleAddOnSubmit = async (data: any) => {
    await onAddOn(data);
  };

  const handleFormSuccess = () => {
    setShowCommentForm(false);
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Badge variant="success" size="sm" className="bg-green-600 text-white">
            +{post.amount}
          </Badge>
          
          {/* Mentioned Users - Overlapping Pattern */}
          {post.mentions && post.mentions.length > 0 && (
            <div className="flex -space-x-2">
              {post.mentions.slice(0, 4).map((mention, index) => (
                <div
                  key={mention.id}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-sm text-white font-semibold shadow-sm border-2 border-white relative z-10"
                  style={{ zIndex: 10 - index }}
                  title={mention.display}
                >
                  {getInitialsFromDisplay(mention.display)}
                </div>
              ))}
              {post.mentions.length > 4 && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-sm text-white font-semibold shadow-sm border-2 border-white relative z-0">
                  +{post.mentions.length - 4}
                </div>
              )}
            </div>
          )}
          
          {/* Giver Avatars */}
          <div className="flex -space-x-2">
            {post.givers.slice(0, 3).map((giver, index) => (
              <Avatar
                key={giver.id}
                src={giver.avatarUrl}
                initials={giver.initials}
                size="sm"
                className="border-2 border-white"
              />
            ))}
            {post.givers.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                +{post.givers.length - 3}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">{formatTimeAgo(post.createdAt)}</span>
          <Button variant="ghost" size="sm" className="p-1">
            <BookmarkIcon className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="p-1">
            <EllipsisHorizontalIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Avatar
            src={post.user.avatarUrl}
            initials={post.user.initials}
            size="md"
            className="mr-3"
          />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">{post.user.fullName}</span>
                </div>
              </div>
        </div>
        
        <div className="text-gray-800 leading-relaxed">
          {post.context}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCommentForm(!showCommentForm)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ChatBubbleLeftIcon className="w-5 h-5" />
            <span>Comment</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCommentForm(!showCommentForm)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add-On</span>
          </Button>
        </div>

        {/* Like Button with Reactions */}
        <div className="relative">
          <button
            ref={likeButtonRef}
            onClick={handleDirectLike}
            onMouseEnter={handleLikeHover}
            onMouseLeave={handleLikeLeave}
            className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              userHasReacted 
                ? 'text-blue-600 hover:text-blue-700' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {userHasReacted ? (
              <HandThumbUpIcon className="w-5 h-5" />
            ) : (
              <HandThumbUpIcon className="w-5 h-5" />
            )}
            <span>Like</span>
          </button>

          {/* Reaction Popup */}
          {showReactions && (
            <div 
              className="absolute bottom-full right-0 mb-2 bg-white rounded-full shadow-lg border border-gray-200 p-2 flex space-x-1 z-10"
              onMouseEnter={handleReactionPopupMouseEnter}
              onMouseLeave={handleReactionPopupMouseLeave}
            >
              {Object.entries(reactionEmojis).map(([reaction, emoji]) => (
                <button
                  key={reaction}
                  onClick={() => handleReactionClick(reaction as Like['reactionType'])}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors ${reactionColors[reaction as keyof typeof reactionColors]}`}
                  title={reaction}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Likes Display */}
      {post.likesCount > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <button
            onClick={() => onShowLikes(post.id)}
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <div className="flex -space-x-1">
              {post.likes.slice(0, 3).map((like, index) => (
                <div
                  key={like.id}
                  className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs text-white border border-white"
                >
                  {reactionEmojis[like.reactionType]}
                </div>
              ))}
            </div>
            <span>
              {post.likesCount === 1 
                ? '1 person reacted' 
                : `${post.likesCount} people reacted`
              }
            </span>
          </button>
        </div>
      )}

      {/* Comments Display */}
      {post.latestComments && Array.isArray(post.latestComments) && post.latestComments.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          {/* Show first 2 comments */}
          <div className="space-y-3">
            {(showAllComments ? post.latestComments : post.latestComments.slice(0, 2)).map((comment) => (
              <div key={comment.id} className="flex space-x-3 py-2">
                <Avatar
                  src={undefined}
                  initials={getInitialsFromDisplay(comment.userFullName)}
                  size="sm"
                  className="mt-0.5 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-900 text-sm">
                      {comment.userFullName}
                    </span>
                    {comment.points !== undefined && comment.points !== null && comment.points > 0 && (
                      <Badge variant="success" size="sm" className="bg-green-600 text-white text-xs">
                        +{comment.points}
                      </Badge>
                    )}
                    <span className="text-xs text-gray-500">
                      {formatTimeAgo(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-800 text-sm leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Comments Button */}
          {post.latestComments.length > 2 && !showAllComments && (
            <button
              onClick={() => setShowAllComments(true)}
              className="mt-3 text-sm text-gray-600 hover:text-gray-900 font-medium"
            >
              View {post.latestComments.length - 2} more comment{post.latestComments.length - 2 !== 1 ? 's' : ''}
            </button>
          )}

          {/* Show Less Button */}
          {post.latestComments.length > 2 && showAllComments && (
            <button
              onClick={() => setShowAllComments(false)}
              className="mt-3 text-sm text-gray-600 hover:text-gray-900 font-medium"
            >
              Show less
            </button>
          )}
        </div>
      )}


      {/* Unified Comment/Add-On Form */}
      {showCommentForm && (
        <UnifiedCommentForm
          postId={post.id}
          onSubmitComment={handleCommentSubmit}
          onSubmitAddOn={handleAddOnSubmit}
          onCancel={() => setShowCommentForm(false)}
          onSuccess={handleFormSuccess}
          isSubmitting={isSubmitting}
          availablePoints={101} // TODO: Get from user profile
          userAvatar={undefined} // TODO: Get from user profile
          userInitials="AK" // TODO: Get from user profile
          userName="Alex Klein" // TODO: Get from user profile
        />
      )}
    </div>
  );
};
