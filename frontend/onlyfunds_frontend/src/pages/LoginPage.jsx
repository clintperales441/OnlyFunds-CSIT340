import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import { ROUTES } from '../constants/routes';
import './LoginPage.css';

/**
 * LoginPage - User login with form validation and error handling
 */
const LoginPage = () => {
  const navigate = useNavigate();
  const { login, error: authError, clearError } = useAuth();

  const validateForm = (data) => {
    const errors = {};
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email is invalid';
    }
    if (!data.password) {
      errors.password = 'Password is required';
    }
    return errors;
  };

  const handleSubmit = async (formData) => {
    try {
      clearError();
      await login(formData.email, formData.password);
      navigate(ROUTES.HOME);
    } catch (error) {
      // Error is handled by auth context
      console.error('Login failed:', error);
    }
  };

  const { formData, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit: onSubmit } = useForm(
    { email: '', password: '', rememberMe: false },
    handleSubmit,
    validateForm
  );

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <h1 className="login-title">ONLY<span>FUNDS</span></h1>
          <h2>Welcome Back</h2>
          <p className="login-subtitle">Log in to continue making a difference</p>

          {authError && <div className="error-alert">{authError}</div>}

          <form onSubmit={onSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${errors.email && touched.email ? 'input-error' : ''}`}
                placeholder="you@example.com"
                disabled={isSubmitting}
              />
              {errors.email && touched.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${errors.password && touched.password ? 'input-error' : ''}`}
                placeholder="••••••••"
                disabled={isSubmitting}
              />
              {errors.password && touched.password && (
                <span className="error-text">{errors.password}</span>
              )}
            </div>

            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <p className="login-footer">
            Don't have an account?{' '}
            <a href={ROUTES.REGISTER} className="link">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
