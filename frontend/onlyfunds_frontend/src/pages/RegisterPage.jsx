import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import { ROUTES } from '../constants/routes';
import './RegisterPage.css';

/**
 * RegisterPage - User registration with form validation
 */
const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, error: authError, clearError } = useAuth();

  const validateForm = (data) => {
    const errors = {};

    if (!data.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!data.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email is invalid';
    }
    if (!data.password) {
      errors.password = 'Password is required';
    } else if (data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (!data.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the terms';
    }

    return errors;
  };

  const handleSubmit = async (formData) => {
    try {
      clearError();
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        age: formData.age,
        gender: formData.gender,
        accountType: formData.accountType,
        organization: formData.organization,
        agreeToTerms: formData.agreeToTerms,
      });
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const { formData, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit: onSubmit } = useForm(
    {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: '',
      gender: 'male',
      accountType: 'donor',
      organization: '',
      agreeToTerms: false,
    },
    handleSubmit,
    validateForm
  );

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-box">
          <h1 className="register-title">ONLY<span>FUNDS</span></h1>
          <h2>Create Your Account</h2>
          <p className="register-subtitle">Join us in making a difference</p>

          {authError && <div className="error-alert">{authError}</div>}

          <form onSubmit={onSubmit} className="register-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${errors.firstName && touched.firstName ? 'input-error' : ''}`}
                  placeholder="John"
                  disabled={isSubmitting}
                />
                {errors.firstName && touched.firstName && (
                  <span className="error-text">{errors.firstName}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${errors.lastName && touched.lastName ? 'input-error' : ''}`}
                  placeholder="Doe"
                  disabled={isSubmitting}
                />
                {errors.lastName && touched.lastName && (
                  <span className="error-text">{errors.lastName}</span>
                )}
              </div>
            </div>

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

            <div className="form-row">
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

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${errors.confirmPassword && touched.confirmPassword ? 'input-error' : ''}`}
                  placeholder="••••••••"
                  disabled={isSubmitting}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <span className="error-text">{errors.confirmPassword}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="25"
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="form-input"
                  disabled={isSubmitting}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="accountType">Account Type</label>
              <select
                id="accountType"
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
                className="form-input"
                disabled={isSubmitting}
              >
                <option value="donor">Donor</option>
                <option value="fundraiser">Fundraiser</option>
              </select>
            </div>

            {formData.accountType === 'fundraiser' && (
              <div className="form-group">
                <label htmlFor="organization">Organization Name</label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Your organization"
                  disabled={isSubmitting}
                />
              </div>
            )}

            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                I agree to the Terms and Conditions
              </label>
              {errors.agreeToTerms && touched.agreeToTerms && (
                <span className="error-text">{errors.agreeToTerms}</span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <p className="register-footer">
            Already have an account?{' '}
            <Link to={ROUTES.LOGIN} className="link">Log in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
