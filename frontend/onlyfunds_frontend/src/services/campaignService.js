import api from './api';

// Campaign Services
export const campaignService = {
  // Get all campaigns
  getAllCampaigns: async () => {
    try {
      const response = await api.get('/campaigns');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch campaigns.' };
    }
  },

  // Get campaign by ID
  getCampaignById: async (campaignId) => {
    try {
      const response = await api.get(`/campaigns/${campaignId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch campaign details.' };
    }
  },

  // Create new campaign
  createCampaign: async (campaignData) => {
    try {
      // userId goes as query parameter, rest in body
      const response = await api.post(`/campaigns?userId=${campaignData.userId}`, {
        campaignTitle: campaignData.title,
        categoryId: String(campaignData.categoryId),
        description: campaignData.description || '',
        goal: parseFloat(campaignData.goal),
        daysLeft: parseInt(campaignData.daysLeft) || 30,
      });
      return response.data;
    } catch (error) {
      console.error('Campaign creation error:', error.response?.data);
      throw error.response?.data || { message: 'Failed to create campaign.' };
    }
  },

  // Get campaigns by user
  getCampaignsByUser: async (userId) => {
    try {
      const response = await api.get(`/campaigns/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user campaigns.' };
    }
  },

  // Get campaigns by category
  getCampaignsByCategory: async (categoryId) => {
    try {
      const response = await api.get(`/campaigns/category/${categoryId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch campaigns by category.' };
    }
  },
};

export default campaignService;
