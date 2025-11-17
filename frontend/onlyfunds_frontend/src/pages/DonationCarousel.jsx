import React, { useState, useEffect } from 'react';
import './DonationCarousel.css';

// Import your actual images
import childrenFoundation from '../assets/images/children-foundation-card.jpg';
import educationFund from '../assets/images/education-fund-card.jpg';
import healthSupport from '../assets/images/health-support-card.jpg';
import petDonation from '../assets/images/pet-donation-card.jpg';

const DonationCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const donationCards = [
    {
      id: 1,
      title: 'Children Foundation',
      description: 'Support vulnerable children with education, healthcare, and a safe environment to grow and thrive.',
      image: childrenFoundation,
      goal: '$50,000',
      raised: '$32,450',
      percentage: 65
    },
    {
      id: 2,
      title: 'Education Fund',
      description: 'Provide scholarships, books, and learning materials to students who need them most.',
      image: educationFund,
      goal: '$35,000',
      raised: '$21,700',
      percentage: 62
    },
    {
      id: 3,
      title: 'Health Support',
      description: 'Deliver essential medical care, supplies, and treatment to underserved communities.',
      image: healthSupport,
      goal: '$75,000',
      raised: '$63,750',
      percentage: 85
    },
    {
      id: 4,
      title: 'Pet Rescue',
      description: 'Save and rehabilitate abandoned animals, providing shelter, food, and veterinary care.',
      image: petDonation,
      goal: '$25,000',
      raised: '$19,500',
      percentage: 78
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

  return (
    <div className="carousel-container">
      <div className="carousel-header">
        <h2>Choose Your Cause</h2>
        <p>Select a campaign that speaks to your heart and make a difference today</p>
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

                  <button className="donate-btn">
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
    </div>
  );
};

export default DonationCarousel;