/**
 * API Configuration Utility
 * Centralizes API URL configuration for the application
 */

// Get API URL from environment variable or use fallback
export const getApiUrl = (): string => {
  // Priority 1: Environment variable (set in Vercel)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Priority 2: Check if we're in development (localhost)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return '/api'; // Use proxy in development (configured in vite.config.ts)
  }

  // Priority 3: Production fallback - Railway backend URL
  // This should be set via VITE_API_URL in Vercel/Railway, but provide fallback
  return 'https://synnectify-careers-portal-production.up.railway.app/api';
};

// Export the API URL as a constant
export const API_URL = getApiUrl();

// Log API URL for debugging (both dev and production)
console.log('🔗 API URL:', API_URL);
console.log('🔗 VITE_API_URL:', import.meta.env.VITE_API_URL || 'NOT SET');
if (import.meta.env.DEV) {
  console.log('🔗 Hostname:', window.location.hostname);
  console.log('🔗 Environment: Development');
} else {
  console.log('🔗 Environment: Production');
}


