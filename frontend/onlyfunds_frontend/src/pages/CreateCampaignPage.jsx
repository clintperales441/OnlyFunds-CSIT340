import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import { useCampaigns } from '../hooks/useCampaigns';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import './CreateCampaignPage.css';

/**
 * CreateCampaignPage - Create a new fundraising campaign
 */
const CreateCampaignPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { createCampaign, loading, error: campaignError, clearError } = useCampaigns();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
    }
  }, [isAuthenticated, navigate]);

  const validateForm = (data) => {
    const errors = {};

    if (!data.title.trim()) {
      errors.title = 'Campaign title is required';
    } else if (data.title.length < 5) {
      errors.title = 'Title must be at least 5 characters';
    }

    if (!data.description.trim()) {
      errors.description = 'Description is required';
    } else if (data.description.length < 20) {
      errors.description = 'Description must be at least 20 characters';
    }

    if (!data.category) {
      errors.category = 'Please select a category';
    }

    if (!data.goalAmount || data.goalAmount <= 0) {
      errors.goalAmount = 'Goal amount must be greater than 0';
    }

    return errors;
  };

  const handleSubmit = async (formData) => {
    try {
      clearError();
      await createCampaign({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        goalAmount: parseFloat(formData.goalAmount),
        image: formData.image,
      });
      navigate(ROUTES.CAMPAIGNS);
    } catch (error) {
      console.error('Campaign creation failed:', error);
    }
  };

  const { formData, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit: onSubmit } = useForm(
    {
      title: '',
      description: '',
      category: 'health',
      goalAmount: '',
      image: '',
    },
    handleSubmit,
    validateForm
  );

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="create-campaign-page">
      <div className="create-campaign-container">
        <h1>Create a Campaign</h1>
        <p className="subtitle">Start a campaign and make a real difference</p>

        {campaignError && <div className="error-alert">{campaignError}</div>}

        <form onSubmit={onSubmit} className="campaign-form">
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">Campaign Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${errors.title && touched.title ? 'input-error' : ''}`}
              placeholder="Enter campaign title"
              maxLength="100"
              disabled={isSubmitting || loading}
            />
            <div className="char-count">{formData.title.length}/100</div>
            {errors.title && touched.title && (
              <span className="error-text">{errors.title}</span>
            )}
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-textarea ${errors.description && touched.description ? 'input-error' : ''}`}
              placeholder="Describe your campaign in detail"
              rows="6"
              maxLength="1000"
              disabled={isSubmitting || loading}
            />
            <div className="char-count">{formData.description.length}/1000</div>
            {errors.description && touched.description && (
              <span className="error-text">{errors.description}</span>
            )}
          </div>

          {/* Category */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`form-input ${errors.category && touched.category ? 'input-error' : ''}`}
                disabled={isSubmitting || loading}
              >
                <option value="health">🏥 Health & Medical</option>
                <option value="education">🎓 Education</option>
                <option value="disaster">🚨 Disaster Relief</option>
                <option value="community">🏘️ Community</option>
                <option value="emergency">🆘 Emergency</option>
                <option value="other">📌 Other</option>
              </select>
              {errors.category && touched.category && (
                <span className="error-text">{errors.category}</span>
              )}
            </div>

            {/* Goal Amount */}
            <div className="form-group">
              <label htmlFor="goalAmount">Goal Amount (₱) *</label>
              <input
                type="number"
                id="goalAmount"
                name="goalAmount"
                value={formData.goalAmount}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${errors.goalAmount && touched.goalAmount ? 'input-error' : ''}`}
                placeholder="0.00"
                step="0.01"
                min="0"
                disabled={isSubmitting || loading}
              />
              {errors.goalAmount && touched.goalAmount && (
                <span className="error-text">{errors.goalAmount}</span>
              )}
            </div>
          </div>

          {/* Image */}
          <div className="form-group">
            <label htmlFor="image">Campaign Image (Optional)</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              className="form-input"
              accept="image/*"
              disabled={isSubmitting || loading}
            />
            <small>Max file size: 5MB</small>
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting || loading}
            >
              {isSubmitting || loading ? 'Creating Campaign...' : 'Create Campaign'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(ROUTES.CAMPAIGNS)}
              disabled={isSubmitting || loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaignPage;
