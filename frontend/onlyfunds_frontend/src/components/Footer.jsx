import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import './Footer.css';

/**
 * Footer Component - Common footer for all pages
 */
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>OnlyFunds</h3>
            <p>Connecting hearts, changing lives, one donation at a time.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to={ROUTES.HOME}>Home</Link>
              </li>
              <li>
                <Link to={ROUTES.ABOUT}>About</Link>
              </li>
              <li>
                <Link to={ROUTES.CAMPAIGNS}>Campaigns</Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li>
                <Link to={ROUTES.CONTACT}>Contact Us</Link>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 OnlyFunds. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
