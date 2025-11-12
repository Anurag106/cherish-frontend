/**
 * Type definitions for Analytics API
 */

import { DateRangeValue } from '@/constants/analytics';

// Common types
export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface BaseAnalyticsRequest {
  dateRange?: DateRangeValue;
  startDate?: string;
  endDate?: string;
}

// Team Dashboard Types
export interface TeamMetrics {
  totalRecognitions: number;
  totalPoints: number;
  activeUsers: number;
  participationRate: number;
  averagePointsPerRecognition: number;
  growthRate: number;
}

export interface RecognitionTrend {
  date: string;
  count: number;
  points: number;
}

export interface DepartmentStats {
  departmentId: string;
  departmentName: string;
  recognitionsGiven: number;
  recognitionsReceived: number;
  totalPoints: number;
  activeUsers: number;
}

export interface TopPerformer {
  userId: string;
  username: string;
  fullName: string;
  avatarUrl?: string;
  recognitionsReceived: number;
  totalPoints: number;
  rank: number;
}

export interface TeamDashboardData {
  metrics: TeamMetrics;
  recognitionTrends: RecognitionTrend[];
  departmentStats: DepartmentStats[];
  topPerformers: TopPerformer[];
  pointsDistribution: {
    range: string;
    count: number;
  }[];
}

// Leaderboard Types
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  fullName: string;
  avatarUrl?: string;
  department: string;
  recognitionsGiven: number;
  recognitionsReceived: number;
  totalPoints: number;
  trend: 'up' | 'down' | 'same';
  previousRank?: number;
}

export interface LeaderboardData {
  period: DateRangeValue;
  entries: LeaderboardEntry[];
  totalParticipants: number;
}

// Leaderboard with Hashtag Breakdown Types
export interface HashtagValue {
  hashtag: string;
  value: number;
  color: string;
}

export interface LeaderboardEntryWithHashtags {
  userId: string;
  name: string;
  username: string;
  department: string;
  values: HashtagValue[];
  total: number;
}

export interface LeaderboardWithHashtagsRequest extends BaseAnalyticsRequest {
  department?: string;
  hashtag?: string;
  recognitionType?: 'received' | 'given';
  searchQuery?: string;
}

export interface LeaderboardWithHashtagsResponse {
  entries: LeaderboardEntryWithHashtags[];
  appliedFilters: {
    department: string | null;
    hashtag: string | null;
    recognitionType: 'received' | 'given';
    dateRange: DateRangeValue;
    searchQuery: string | null;
  };
  totalEntries: number;
  availableHashtags: string[];
  availableDepartments: string[];
}

// Participation Types
export interface ParticipationMetrics {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  participationRate: number;
  averageRecognitionsPerUser: number;
  newUsersThisMonth: number;
  growthRate: number;
}

export interface UserActivityTrend {
  date: string;
  activeUsers: number;
  newUsers: number;
  recognitionsGiven: number;
  recognitionsReceived: number;
}

export interface ParticipationByDepartment {
  department: string;
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  participationRate: number;
  avgRecognitionsPerUser: number;
}

export interface EngagementLevel {
  level: string;
  description: string;
  userCount: number;
  percentage: number;
  color: string;
}

export interface UserSegment {
  segment: string;
  userCount: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
}

export interface ParticipationAnalyticsResponse {
  metrics: ParticipationMetrics;
  activityTrends: UserActivityTrend[];
  departmentParticipation: ParticipationByDepartment[];
  engagementLevels: EngagementLevel[];
  userSegments: UserSegment[];
  topContributors: Array<{
    userId: string;
    name: string;
    recognitionsGiven: number;
    recognitionsReceived: number;
    department: string;
  }>;
}

// Legacy type for backward compatibility
export interface ParticipationData {
  metrics: ParticipationMetrics;
  activityTrends: UserActivityTrend[];
  departmentParticipation: ParticipationByDepartment[];
  engagementLevels: EngagementLevel[];
}

// Recognition Types
export interface RecognitionMetrics {
  totalRecognitions: number;
  totalPoints: number;
  averagePointsPerRecognition: number;
  mostUsedHashtags: string[];
  peakRecognitionTime: string;
  growthRate: number;
}

// P2P vs Awards Types
export interface P2PVsAwardsMetrics {
  recognitionReceived: {
    total: number;
    trend: {
      value: number;
      period: string;
    };
    perMonth: number;
  };
  pointReceived: {
    total: number;
    trend: {
      value: number;
      period: string;
    };
    perMonth: number;
  };
  p2pVsAwards: {
    p2p: {
      count: number;
      points: number;
    };
    awards: {
      count: number;
      points: number;
    };
  };
}

export interface P2PVsAwardsChartData {
  date: string;
  p2p: number;
  awards: number;
}

export interface P2PVsAwardsAnalyticsResponse {
  metrics: P2PVsAwardsMetrics;
  recognitionReceivedChart: P2PVsAwardsChartData[];
  pointReceivedChart: P2PVsAwardsChartData[];
  numberOfUsersChart: {
    date: string;
    users: number;
  }[];
  appliedFilters: {
    timeRange: string;
    view: 'overview' | 'compare-rates';
    category: 'recognition-received' | 'recognition-rates' | 'hashtags' | 'add-ons';
  };
}

export interface RecognitionPattern {
  hour: number;
  dayOfWeek: number;
  count: number;
}

export interface RecognitionTrendData {
  date: string;
  count: number;
  points: number;
}

export interface HashtagUsage {
  hashtag: string;
  count: number;
  totalPoints: number;
  trendDirection: 'up' | 'down' | 'stable';
}

export interface HashtagUsageData {
  hashtag: string;
  count: number;
  totalPoints: number;
  trendDirection: 'up' | 'down' | 'stable';
  percentageChange: number;
}

export interface DepartmentRecognitionData {
  department: string;
  given: number;
  received: number;
  total: number;
}

export interface RecognitionByTimeData {
  timeSlot: string;
  count: number;
  label: string;
}

export interface RecognitionAnalyticsRequest extends BaseAnalyticsRequest {
  department?: string;
  hashtag?: string;
}

export interface RecognitionAnalyticsResponse {
  metrics: RecognitionMetrics;
  trends: RecognitionTrendData[];
  hashtagUsage: HashtagUsageData[];
  departmentBreakdown: DepartmentRecognitionData[];
  timeDistribution: RecognitionByTimeData[];
  appliedFilters: {
    dateRange: DateRangeValue;
    department: string | null;
    hashtag: string | null;
  };
}

// Legacy type for backward compatibility
export interface RecognitionData {
  metrics: RecognitionMetrics;
  patterns: RecognitionPattern[];
  hashtagUsage: HashtagUsageData[];
  recognitionsByType: {
    type: string;
    count: number;
    percentage: number;
  }[];
}

// Organization Graph Types
export interface GraphNode {
  id: string;
  name: string;
  initials: string;
  department: string;
  color: string;
  recognitionsGiven: number;
  recognitionsReceived: number;
  x?: number;
  y?: number;
}

export interface GraphEdge {
  source: string;
  target: string;
  weight: number;
}

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  color: string;
  given: number;
  received: number;
  total: number;
}

export interface OrganizationGraphData {
  breadcrumb: string[];
  nodes: GraphNode[];
  edges: GraphEdge[];
  withinTeam: TeamMember[];
  outsideTeam: TeamMember[];
  metrics: {
    totalNodes: number;
    totalConnections: number;
    averageConnections: number;
    mostConnectedUser: string;
  };
}

// Top Words Types
export interface WordCloud {
  word: string;
  count: number;
  weight: number;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

export interface HashtagTrend {
  hashtag: string;
  currentCount: number;
  previousCount: number;
  growth: number;
  topUsers: string[];
}

export interface TopWordsData {
  wordCloud: WordCloud[];
  hashtagTrends: HashtagTrend[];
  topPhrases: {
    phrase: string;
    count: number;
  }[];
  sentimentAnalysis: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

// API Response wrapper
export interface AnalyticsApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

