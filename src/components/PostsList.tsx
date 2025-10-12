'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Post, Comment, Like, CommentCreateRequest, LikeRequest, PostFilterRequest } from '@/types/recognition';
import { PostCard } from './PostCard';
import { CommentSection } from './CommentSection';
import { LikesModal } from './LikesModal';
import { apiService } from '@/services/api';
import { sessionUtils } from '@/utils/session';
import { transformPosts } from '@/utils/postTransformers';

interface PostsListProps {
  className?: string;
  feedFilters?: {
    filterByTeam?: boolean;
    filterByUserId?: string;
  };
}

export const PostsList: React.FC<PostsListProps> = ({ className = '', feedFilters }) => {
  const getToken = useCallback(() => {
    const loginData = sessionUtils.getLoginData();
    return loginData?.token;
  }, []);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [likesModal, setLikesModal] = useState<{ isOpen: boolean; likes: Like[] }>({
    isOpen: false,
    likes: [],
  });

  // Refs for scroll detection
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Load posts function
  const loadPosts = useCallback(async (cursor: string | null = null, append: boolean = false) => {
    const token = getToken();
    if (!token) {
      console.error('No token available');
      setError('Authentication required. Please log in again.');
      return;
    }

    try {
      if (!append) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);

      const filters: PostFilterRequest = {
        pageSize: 8,
        cursor: cursor || undefined,
        sortOrder: 'CreatedAtDesc',
        ...feedFilters, // Apply feed filters
      };

      const response = await apiService.getPosts(token, filters);
      const transformedPosts = transformPosts(response.posts || []);

      if (append) {
        setPosts(prev => [...prev, ...transformedPosts]);
      } else {
        setPosts(transformedPosts);
      }

      setNextCursor(response.pagination?.nextCursor || null);
      setHasMore(response.pagination?.hasNextPage || false);
    } catch (err) {
      console.error('Error loading posts:', err);
      setError(`Failed to load posts: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [getToken, feedFilters]);

  // Initial load
  useEffect(() => {
    loadPosts(null);
  }, [loadPosts]);

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    if (!hasMore || loadingMore) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && nextCursor) {
          loadPosts(nextCursor, true);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loadingMore, nextCursor, loadPosts]);

  // Handle comment submission
  const handleCommentSubmit = async (data: CommentCreateRequest) => {
    const token = getToken();
    if (!token) throw new Error('No token available');

    try {
      const newComment = await apiService.createComment(token, data);
      
      // Update the post with the new comment
      setPosts(prev => prev.map(post => 
        post.id === data.postId 
          ? { 
              ...post, 
              comments: [newComment, ...post.comments.slice(0, 4)], // Keep only 5 comments
              commentsCount: post.commentsCount + 1 
            }
          : post
      ));
    } catch (err) {
      console.error('Error creating comment:', err);
      throw err; // Re-throw to let the form handle the error
    }
  };

  // Handle add-on submission
  const handleAddOnSubmit = async (data: CommentCreateRequest) => {
    const token = getToken();
    if (!token) return;

    try {
      await apiService.addOn(token, data);
      
      // Update the post amount (for add-ons, we'll need to extract amount from content or metadata)
      // For now, we'll just refresh the post or handle it differently
      console.log('Add-on submitted:', data);
    } catch (err) {
      console.error('Error adding add-on:', err);
      throw err;
    }
  };

  // Handle like submission
  const handleLike = async (postId: string, reactionType: Like['reactionType']) => {
    const token = getToken();
    if (!token) return;

    try {
      await apiService.likePost(token, { postId, reactionType });
      
      // Update the post with the new like
      setPosts(prev => prev.map(post => {
        if (post.id === postId) {
          const isAlreadyLiked = post.isLikedByCurrentUser;
          const currentReaction = post.currentUserReaction;
          
          let newLikes = [...post.likes];
          let newLikesCount = post.likesCount;
          
          if (isAlreadyLiked && currentReaction === reactionType) {
            // Remove like
            newLikes = newLikes.filter(like => like.userId !== 'current-user');
            newLikesCount = Math.max(0, newLikesCount - 1);
          } else if (isAlreadyLiked && currentReaction !== reactionType) {
            // Change reaction
            newLikes = newLikes.filter(like => like.userId !== 'current-user');
            newLikes.push({
              id: 'current-user',
              postId,
              userId: 'current-user',
              user: { id: 'current-user', username: 'You', fullName: 'You', initials: 'Y' },
              reactionType,
              createdAt: new Date().toISOString(),
            });
          } else {
            // Add new like
            newLikes.push({
              id: 'current-user',
              postId,
              userId: 'current-user',
              user: { id: 'current-user', username: 'You', fullName: 'You', initials: 'Y' },
              reactionType,
              createdAt: new Date().toISOString(),
            });
            newLikesCount = newLikesCount + 1;
          }
          
          return {
            ...post,
            likes: newLikes,
            likesCount: newLikesCount,
            isLikedByCurrentUser: !isAlreadyLiked || currentReaction !== reactionType,
            currentUserReaction: !isAlreadyLiked || currentReaction !== reactionType ? reactionType : undefined,
          };
        }
        return post;
      }));
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  // Handle unlike
  const handleUnlike = async (postId: string) => {
    const token = getToken();
    if (!token) return;

    try {
      await apiService.unlikePost(token, postId);
      
      // Update the post by removing the like
      setPosts(prev => prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.likes.filter(like => like.userId !== 'current-user'),
            likesCount: Math.max(0, post.likesCount - 1),
            isLikedByCurrentUser: false,
            currentUserReaction: undefined,
          };
        }
        return post;
      }));
    } catch (err) {
      console.error('Error unliking post:', err);
    }
  };

  // Handle show likes
  const handleShowLikes = async (postId: string) => {
    const token = getToken();
    if (!token) return;

    try {
      const likes = await apiService.getLikes(token, postId);
      setLikesModal({ isOpen: true, likes });
    } catch (err) {
      console.error('Error loading likes:', err);
    }
  };

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="w-24 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-4 bg-gray-200 rounded"></div>
              <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => loadPosts(null)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      <div className={`space-y-6 ${className}`}>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onComment={handleCommentSubmit}
            onAddOn={handleAddOnSubmit}
            onLike={handleLike}
            onUnlike={handleUnlike}
            onShowLikes={handleShowLikes}
          />
        ))}
        
        {/* Load more trigger */}
        {hasMore && (
          <div ref={loadMoreRef} className="flex justify-center py-4">
            {loadingMore && (
              <div className="text-gray-500">Loading more posts...</div>
            )}
          </div>
        )}
        
        {!hasMore && posts.length > 0 && (
          <div className="text-center py-4 text-gray-500">
            You've reached the end of the posts
          </div>
        )}
      </div>

      {/* Modals */}
      <LikesModal
        isOpen={likesModal.isOpen}
        onClose={() => setLikesModal({ isOpen: false, likes: [] })}
        likes={likesModal.likes}
      />
    </>
  );
};
