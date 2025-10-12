/**
 * Type definitions for Recognition Input component
 */

export type Mention = { 
  id: string; 
  display: string;
  avatarUrl?: string;
};

export type Hashtag = { 
  tag: string;
};

export type PointToken = { 
  value: number;
  targetUserId?: string;
};

export type RecognitionPayload = {
  plainText: string;           // plain text representation without markup
  markup: string;              // react-mentions markup string
  mentions: Mention[];         // unique mentions with id + display
  hashtags: string[];          // unique hashtags (strings, no '#')
  points: PointToken[];        // list of points tokens inserted
};

export type User = {
  id: string;
  display: string;
  avatarUrl?: string;
};

// Backend API Response Types
export type UserMentionResponse = {
  UserId: string;
  Username: string;
  FullName: string;
  Department: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type HashtagResponse = {
  id: number;
  name: string;
  description: string;
};

export type PostResponse = {
  id: string;
  userId: string;
  context: string;
};

// Extended types for post cards and comments
export type UserProfile = {
  id: string;
  username: string;
  fullName: string;
  avatarUrl?: string;
  initials: string;
};

export type Comment = {
  id: string;
  postId: string;
  userId: string;
  user: UserProfile;
  content: string;
  amount?: number;
  createdAt: string;
  updatedAt: string;
};

export type Like = {
  id: string;
  postId: string;
  userId: string;
  user: UserProfile;
  reactionType: 'like' | 'love' | 'laugh' | 'wow' | 'sad' | 'angry';
  createdAt: string;
};

export type Post = {
  id: string;
  userId: string;
  user: UserProfile;
  context: string;
  mentions: Mention[];
  hashtags: string[];
  amount?: number;
  giverCount: number;
  givers: UserProfile[];
  comments: Comment[];
  latestComments: CommentResponse[];
  likes: Like[];
  likesCount: number;
  commentsCount: number;
  reactionCounts: ReactionCountsResponse;
  userReaction?: ReactionResponse;
  createdAt: string;
  updatedAt: string;
  isLikedByCurrentUser: boolean;
  currentUserReaction?: Like['reactionType'];
};

export type PostSortOrder = 'CreatedAtDesc' | 'CreatedAtAsc' | 'PointsDesc' | 'PointsAsc';

export type PostFilterRequest = {
  pageSize?: number;
  cursor?: string;
  filterByTeam?: boolean;
  filterByUserId?: string;
  hashtagIds?: number[];
  hashtagNames?: string[];
  sortOrder?: PostSortOrder;
};

export type CursorInfo = {
  createdAt: string;
  postId: string;
};

export type ReactionCountsResponse = {
  postId: string;
  counts: Record<string, number>;
};

export type ReactionResponse = {
  id: string;
  companyId: string;
  userId: string;
  postId: string;
  emojiType: string;
  lastModifiedAt: string;
};

export type CommentResponse = {
  id: string;
  userId: string;
  userFullName: string;
  postedByAdded: boolean;
  companyId: string;
  content: string;
  points?: number;
  postId: string;
  hashtags: number[];
  createdAt: string;
  metadata?: any;
  deleted: boolean;
};

export type PostWithDetailsResponse = {
  id: string;
  userId: string;
  companyId: string;
  context: string;
  userMentioned: string[];
  createdAt: string;
  hashtags: string[];
  metadata?: any;
  totalPoints: number;
  visibility: number;
  deleted: boolean;
  latestComments: CommentResponse[];
  reactionCounts: ReactionCountsResponse;
  userReaction?: ReactionResponse;
};

export type PaginationInfo = {
  pageSize: number;
  nextCursor?: string;
  previousCursor?: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type FilterInfo = {
  filterByTeam: boolean;
  filterByUserId?: string;
  hashtagIds: number[];
  hashtagNames: string[];
  sortOrder: PostSortOrder;
};

export type PaginatedPostResponse = {
  posts: PostWithDetailsResponse[];
  pagination: PaginationInfo;
  appliedFilters: FilterInfo;
};

export type PostsResponse = PaginatedPostResponse;

export type CommentCreateRequest = {
  postId: string;
  content: string;
  postedByAdded: boolean;
};

export type LikeRequest = {
  postId: string;
  reactionType: Like['reactionType'];
};

