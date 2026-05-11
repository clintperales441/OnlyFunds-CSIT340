import React, { useState, useEffect } from 'react';
import './ScrollProgressBar.css';

const ScrollProgressBar = ({
  onNavigateToLogin,
  onNavigateToRegister,
  onNavigateToProfile,
  onNavigateToHome,
  currentUser,
  onLogout,
  onNavigateToAbout,
  onNavigateToCampaigns,
  onNavigateToDonate,
  onNavigateToContact,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showNavbar, setShowNavbar] = useState(false);
  const [isHoveringTop, setIsHoveringTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentScrollY / scrollHeight) * 100;
      setScrollProgress(progress);
      setShowNavbar(currentScrollY > 100);
    };

    const handleMouseMove = (e) => {
      setIsHoveringTop(e.clientY <= 50);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <nav className={`temp-navbar ${showNavbar || isHoveringTop ? 'visible' : ''}`}>
        <div className="temp-navbar-content">
          <div className="temp-nav-links" style={{ flex: 1 }}>
            <button className="nav-link-btn" onClick={onNavigateToHome}>Home</button>
            <button className="nav-link-btn" onClick={onNavigateToCampaigns}>Campaigns</button>
            <button className="nav-link-btn" onClick={onNavigateToDonate}>Donate</button>
            <button className="nav-link-btn" onClick={onNavigateToAbout}>About</button>
            <button className="nav-link-btn" onClick={onNavigateToContact}>Contact</button>
          </div>
          <div className="temp-nav-user-area">
            {currentUser ? (
              <div className="navbar-user-pill">
                <button
                  className="navbar-user-avatar-btn"
                  onClick={onNavigateToProfile}
                  title="Profile"
                  aria-label="Go to profile"
                >
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="10" r="6" fill="#a094f4"/>
                    <ellipse cx="12" cy="19" rx="7" ry="3.5" fill="#a094f4"/>
                  </svg>
                </button>
                <span className="navbar-user-name">
                  {currentUser.firstName}
                </span>
                <button className="navbar-logout-icon" onClick={onLogout} title="Log out" aria-label="Log out">
                  <svg height="22" width="22" fill="#888" viewBox="0 0 24 24">
                    <path d="M16 13v-2H7V8l-5 4 5 4v-3h9z"/>
                    <path d="M20 3H12c-1.1 0-2 .9-2 2v4h2V5h8v14h-8v-4h-2v4c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
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
      <button
        className={`scroll-to-top ${showNavbar ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  );
};

export default ScrollProgressBar;