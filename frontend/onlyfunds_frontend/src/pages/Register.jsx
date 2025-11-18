import React, { useState } from 'react';
import './Register.css';

// Accept the new prop for login navigation!
const Register = ({ onBackToHome, onGoToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'donor',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Registration successful! (Frontend only - no backend yet)');
      if (onGoToLogin) {
        onGoToLogin(); // Redirects to login page after registration
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <button className="back-link-button" onClick={onBackToHome}>← Back to Home</button>
        <div className="register-left">
          <div className="brand-section">
            <h1 className="logo">ONLY<span>FUNDS</span></h1>
            <h2>Join Our Community</h2>
            <p>Create an account to start making a difference today</p>
            
            <div className="benefits">
              <div className="benefit-item">
                <div className="benefit-icon">✓</div>
                <div className="benefit-text">
                  <h4>Easy Donations</h4>
                  <p>Support causes with just a few clicks</p>
                </div>
              </div>
              
              <div className="benefit-item">
                <div className="benefit-icon">✓</div>
                <div className="benefit-text">
                  <h4>Create Campaigns</h4>
                  <p>Start your own fundraising initiative</p>
                </div>
              </div>
              
              <div className="benefit-item">
                <div className="benefit-icon">✓</div>
                <div className="benefit-text">
                  <h4>Track Impact</h4>
                  <p>See how your contributions help others</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="register-right">
          <div className="form-wrapper">
            <h2>Create Account</h2>
            <p className="subtitle">Fill in your details to get started</p>

            <div className="register-form">
              <div className="account-type-selector">
                <label className={`type-option ${formData.accountType === 'donor' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="accountType"
                    value="donor"
                    checked={formData.accountType === 'donor'}
                    onChange={handleChange}
                  />
                  <span>I want to donate</span>
                </label>
                
                <label className={`type-option ${formData.accountType === 'organization' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="accountType"
                    value="organization"
                    checked={formData.accountType === 'organization'}
                    onChange={handleChange}
                  />
                  <span>I represent an organization</span>
                </label>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? 'error' : ''}
                    placeholder="John"
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? 'error' : ''}
                    placeholder="Doe"
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="john.doe@example.com"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                  placeholder="At least 8 characters"
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? 'error' : ''}
                  placeholder="Re-enter your password"
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                  />
                  <span>I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a></span>
                </label>
                {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
              </div>

              <button type="button" onClick={handleSubmit} className="register-button">
                Create Account
              </button>

              <div className="login-link">
                Already have an account? <a href="#login">Log in here</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;