/**
 * Utility functions to transform backend API responses to frontend format
 */

import { PostWithDetailsResponse, CommentResponse, ReactionResponse, ReactionCountsResponse } from '@/types/recognition';
import { Post, Comment, Like, UserProfile } from '@/types/recognition';

// Map backend reaction types to frontend reaction types
const reactionTypeMap: Record<string, Like['reactionType']> = {
  'Like': 'like',
  'Love': 'love',
  'Laugh': 'laugh',
  'Angry': 'angry',
  'Sad': 'sad',
  'Wow': 'wow',
};

// Default user profile when user info is not available
const createDefaultUser = (userId: string, userFullName?: string): UserProfile => {
  const fullName = userFullName || `User ${userId.substring(0, 4)}`;
  const initials = userFullName 
    ? userFullName.split(' ').map(name => name.charAt(0)).join('').toUpperCase().substring(0, 2)
    : '??';
  
  return {
    id: userId,
    username: 'unknown',
    fullName,
    initials,
  };
};

// Transform backend comment to frontend format
export const transformComment = (comment: CommentResponse): Comment => {
  return {
    id: comment.id,
    postId: comment.postId,
    userId: comment.userId,
    user: createDefaultUser(comment.userId, comment.userFullName), // Use userFullName from backend
    content: comment.content,
    amount: comment.points,
    createdAt: comment.createdAt,
    updatedAt: comment.createdAt, // Backend doesn't provide updatedAt
  };
};

// Transform backend reaction to frontend format
export const transformLike = (reaction: ReactionResponse): Like => {
  return {
    id: reaction.id,
    postId: reaction.postId,
    userId: reaction.userId,
    user: createDefaultUser(reaction.userId), // TODO: Get user info from user service
    reactionType: reactionTypeMap[reaction.emojiType] || 'like',
    createdAt: reaction.lastModifiedAt,
  };
};

// Transform reaction counts to frontend format
export const transformReactionCounts = (reactionCounts: ReactionCountsResponse): Like[] => {
  const likes: Like[] = [];
  
  Object.entries(reactionCounts.counts).forEach(([reactionType, count]) => {
    const frontendReactionType = reactionTypeMap[reactionType] || 'like';
    
    // Create mock likes for display (in real implementation, you'd fetch actual users)
    for (let i = 0; i < Math.min(count, 5); i++) { // Limit to 5 for display
      likes.push({
        id: `mock-${reactionCounts.postId}-${reactionType}-${i}`,
        postId: reactionCounts.postId,
        userId: `user-${i}`,
        user: createDefaultUser(`user-${i}`),
        reactionType: frontendReactionType,
        createdAt: new Date().toISOString(),
      });
    }
  });
  
  return likes;
};

// Transform backend post to frontend format
export const transformPost = (backendPost: PostWithDetailsResponse): Post => {
  const comments = backendPost.latestComments.map(transformComment);
  const likes = transformReactionCounts(backendPost.reactionCounts);
  
  // Add user's own reaction if it exists
  if (backendPost.userReaction) {
    const userLike = transformLike(backendPost.userReaction);
    likes.push(userLike);
  }
  
  // Extract mentions from userMentioned array
  const mentions = backendPost.userMentioned.map(userId => ({
    id: userId,
    display: createDefaultUser(userId).fullName,
  }));
  
  // Extract givers from metadata or comments with points
  const givers: UserProfile[] = [];
  comments.forEach(comment => {
    if (comment.amount && comment.amount > 0) {
      const existingGiver = givers.find(g => g.id === comment.userId);
      if (!existingGiver) {
        givers.push(comment.user);
      }
    }
  });
  
  return {
    id: backendPost.id,
    userId: backendPost.userId,
    user: createDefaultUser(backendPost.userId, (backendPost as any).userFullName), // Use userFullName from backend
    context: backendPost.context,
    mentions,
    hashtags: backendPost.hashtags.map(h => h.toString()), // Convert hashtag IDs to strings
    amount: backendPost.totalPoints,
    giverCount: givers.length,
    givers,
    comments,
    latestComments: backendPost.latestComments, // Keep original latestComments from backend
    likes,
    likesCount: Object.values(backendPost.reactionCounts.counts).reduce((sum, count) => sum + count, 0),
    commentsCount: backendPost.latestComments.length, // This might not be total count
    reactionCounts: backendPost.reactionCounts, // Keep original reaction counts
    userReaction: backendPost.userReaction, // Keep original user reaction
    createdAt: backendPost.createdAt,
    updatedAt: backendPost.createdAt, // Backend doesn't provide updatedAt
    isLikedByCurrentUser: !!backendPost.userReaction,
    currentUserReaction: backendPost.userReaction 
      ? reactionTypeMap[backendPost.userReaction.emojiType] || 'like'
      : undefined,
  };
};

// Transform array of backend posts to frontend format
export const transformPosts = (backendPosts: PostWithDetailsResponse[]): Post[] => {
  return backendPosts.map(transformPost);
};
