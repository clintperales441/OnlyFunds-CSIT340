import React, { useEffect, useState } from 'react';
import { useCampaigns } from '../hooks/useCampaigns';
import CampaignCard from '../components/CampaignCard';
import './CampaignsPage.css';

/**
 * CampaignsPage - Displays all campaigns with filtering and search
 */
const CampaignsPage = () => {
  const { campaigns, fetchCampaigns, loading, error } = useCampaigns();
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  useEffect(() => {
    let results = campaigns;

    // Filter by search term
    if (searchTerm) {
      results = results.filter(
        (c) =>
          c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      results = results.filter((c) => c.category === selectedCategory);
    }

    setFilteredCampaigns(results);
  }, [campaigns, searchTerm, selectedCategory]);

  const categories = [
    'all',
    ...new Set(campaigns.map((c) => c.category)),
  ];

  return (
    <div className="campaigns-page">
      <div className="campaigns-header">
        <h1>All Campaigns</h1>
        <p>Browse and support campaigns that matter to you</p>
      </div>

      <div className="campaigns-container">
        {/* Sidebar Filters */}
        <aside className="campaigns-sidebar">
          <div className="filter-group">
            <h3>Search</h3>
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <h3>Category</h3>
            {categories.map((category) => (
              <label key={category} className="category-label">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                />
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </label>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="campaigns-main">
          {error && <div className="error-message">{error}</div>}

          {loading ? (
            <div className="loading">Loading campaigns...</div>
          ) : filteredCampaigns.length === 0 ? (
            <div className="no-results">
              <p>No campaigns found matching your criteria.</p>
            </div>
          ) : (
            <div className="campaigns-grid">
              {filteredCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CampaignsPage;
