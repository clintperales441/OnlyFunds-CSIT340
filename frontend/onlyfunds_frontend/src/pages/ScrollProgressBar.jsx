import React, { useState, useEffect } from 'react';
import './ScrollProgressBar.css';

const ScrollProgressBar = ({ onNavigateToLogin, onNavigateToRegister, onNavigateToHome }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showNavbar, setShowNavbar] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentScrollY / scrollHeight) * 100;
      
      setScrollProgress(progress);
      
      // Show navbar after scrolling down 100px
      if (currentScrollY > 100) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

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

      {/* Temporary Navbar */}
      <nav className={`temp-navbar ${showNavbar ? 'visible' : ''}`}>
        <div className="temp-navbar-content">
          {/* <div className="temp-logo" onClick={scrollToTop}>
            ONLY<span>FUNDS</span>
          </div> */}
          
          <div className="temp-nav-links">
            <a href="#about">About</a>
            <a href="#campaigns">Campaigns</a>
            <a href="#donate">Donate</a>
            <a href="#contact">Contact</a>
            <button className="temp-login-btn" onClick={onNavigateToLogin}>Login</button>
            <button className="temp-register-btn" onClick={onNavigateToRegister}>Register</button>
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