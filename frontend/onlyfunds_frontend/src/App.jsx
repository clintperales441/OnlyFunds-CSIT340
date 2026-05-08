import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CampaignProvider } from './context/CampaignContext';
import { ROUTES } from './constants/routes';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import CampaignsPage from './pages/CampaignsPage';
import './App.css';

/**
 * Main App Component - Clean architecture with proper routing and state management
 * - Uses React Router for navigation
 * - Uses Context API for global state (Auth, Campaigns)
 * - Protected routes for authenticated pages
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <CampaignProvider>
          <Routes>
            <Route element={<Layout />}>
              {/* Public Routes */}
              <Route path={ROUTES.HOME} element={<HomePage />} />
              <Route path={ROUTES.CAMPAIGNS} element={<CampaignsPage />} />

              {/* Protected Routes */}
              <Route
                path={ROUTES.CREATE_CAMPAIGN}
                element={
                  <ProtectedRoute>
                    <div>Create Campaign Page (Coming Soon)</div>
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </CampaignProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
