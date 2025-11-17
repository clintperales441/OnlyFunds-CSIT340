import React, { useState } from 'react';
import ScrollProgressBar from './pages/ScrollProgressBar';
import Homepage from './pages/Homepage';
import DonationCarousel from './pages/DonationCarousel';
import Campaign from './pages/Campaign';
import CreateCampaign from './pages/CreateCampaign';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './pages/Footer';
import About from './pages/About';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedCampaignId, setSelectedCampaignId] = useState(1);
  const [createdCampaigns, setCreatedCampaigns] = useState([]);

  const handleNavigateToCampaign = (campaignId) => {
    setSelectedCampaignId(campaignId);
    setCurrentView('campaign');
    window.scrollTo(0, 0);
  };

  const handleNavigateToCreate = () => {
    setCurrentView('create');
    window.scrollTo(0, 0);
  };

  const handleNavigateToLogin = () => {
    setCurrentView('login');
    window.scrollTo(0, 0);
  };

  const handleNavigateToRegister = () => {
    setCurrentView('register');
    window.scrollTo(0, 0);
  };

  const handleCreateCampaign = (campaignData) => {
    // assign a new id (timestamp-based) and store locally
    const newId = Date.now();
    const newCampaign = { id: newId, ...campaignData };
    setCreatedCampaigns(prev => [newCampaign, ...prev]);
    setSelectedCampaignId(newId);
    setCurrentView('campaign');
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    window.scrollTo(0, 0);
  };

  return (
    <div className="App">
      <ScrollProgressBar
        onNavigateToLogin={handleNavigateToLogin}
        onNavigateToRegister={handleNavigateToRegister}
        onNavigateToHome={handleBackToHome}
      />
      {currentView === 'home' ? (
        <>
          <Homepage onNavigateToCampaign={handleNavigateToCampaign} onNavigateToCreate={handleNavigateToCreate} />
          <DonationCarousel onNavigateToCampaign={handleNavigateToCampaign} />
         
          <Footer/>
          
        </>
      ) : currentView === 'create' ? (
        <>
          <CreateCampaign onCancel={handleBackToHome} onCreate={handleCreateCampaign} />
          <Footer/>
        </>
      ) : currentView === 'login' ? (
        <>
          <Login onBackToHome={handleBackToHome} />
          <Footer/>
        </>
      ) : currentView === 'register' ? (
        <>
          <Register onBackToHome={handleBackToHome} />
          <Footer/>
        </>
      ) : (
        <>
          <Campaign campaignId={selectedCampaignId} createdCampaigns={createdCampaigns} onBackToHome={handleBackToHome} />
          <Footer/>
        </>
      )}
    </div>
  );
}

export default App;
