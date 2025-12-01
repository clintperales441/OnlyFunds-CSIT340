import React, { forwardRef } from 'react';
import './Homepage.css';


const Footer = forwardRef((props, ref) => {
 

  return (
    <footer className="footer" ref={ref}>
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">ONLY<span>FUNDS</span></div>
            <p className="tagline">Making giving simple and impactful</p>
          </div>
          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <a href="#about">About Us</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#campaigns">Browse Campaigns</a>
            <a href="#start">Start a Campaign</a>
          </div>
          
          <div className="footer-links">
            <h4>Support</h4>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact Us</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
          
          <div className="footer-newsletter">
            <h4>Stay Updated</h4>
            <p>Subscribe to our newsletter for inspiring stories and updates</p>
            <div className="subscribe-form">
              <input type="email" placeholder="Your email address" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="social-links">
            <span>Follow us:</span>
            <a href="#fb">FB</a>
            <a href="#ig">IG</a>
            <a href="#tw">TW</a>
            <a href="#li">LI</a>
          </div>
          <div className="copyright">© 2025 Onlyfunds. All rights reserved.</div>
        </div>
      </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;