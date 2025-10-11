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

