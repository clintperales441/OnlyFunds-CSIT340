import React, { useState, useEffect, forwardRef } from 'react';
import './Homepage.css';
import { campaignService } from '../services/campaignService';

// Import your actual images directly from the assets folder
import petDonation from '../assets/images/pet-donation.jpg';
import childrenFoundation from '../assets/images/children-foundation.jpg';
import educationFund from '../assets/images/education-fund.jpg';
import healthSupport from '../assets/images/health-support.jpg';
import communityHelp from '../assets/images/community-help.jpg';

const Homepage = forwardRef(({ onNavigateToCampaign, onNavigateToCreate, onNavigateToDonate }, ref) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  
  // Array of your actual imported images
  const backgroundImages = [
    petDonation,
    childrenFoundation,
    educationFund,
    healthSupport,
    communityHelp,
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Category options with icons
  const categories = [
    { id: 'all', name: 'All Causes', icon: '🌟' },
    { id: '1', name: 'Education', icon: '📚' },
    { id: '2', name: 'Healthcare', icon: '🏥' },
    { id: '3', name: 'Animal Welfare', icon: '🐾' },
    { id: '4', name: 'Community', icon: '🏘️' },
    { id: '5', name: 'Environment', icon: '🌱' },
  ];

  // Fetch campaigns from backend
  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const data = await campaignService.getAllCampaigns();
        setCampaigns(data);
        setFilteredCampaigns(data.slice(0, 6)); // Show first 6 campaigns initially
      } catch (error) {
        console.error('Failed to load campaigns:', error);
        // Keep empty array on error
      } finally {
        setLoadingCampaigns(false);
      }
    };
    loadCampaigns();

    // Real-time polling for campaign updates
    const pollInterval = setInterval(async () => {
      try {
        const data = await campaignService.getAllCampaigns();
        setCampaigns(data);
        // Re-filter based on current category
        filterCampaignsByCategory(data, selectedCategory);
      } catch (error) {
        console.error('Failed to poll campaigns:', error);
      }
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(pollInterval);
  }, []);

  // Filter campaigns by category
  const filterCampaignsByCategory = (campaignList, categoryId) => {
    if (categoryId === 'all') {
      setFilteredCampaigns(campaignList.slice(0, 6));
    } else {
      const filtered = campaignList.filter(c => String(c.categoryId) === String(categoryId));
      setFilteredCampaigns(filtered.slice(0, 6));
    }
  };

  // Handle category change
  useEffect(() => {
    filterCampaignsByCategory(campaigns, selectedCategory);
  }, [selectedCategory, campaigns]);

  // Function to rotate background images
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setProgress(0);
      setCurrentImageIndex(prevIndex => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImages.length, isPaused]);

  // Progress bar animation
  useEffect(() => {
    if (isPaused || progress >= 100) return;
    
    const timer = setTimeout(() => setProgress(progress + 1), 50);
    return () => clearTimeout(timer);
  }, [progress, isPaused]);

  return (
    <div className="homepage">
      {/* Background slideshow */}
      <div 
        className="slideshow"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {backgroundImages.map((img, index) => (
          <div 
            key={index} 
            className={`slide ${index === currentImageIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          >
      
          </div>
        ))}
      </div>
      
      {/* Content overlay */}
      <div className="content-overlay">
        <header className="header">
          <h1 className="logo">ONLY<span>FUNDS</span></h1> 
      
        </header>

        <main className="hero">
          <div className="hero-content">
            <h2>Together, We Make a Difference</h2>
            <p className="hero-description">
              Onlyfunds connects compassionate donors with meaningful causes. 
              Your contributions create real change where it's needed most.
            </p>
            <div className="cta-buttons">
              <button className="donate-button" onClick={onNavigateToDonate}>Donate Now</button>
              <button className="create-button" onClick={onNavigateToCreate}>Create Campaign</button>
            </div>
          </div>
        </main>
      </div>

      <section className="campaign-section" ref={ref}>
        <div className="section-header">
          <h3>Featured Campaigns</h3>
          <p>Help make a difference in these critical initiatives</p>
        </div>

        {/* Category Filter Tabs */}
        <div className="category-filter">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span className="category-icon">{cat.icon}</span>
              <span className="category-name">{cat.name}</span>
            </button>
          ))}
        </div>

        {loadingCampaigns ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            Loading campaigns...
          </div>
        ) : filteredCampaigns.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            No campaigns found in this category. Be the first to create one!
          </div>
        ) : (
          <div className="campaign-grid">
            {filteredCampaigns.map(campaign => {
              const progressPercent = campaign.goal > 0 ? Math.round((campaign.raised / campaign.goal) * 100) : 0;
              return (
                <div key={campaign.campaignId} className="campaign-card">
                  <div className="campaign-image">
                    {campaign.imageUrl ? (
                      <img src={campaign.imageUrl} alt={campaign.campaignTitle} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div className="placeholder" style={{ background: '#f8f7ff', color: '#8b80f9' }}>
                        {campaign.campaignTitle}
                      </div>
                    )}
                    <span className="campaign-category-badge">{campaign.categoryName || 'General'}</span>
                  </div>
                  <div className="campaign-details">
                    <h4>{campaign.campaignTitle}</h4>
                    <div className="progress-container">
                      <div className="progress-bar small">
                        <div className="progress" style={{ width: `${progressPercent}%` }}></div>
                      </div>
                      <div className="progress-info">
                        <span>{progressPercent}% funded</span>
                        <span>${campaign.raised?.toLocaleString() || '0'} raised</span>
                      </div>
                    </div>
                    <button 
                      className="view-campaign-btn" 
                      onClick={() => onNavigateToCampaign(campaign.campaignId)}
                    >
                      View Campaign
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat">
            <div className="stat-value">$2.8M+</div>
            <div className="stat-label">Donations Collected</div>
          </div>
          <div className="stat">
            <div className="stat-value">350+</div>
            <div className="stat-label">Successful Campaigns</div>
          </div>
          <div className="stat">
            <div className="stat-value">98%</div>
            <div className="stat-label">Satisfied Donors</div>
          </div>
          <div className="stat">
            <div className="stat-value">45,000+</div>
            <div className="stat-label">Lives Impacted</div>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="info-content">
          <div className="info-text">
            <h3>Transparent Giving, Maximum Impact</h3>
            <p>
              At Onlyfunds, we believe in complete transparency. Every dollar you donate goes directly to the cause you choose. 
              Our low 5% platform fee covers essential operational costs while ensuring your contribution makes the maximum impact.
            </p>
            <ul>
              <li>Verified campaigns with documented needs</li>
              <li>Regular updates on how funds are used</li>
              <li>Secure payment processing</li>
              <li>Tax-deductible donations</li>
            </ul>
            <button className="learn-more">Learn More About Us</button>
          </div>
          <div className="info-image">
            <div className="placeholder" style={{ background: '#f1efff', color: '#5841f1' }}>Transparency & Impact</div>
          </div>
        </div>
      </section>
    </div>
  );
});

Homepage.displayName = 'Homepage';

export default Homepage;