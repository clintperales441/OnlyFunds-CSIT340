import api from './api';

// Donation Services
export const donationService = {
  // Create a new donation
  createDonation: async (donationData) => {
    try {
      // Format expiry to MM/yy format (e.g., "12/25")
      let formattedExpiry = donationData.cardInfo.expiry;
      if (formattedExpiry && !formattedExpiry.includes('/')) {
        // If format is MMYY, convert to MM/YY
        if (formattedExpiry.length === 4) {
          formattedExpiry = formattedExpiry.substring(0, 2) + '/' + formattedExpiry.substring(2);
        }
      }
      
      const payload = {
        campaignId: String(donationData.campaignId),
        userId: donationData.userId || null,
        amount: parseFloat(donationData.amount),
        paymentMethod: donationData.paymentMethod.toUpperCase(),
        // Flatten donor info
        firstName: donationData.donorInfo.firstName,
        lastName: donationData.donorInfo.lastName,
        email: donationData.donorInfo.email,
        phoneNumber: donationData.donorInfo.phone || null,
        message: donationData.donorInfo.message || null,
        // Flatten card info
        cardName: donationData.cardInfo.name,
        cardExpiry: formattedExpiry,
        cardCvc: donationData.cardInfo.cvc,
      };
      
      console.log('Sending donation payload:', payload);
      const response = await api.post('/donations', payload);
      return response.data;
    } catch (error) {
      console.error('Donation service error:', error.response?.data);
      const errorMsg = error.response?.data?.error || error.response?.data?.message || error.message || 'Failed to process donation.';
      throw new Error(errorMsg);
    }
  },

  // Get donations by campaign
  getDonationsByCampaign: async (campaignId) => {
    try {
      const response = await api.get(`/donations/campaign/${campaignId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch donations.' };
    }
  },

  // Get donations by user
  getDonationsByUser: async (userId) => {
    try {
      const response = await api.get(`/donations/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user donations.' };
    }
  },
};

export default donationService;
