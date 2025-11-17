import React, { useState, useEffect } from 'react';
import './Homepage.css';

// Import your actual images directly from the assets folder
import petDonation from '../assets/images/pet-donation.jpg';
import childrenFoundation from '../assets/images/children-foundation.jpg';
import educationFund from '../assets/images/education-fund.jpg';
import healthSupport from '../assets/images/health-support.jpg';
import communityHelp from '../assets/images/community-help.jpg';

const Homepage = () => {
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
              <button className="donate-button">Donate Now</button>
              <button className="create-button">Create Campaign</button>
            </div>
          </div>
        </main>
      </div>

      <section className="campaign-section">
        <div className="section-header">
          <h3>Featured Campaigns</h3>
          <p>Help make a difference in these critical initiatives</p>
        </div>
        <div className="campaign-grid">
          <div className="campaign-card">
            <div className="campaign-image">
              <div className="placeholder" style={{ background: '#f8f7ff', color: '#8b80f9' }}>Pet Rescue Initiative</div>
            </div>
            <div className="campaign-details">
              <h4>Emergency Pet Shelter Support</h4>
              <div className="progress-container">
                <div className="progress-bar small">
                  <div className="progress" style={{ width: '78%' }}></div>
                </div>
                <div className="progress-info">
                  <span>78% funded</span>
                  <span>$24,580 raised</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="campaign-card">
            <div className="campaign-image">
              <div className="placeholder" style={{ background: '#f1efff', color: '#7d70f7' }}>Children's Education</div>
            </div>
            <div className="campaign-details">
              <h4>Books for Underprivileged Schools</h4>
              <div className="progress-container">
                <div className="progress-bar small">
                  <div className="progress" style={{ width: '62%' }}></div>
                </div>
                <div className="progress-info">
                  <span>62% funded</span>
                  <span>$18,750 raised</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="campaign-card">
            <div className="campaign-image">
              <div className="placeholder" style={{ background: '#eae7ff', color: '#7161f5' }}>Healthcare Support</div>
            </div>
            <div className="campaign-details">
              <h4>Medical Supplies for Rural Clinics</h4>
              <div className="progress-container">
                <div className="progress-bar small">
                  <div className="progress" style={{ width: '85%' }}></div>
                </div>
                <div className="progress-info">
                  <span>85% funded</span>
                  <span>$42,350 raised</span>
                </div>
              </div>
            </div>
          </div>
        </div>
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
};

export default Homepage;