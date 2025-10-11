/**
 * Environment configuration
 * Centralized place for all environment variables
 * Supports .env.local for development and .env.production for production
 */

const getApiBaseUrl = (): string => {
  // Check if we have the environment variable
  const envUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  if (envUrl) {
    return envUrl;
  }
  
  // Fallback based on environment
  if (process.env.NODE_ENV === 'production') {
    // You can set a default production URL here or throw an error
    throw new Error('NEXT_PUBLIC_API_BASE_URL must be set in production environment');
  }
  
  // Default for development
  return 'http://localhost:5100';
};

export const env = {
  API_BASE_URL: getApiBaseUrl(),
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
} as const;

export const apiEndpoints = {
  // Authentication
  LOGIN: '/api/v1/auth/login',
  
  // User endpoints
  USER_PROFILE: '/api/v1/user/profile',
  USER_RECIPIENTS: '/api/v1/user/recipients',
  USER_AUTOCOMPLETE: '/api/v1/user/autocomplete',
  
  // Post endpoints
  POST_CREATE: '/api/v1/post',
  POST_LIST: '/api/v1/post/list',
  
  // Hashtags (when backend is ready)
  HASHTAGS: '/api/v1/hashtag',
} as const;
