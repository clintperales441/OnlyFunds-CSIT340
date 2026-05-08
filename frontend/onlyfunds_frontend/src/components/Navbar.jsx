import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants/routes';
import './Navbar.css';

/**
 * Navbar Component - Main navigation
 * Shows different links based on authentication status
 */
const Navbar = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to={ROUTES.HOME} className="navbar-logo">
          ONLY<span>FUNDS</span>
        </Link>

        <ul className="navbar-menu">
          <li>
            <Link to={ROUTES.HOME}>Home</Link>
          </li>
          <li>
            <Link to={ROUTES.ABOUT}>About</Link>
          </li>
          <li>
            <Link to={ROUTES.CAMPAIGNS}>Campaigns</Link>
          </li>
          <li>
            <Link to={ROUTES.CONTACT}>Contact</Link>
          </li>
        </ul>

        <div className="navbar-auth">
          {isAuthenticated ? (
            <>
              <span className="navbar-user">{currentUser?.firstName}</span>
              <Link to={ROUTES.PROFILE} className="navbar-btn">
                Profile
              </Link>
              <Link to={ROUTES.CREATE_CAMPAIGN} className="navbar-btn primary">
                Create Campaign
              </Link>
              <button onClick={handleLogout} className="navbar-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to={ROUTES.LOGIN} className="navbar-btn">
                Login
              </Link>
              <Link to={ROUTES.REGISTER} className="navbar-btn primary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
