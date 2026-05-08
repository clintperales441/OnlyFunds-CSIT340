import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCampaigns } from '../hooks/useCampaigns';
import { ROUTES } from '../constants/routes';
import CampaignCard from '../components/CampaignCard';
import './HomePage.css';

/**
 * HomePage - Landing page with hero section and featured campaigns
 */
const HomePage = () => {
  const { campaigns, fetchCampaigns, loading, error } = useCampaigns();
  const aboutRef = useRef(null);
  const campaignsRef = useRef(null);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const handleScrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Change Lives Through Giving</h1>
          <p>Direct donations to those who need it most</p>
          <Link to={ROUTES.CAMPAIGNS} className="cta-button">
            View Campaigns
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" ref={aboutRef}>
        <div className="container">
          <h2>About OnlyFunds</h2>
          <p>
            OnlyFunds connects generous donors with individuals and communities
            in need. Our platform ensures transparency, integrity, and real
            impact.
          </p>
        </div>
      </section>

      {/* Featured Campaigns Section */}
      <section className="campaigns-section" ref={campaignsRef}>
        <div className="container">
          <h2>Featured Campaigns</h2>
          {error && <div className="error-message">{error}</div>}
          {loading ? (
            <div className="loading">Loading campaigns...</div>
          ) : (
            <div className="campaigns-grid">
              {campaigns.slice(0, 6).map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  onNavigate={() => {}}
                />
              ))}
            </div>
          )}
          <div className="view-all">
            <Link to={ROUTES.CAMPAIGNS} className="link-button">
              View All Campaigns
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
