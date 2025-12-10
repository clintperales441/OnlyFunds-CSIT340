import React, { useState, useEffect, forwardRef } from 'react';
import './Homepage.css';
import { campaignService } from '../services/campaignService';
import { categoryService } from '../services/categoryService';

import petDonation from '../assets/images/pet-donation.jpg';
import childrenFoundation from '../assets/images/children-foundation.jpg';
import educationFund from '../assets/images/education-fund.jpg';
import healthSupport from '../assets/images/health-support.jpg';
import communityHelp from '../assets/images/community-help.jpg';

const Homepage = forwardRef(({ onNavigateToCampaign, onNavigateToCreate, onNavigateToDonate, onNavigateToAbout }, ref) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('default'); 
  const [showAll, setShowAll] = useState(false);
  const [stats, setStats] = useState({
    totalDonations: 0,
    successfulCampaigns: 0,
    satisfactionRate: 0,
    totalDonors: 0
  });
  
 
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
  const [categories, setCategories] = useState([{ id: 'all', name: 'All Causes' }]);

 
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await categoryService.getAllCategories();
        const mappedCategories = [
          { id: 'all', name: 'All Causes' },
          ...categoriesData.map(cat => ({
            id: cat.categoryId,
            name: cat.category
          }))
        ];
        setCategories(mappedCategories);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };

    loadCategories();
  }, []);

 
  useEffect(() => {
    const loadStatistics = async () => {
      try {
        const statsData = await campaignService.getStatistics();
        setStats(statsData);
      } catch (error) {
        console.error('Failed to load statistics:', error);
      }
    };

    loadStatistics();
    
    
    const statsInterval = setInterval(loadStatistics, 30000);
    return () => clearInterval(statsInterval);
  }, []);

  
  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const data = await campaignService.getAllCampaigns();
        const validCampaigns = data.filter(campaign => 
          campaign.categoryId !== null && 
          campaign.categoryId !== undefined && 
          campaign.categoryId !== ''
        );
        setCampaigns(validCampaigns);
        setFilteredCampaigns(validCampaigns); 
      } catch (error) {
        console.error('Failed to load campaigns:', error);

      } finally {
        setLoadingCampaigns(false);
      }
    };
    loadCampaigns();

  
    const pollInterval = setInterval(async () => {
      try {
        const data = await campaignService.getAllCampaigns();
     
        const validCampaigns = data.filter(campaign => 
          campaign.categoryId !== null && 
          campaign.categoryId !== undefined && 
          campaign.categoryId !== ''
        );
        setCampaigns(validCampaigns);
        
        filterAndSortCampaigns(validCampaigns, selectedCategory, searchQuery, sortOrder);
      } catch (error) {
        console.error('Failed to poll campaigns:', error);
      }
    }, 10000); 

    return () => clearInterval(pollInterval);
  }, []);

 
  const filterAndSortCampaigns = (campaignList, categoryId, search, sort) => {
    let filtered = campaignList;
    
  
    if (categoryId !== 'all') {
      filtered = filtered.filter(c => String(c.categoryId) === String(categoryId));
    }
    
   
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(c => 
        c.campaignTitle?.toLowerCase().includes(searchLower) ||
        c.description?.toLowerCase().includes(searchLower) ||
        c.categoryName?.toLowerCase().includes(searchLower)
      );
    }
    

    let sorted = [...filtered];
    switch (sort) {
      case 'a-z':
        sorted.sort((a, b) => (a.campaignTitle || '').localeCompare(b.campaignTitle || ''));
        break;
      case 'z-a':
        sorted.sort((a, b) => (b.campaignTitle || '').localeCompare(a.campaignTitle || ''));
        break;
      case 'newest':
        sorted.sort((a, b) => (b.campaignId || 0) - (a.campaignId || 0));
        break;
      case 'oldest':
        sorted.sort((a, b) => (a.campaignId || 0) - (b.campaignId || 0));
        break;
      default:
        break;
    }
    
    setFilteredCampaigns(sorted); 
  };

 
  useEffect(() => {
    filterAndSortCampaigns(campaigns, selectedCategory, searchQuery, sortOrder);
  }, [selectedCategory, campaigns, searchQuery, sortOrder]);


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

  // // Progress bar animation
  // useEffect(() => {
  //   if (isPaused || progress >= 100) return;
    
  //   const timer = setTimeout(() => setProgress(progress + 1), 50);
  //   return () => clearTimeout(timer);
  // }, [progress, isPaused]);

  return (
    <div className="homepage">

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

        {/* Search and Sort Controls */}
        <div className="search-sort-container">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search campaigns by title, description, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button 
                className="clear-search"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          <div className="sort-dropdown">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="sort-select"
            >
              <option value="default">Default</option>
              <option value="a-z">A to Z</option>
              <option value="z-a">Z to A</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="category-filter">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
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
          <>
            <div className="campaign-grid">
              {(showAll ? filteredCampaigns : filteredCampaigns.slice(0, 3)).map((campaign, index) => {
                const progressPercent = campaign.goal > 0 ? Math.round((campaign.raised / campaign.goal) * 100) : 0;
                const isHiddenInitially = index >= 3;
                return (
                  <div 
                    key={campaign.campaignId} 
                    className={`campaign-card ${isHiddenInitially && showAll ? 'fade-in' : ''}`}
                    style={{
                      animationDelay: isHiddenInitially && showAll ? `${(index - 3) * 0.1}s` : '0s'
                    }}
                  >
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
                          <span>₱{campaign.raised?.toLocaleString() || '0'} raised</span>
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
            
            {filteredCampaigns.length > 3 && (
              <div className="show-more-container">
                <button 
                  className="show-more-btn"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? (
                    <>
                      <span>Show Less</span>
                      <span className="arrow">▲</span>
                    </>
                  ) : (
                    <>
                      <span>Show More ({filteredCampaigns.length - 3} more)</span>
                      <span className="arrow">▼</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat">
            <div className="stat-value">
              ₱{stats.totalDonations >= 1000000 
                ? `${(stats.totalDonations / 1000000).toFixed(1)}M+` 
                : stats.totalDonations >= 1000 
                ? `${(stats.totalDonations / 1000).toFixed(1)}K+` 
                : `${stats.totalDonations.toFixed(0)}`}
            </div>
            <div className="stat-label">Donations Collected</div>
          </div>
          <div className="stat">
            <div className="stat-value">{stats.successfulCampaigns}+</div>
            <div className="stat-label">Successful Campaigns</div>
          </div>
          <div className="stat">
            <div className="stat-value">{stats.satisfactionRate}%</div>
            <div className="stat-label">Satisfaction Rate</div>
          </div>
          <div className="stat">
            <div className="stat-value">
              {stats.totalDonors >= 1000 
                ? `${(stats.totalDonors / 1000).toFixed(1)}K+` 
                : `${stats.totalDonors}+`}
            </div>
            <div className="stat-label">Total Donors</div>
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
            <button className="learn-more" onClick={onNavigateToAbout}>Learn More About Us</button>
          </div>
          <div className="info-image">
            {/* <div className="placeholder" style={{ background: '#f1efff', color: '#5841f1' }}>Transparency & Impact</div> */}
          </div>
        </div>
      </section>
    </div>
  );
});

Homepage.displayName = 'Homepage';

export default Homepage;