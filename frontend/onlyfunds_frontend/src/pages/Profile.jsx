import React, { useState, useEffect } from 'react';
import './Profile.css';
import { campaignService } from '../services/campaignService';
import { donationService } from '../services/donationService';
import ReceiptModal from './ReceiptModal';

const Profile = ({ currentUser, onBackToHome }) => {
  const [userCampaigns, setUserCampaigns] = useState([]);
  const [userDonations, setUserDonations] = useState([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);
  const [loadingDonations, setLoadingDonations] = useState(true);
  // Use currentUser as the source of truth
  const [profile, setProfile] = useState(currentUser || {});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(currentUser || {});
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [expandedReceipts, setExpandedReceipts] = useState({});

  // Keep profile/formData in sync with currentUser when switching users or on first load.
  useEffect(() => {
    if (currentUser) {
      setProfile(currentUser);
      setFormData(currentUser);
      
      // Load user's campaigns and donations
      const loadUserData = async () => {
        try {
          if (currentUser.userId) {
            // Load campaigns
            setLoadingCampaigns(true);
            const campaigns = await campaignService.getCampaignsByUser(currentUser.userId);
            setUserCampaigns(campaigns);
            
            // Load donations
            setLoadingDonations(true);
            const donations = await donationService.getDonationsByUser(currentUser.userId);
            setUserDonations(donations);
          }
        } catch (error) {
          console.error('Failed to load user data:', error);
        } finally {
          setLoadingCampaigns(false);
          setLoadingDonations(false);
        }
      };
      
      loadUserData();

      // Real-time polling for user data updates (campaigns and donations)
      const pollInterval = setInterval(async () => {
        try {
          if (currentUser.userId) {
            const campaigns = await campaignService.getCampaignsByUser(currentUser.userId);
            setUserCampaigns(campaigns);
            
            const donations = await donationService.getDonationsByUser(currentUser.userId);
            setUserDonations(donations);
          }
        } catch (error) {
          console.error('Failed to poll user data:', error);
        }
      }, 8000); // Poll every 8 seconds

      return () => clearInterval(pollInterval);
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
    alert('Profile updated locally! (This does NOT sync to login until you wire it up.)');
    // If you want changes to persist globally, lift state up and update App.js' currentUser as well!
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  if (!profile || !profile.email) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <button className="back-link-button" onClick={onBackToHome}>← Back to Home</button>
          <div style={{textAlign: 'center', marginTop: "80px"}}>No profile details found. Please log in.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <button className="back-link-button" onClick={onBackToHome}>← Back to Home</button>
        <div className="profile-card">
          <div className="profile-header">
            <h1>My Profile</h1>
            <p>Manage your account information</p>
          </div>
          <div className="profile-content">
            <div className="profile-avatar">
              <div className="avatar-placeholder">
                <span>
                  {profile.firstName && profile.lastName
                    ? `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`
                    : ''}
                </span>
              </div>
              <div className="avatar-info">
                <h2>{profile.firstName} {profile.lastName}</h2>
                <p>{profile.email}</p>
              </div>
            </div>
            <form className="profile-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Email Address"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="First Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  >
                    <option value="">Select...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    id="age"
                    type="number"
                    name="age"
                    value={formData.age || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Age"
                    min="1"
                    max="120"
                  />
                </div>
              </div>
              <div className="form-actions">
                {!isEditing ? (
                  <button type="button" className="edit-btn" onClick={handleEditToggle}>
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button type="button" className="cancel-btn" onClick={handleCancel}>
                      Cancel
                    </button>
                    <button type="button" className="save-btn" onClick={handleSave}>
                      Save Changes
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Receipt History Section */}
        <div className="profile-card" style={{ marginTop: '30px' }}>
          <div className="profile-header">
            <h2>Donation Receipts</h2>
            <p>View your donation history and receipts</p>
          </div>
          <div className="receipts-list">
            {loadingDonations ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                Loading receipts...
              </div>
            ) : userDonations.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                No donations yet. Start making a difference today!
              </div>
            ) : (
              <div className="receipts-list-container">
                {userDonations.map((donation, index) => {
                  const isExpanded = expandedReceipts[donation.receiptId || index];
                  return (
                    <div key={donation.receiptId || index} className="receipt-list-item">
                      <div 
                        className="receipt-list-header"
                        onClick={() => setExpandedReceipts(prev => ({
                          ...prev,
                          [donation.receiptId || index]: !prev[donation.receiptId || index]
                        }))}
                      >
                        <div className="receipt-list-main">
                          <h3 className="receipt-list-title">{donation.campaignTitle || 'Campaign'}</h3>
                          <p className="receipt-list-date">
                            {donation.date ? new Date(donation.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            }) : 'N/A'}
                          </p>
                        </div>
                        <div className="receipt-list-right">
                          <span className="receipt-list-amount">${donation.amount?.toFixed(2) || '0.00'}</span>
                          <span className={`receipt-expand-icon ${isExpanded ? 'expanded' : ''}`}>▼</span>
                        </div>
                      </div>
                      {isExpanded && (
                        <div className="receipt-list-details">
                          <div className="receipt-detail-row">
                            <span className="receipt-detail-label">Receipt ID:</span>
                            <span className="receipt-detail-value">{donation.receiptId || 'N/A'}</span>
                          </div>
                          <div className="receipt-detail-row">
                            <span className="receipt-detail-label">Date & Time:</span>
                            <span className="receipt-detail-value">
                              {donation.date ? new Date(donation.date).toLocaleString() : 'N/A'}
                            </span>
                          </div>
                          <div className="receipt-detail-row">
                            <span className="receipt-detail-label">Payment Method:</span>
                            <span className="receipt-detail-value">{donation.paymentMethod || 'N/A'}</span>
                          </div>
                          <div className="receipt-detail-row">
                            <span className="receipt-detail-label">Donor Name:</span>
                            <span className="receipt-detail-value">{`${profile.firstName} ${profile.lastName}`}</span>
                          </div>
                          <div className="receipt-detail-row">
                            <span className="receipt-detail-label">Email:</span>
                            <span className="receipt-detail-value">{profile.email}</span>
                          </div>
                          <button 
                            className="view-receipt-btn"
                            onClick={() => {
                              setSelectedReceipt({
                                receiptId: donation.receiptId,
                                date: donation.date,
                                campaignTitle: donation.campaignTitle,
                                donorName: `${profile.firstName} ${profile.lastName}`,
                                donorEmail: profile.email,
                                amount: donation.amount,
                                paymentMethod: donation.paymentMethod
                              });
                              setShowReceipt(true);
                            }}
                          >
                            View Full Receipt
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Receipt Modal */}
      {showReceipt && selectedReceipt && (
        <ReceiptModal 
          receipt={selectedReceipt} 
          onClose={() => setShowReceipt(false)} 
        />
      )}
    </div>
  );
};

export default Profile;