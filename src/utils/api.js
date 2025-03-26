import axios from 'axios';

// Create the base axios instance
const createApiInstance = () => {

  // Determine base URL based on environment
  const getBaseUrl = () => {
    // When running on the server during build
    if (typeof window === 'undefined') {
      return process.env.NEXT_PUBLIC_PRODUCTION_API_URL;
    }
    // In the browser, use the normal configuration
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';
  };

  const instance = axios.create({
    baseURL: getBaseUrl(),
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true // Include cookies in requests
  });

  // Only add the interceptor in the browser environment
  if (typeof window !== 'undefined') {
    instance.interceptors.request.use(config => {
      // Get CSRF token from cookie
      const cookies = document.cookie.split(';');
      const xsrfTokenCookie = cookies.find(cookie => cookie.trim().startsWith('XSRF-TOKEN='));

      if (xsrfTokenCookie) {
        const xsrfToken = xsrfTokenCookie.split('=')[1];
        // Include token in header for non-GET requests
        if (config.method !== 'get') {
          config.headers['X-XSRF-TOKEN'] = xsrfToken;
        }
      }

      return config;
    });

    // Add a response interceptor to log errors
    instance.interceptors.response.use(
      response => response,
      error => {
        console.error('API call failed:', error.message, error.response?.data);
        return Promise.reject(error);
      }
    );
  }

  return instance;
};

const api = createApiInstance();

export default api;