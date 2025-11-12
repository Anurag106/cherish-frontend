# Analytics Module

This directory contains all analytics-related pages and functionality for the application.

## Structure

```
analytics/
├── page.tsx                    # Main analytics page (redirects to team-dashboard)
├── team-dashboard/             # Team Dashboard (Implemented)
│   └── page.tsx
├── leaderboard/                # Leaderboard (Coming Soon)
│   └── page.tsx
├── participation/              # Participation Analytics (Coming Soon)
│   └── page.tsx
├── recognition/                # Recognition Analytics (Coming Soon)
│   └── page.tsx
├── organization-graph/         # Organization Graph (Coming Soon)
│   └── page.tsx
├── top-words/                  # Top Words Analytics (Coming Soon)
│   └── page.tsx
└── README.md
```

## Components

All analytics components are located in `src/components/features/analytics/`:

### Layout Components
- **AnalyticsLayout**: Main layout wrapper with sidebar navigation
- **AnalyticsSubmenu**: Navigation menu for analytics sections

### Team Dashboard Components
Located in `src/components/features/analytics/team-dashboard/`:
- **MetricsCard**: Displays individual metrics with icons and trends
- **RecognitionTrendChart**: Line chart showing recognition trends over time
- **DepartmentStatsTable**: Table showing department-wise statistics
- **TopPerformersCard**: Card showing top performing team members
- **PointsDistributionChart**: Bar chart showing distribution of points

## API Services

Located in `src/services/api/analytics/`:
- **analyticsApi.ts**: Service for all analytics API calls

## Types

Located in `src/types/api/analytics.ts`:
- Team Dashboard types
- Leaderboard types
- Participation types
- Recognition types
- Organization Graph types
- Top Words types

## Constants

Located in `src/constants/analytics.ts`:
- Menu items configuration
- Chart color schemes
- Date range options

## Hooks

Located in `src/hooks/api/`:
- **useTeamDashboard.ts**: Hook for fetching team dashboard data

## API Endpoints

Defined in `src/config/env.ts`:
- `/api/v1/analytics/team-dashboard`
- `/api/v1/analytics/leaderboard`
- `/api/v1/analytics/participation`
- `/api/v1/analytics/recognition`
- `/api/v1/analytics/organization-graph`
- `/api/v1/analytics/top-words`

## Navigation

Analytics pages are accessible from the main navigation header via a dropdown menu that includes:
1. Team dashboard
2. Leaderboard
3. Participation
4. Recognition
5. Organization graph
6. Top words

## Features

### Team Dashboard (Implemented)
- **Metrics Overview**: Total recognitions, points, active users, participation rate
- **Trend Analysis**: Line chart showing recognition and point trends over time
- **Points Distribution**: Bar chart showing how points are distributed
- **Top Performers**: List of top 5 performers with rankings
- **Department Statistics**: Table showing department-wise breakdown
- **Date Range Filter**: Ability to filter data by time period (7d, 30d, 90d, 1y, all time)
- **Responsive Design**: Works on desktop and mobile devices

### Other Pages (Coming Soon)
All other analytics pages have been scaffolded with placeholder content and will be implemented in future updates.

## Charting Library

The analytics module uses **Recharts** for data visualization:
- Easy to use and customize
- Great TypeScript support
- Responsive charts
- Beautiful default styling

## Usage

### Adding New Analytics Pages

1. Create a new page in the appropriate subdirectory
2. Add the page route to `ANALYTICS_MENU_ITEMS` in `src/constants/analytics.ts`
3. Create API endpoint in `src/config/env.ts`
4. Create types in `src/types/api/analytics.ts`
5. Add API service method in `src/services/api/analytics/analyticsApi.ts`
6. Create custom hook in `src/hooks/api/`
7. Create components in `src/components/features/analytics/`

### Example: Creating a New Analytics Page

```typescript
// 1. Add to constants
export const ANALYTICS_MENU_ITEMS: AnalyticsMenuItem[] = [
  // ... existing items
  {
    key: 'my-analytics',
    label: 'My Analytics',
    icon: MyIcon,
    path: '/analytics/my-analytics',
    description: 'Description of my analytics',
  },
];

// 2. Create page at src/app/analytics/my-analytics/page.tsx
// 3. Add types, API service, and components as needed
```

## Authentication

All analytics pages require authentication. Unauthenticated users are redirected to the login page with a redirect parameter to return to the analytics page after login.

## Responsive Design

The analytics module is fully responsive:
- Desktop: Sidebar navigation with main content area
- Mobile: Hamburger menu with drawer navigation

## Best Practices

1. **Keep components small and focused**: Each component should have a single responsibility
2. **Use TypeScript types**: All data should be properly typed
3. **Handle loading and error states**: Always show appropriate UI for loading and errors
4. **Make it responsive**: Test on both desktop and mobile
5. **Use constants**: Don't hardcode values, use the constants file
6. **Follow naming conventions**: Use clear, descriptive names for components and functions

