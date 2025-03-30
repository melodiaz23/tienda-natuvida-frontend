import axios from 'axios';
import ApiPaths from './apiPaths';

const createApiInstance = () => {

  const getBaseUrl = () => {
    // Use production URL when running on server during build
    return typeof window === 'undefined'
      ? process.env.NEXT_PUBLIC_PRODUCTION_API_URL
      : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
  };

  const instance = axios.create({
    baseURL: getBaseUrl(),
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true // Ensures cookies are sent with requests
  });

  // Add interceptors in browser environment
  if (typeof window !== 'undefined') {
    instance.interceptors.request.use(config => {
      // Handle CSRF token for protection against CSRF attacks
      const cookies = document.cookie.split(';');
      const xsrfTokenCookie = cookies.find(cookie => cookie.trim().startsWith('XSRF-TOKEN='));
      if (xsrfTokenCookie && config.method !== 'get') {
        config.headers['X-XSRF-TOKEN'] = xsrfTokenCookie.split('=')[1];
      }

      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    }, error => Promise.reject(error));

    instance.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;
        // If error is 401 (Unauthorized) and we haven't tried refreshing token yet
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            // Get refresh token from storage
            const refreshToken = localStorage.getItem('refresh_token');
            if (!refreshToken) throw new Error('No refresh token available');

            const response = await axios.post(
              `${getBaseUrl()}${ApiPaths.AUTH}/refresh-token`, // Review this path
              { refreshToken },
              {
                baseURL: getBaseUrl(),
                headers: { 'Content-Type': 'application/json' }
              }
            );

            // If token refresh successful
            if (response.data.success && response.data.data) {
              const { token, refreshToken: newRefreshToken } = response.data.data;
              // Store new tokens
              localStorage.setItem('auth_token', token);
              if (newRefreshToken) localStorage.setItem('refresh_token', newRefreshToken);

              // Update auth header and retry original request
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
              return instance(originalRequest);
            }

            if (!error.response || error.message === 'Network Error') {
              console.error('Network error detected:', error);
              // You could emit an event or use a global state manager here
              // But returning Promise.reject is correct to let services handle it
            }

          } catch (refreshError) {
            console.log(refreshError);
            localStorage.removeItem('auth_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
          }
        }
        return Promise.reject(error);
      }
    );
  }
  return instance;
};

const api = createApiInstance();
export default api;