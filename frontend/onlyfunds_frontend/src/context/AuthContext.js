import React, { createContext, useState, useCallback, useEffect } from 'react';
import { userService } from '../services/userService';

// Create Auth Context
export const AuthContext = createContext(null);

/**
 * AuthProvider - Centralized authentication state management
 * Handles: user login, logout, registration, session persistence
 */
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Restore user session on app load
  useEffect(() => {
    const storedUser = userService.getCurrentUser();
    if (storedUser) {
      setCurrentUser(storedUser);
    }
    setLoading(false);
  }, []);

  // Login handler
  const login = useCallback(async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      const response = await userService.login({ email, password });
      const userData = response.user || response;
      setCurrentUser(userData);
      return userData;
    } catch (err) {
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout handler
  const logout = useCallback(() => {
    userService.logout();
    setCurrentUser(null);
    setError(null);
  }, []);

  // Register handler
  const register = useCallback(async (userData) => {
    try {
      setError(null);
      setLoading(true);
      const response = await userService.register(userData);
      const newUser = response.user || response;
      setCurrentUser(newUser);
      return newUser;
    } catch (err) {
      const errorMessage = err.message || 'Registration failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    currentUser,
    loading,
    error,
    login,
    logout,
    register,
    clearError,
    isAuthenticated: !!currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
