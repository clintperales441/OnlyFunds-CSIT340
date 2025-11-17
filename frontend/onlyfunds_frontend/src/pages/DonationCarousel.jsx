import React, { useState, useEffect } from 'react';
import './DonationCarousel.css';

// Import your actual images

import educationFund from '../assets/images/education-fund-card.jpg';
import healthSupport from '../assets/images/health-support-card.jpg';
import petDonation from '../assets/images/pet-donation-card.jpg';

const DonationCarousel = ({ onNavigateToCampaign }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [donationAmount, setDonationAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [donorInfo, setDonorInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardInfo, setCardInfo] = useState({ number: '', name: '', expiry: '', cvc: '' });

  const donationCards = [
    {
      id: 1,
      campaignId: 1,
      title: 'Pet Rescue',
      description: 'Save and rehabilitate abandoned animals, providing shelter, food, and veterinary care.',
      image: petDonation,
      goal: '$50,000',
      raised: '$39,000',
      percentage: 78
    },
    {
      id: 2,
      campaignId: 2,
      title: 'Education Fund',
      description: 'Provide scholarships, books, and learning materials to students who need them most.',
      image: educationFund,
      goal: '$40,000',
      raised: '$24,800',
      percentage: 62
    },
    {
      id: 3,
      campaignId: 3,
      title: 'Health Support',
      description: 'Deliver essential medical care, supplies, and treatment to underserved communities.',
      image: healthSupport,
      goal: '$75,000',
      raised: '$63,750',
      percentage: 85
    }
  ];

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % donationCards.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + donationCards.length) % donationCards.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % donationCards.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [donationCards.length]);

  const handleOpenDonationForm = (card) => {
    setSelectedCard(card);
    setShowDonationForm(true);
    setDonationAmount(25);
    setPaymentMethod('card');
    setCustomAmount('');
  };

  const handleCloseDonationForm = () => {
    setShowDonationForm(false);
    setSelectedCard(null);
    setDonorInfo({ firstName: '', lastName: '', email: '', phone: '', message: '' });
    setPaymentMethod('card');
    setCustomAmount('');
    setCardInfo({ number: '', name: '', expiry: '', cvc: '' });
  };

  const handleDonorInfoChange = (e) => {
    const { name, value } = e.target;
    setDonorInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCardInfoChange = (e) => {
    const { name, value } = e.target;
    setCardInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleCustomAmountChange = (e) => {
    const val = e.target.value;
    // keep as string for formatting, but update donationAmount numeric
    setCustomAmount(val);
    const num = Number(val);
    if (!isNaN(num) && num > 0) setDonationAmount(num);
    else setDonationAmount(0);
  };

  const handleCompleteDonation = (e) => {
    e.preventDefault();
    console.log('Carousel Donation submitted:', {
      ...donorInfo,
      amount: donationAmount,
      campaignTitle: selectedCard.title,
      paymentMethod,
      cardInfo
    });
    alert(`Thank you ${donorInfo.firstName}! Your donation of $${donationAmount} to ${selectedCard.title} is being processed (Card).`);
    handleCloseDonationForm();
  };

  return (
    <div className="carousel-container">
      <div className="carousel-header">
        <h2>Choose Your Cause</h2>
        <p>Select a foundation that resonates with you and make an impact today through a direct donation.</p>
      </div>

      <div className="carousel-wrapper">
        <button className="carousel-btn prev" onClick={prevSlide} aria-label="Previous">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="carousel-track">
          {donationCards.map((card, index) => {
            let position = 'next';
            if (index === currentIndex) position = 'active';
            else if (index === (currentIndex - 1 + donationCards.length) % donationCards.length) position = 'prev';
            
            return (
              <div key={card.id} className={`carousel-card ${position}`}>
                <div 
                  className="card-image" 
                  style={{ backgroundImage: `url(${card.image})` }}
                >
                </div>
                <div className="card-content">
                  <h3>{card.title}</h3>
                  <p className="card-description">{card.description}</p>
                  
                  <div className="card-progress">
                    <div className="progress-stats">
                      <span className="raised">{card.raised} raised</span>
                      <span className="goal">of {card.goal}</span>
                    </div>
                    <div className="progress-bar-container">
                      <div 
                        className="progress-bar-fill" 
                        style={{ width: `${card.percentage}%` }}
                      ></div>
                    </div>
                    <span className="percentage">{card.percentage}% funded</span>
                  </div>

                  <button className="donate-btn" onClick={() => handleOpenDonationForm(card)}>
                    Donate Now
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                </div>
            );
          })}
        </div>

        <button className="carousel-btn next" onClick={nextSlide} aria-label="Next">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="carousel-dots">
        {donationCards.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Carousel Donation Form Modal */}
      {showDonationForm && selectedCard && (
        <div className="carousel-donation-modal-overlay" onClick={handleCloseDonationForm}>
          <div className="carousel-donation-modal" onClick={(e) => e.stopPropagation()}>
            <button className="carousel-modal-close-btn" onClick={handleCloseDonationForm}>×</button>
            
            <div className="carousel-modal-header">
              <h2>Quick Donation</h2>
              <p className="carousel-campaign-name">{selectedCard.title}</p>
            </div>

            <form onSubmit={handleCompleteDonation} className="carousel-donation-form">
              <div className="carousel-amount-section">
                <label>Select Amount</label>
                <div className="carousel-amount-buttons">
                  {[10, 25, 50, 100, 250].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      className={`carousel-amount-btn ${donationAmount === amount && customAmount === '' ? 'active' : ''}`}
                      onClick={() => { setDonationAmount(amount); setCustomAmount(''); }}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              </div>

              <div className="carousel-custom-amount">
                <label htmlFor="carouselCustomAmount">Or enter a custom amount</label>
                <div className="carousel-custom-input">
                  <span className="currency">$</span>
                  <input
                    id="carouselCustomAmount"
                    type="number"
                    min="1"
                    placeholder="Custom amount"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                  />
                </div>
              </div>

              <div className="carousel-payment-section">
                <label>Payment Method</label>
                <div className="carousel-payment-methods">
                  <button type="button" className={`carousel-payment-btn active`}>Card</button>
                </div>
              </div>

              <div className="carousel-card-inputs">
                <div className="carousel-form-group">
                  <label htmlFor="cardNumber">Card Number *</label>
                  <input
                    id="cardNumber"
                    name="number"
                    value={cardInfo.number}
                    onChange={handleCardInfoChange}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className="carousel-form-group">
                  <label htmlFor="cardName">Name on Card *</label>
                  <input
                    id="cardName"
                    name="name"
                    value={cardInfo.name}
                    onChange={handleCardInfoChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="carousel-form-row">
                  <div className="carousel-form-group">
                    <label htmlFor="cardExpiry">Expiry (MM/YY) *</label>
                    <input
                      id="cardExpiry"
                      name="expiry"
                      value={cardInfo.expiry}
                      onChange={handleCardInfoChange}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="carousel-form-group">
                    <label htmlFor="cardCvc">CVC *</label>
                    <input
                      id="cardCvc"
                      name="cvc"
                      value={cardInfo.cvc}
                      onChange={handleCardInfoChange}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="carousel-form-row">
                <div className="carousel-form-group">
                  <label htmlFor="carouselFirstName">First Name *</label>
                  <input
                    type="text"
                    id="carouselFirstName"
                    name="firstName"
                    value={donorInfo.firstName}
                    onChange={handleDonorInfoChange}
                    required
                    placeholder="John"
                  />
                </div>
                <div className="carousel-form-group">
                  <label htmlFor="carouselLastName">Last Name *</label>
                  <input
                    type="text"
                    id="carouselLastName"
                    name="lastName"
                    value={donorInfo.lastName}
                    onChange={handleDonorInfoChange}
                    required
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="carousel-form-group">
                <label htmlFor="carouselEmail">Email Address *</label>
                <input
                  type="email"
                  id="carouselEmail"
                  name="email"
                  value={donorInfo.email}
                  onChange={handleDonorInfoChange}
                  required
                  placeholder="john@example.com"
                />
              </div>

              <div className="carousel-form-group">
                <label htmlFor="carouselPhone">Phone Number (Optional)</label>
                <input
                  type="tel"
                  id="carouselPhone"
                  name="phone"
                  value={donorInfo.phone}
                  onChange={handleDonorInfoChange}
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="carousel-form-options">
                <label className="carousel-checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span>Make my donation anonymous</span>
                </label>
              </div>

              <div className="carousel-form-actions">
                <button type="button" className="carousel-btn-cancel" onClick={handleCloseDonationForm}>
                  Cancel
                </button>
                <button type="submit" className="carousel-btn-submit">
                  Donate ${donationAmount}
                </button>
              </div>

              <div className="carousel-security-info">
                <p>🔒 Secure & encrypted payment</p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationCarousel;