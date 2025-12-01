import api from './api';

// User Authentication Services
export const userService = {
  // Register a new user
  register: async (userData) => {
    try {
      const response = await api.post('/users/register', {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        age: parseInt(userData.age),
        gender: userData.gender.toUpperCase(),
        accountType: userData.accountType.toUpperCase(),
        organization: userData.organization || null,
        agreeToTerms: userData.agreeToTerms,
        avatar: userData.avatar || null,
      });
      
      // Store token if returned
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed. Please try again.' };
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/users/login', {
        email: credentials.email,
        password: credentials.password,
      });
      
      // Check if response is successful
      if (!response.data) {
        throw new Error('Invalid response from server');
      }
      
      // Store token and user info
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      
      if (response.data.user) {
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      // Properly throw the error with message
      const errorMessage = error.response?.data?.message || error.message || 'Login failed. Please check your credentials.';
      throw new Error(errorMessage);
    }
  },

  // Get user by ID
  getUserById: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user data.' };
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  },
};

export default userService;
