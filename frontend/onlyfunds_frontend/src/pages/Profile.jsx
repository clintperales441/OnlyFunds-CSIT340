import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = ({ currentUser, onBackToHome }) => {
  // Use currentUser as the source of truth
  const [profile, setProfile] = useState(currentUser || {});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(currentUser || {});

  // Keep profile/formData in sync with currentUser when switching users or on first load.
  useEffect(() => {
    if (currentUser) {
      setProfile(currentUser);
      setFormData(currentUser);
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
      </div>
    </div>
  );
};

export default Profile;