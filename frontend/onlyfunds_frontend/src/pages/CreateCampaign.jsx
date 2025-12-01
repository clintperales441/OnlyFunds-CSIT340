import React, { useState, useEffect } from 'react';
import './CreateCampaign.css';
import { campaignService } from '../services/campaignService';
import { categoryService } from '../services/categoryService';
import { userService } from '../services/userService';

// Default categories constant
const DEFAULT_CATEGORIES = [
  { categoryId: '1', category: 'Education' },
  { categoryId: '2', category: 'Health' },
  { categoryId: '3', category: 'Animal Welfare' },
  { categoryId: '4', category: 'Community' },
  { categoryId: '5', category: 'Environment' },
];

const CreateCampaign = ({ onCancel, onCreate }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [goal, setGoal] = useState('');
  const [daysLeft, setDaysLeft] = useState('30');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Get current user from localStorage
  const currentUser = userService.getCurrentUser();
  
  // Load categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      setLoadingCategories(true);
      try {
        const cats = await categoryService.getAllCategories();
        console.log('Loaded categories from API:', cats);
        
        if (cats && Array.isArray(cats) && cats.length > 0) {
          setCategories(cats);
          const firstCategoryId = cats[0].categoryId;
          if (firstCategoryId) {
            setCategory(String(firstCategoryId));
            console.log('Set category to:', firstCategoryId);
          } else {
            console.error('First category has no categoryId!');
            setError('Categories loaded but missing IDs. Please check backend.');
          }
        } else {
          console.warn('No categories from API');
          setError('No categories available. Please contact administrator.');
        }
      } catch (err) {
        console.error('Failed to load categories:', err);
        setError('Failed to load categories. Please refresh or contact administrator.');
      } finally {
        setLoadingCategories(false);
      }
    };
    loadCategories();
  }, []);

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      setImageFile(file);
      setError('');

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
    setImageUrl('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!title.trim()) {
      setError('Campaign title is required');
      return;
    }

    if (!category || category === '') {
      setError('Please select a category');
      return;
    }
    
    if (!goal || parseFloat(goal) <= 0) {
      setError('Please enter a valid goal amount');
      return;
    }
    
    if (!description.trim()) {
      setError('Campaign description is required');
      return;
    }
    
    if (!currentUser) {
      setError('You must be logged in to create a campaign');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccessMessage('');
    
    try {
      const finalCategoryId = category || '1';
      
      const campaignData = {
        userId: currentUser.userId,
        title,
        categoryId: String(finalCategoryId),
        description,
        goal: parseFloat(goal),
        daysLeft: parseInt(daysLeft),
        imageUrl: imagePreview || imageUrl || null,
      };
      
      console.log('Creating campaign with data:', campaignData);
      console.log('Category value:', category, 'Final:', finalCategoryId);
      const response = await campaignService.createCampaign(campaignData);
      
      setSuccessMessage('Campaign created successfully!');
      
      // Pass campaign data to parent
      if (onCreate) {
        onCreate(response);
      }
      
      // Redirect after short delay
      setTimeout(() => {
        onCancel();
      }, 1500);
      
    } catch (err) {
      setError(err.message || 'Failed to create campaign. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-campaign-page">
      <div className="create-container">
        <button className="back-button" onClick={onCancel}>Back</button>
        <h2>Create New Campaign</h2>
        
        {successMessage && (
          <div style={{ 
            padding: '12px', 
            marginBottom: '20px', 
            background: '#d4edda', 
            color: '#155724', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            {successMessage}
          </div>
        )}
        
        {error && (
          <div style={{ 
            padding: '12px', 
            marginBottom: '20px', 
            background: '#f8d7da', 
            color: '#721c24', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
        
        <form className="create-form" onSubmit={handleSubmit}>
          <label>
            Title *
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Campaign title" />
          </label>

          <label>
            Category *
            {loadingCategories ? (
              <select disabled>
                <option>Loading categories...</option>
              </select>
            ) : categories.length === 0 ? (
              <select disabled>
                <option>No categories available</option>
              </select>
            ) : (
              <select 
                value={category} 
                onChange={e => {
                  console.log('Category selected:', e.target.value);
                  setCategory(e.target.value);
                }}
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.category}
                  </option>
                ))}
              </select>
            )}
          </label>

          <label>
            Campaign Image *
            <div className="image-upload-container">
              {!imagePreview ? (
                <div className="image-upload-box">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange}
                    className="image-input"
                    id="campaign-image"
                  />
                  <label htmlFor="campaign-image" className="image-upload-label">
                    <div className="upload-icon">📷</div>
                    <div className="upload-text">Click to upload image</div>
                    <div className="upload-hint">JPG, PNG, GIF (Max 5MB)</div>
                  </label>
                </div>
              ) : (
                <div className="image-preview-container">
                  <img src={imagePreview} alt="Campaign preview" className="image-preview" />
                  <button 
                    type="button" 
                    className="remove-image-btn"
                    onClick={handleRemoveImage}
                  >
                    ✕ Remove
                  </button>
                </div>
              )}
            </div>
          </label>

          <label>
            Goal (USD) *
            <input type="number" value={goal} onChange={e => setGoal(e.target.value)} placeholder="5000" />
          </label>

          <label>
            Description *
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Tell donors about your cause and why this campaign matters" rows="6" />
          </label>
          
          <label>
            Campaign Duration (Days)
            <input type="number" value={daysLeft} onChange={e => setDaysLeft(e.target.value)} placeholder="30" min="1" />
          </label>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
            <button type="submit" className="submit-btn">Create Campaign</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaign;
