import React, { createContext, useState, useCallback } from 'react';
import { campaignService } from '../services/campaignService';

// Create Campaign Context
export const CampaignContext = createContext(null);

/**
 * CampaignProvider - Centralized campaign state management
 * Handles: fetching campaigns, creating campaigns, selecting campaigns
 */
export const CampaignProvider = ({ children }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all campaigns
  const fetchCampaigns = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await campaignService.getAllCampaigns();
      setCampaigns(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch campaigns');
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new campaign
  const createCampaign = useCallback(async (campaignData) => {
    try {
      setError(null);
      setLoading(true);
      const newCampaign = await campaignService.createCampaign(campaignData);
      setCampaigns((prev) => [newCampaign, ...prev]);
      return newCampaign;
    } catch (err) {
      setError(err.message || 'Failed to create campaign');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Select campaign by ID
  const selectCampaign = useCallback((campaignId) => {
    const campaign = campaigns.find((c) => c.id === campaignId);
    setSelectedCampaign(campaign || null);
  }, [campaigns]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    campaigns,
    selectedCampaign,
    loading,
    error,
    fetchCampaigns,
    createCampaign,
    selectCampaign,
    clearError,
  };

  return (
    <CampaignContext.Provider value={value}>{children}</CampaignContext.Provider>
  );
};
