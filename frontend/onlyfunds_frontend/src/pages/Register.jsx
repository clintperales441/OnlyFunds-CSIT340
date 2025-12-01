import React, { useState } from 'react';
import './Register.css';
import { userService } from '../services/userService';

// Accept onRegister callback for data persistence
const Register = ({ onBackToHome, onRegister, onNavigateToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'donor',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

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

    if (!formData.gender) {
      newErrors.gender = 'Please select a gender';
    }

    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (parseInt(formData.age) < 1 || parseInt(formData.age) > 120) {
      newErrors.age = 'Enter a valid age';
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

  const handleSubmit = async () => {
    if (validateForm()) {
      setLoading(true);
      setErrors({});
      setSuccessMessage('');
      
      try {
        // Call backend API to register user
        const response = await userService.register(formData);
        
        setSuccessMessage('Registration successful! Logging you in...');
        
        // Pass user data to parent component (App will handle login and redirect)
        if (onRegister) {
          onRegister(response.user || response);
        }
      } catch (error) {
        setErrors({ 
          submit: error.message || 'Registration failed. Please try again.' 
        });
      } finally {
        setLoading(false);
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
              
              {successMessage && (
                <div className="success-message" style={{ 
                  padding: '12px', 
                  marginBottom: '20px', 
                  background: '#d4edda', 
                  color: '#155724', 
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  {successMessage}
                </div>
              )}
              
              {errors.submit && (
                <div className="error-message" style={{ 
                  padding: '12px', 
                  marginBottom: '20px', 
                  background: '#f8d7da', 
                  color: '#721c24', 
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  {errors.submit}
                </div>
              )}

              {/* Account Type Selector */}
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

              {/* First and Last name */}
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

              {/* Gender and Age */}
              <div className="form-row">
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={errors.gender ? 'error' : ''}
                  >
                    <option value="">Select...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <span className="error-message">{errors.gender}</span>}
                </div>
                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    name="age"
                    min="1"
                    max="120"
                    value={formData.age}
                    onChange={handleChange}
                    className={errors.age ? 'error' : ''}
                    placeholder="Age"
                  />
                  {errors.age && <span className="error-message">{errors.age}</span>}
                </div>
              </div>

              {/* Email */}
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

              {/* Password */}
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

              {/* Confirm Password */}
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

              {/* Agree Terms */}
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

              <button 
                type="button" 
                onClick={handleSubmit} 
                className="register-button"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>

              <div className="login-link">
                Already have an account? <a href="#login" onClick={(e) => { e.preventDefault(); onNavigateToLogin && onNavigateToLogin(); }}>Log in here</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;