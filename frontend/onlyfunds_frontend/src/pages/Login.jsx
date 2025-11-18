import React, { useState } from 'react';
import './Login.css';

const Login = ({ onBackToHome, onLogin, onNavigateToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

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

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm() && onLogin) {
      onLogin({ email: formData.email, password: formData.password });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <button className="back-link-button" onClick={onBackToHome}>← Back to Home</button>
        <div className="login-left">
          <div className="brand-section">
            <h1 className="logo">ONLY<span>FUNDS</span></h1>
            <h2>Welcome Back!</h2>
            <p>Log in to continue making a difference in the world</p>
            
            <div className="features">
              <div className="feature-item">
                <div className="feature-number">01</div>
                <div className="feature-content">
                  <h4>Secure Access</h4>
                  <p>Your account is protected with industry-standard security</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-number">02</div>
                <div className="feature-content">
                  <h4>Track Your Impact</h4>
                  <p>View all your donations and campaigns in one place</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-number">03</div>
                <div className="feature-content">
                  <h4>Stay Connected</h4>
                  <p>Get updates on the causes you care about</p>
                </div>
              </div>
            </div>

            <div className="quote">
              <p>"Together, we make a difference"</p>
            </div>
          </div>
        </div>

        <div className="login-right">
          <div className="form-wrapper">
            <div className="form-header">
              <h2>Sign In</h2>
              <p className="subtitle">Enter your credentials to access your account</p>
            </div>

            <div className="login-form">
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  className={errors.email ? 'error' : ''}
                  placeholder="john.doe@example.com"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    className={errors.password ? 'error' : ''}
                    placeholder="Enter your password"
                  />
                  <button 
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <span>Remember me</span>
                </label>
                <a href="#forgot-password" className="forgot-link">Forgot Password?</a>
              </div>

              <button type="button" onClick={handleSubmit} className="login-button">
                Sign In
              </button>

              <div className="divider">
                <span>or continue with</span>
              </div>

              <div className="social-login">
                <button type="button" className="social-button google">
                  <span className="social-icon">G</span>
                  Google
                </button>
                <button type="button" className="social-button facebook">
                  <span className="social-icon">f</span>
                  Facebook
                </button>
              </div>

              <div className="register-link">
                Don't have an account?{" "}
                <a
                  href="#register"
                  onClick={e => {
                    e.preventDefault();
                    onNavigateToRegister && onNavigateToRegister();
                  }}
                >
                  Create one here
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;