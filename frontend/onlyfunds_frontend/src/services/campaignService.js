import api from './api';

/**
 * Campaign Service - Handles all campaign-related API calls
 * Centralized business logic for campaign operations
 */
export const campaignService = {
  // Get all campaigns
  getAllCampaigns: async () => {
    try {
      const response = await api.get('/campaigns');
      return response.data || [];
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch campaigns' };
    }
  },

  // Get campaign by ID
  getCampaignById: async (campaignId) => {
    try {
      const response = await api.get(`/campaigns/${campaignId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch campaign' };
    }
  },

  // Create new campaign
  createCampaign: async (campaignData) => {
    try {
      const response = await api.post('/campaigns', {
        title: campaignData.title,
        description: campaignData.description,
        category: campaignData.category,
        goalAmount: parseFloat(campaignData.goalAmount),
        image: campaignData.image || null,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create campaign' };
    }
  },

  // Update campaign
  updateCampaign: async (campaignId, campaignData) => {
    try {
      const response = await api.put(`/campaigns/${campaignId}`, campaignData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update campaign' };
    }
  },

  // Delete campaign
  deleteCampaign: async (campaignId) => {
    try {
      await api.delete(`/campaigns/${campaignId}`);
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete campaign' };
    }
  },

  // Donate to campaign
  donate: async (campaignId, donationData) => {
    try {
      const response = await api.post(`/campaigns/${campaignId}/donate`, {
        amount: parseFloat(donationData.amount),
        donorName: donationData.donorName,
        donorEmail: donationData.donorEmail,
        paymentMethod: donationData.paymentMethod,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to process donation' };
    }
  },
};
