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
  LOGIN: '/api/v1/auth/login',
  // Add more endpoints here as needed
} as const;
