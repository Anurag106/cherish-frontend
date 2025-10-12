# Project Structure

This document outlines the production-ready, professional structure of the frontend application.

## 📁 Directory Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── analytics/
│   ├── api/                      # API routes
│   ├── home/
│   ├── login/
│   ├── rewards/
│   └── layout.tsx
├── components/                   # React components
│   ├── features/                 # Feature-based components
│   │   ├── feed/                 # Feed-related components
│   │   │   ├── FeedFilter.tsx
│   │   │   ├── FeedLayout.tsx
│   │   │   └── index.ts
│   │   ├── posts/                # Post-related components
│   │   │   ├── PostCard.tsx
│   │   │   ├── PostsList.tsx
│   │   │   ├── PostCreationPlaceholder.tsx
│   │   │   ├── RecognitionInput.tsx
│   │   │   └── index.ts
│   │   ├── comments/             # Comment-related components
│   │   │   ├── CommentSection.tsx
│   │   │   ├── UnifiedCommentForm.tsx
│   │   │   └── index.ts
│   │   └── auth/                 # Authentication components
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   ├── LayoutWrapper.tsx
│   │   └── SearchBar.tsx
│   ├── modals/                   # Modal components
│   │   ├── AddFeedModal.tsx
│   │   ├── CommentModal.tsx
│   │   ├── LikesModal.tsx
│   │   ├── AddOnModal.tsx
│   │   ├── GiveRecognitionModal.tsx
│   │   └── index.ts
│   ├── ui/                       # Reusable UI components
│   │   ├── Avatar.tsx
│   │   ├── Badge.tsx
│   │   └── Button.tsx
│   └── index.ts                  # Main components export
├── services/                     # API services
│   └── api/                      # Domain-specific API services
│       ├── auth/                 # Authentication API
│       │   └── authApi.ts
│       ├── posts/                # Posts API
│       │   └── postsApi.ts
│       ├── comments/             # Comments API
│       │   └── commentsApi.ts
│       ├── users/                # Users API
│       │   └── usersApi.ts
│       ├── hashtags/             # Hashtags API
│       │   └── hashtagsApi.ts
│       ├── likes/                # Likes/Reactions API
│       │   └── likesApi.ts
│       ├── base.ts               # Base API service
│       └── index.ts              # Main API service export
├── hooks/                        # Custom React hooks
│   ├── api/                      # API-related hooks
│   │   └── useAuth.ts
│   ├── ui/                       # UI-related hooks
│   │   ├── useFeedFilter.ts
│   │   └── useReactions.ts
│   └── index.ts                  # Main hooks export
├── types/                        # TypeScript type definitions
│   ├── api/                      # API-related types
│   │   ├── auth.ts
│   │   └── recognition.ts
│   ├── components/               # Component-related types
│   └── index.ts                  # Main types export
├── utils/                        # Utility functions
│   ├── api/                      # API-related utilities
│   │   ├── postTransformers.ts
│   │   └── session.ts
│   ├── ui/                       # UI-related utilities
│   │   ├── initials.ts
│   │   └── parseRecognitionMarkup.ts
│   ├── validation/               # Validation utilities
│   ├── navigation.ts
│   └── index.ts                  # Main utils export
├── contexts/                     # React contexts
│   └── UserContext.tsx
└── config/                       # Configuration files
    └── env.ts
```

## 🏗️ Architecture Principles

### 1. **Feature-Based Organization**
Components are organized by feature rather than by type, making it easier to:
- Locate related functionality
- Maintain and scale features
- Onboard new developers

### 2. **Domain-Driven API Services**
API services are split by domain:
- **Auth**: Authentication and user management
- **Posts**: Post creation, retrieval, and management
- **Comments**: Comments and add-ons
- **Users**: User data and mentions
- **Hashtags**: Hashtag management
- **Likes**: Reactions and likes

### 3. **Zero Index Files**
No index files are used - all imports are direct and explicit:
```typescript
// All imports use direct paths for maximum clarity:
import { FeedFilter } from '@/components/features/feed/FeedFilter';
import { PostCard } from '@/components/features/posts/PostCard';
import { Avatar } from '@/components/ui/Avatar';
import { postsApi } from '@/services/api/posts/postsApi';
import { authApi } from '@/services/api/auth/authApi';
```

### 4. **Separation of Concerns**
- **Components**: Pure UI logic and presentation
- **Hooks**: Business logic and state management
- **Services**: API communication
- **Utils**: Helper functions and transformations
- **Types**: Type definitions and interfaces

## 🚀 Benefits

### **Maintainability**
- Clear separation of concerns
- Easy to locate and modify functionality
- Consistent file organization

### **Scalability**
- Easy to add new features
- Modular architecture
- Reusable components and services

### **Developer Experience**
- Clean import paths
- IntelliSense support
- Easy navigation

### **Production Ready**
- Professional structure
- Type safety throughout
- Proper error handling
- Performance optimizations

## 📋 Usage Examples

### **Importing Components**
```typescript
// Direct imports for clarity
import { FeedFilter } from '@/components/features/feed/FeedFilter';
import { PostCard } from '@/components/features/posts/PostCard';
import { Avatar } from '@/components/ui/Avatar';
```

### **Using API Services**
```typescript
// Direct API service imports
import { postsApi } from '@/services/api/posts/postsApi';
import { commentsApi } from '@/services/api/comments/commentsApi';
import { authApi } from '@/services/api/auth/authApi';

// Use specific domain services directly
const posts = await postsApi.getPosts(token, filters);
const comments = await commentsApi.createComment(token, data);
```

### **Using Hooks**
```typescript
// Direct imports
import { useFeedFilter } from '@/hooks/ui/useFeedFilter';
import { useAuth } from '@/hooks/api/useAuth';
```

### **Using Types**
```typescript
// Direct imports
import { Post, Comment } from '@/types/api/recognition';
import { LoginCredentials } from '@/types/api/auth';
```

This structure follows industry best practices and is ready for production deployment with a team of developers.
