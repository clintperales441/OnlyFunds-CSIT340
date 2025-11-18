import React, { useState, useEffect } from 'react';
import './ScrollProgressBar.css';

const ScrollProgressBar = ({
  onNavigateToLogin,
  onNavigateToRegister,
  onNavigateToHome,
  currentUser,
  onLogout
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentScrollY / scrollHeight) * 100;
      setScrollProgress(progress);
      setShowNavbar(currentScrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="scroll-progress-container">
        <div 
          className="scroll-progress-bar" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Navbar */}
      <nav className={`temp-navbar ${showNavbar ? 'visible' : ''}`}>
        <div className="temp-navbar-content">
          <div className="temp-nav-links">
            <a href="#about">About</a>
            <a href="#campaigns">Campaigns</a>
            <a href="#donate">Donate</a>
            <a href="#contact">Contact</a>
            
            {currentUser ? (
              <div className="navbar-user-pill">
                <span className="navbar-user-avatar">
                  <svg width="24" height="24" fill="#7957fa" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M12 14c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z"/></svg>
                </span>
                <span className="navbar-user-name">{currentUser.firstName || currentUser.email}</span>
                <button className="navbar-logout-icon" onClick={onLogout} title="Log out">
                  <svg height="22" width="22" fill="#888" viewBox="0 0 24 24">
                    <path d="M16 13v-2H7V8l-5 4 5 4v-3h9z"/><path d="M20 3H12c-1.1 0-2 .9-2 2v4h2V5h8v14h-8v-4h-2v4c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                  </svg>
                </button>
              </div>
            ) : (
              <>
                <button className="temp-login-btn" onClick={onNavigateToLogin}>Login</button>
                <button className="temp-register-btn" onClick={onNavigateToRegister}>Register</button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Scroll to Top Button */}
      <button 
        className={`scroll-to-top ${showNavbar ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </>
  );
};

export default ScrollProgressBar;