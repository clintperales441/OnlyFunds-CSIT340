import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollProgressBar from '../components/ScrollProgressBar';
import './Layout.css';

/**
 * Layout Component - Wrapper for all pages
 * Provides consistent header, footer, and progress bar across the app
 */
const Layout = () => {
  return (
    <div className="layout">
      <ScrollProgressBar />
      <Navbar />
      <main className="layout-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
