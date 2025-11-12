/**
 * Analytics constants
 * Menu items, routes, and configuration for analytics pages
 */

import {
  ChartBarIcon,
  TrophyIcon,
  UserGroupIcon,
  StarIcon,
  ShareIcon,
  HashtagIcon,
} from '@heroicons/react/24/outline';

export type AnalyticsMenuItemKey = 
  | 'team-dashboard' 
  | 'leaderboard' 
  | 'participation' 
  | 'recognition' 
  | 'organization-graph' 
  | 'top-words';

export interface AnalyticsMenuItem {
  key: AnalyticsMenuItemKey;
  label: string;
  icon: any;
  path: string;
  description: string;
}

export const ANALYTICS_MENU_ITEMS: AnalyticsMenuItem[] = [
  {
    key: 'team-dashboard',
    label: 'Team dashboard',
    icon: ChartBarIcon,
    path: '/analytics/team-dashboard',
    description: 'Overview of team performance and metrics',
  },
  {
    key: 'leaderboard',
    label: 'Leaderboard',
    icon: TrophyIcon,
    path: '/analytics/leaderboard',
    description: 'Top performers and rankings',
  },
  {
    key: 'participation',
    label: 'Participation',
    icon: UserGroupIcon,
    path: '/analytics/participation',
    description: 'User engagement and activity levels',
  },
  {
    key: 'recognition',
    label: 'Recognition',
    icon: StarIcon,
    path: '/analytics/recognition',
    description: 'Recognition patterns and trends',
  },
  {
    key: 'organization-graph',
    label: 'Organization graph',
    icon: ShareIcon,
    path: '/analytics/organization-graph',
    description: 'Network visualization of team connections',
  },
  {
    key: 'top-words',
    label: 'Top words',
    icon: HashtagIcon,
    path: '/analytics/top-words',
    description: 'Most used hashtags and keywords',
  },
];

// Chart color schemes
export const CHART_COLORS = {
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#06b6d4',
  purple: '#a855f7',
  pink: '#ec4899',
  indigo: '#6366f1',
  teal: '#14b8a6',
} as const;

export const CHART_COLOR_ARRAY = [
  CHART_COLORS.primary,
  CHART_COLORS.secondary,
  CHART_COLORS.success,
  CHART_COLORS.warning,
  CHART_COLORS.purple,
  CHART_COLORS.pink,
  CHART_COLORS.indigo,
  CHART_COLORS.teal,
] as const;

// Date range options
export const DATE_RANGE_OPTIONS = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: '1y', label: 'Last year' },
  { value: 'all', label: 'All time' },
] as const;

export type DateRangeValue = typeof DATE_RANGE_OPTIONS[number]['value'];

