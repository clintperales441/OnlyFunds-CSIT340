import api from './api';

/**
 * Contact Service - Handles contact form submissions
 */
export const contactService = {
  // Submit contact form
  submitContact: async (contactData) => {
    try {
      const response = await api.post('/contact', {
        name: contactData.name,
        email: contactData.email,
        subject: contactData.subject,
        message: contactData.message,
        inquiryType: contactData.inquiryType || 'general',
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to submit contact form' };
    }
  },
};
