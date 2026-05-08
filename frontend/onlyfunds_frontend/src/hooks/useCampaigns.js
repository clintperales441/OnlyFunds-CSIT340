import { useContext } from 'react';
import { CampaignContext } from '../context/CampaignContext';

/**
 * Custom hook to use Campaign context
 * Throws error if used outside CampaignProvider
 */
export const useCampaigns = () => {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaigns must be used within a CampaignProvider');
  }
  return context;
};
