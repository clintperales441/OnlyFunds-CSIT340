import React, { useRef, useState } from 'react';
import ScrollProgressBar from './pages/ScrollProgressBar';
import Homepage from './pages/Homepage';
import DonationCarousel from './pages/DonationCarousel';
import Campaign from './pages/Campaign';
import CreateCampaign from './pages/CreateCampaign';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Footer from './pages/Footer';
import About from './pages/About';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedCampaignId, setSelectedCampaignId] = useState(1);
  const [createdCampaigns, setCreatedCampaigns] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  // Section refs for scrolling
  const aboutRef = useRef(null);
  const campaignsRef = useRef(null);
  const donateRef = useRef(null);
  const contactRef = useRef(null);

  const handleScrollToSection = (ref) => {
    setCurrentView('home');
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

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

  const handleNavigateToProfile = () => {
    setCurrentView('profile');
    window.scrollTo(0, 0);
  };

  const handleCreateCampaign = (campaignData) => {
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

  // Save user on register, then go to login view
  const handleRegister = (userObj) => {
    setRegisteredUsers(prev => [...prev, userObj]);
    setCurrentView('login');
    window.scrollTo(0, 0);
  };

  // Find user by email/password, set as currentUser on login
  const handleLogin = ({ email, password }) => {
    const found = registeredUsers.find(
      u => u.email === email && u.password === password
    );
    if (found) {
      setCurrentUser(found);
      setCurrentView('home');
      window.scrollTo(0, 0);
    } else {
      alert('Incorrect email or password.\nIf new user, please register first.');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
    window.scrollTo(0, 0);
  };

  return (
    <div className="App">
      <ScrollProgressBar
        currentUser={currentUser}
        onLogout={handleLogout}
        onNavigateToLogin={handleNavigateToLogin}
        onNavigateToRegister={handleNavigateToRegister}
        onNavigateToProfile={handleNavigateToProfile}
        onNavigateToHome={handleBackToHome}
        onNavigateToAbout={() => handleScrollToSection(aboutRef)}
        onNavigateToCampaigns={() => handleScrollToSection(campaignsRef)}
        onNavigateToDonate={() => handleScrollToSection(donateRef)}
        onNavigateToContact={() => handleScrollToSection(contactRef)}
      />
      {currentView === 'home' ? (
        <>
          <Homepage ref={campaignsRef} onNavigateToCampaign={handleNavigateToCampaign} onNavigateToCreate={handleNavigateToCreate} />
          <DonationCarousel ref={donateRef} onNavigateToCampaign={handleNavigateToCampaign} />
          <About ref={aboutRef} />
          <Footer ref={contactRef}/>
        </>
      ) : currentView === 'create' ? (
        <>
          <CreateCampaign onCancel={handleBackToHome} onCreate={handleCreateCampaign} />
          <Footer/>
        </>
      ) : currentView === 'login' ? (
        <>
          <Login
          onBackToHome={handleBackToHome}
          onLogin={handleLogin}
          onNavigateToRegister={handleNavigateToRegister}
          />
          <Footer/>
        </>
      ) : currentView === 'register' ? (
        <>
          <Register
            onBackToHome={handleBackToHome}
            onRegister={handleRegister}
          />
          <Footer/>
        </>
      ) : currentView === 'profile' ? (
        <>
          <Profile currentUser={currentUser} onBackToHome={handleBackToHome} />
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