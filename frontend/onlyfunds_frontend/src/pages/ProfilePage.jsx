import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useCampaigns } from '../hooks/useCampaigns';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import './ProfilePage.css';

/**
 * ProfilePage - User profile with personal information and donation history
 */
const ProfilePage = () => {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  const { campaigns, fetchCampaigns } = useCampaigns();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  if (!isAuthenticated) {
    return null;
  }

  // Get campaigns created by this user (if fundraiser)
  const userCampaigns = currentUser?.accountType === 'fundraiser'
    ? campaigns.filter((c) => c.creatorId === currentUser.id)
    : [];

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            {currentUser?.avatar ? (
              <img src={currentUser.avatar} alt={currentUser.firstName} />
            ) : (
              <div className="avatar-placeholder">
                {currentUser?.firstName[0]}
              </div>
            )}
          </div>
          <div className="profile-info">
            <h1>{currentUser?.firstName} {currentUser?.lastName}</h1>
            <p className="profile-email">{currentUser?.email}</p>
            <p className="profile-type">
              {currentUser?.accountType === 'fundraiser' ? '🎯 Fundraiser' : '❤️ Donor'}
            </p>
          </div>
        </div>

        {/* Profile Content */}
        <div className="profile-content">
          {/* Personal Information */}
          <section className="profile-section">
            <h2>Personal Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>First Name</label>
                <p>{currentUser?.firstName}</p>
              </div>
              <div className="info-item">
                <label>Last Name</label>
                <p>{currentUser?.lastName}</p>
              </div>
              <div className="info-item">
                <label>Email</label>
                <p>{currentUser?.email}</p>
              </div>
              <div className="info-item">
                <label>Age</label>
                <p>{currentUser?.age || 'Not provided'}</p>
              </div>
              <div className="info-item">
                <label>Gender</label>
                <p>{currentUser?.gender ? currentUser.gender.charAt(0).toUpperCase() + currentUser.gender.slice(1) : 'Not provided'}</p>
              </div>
              <div className="info-item">
                <label>Account Type</label>
                <p>{currentUser?.accountType.charAt(0).toUpperCase() + currentUser?.accountType.slice(1)}</p>
              </div>
              {currentUser?.organization && (
                <div className="info-item">
                  <label>Organization</label>
                  <p>{currentUser.organization}</p>
                </div>
              )}
            </div>
          </section>

          {/* Campaigns Section */}
          {currentUser?.accountType === 'fundraiser' && (
            <section className="profile-section">
              <h2>Your Campaigns</h2>
              {userCampaigns.length === 0 ? (
                <p className="empty-message">
                  You haven't created any campaigns yet.{' '}
                  <a href={ROUTES.CREATE_CAMPAIGN}>Create one now</a>
                </p>
              ) : (
                <div className="campaigns-list">
                  {userCampaigns.map((campaign) => (
                    <div key={campaign.id} className="campaign-item">
                      <h3>{campaign.title}</h3>
                      <p>{campaign.description}</p>
                      <div className="campaign-stats">
                        <span>₱{campaign.currentAmount.toLocaleString()} raised</span>
                        <span>of ₱{campaign.goalAmount.toLocaleString()} goal</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Donor Statistics */}
          {currentUser?.accountType === 'donor' && (
            <section className="profile-section">
              <h2>Donation Statistics</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total Donations</h3>
                  <p className="stat-number">15</p>
                </div>
                <div className="stat-card">
                  <h3>Total Donated</h3>
                  <p className="stat-number">₱5,250</p>
                </div>
                <div className="stat-card">
                  <h3>Lives Impacted</h3>
                  <p className="stat-number">42</p>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
