import axios from 'axios';

// Base API configuration
const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect on 401 if user was already logged in (has token)
    // Don't redirect on failed login attempts
    if (error.response?.status === 401) {
      const hasToken = localStorage.getItem('authToken');
      const isLoginEndpoint = error.config?.url?.includes('/login');
      
      // Only clear and redirect if user had a token and it's not a login attempt
      if (hasToken && !isLoginEndpoint) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        // User's session expired, redirect to homepage
        window.location.href = '/';
      }
      // For login failures, just pass the error through without redirecting
    }
    return Promise.reject(error);
  }
);

export default api;
