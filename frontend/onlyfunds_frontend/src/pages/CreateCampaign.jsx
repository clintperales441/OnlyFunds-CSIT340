import React, { useState } from 'react';
import './CreateCampaign.css';

const CreateCampaign = ({ onCancel, onCreate }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [imageUrl, setImageUrl] = useState('');
  const [goal, setGoal] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [creatorName, setCreatorName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // basic validation
    if (!title.trim() || !goal || !creatorName.trim()) {
      alert('Please fill in the required fields: Title, Goal, and Creator Name.');
      return;
    }

    const campaignData = {
      title: title.trim(),
      category,
      imageUrl: imageUrl.trim() || null,
      goal: Number(goal),
      shortDescription: shortDescription.trim(),
      description: description.trim(),
      creatorName: creatorName.trim(),
      // initial values for a newly created campaign
      raised: 0,
      percentFunded: 0,
      updates: [],
    };

    onCreate(campaignData);
  };

  return (
    <div className="create-campaign-page">
      <div className="create-container">
        <button className="back-button" onClick={onCancel}>Back</button>
        <h2>Create New Campaign</h2>
        <form className="create-form" onSubmit={handleSubmit}>
          <label>
            Title *
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Campaign title" />
          </label>

          <label>
            Category
            <select value={category} onChange={e => setCategory(e.target.value)}>
              <option>General</option>
              <option>Education</option>
              <option>Health</option>
              <option>Animals</option>
              <option>Community</option>
            </select>
          </label>

          <label>
            Image URL
            <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://..." />
          </label>

          <label>
            Goal (USD) *
            <input type="number" value={goal} onChange={e => setGoal(e.target.value)} placeholder="5000" />
          </label>

          <label>
            Short Description
            <input value={shortDescription} onChange={e => setShortDescription(e.target.value)} placeholder="One line summary" />
          </label>

          <label>
            Full Description
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Tell donors about your cause" />
          </label>

          <label>
            Creator Name *
            <input value={creatorName} onChange={e => setCreatorName(e.target.value)} placeholder="Your name or organization" />
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
