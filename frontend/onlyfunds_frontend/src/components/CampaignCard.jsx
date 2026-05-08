import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import './CampaignCard.css';

/**
 * CampaignCard Component - Reusable card for displaying campaign info
 */
const CampaignCard = ({ campaign, onNavigate }) => {
  const progressPercent = (campaign.currentAmount / campaign.goalAmount) * 100;

  return (
    <div className="campaign-card">
      {campaign.image && (
        <img src={campaign.image} alt={campaign.title} className="campaign-image" />
      )}
      <div className="campaign-content">
        <h3 className="campaign-title">{campaign.title}</h3>
        <p className="campaign-category">{campaign.category}</p>
        <p className="campaign-description">{campaign.description}</p>

        <div className="progress-section">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${Math.min(progressPercent, 100)}%` }}
            ></div>
          </div>
          <div className="progress-info">
            <span className="progress-amount">₱{campaign.currentAmount.toLocaleString()}</span>
            <span className="progress-goal">of ₱{campaign.goalAmount.toLocaleString()}</span>
          </div>
        </div>

        <Link
          to={`${ROUTES.CAMPAIGN_DETAIL.replace(':id', campaign.id)}`}
          className="campaign-link"
        >
          View Campaign
        </Link>
      </div>
    </div>
  );
};

export default CampaignCard;
