/**
 * Mock Analytics Data
 * Demo data for analytics pages - can be easily replaced with real API calls
 */

import {
  TeamDashboardData,
  LeaderboardData,
  ParticipationData,
  RecognitionData,
  OrganizationGraphData,
  TopWordsData,
} from '@/types/api/analytics';

// Helper to generate dates for the last N days
const generateDates = (days: number) => {
  const dates = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString());
  }
  return dates;
};

// Mock Team Dashboard Data
export const mockTeamDashboardData: TeamDashboardData = {
  metrics: {
    totalRecognitions: 1247,
    totalPoints: 18650,
    activeUsers: 156,
    participationRate: 78.5,
    averagePointsPerRecognition: 14.96,
    growthRate: 12.3,
  },
  recognitionTrends: generateDates(30).map((date, index) => ({
    date,
    count: Math.floor(Math.random() * 50) + 20,
    points: Math.floor(Math.random() * 500) + 300,
  })),
  departmentStats: [
    {
      departmentId: '1',
      departmentName: 'Engineering',
      recognitionsGiven: 342,
      recognitionsReceived: 298,
      totalPoints: 5240,
      activeUsers: 45,
    },
    {
      departmentId: '2',
      departmentName: 'Sales',
      recognitionsGiven: 287,
      recognitionsReceived: 312,
      totalPoints: 4680,
      activeUsers: 38,
    },
    {
      departmentId: '3',
      departmentName: 'Marketing',
      recognitionsGiven: 245,
      recognitionsReceived: 221,
      totalPoints: 3890,
      activeUsers: 28,
    },
    {
      departmentId: '4',
      departmentName: 'Customer Success',
      recognitionsGiven: 198,
      recognitionsReceived: 234,
      totalPoints: 3120,
      activeUsers: 25,
    },
    {
      departmentId: '5',
      departmentName: 'HR',
      recognitionsGiven: 175,
      recognitionsReceived: 182,
      totalPoints: 1720,
      activeUsers: 20,
    },
  ],
  topPerformers: [
    {
      userId: '1',
      username: 'sarah.johnson',
      fullName: 'Sarah Johnson',
      recognitionsReceived: 45,
      totalPoints: 890,
      rank: 1,
    },
    {
      userId: '2',
      username: 'michael.chen',
      fullName: 'Michael Chen',
      recognitionsReceived: 42,
      totalPoints: 820,
      rank: 2,
    },
    {
      userId: '3',
      username: 'emily.davis',
      fullName: 'Emily Davis',
      recognitionsReceived: 38,
      totalPoints: 750,
      rank: 3,
    },
    {
      userId: '4',
      username: 'james.wilson',
      fullName: 'James Wilson',
      recognitionsReceived: 35,
      totalPoints: 680,
      rank: 4,
    },
    {
      userId: '5',
      username: 'lisa.anderson',
      fullName: 'Lisa Anderson',
      recognitionsReceived: 32,
      totalPoints: 640,
      rank: 5,
    },
    {
      userId: '6',
      username: 'david.martinez',
      fullName: 'David Martinez',
      recognitionsReceived: 30,
      totalPoints: 590,
      rank: 6,
    },
    {
      userId: '7',
      username: 'jennifer.lee',
      fullName: 'Jennifer Lee',
      recognitionsReceived: 28,
      totalPoints: 560,
      rank: 7,
    },
  ],
  pointsDistribution: [
    { range: '0-10', count: 145 },
    { range: '11-25', count: 342 },
    { range: '26-50', count: 456 },
    { range: '51-100', count: 234 },
    { range: '101-200', count: 56 },
    { range: '200+', count: 14 },
  ],
};

// Available hashtags and departments for filters
export const availableHashtags = [
  'debate-decide-commit',
  'no-pain-no-gain',
  'work-hard-live-well',
  'inclusion',
  'impact-over-effort',
  'ownership',
  'problem-solving',
  'its-us-vs-the-problem',
  '1-percent-better-every-week',
  'bias-for-action',
];

export const availableDepartments = [
  'Engineering',
  'Sales',
  'Marketing',
  'Customer Success',
  'HR',
  'Product',
  'Operations',
];

// Colors for hashtags
export const hashtagColors: Record<string, string> = {
  'debate-decide-commit': '#10b981',
  'no-pain-no-gain': '#10b981',
  'work-hard-live-well': '#8b5cf6',
  'inclusion': '#06b6d4',
  'impact-over-effort': '#7dd3fc',
  'ownership': '#3b82f6',
  'problem-solving': '#ec4899',
  'its-us-vs-the-problem': '#7dd3fc',
  '1-percent-better-every-week': '#93c5fd',
  'bias-for-action': '#34d399',
  other: '#94a3b8',
};

// Mock Leaderboard Data with hashtag breakdown
export const mockLeaderboardData: LeaderboardData = {
  period: '30d',
  entries: Array.from({ length: 20 }, (_, i) => ({
    rank: i + 1,
    userId: `user-${i + 1}`,
    username: `user${i + 1}`,
    fullName: `User ${i + 1}`,
    department: availableDepartments[i % availableDepartments.length],
    recognitionsGiven: Math.floor(Math.random() * 30) + 10,
    recognitionsReceived: Math.floor(Math.random() * 30) + 10,
    totalPoints: Math.floor(Math.random() * 500) + 200,
    trend: ['up', 'down', 'same'][i % 3] as 'up' | 'down' | 'same',
    previousRank: i > 0 ? i + (Math.random() > 0.5 ? 1 : -1) : undefined,
  })),
  totalParticipants: 156,
};

// Mock Leaderboard with Hashtag Breakdown
export const mockLeaderboardWithHashtags = [
  {
    userId: 'user-001',
    username: 'rodrigo.notare',
    name: 'Rodrigo Notare',
    department: 'Engineering',
    values: [
      { hashtag: 'problem-solving', value: 1, color: hashtagColors['problem-solving'] },
    ],
    total: 1,
  },
  {
    userId: 'user-002',
    username: 'abhijit.shirude',
    name: 'Abhijit Shirude',
    department: 'Engineering',
    values: [
      { hashtag: 'problem-solving', value: 1, color: hashtagColors['problem-solving'] },
      { hashtag: 'impact-over-effort', value: 2, color: hashtagColors['impact-over-effort'] },
      { hashtag: 'work-hard-live-well', value: 2, color: hashtagColors['work-hard-live-well'] },
      { hashtag: 'inclusion', value: 3, color: hashtagColors['inclusion'] },
      { hashtag: 'ownership', value: 1, color: hashtagColors['ownership'] },
      { hashtag: 'no-pain-no-gain', value: 2, color: hashtagColors['no-pain-no-gain'] },
      { hashtag: 'problem-solving', value: 2, color: hashtagColors['problem-solving'] },
    ],
    total: 13,
  },
  {
    userId: 'user-003',
    username: 'davi.vale',
    name: 'Davi Vale',
    department: 'Sales',
    values: [
      { hashtag: 'ownership', value: 2, color: hashtagColors['ownership'] },
      { hashtag: 'problem-solving', value: 1, color: hashtagColors['problem-solving'] },
      { hashtag: 'work-hard-live-well', value: 1, color: hashtagColors['work-hard-live-well'] },
      { hashtag: 'inclusion', value: 3, color: hashtagColors['inclusion'] },
      { hashtag: 'impact-over-effort', value: 1, color: hashtagColors['impact-over-effort'] },
      { hashtag: 'problem-solving', value: 2, color: hashtagColors['problem-solving'] },
    ],
    total: 10,
  },
  {
    userId: 'user-004',
    username: 'quan.tran',
    name: 'Quan Tran',
    department: 'Engineering',
    values: [
      { hashtag: 'inclusion', value: 1, color: hashtagColors['inclusion'] },
      { hashtag: 'ownership', value: 1, color: hashtagColors['ownership'] },
      { hashtag: 'no-pain-no-gain', value: 1, color: hashtagColors['no-pain-no-gain'] },
      { hashtag: 'problem-solving', value: 2, color: hashtagColors['problem-solving'] },
      { hashtag: 'inclusion', value: 2, color: hashtagColors['inclusion'] },
      { hashtag: 'work-hard-live-well', value: 2, color: hashtagColors['work-hard-live-well'] },
      { hashtag: 'problem-solving', value: 1, color: hashtagColors['problem-solving'] },
      { hashtag: 'no-pain-no-gain', value: 2, color: hashtagColors['no-pain-no-gain'] },
    ],
    total: 12,
  },
  {
    userId: 'user-005',
    username: 'bay.gaillard',
    name: 'Bay Gaillard',
    department: 'Marketing',
    values: [
      { hashtag: 'no-pain-no-gain', value: 2, color: hashtagColors['no-pain-no-gain'] },
      { hashtag: 'inclusion', value: 2, color: hashtagColors['inclusion'] },
      { hashtag: 'ownership', value: 2, color: hashtagColors['ownership'] },
      { hashtag: 'problem-solving', value: 3, color: hashtagColors['problem-solving'] },
      { hashtag: 'problem-solving', value: 2, color: hashtagColors['problem-solving'] },
      { hashtag: 'no-pain-no-gain', value: 2, color: hashtagColors['no-pain-no-gain'] },
    ],
    total: 13,
  },
  {
    userId: 'user-006',
    username: 'cricia.lopes',
    name: 'Crícia Lopes',
    department: 'Product',
    values: [
      { hashtag: 'no-pain-no-gain', value: 1, color: hashtagColors['no-pain-no-gain'] },
      { hashtag: 'impact-over-effort', value: 1, color: hashtagColors['impact-over-effort'] },
      { hashtag: 'ownership', value: 2, color: hashtagColors['ownership'] },
      { hashtag: 'problem-solving', value: 1, color: hashtagColors['problem-solving'] },
      { hashtag: 'inclusion', value: 2, color: hashtagColors['inclusion'] },
      { hashtag: 'ownership', value: 2, color: hashtagColors['ownership'] },
      { hashtag: 'problem-solving', value: 1, color: hashtagColors['problem-solving'] },
      { hashtag: 'no-pain-no-gain', value: 2, color: hashtagColors['no-pain-no-gain'] },
    ],
    total: 12,
  },
  {
    userId: 'user-011',
    username: 'joao.couto',
    name: 'João Victor Couto',
    department: 'Engineering',
    values: [
      { hashtag: 'ownership', value: 1, color: hashtagColors['ownership'] },
      { hashtag: 'problem-solving', value: 2, color: hashtagColors['problem-solving'] },
      { hashtag: 'inclusion', value: 1, color: hashtagColors['inclusion'] },
      { hashtag: 'work-hard-live-well', value: 2, color: hashtagColors['work-hard-live-well'] },
      { hashtag: 'problem-solving', value: 2, color: hashtagColors['problem-solving'] },
      { hashtag: 'no-pain-no-gain', value: 2, color: hashtagColors['no-pain-no-gain'] },
    ],
    total: 10,
  },
  {
    userId: 'user-012',
    username: 'lucas.bernar',
    name: 'Lucas Bernar',
    department: 'Sales',
    values: [
      { hashtag: 'impact-over-effort', value: 1, color: hashtagColors['impact-over-effort'] },
      { hashtag: 'ownership', value: 1, color: hashtagColors['ownership'] },
      { hashtag: 'problem-solving', value: 1, color: hashtagColors['problem-solving'] },
      { hashtag: 'work-hard-live-well', value: 1, color: hashtagColors['work-hard-live-well'] },
      { hashtag: 'ownership', value: 2, color: hashtagColors['ownership'] },
      { hashtag: 'problem-solving', value: 1, color: hashtagColors['problem-solving'] },
      { hashtag: 'no-pain-no-gain', value: 1, color: hashtagColors['no-pain-no-gain'] },
      { hashtag: 'no-pain-no-gain', value: 3, color: hashtagColors['no-pain-no-gain'] },
    ],
    total: 11,
  },
  {
    userId: 'user-007',
    username: 'michelle.nguyen',
    name: 'Michelle Nguyen',
    department: 'HR',
    values: [
      { hashtag: 'no-pain-no-gain', value: 1, color: hashtagColors['no-pain-no-gain'] },
      { hashtag: 'debate-decide-commit', value: 1, color: hashtagColors['debate-decide-commit'] },
      { hashtag: 'inclusion', value: 2, color: hashtagColors['inclusion'] },
      { hashtag: 'work-hard-live-well', value: 2, color: hashtagColors['work-hard-live-well'] },
      { hashtag: 'problem-solving', value: 2, color: hashtagColors['problem-solving'] },
      { hashtag: 'no-pain-no-gain', value: 3, color: hashtagColors['no-pain-no-gain'] },
    ],
    total: 11,
  },
  {
    userId: 'user-008',
    username: 'neal.stirk',
    name: 'Neal Stirk',
    department: 'Engineering',
    values: [
      { hashtag: 'impact-over-effort', value: 1, color: hashtagColors['impact-over-effort'] },
      { hashtag: 'work-hard-live-well', value: 2, color: hashtagColors['work-hard-live-well'] },
      { hashtag: 'inclusion', value: 1, color: hashtagColors['inclusion'] },
      { hashtag: 'problem-solving', value: 2, color: hashtagColors['problem-solving'] },
      { hashtag: 'no-pain-no-gain', value: 3, color: hashtagColors['no-pain-no-gain'] },
    ],
    total: 9,
  },
  {
    userId: 'user-009',
    username: 'camille.farmer',
    name: 'Camille Farmer',
    department: 'Marketing',
    values: [
      { hashtag: 'impact-over-effort', value: 1, color: hashtagColors['impact-over-effort'] },
      { hashtag: 'ownership', value: 1, color: hashtagColors['ownership'] },
      { hashtag: 'inclusion', value: 1, color: hashtagColors['inclusion'] },
      { hashtag: 'ownership', value: 2, color: hashtagColors['ownership'] },
      { hashtag: 'problem-solving', value: 2, color: hashtagColors['problem-solving'] },
      { hashtag: 'no-pain-no-gain', value: 3, color: hashtagColors['no-pain-no-gain'] },
    ],
    total: 10,
  },
  {
    userId: 'user-010',
    username: 'tykira.henry',
    name: 'Tykira Henry',
    department: 'Customer Success',
    values: [
      { hashtag: 'no-pain-no-gain', value: 1, color: hashtagColors['no-pain-no-gain'] },
      { hashtag: 'ownership', value: 1, color: hashtagColors['ownership'] },
      { hashtag: 'problem-solving', value: 2, color: hashtagColors['problem-solving'] },
      { hashtag: 'no-pain-no-gain', value: 1, color: hashtagColors['no-pain-no-gain'] },
      { hashtag: 'no-pain-no-gain', value: 6, color: hashtagColors['no-pain-no-gain'] },
    ],
    total: 11,
  },
];

// Mock Participation Data
const mockParticipationDataOld = {
  metrics: {
    totalUsers: 200,
    activeUsers: 156,
    inactiveUsers: 44,
    participationRate: 78.0,
    averageRecognitionsPerUser: 7.99,
  },
  activityTrends: generateDates(30).map((date) => ({
    date,
    activeUsers: Math.floor(Math.random() * 30) + 140,
    newUsers: Math.floor(Math.random() * 5),
    recognitionsGiven: Math.floor(Math.random() * 50) + 30,
  })),
  departmentParticipation: [
    {
      departmentId: '1',
      departmentName: 'Engineering',
      totalUsers: 50,
      activeUsers: 45,
      participationRate: 90.0,
    },
    {
      departmentId: '2',
      departmentName: 'Sales',
      totalUsers: 45,
      activeUsers: 38,
      participationRate: 84.4,
    },
    {
      departmentId: '3',
      departmentName: 'Marketing',
      totalUsers: 35,
      activeUsers: 28,
      participationRate: 80.0,
    },
    {
      departmentId: '4',
      departmentName: 'Customer Success',
      totalUsers: 30,
      activeUsers: 25,
      participationRate: 83.3,
    },
    {
      departmentId: '5',
      departmentName: 'HR',
      totalUsers: 40,
      activeUsers: 20,
      participationRate: 50.0,
    },
  ],
  engagementLevels: [
    { level: 'Highly Active (20+ recognitions)', userCount: 25, percentage: 12.5 },
    { level: 'Active (10-19 recognitions)', userCount: 56, percentage: 28.0 },
    { level: 'Moderate (5-9 recognitions)', userCount: 75, percentage: 37.5 },
    { level: 'Low (1-4 recognitions)', userCount: 30, percentage: 15.0 },
    { level: 'Inactive (0 recognitions)', userCount: 14, percentage: 7.0 },
  ],
};

// Mock Recognition Analytics Data
export const mockRecognitionAnalyticsData = {
  metrics: {
    totalRecognitions: 1247,
    totalPoints: 18650,
    averagePointsPerRecognition: 14.96,
    mostUsedHashtags: ['teamwork', 'innovation', 'excellence', 'leadership'],
    peakRecognitionTime: '2:00 PM - 3:00 PM',
    growthRate: 15.3,
  },
  trends: generateDates(30).map((date, index) => ({
    date,
    count: Math.floor(Math.random() * 50) + 30,
    points: Math.floor(Math.random() * 700) + 400,
  })),
  hashtagUsage: [
    {
      hashtag: 'teamwork',
      count: 234,
      totalPoints: 3890,
      trendDirection: 'up' as const,
      percentageChange: 15.2,
    },
    {
      hashtag: 'innovation',
      count: 198,
      totalPoints: 3240,
      trendDirection: 'up' as const,
      percentageChange: 8.5,
    },
    {
      hashtag: 'excellence',
      count: 187,
      totalPoints: 2980,
      trendDirection: 'stable' as const,
      percentageChange: 0.5,
    },
    {
      hashtag: 'leadership',
      count: 156,
      totalPoints: 2340,
      trendDirection: 'down' as const,
      percentageChange: -3.2,
    },
    {
      hashtag: 'problem-solving',
      count: 145,
      totalPoints: 2180,
      trendDirection: 'up' as const,
      percentageChange: 12.1,
    },
    {
      hashtag: 'ownership',
      count: 132,
      totalPoints: 2050,
      trendDirection: 'up' as const,
      percentageChange: 6.8,
    },
  ],
  departmentBreakdown: [
    { department: 'Engineering', given: 342, received: 298, total: 640 },
    { department: 'Sales', given: 287, received: 312, total: 599 },
    { department: 'Marketing', given: 245, received: 221, total: 466 },
    { department: 'Customer Success', given: 198, received: 234, total: 432 },
    { department: 'HR', given: 175, received: 182, total: 357 },
  ],
  timeDistribution: [
    { timeSlot: '6-9 AM', count: 45, label: 'Morning' },
    { timeSlot: '9-12 PM', count: 189, label: 'Late Morning' },
    { timeSlot: '12-2 PM', count: 156, label: 'Lunch' },
    { timeSlot: '2-5 PM', count: 298, label: 'Afternoon' },
    { timeSlot: '5-8 PM', count: 112, label: 'Evening' },
  ],
  appliedFilters: {
    dateRange: '30d' as const,
    department: null,
    hashtag: null,
  },
};

// Legacy format for backward compatibility
export const mockRecognitionData: RecognitionData = {
  metrics: mockRecognitionAnalyticsData.metrics,
  patterns: Array.from({ length: 168 }, (_, i) => ({
    hour: i % 24,
    dayOfWeek: Math.floor(i / 24),
    count: Math.floor(Math.random() * 20) + 5,
  })),
  hashtagUsage: mockRecognitionAnalyticsData.hashtagUsage,
  recognitionsByType: [
    { type: 'Peer-to-Peer', count: 678, percentage: 54.4 },
    { type: 'Manager-to-Employee', count: 342, percentage: 27.4 },
    { type: 'Cross-Department', count: 156, percentage: 12.5 },
    { type: 'Team Recognition', count: 71, percentage: 5.7 },
  ],
};

// Mock Organization Graph Data
const mockOrganizationGraphData: OrganizationGraphData = {
  breadcrumb: ['Cherish', 'San Luis Obispo', "Alex's Team"],
  nodes: [
    { id: '1', name: 'Robert Schmitt', initials: 'RS', department: 'Engineering', color: '#3B82F6', recognitionsGiven: 8, recognitionsReceived: 9, x: 570, y: 210 },
    { id: '2', name: 'Gary Lombardo', initials: 'GL', department: 'Product', color: '#10B981', recognitionsGiven: 5, recognitionsReceived: 7, x: 676, y: 247 },
    { id: '3', name: 'Alex Klein', initials: 'AK', department: 'Engineering', color: '#EF4444', recognitionsGiven: 13, recognitionsReceived: 1, x: 500, y: 298 },
    { id: '4', name: 'Biplob Chakraborty', initials: 'BC', department: 'Design', color: '#3B82F6', recognitionsGiven: 0, recognitionsReceived: 2, x: 694, y: 315 },
    { id: '5', name: 'Curtis Hsu', initials: 'CH', department: 'Marketing', color: '#10B981', recognitionsGiven: 5, recognitionsReceived: 6, x: 553, y: 350 },
    { id: '6', name: 'Andie Kleeman', initials: 'AK', department: 'Sales', color: '#6B7280', recognitionsGiven: 4, recognitionsReceived: 3, x: 641, y: 368 },
  ],
  edges: [
    { source: '1', target: '2', weight: 3 },
    { source: '1', target: '5', weight: 1 },
    { source: '2', target: '4', weight: 2 },
    { source: '3', target: '1', weight: 8 },
    { source: '5', target: '1', weight: 1 },
    { source: '5', target: '6', weight: 1 },
    { source: '6', target: '5', weight: 1 },
  ],
  withinTeam: [
    { id: '1', name: 'Robert Schmitt', initials: 'RS', color: '#3B82F6', given: 1, received: 3, total: 4 },
    { id: '2', name: 'Gary Lombardo', initials: 'GL', color: '#10B981', given: 0, received: 3, total: 3 },
    { id: '3', name: 'Alex Klein', initials: 'AK', color: '#EF4444', given: 8, received: 0, total: 8 },
    { id: '5', name: 'Curtis Hsu', initials: 'CH', color: '#10B981', given: 1, received: 1, total: 2 },
    { id: '6', name: 'Andie Kleeman', initials: 'AK', color: '#6B7280', given: 0, received: 1, total: 1 },
    { id: '4', name: 'Biplob Chakraborty', initials: 'BC', color: '#3B82F6', given: 0, received: 2, total: 2 },
  ],
  outsideTeam: [
    { id: '1', name: 'Robert Schmitt', initials: 'RS', color: '#3B82F6', given: 7, received: 6, total: 13 },
    { id: '2', name: 'Gary Lombardo', initials: 'GL', color: '#10B981', given: 5, received: 4, total: 9 },
    { id: '3', name: 'Alex Klein', initials: 'AK', color: '#EF4444', given: 5, received: 1, total: 6 },
    { id: '5', name: 'Curtis Hsu', initials: 'CH', color: '#10B981', given: 4, received: 5, total: 9 },
    { id: '6', name: 'Andie Kleeman', initials: 'AK', color: '#6B7280', given: 4, received: 2, total: 6 },
    { id: '4', name: 'Biplob Chakraborty', initials: 'BC', color: '#3B82F6', given: 0, received: 2, total: 2 },
  ],
  metrics: {
    totalNodes: 6,
    totalConnections: 7,
    averageConnections: 2.3,
    mostConnectedUser: 'Robert Schmitt',
  },
};

// Mock Top Words Data
const mockTopWordsData = {
  filters: {
    overall: 'Overall',
    location: 'All Locations',
    currencyCode: 'GBP',
    group: 'Marketing',
    role: 'All Roles',
    managersTeam: 'All Teams',
    tier: 'All Tiers',
    title: 'All Titles',
  },
  appliedFilters: ['Overall', 'GBP', 'Marketing'],
  wordCloud: [
    { word: 'congratulations', value: 1250, color: '#EC4899' },
    { word: 'work', value: 980, color: '#F59E0B' },
    { word: 'year', value: 920, color: '#FBBF24' },
    { word: 'amazing', value: 850, color: '#EC4899' },
    { word: 'team', value: 800, color: '#14B8A6' },
    { word: 'excellent', value: 750, color: '#F59E0B' },
    { word: 'great', value: 720, color: '#818CF8' },
    { word: 'congrats', value: 700, color: '#A78BFA' },
    { word: 'support', value: 680, color: '#10B981' },
    { word: 'thanks', value: 650, color: '#60A5FA' },
    { word: 'lucky', value: 620, color: '#8B5CF6' },
    { word: 'awesome', value: 600, color: '#F87171' },
    { word: 'wonderful', value: 580, color: '#FB923C' },
    { word: 'outstanding', value: 550, color: '#14B8A6' },
    { word: 'fantastic', value: 520, color: '#EC4899' },
    { word: 'brilliant', value: 500, color: '#06B6D4' },
    { word: 'incredible', value: 480, color: '#A78BFA' },
    { word: 'superb', value: 450, color: '#10B981' },
  ],
  metrics: {
    mostUsedWord: {
      word: 'congratulations',
      count: 1250,
    },
    totalUniqueWords: 2847,
    averageWordsPerMessage: 12.4,
  },
  topWordsList: [
    { rank: 1, word: 'congratulations', count: 1250, percentage: 8.7 },
    { rank: 2, word: 'year', count: 1100, percentage: 7.6 },
    { rank: 3, word: 'support', count: 950, percentage: 6.6 },
    { rank: 4, word: 'work', count: 920, percentage: 6.4 },
    { rank: 5, word: 'team', count: 880, percentage: 6.1 },
    { rank: 6, word: 'great', count: 850, percentage: 5.9 },
    { rank: 7, word: 'thanks', count: 820, percentage: 5.7 },
    { rank: 8, word: 'amazing', count: 790, percentage: 5.5 },
    { rank: 9, word: 'excellent', count: 760, percentage: 5.3 },
    { rank: 10, word: 'awesome', count: 730, percentage: 5.1 },
  ],
};

// Simulate API delay for realistic behavior
const simulateDelay = (ms: number = 800) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Mock API service that mimics the real API structure
export const mockAnalyticsApi = {
  async getTeamDashboard(): Promise<TeamDashboardData> {
    await simulateDelay();
    return mockTeamDashboardData;
  },

  async getLeaderboard(): Promise<LeaderboardData> {
    await simulateDelay();
    return mockLeaderboardData;
  },

  async getLeaderboardWithHashtags(): Promise<{
    entries: typeof mockLeaderboardWithHashtags;
    availableHashtags: string[];
    availableDepartments: string[];
    totalEntries: number;
  }> {
    await simulateDelay();
    return {
      entries: mockLeaderboardWithHashtags,
      availableHashtags: availableHashtags,
      availableDepartments: availableDepartments,
      totalEntries: mockLeaderboardWithHashtags.length,
    };
  },

  async getParticipation(): Promise<any> {
    await simulateDelay();
    
    // Generate mock participation data directly
    return {
      metrics: {
        totalUsers: 458,
        activeUsers: 387,
        inactiveUsers: 71,
        participationRate: 84.5,
        averageRecognitionsPerUser: 12.8,
        newUsersThisMonth: 23,
        growthRate: 5.3,
      },
      activityTrends: generateDates(30).map((date, index) => ({
        date,
        activeUsers: Math.floor(320 + Math.random() * 80),
        newUsers: Math.floor(Math.random() * 8) + 2,
        recognitionsGiven: Math.floor(Math.random() * 150) + 200,
        recognitionsReceived: Math.floor(Math.random() * 150) + 200,
      })),
      departmentParticipation: [
        {
          department: 'Engineering',
          totalUsers: 125,
          activeUsers: 108,
          inactiveUsers: 17,
          participationRate: 86.4,
          avgRecognitionsPerUser: 14.2,
        },
        {
          department: 'Product',
          totalUsers: 78,
          activeUsers: 65,
          inactiveUsers: 13,
          participationRate: 83.3,
          avgRecognitionsPerUser: 11.5,
        },
        {
          department: 'Design',
          totalUsers: 52,
          activeUsers: 45,
          inactiveUsers: 7,
          participationRate: 86.5,
          avgRecognitionsPerUser: 13.8,
        },
        {
          department: 'Marketing',
          totalUsers: 89,
          activeUsers: 74,
          inactiveUsers: 15,
          participationRate: 83.1,
          avgRecognitionsPerUser: 10.9,
        },
        {
          department: 'Sales',
          totalUsers: 67,
          activeUsers: 55,
          inactiveUsers: 12,
          participationRate: 82.1,
          avgRecognitionsPerUser: 12.3,
        },
        {
          department: 'Customer Success',
          totalUsers: 47,
          activeUsers: 40,
          inactiveUsers: 7,
          participationRate: 85.1,
          avgRecognitionsPerUser: 15.1,
        },
      ],
      engagementLevels: [
        {
          level: 'Super Engaged',
          description: '20+ recognitions/month',
          userCount: 112,
          percentage: 24.5,
          color: '#10B981',
        },
        {
          level: 'Highly Engaged',
          description: '10-19 recognitions/month',
          userCount: 156,
          percentage: 34.1,
          color: '#3B82F6',
        },
        {
          level: 'Moderately Engaged',
          description: '5-9 recognitions/month',
          userCount: 89,
          percentage: 19.4,
          color: '#F59E0B',
        },
        {
          level: 'Lightly Engaged',
          description: '1-4 recognitions/month',
          userCount: 30,
          percentage: 6.6,
          color: '#EF4444',
        },
        {
          level: 'Inactive',
          description: '0 recognitions/month',
          userCount: 71,
          percentage: 15.5,
          color: '#9CA3AF',
        },
      ],
      userSegments: [
        {
          segment: 'Active Contributors',
          userCount: 268,
          percentage: 58.5,
          trend: 'up' as const,
          trendValue: 3.2,
        },
        {
          segment: 'Occasional Users',
          userCount: 119,
          percentage: 26.0,
          trend: 'stable' as const,
          trendValue: 0.5,
        },
        {
          segment: 'New Users (<30 days)',
          userCount: 23,
          percentage: 5.0,
          trend: 'up' as const,
          trendValue: 15.0,
        },
        {
          segment: 'At Risk (declining)',
          userCount: 48,
          percentage: 10.5,
          trend: 'down' as const,
          trendValue: -2.1,
        },
      ],
      topContributors: [
        { userId: '1', name: 'Sarah Johnson', recognitionsGiven: 45, recognitionsReceived: 38, department: 'Engineering' },
        { userId: '2', name: 'Michael Chen', recognitionsGiven: 42, recognitionsReceived: 41, department: 'Product' },
        { userId: '3', name: 'Emily Davis', recognitionsGiven: 39, recognitionsReceived: 35, department: 'Design' },
        { userId: '4', name: 'Robert Brown', recognitionsGiven: 38, recognitionsReceived: 40, department: 'Engineering' },
        { userId: '5', name: 'Lisa Wang', recognitionsGiven: 36, recognitionsReceived: 33, department: 'Marketing' },
      ],
    };
  },

  async getRecognitionAnalytics(): Promise<typeof mockRecognitionAnalyticsData> {
    await simulateDelay();
    return mockRecognitionAnalyticsData;
  },

  async getP2PVsAwardsAnalytics(): Promise<{
    metrics: {
      recognitionReceived: {
        total: number;
        trend: { value: number; period: string };
        perMonth: number;
      };
      pointReceived: {
        total: number;
        trend: { value: number; period: string };
        perMonth: number;
      };
      p2pVsAwards: {
        p2p: { count: number; points: number };
        awards: { count: number; points: number };
      };
    };
    recognitionReceivedChart: { date: string; p2p: number; awards: number }[];
    pointReceivedChart: { date: string; p2p: number; awards: number }[];
    numberOfUsersChart: { date: string; users: number }[];
  }> {
    await simulateDelay();
    
    const generateMonthlyData = (months: number) => {
      const data = [];
      const now = new Date('2025-08-01');
      for (let i = months - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setMonth(date.getMonth() - i);
        data.push({
          date: date.toISOString().split('T')[0],
          p2p: Math.floor(8000 + Math.random() * 4000),
          awards: Math.floor(1000 + Math.random() * 1000),
        });
      }
      return data;
    };

    const generateMonthlyPoints = (months: number) => {
      const data = [];
      const now = new Date('2025-08-01');
      for (let i = months - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setMonth(date.getMonth() - i);
        data.push({
          date: date.toISOString().split('T')[0],
          p2p: Math.floor(250000 + Math.random() * 150000),
          awards: Math.floor(50000 + Math.random() * 50000),
        });
      }
      return data;
    };

    const generateUsersData = (months: number) => {
      const data = [];
      const now = new Date('2025-08-01');
      let users = 1600;
      for (let i = months - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setMonth(date.getMonth() - i);
        users += Math.floor(Math.random() * 50);
        data.push({
          date: date.toISOString().split('T')[0],
          users: users,
        });
      }
      return data;
    };

    return {
      metrics: {
        recognitionReceived: {
          total: 121968,
          trend: { value: 0.95, period: 'August' },
          perMonth: 10164,
        },
        pointReceived: {
          total: 4197304,
          trend: { value: 67.20, period: 'August' },
          perMonth: 349775,
        },
        p2pVsAwards: {
          p2p: { count: 117193, points: 2820029 },
          awards: { count: 4775, points: 1377275 },
        },
      },
      recognitionReceivedChart: generateMonthlyData(12),
      pointReceivedChart: generateMonthlyPoints(12),
      numberOfUsersChart: generateUsersData(12),
    };
  },

  async getOrganizationGraph(): Promise<OrganizationGraphData> {
    await simulateDelay();
    return mockOrganizationGraphData;
  },

  async getTopWords(): Promise<typeof mockTopWordsData> {
    await simulateDelay();
    return mockTopWordsData;
  },
};

