import api from './api';

// Category Services
export const categoryService = {
  // Get all categories
  getAllCategories: async () => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch categories.' };
    }
  },

  // Initialize default categories (creates Education, Health, Animal Welfare, Community, Environment)
  initializeCategories: async () => {
    try {
      const response = await api.post('/categories/initialize');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to initialize categories.' };
    }
  },

  // Create new category (admin only)
  createCategory: async (categoryData) => {
    try {
      const response = await api.post('/categories', {
        category: categoryData.category,
        image: categoryData.image || null,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create category.' };
    }
  },
};

export default categoryService;
