import React, { useState, useEffect } from 'react';
import './Campaign.css';
import { campaignService } from '../services/campaignService';
import { donationService } from '../services/donationService';
import { userService } from '../services/userService';
import ReceiptModal from './ReceiptModal';

const Campaign = ({ campaignId = 1, createdCampaigns = [], onBackToHome }) => {
  const [campaign, setCampaign] = useState(null);
  const [donationAmount, setDonationAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedDonationAmount, setSelectedDonationAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [donationUpdate, setDonationUpdate] = useState(false);
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [donorInfo, setDonorInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardInfo, setCardInfo] = useState({ number: '', name: '', expiry: '', cvc: '' });
  const [receiptData, setReceiptData] = useState(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      setLoading(true);
      try {
        // Try to fetch from backend first
        const data = await campaignService.getCampaignById(campaignId);
        setCampaign(data);
        setLoading(false);
        return;
      } catch (error) {
        console.log('Failed to fetch from API, using fallback data:', error);
      }
      
      try {
        // Fallback: Check created campaigns
        const localCampaign = createdCampaigns.find(c => c.id === campaignId);
        if (localCampaign) {
          setCampaign(localCampaign);
          setLoading(false);
          return;
        }
        
        // Fallback: Campaign-specific mock data based on ID
        const campaignDatabase = {
          1: {
            id: 1,
            title: 'Emergency Pet Shelter Support',
            category: 'Animal Welfare',
            image: 'https://via.placeholder.com/600x400?text=Pet+Rescue',
            goal: 50000,
            raised: 39000,
            donors: 850,
            daysLeft: 30,
            description: `Our emergency pet shelter is running at full capacity and desperately needs support. We're rescuing abandoned and injured animals daily, providing them with medical care, food, and a safe space to recover.

With your help, we can:
• Expand our shelter facilities to rescue more animals
• Provide advanced veterinary care and treatment
• Feed and care for over 200 animals currently in our care
• Invest in rehabilitation programs for injured animals
• Hire additional trained staff to improve animal welfare

Every dollar you donate directly helps us save more lives and give these precious animals a second chance. Together, we can build a community where no animal is left behind.`,
            creator: {
              name: 'Emma Rodriguez',
              avatar: 'https://via.placeholder.com/50x50?text=ER',
              organization: 'Hearts for Animals Foundation'
            },
            updates: [
              {
                id: 1,
                date: '2024-11-16',
                title: 'New Rescue Success: Puppy Family Saved!',
                content: 'Yesterday, we rescued a mother dog and her 5 puppies from an abandoned warehouse. Thanks to donor support, they are now receiving medical care and will be ready for adoption soon!'
              },
              {
                id: 2,
                date: '2024-11-12',
                title: 'Shelter Expansion Update',
                content: 'We\'ve successfully constructed 3 new recovery rooms with your donations. This allows us to care for more injured animals simultaneously.'
              },
              {
                id: 3,
                date: '2024-11-08',
                title: 'Campaign Launch - Help Save Lives',
                content: 'We\'re launching this emergency campaign to help fund critical shelter operations and animal rescue missions.'
              }
            ],
            highlights: [
              { icon: '🐾', title: 'Animals Rescued', description: 'Over 200 animals in our care' },
              { icon: '💉', title: 'Medical Care', description: 'Professional veterinary treatment' },
              { icon: '🏠', title: 'Safe Haven', description: 'Secure facilities for recovery' },
              { icon: '❤️', title: 'Adoption Ready', description: 'Matched with loving homes' }
            ]
          },
          2: {
            id: 2,
            title: 'Books for Underprivileged Schools',
            category: 'Education',
            image: 'https://via.placeholder.com/600x400?text=Education+Fund',
            goal: 40000,
            raised: 24800,
            donors: 520,
            daysLeft: 60,
            description: `Education is the key to breaking the cycle of poverty. Thousands of children in underprivileged schools lack access to basic learning materials, including books.

Our mission is to:
• Provide over 10,000 books to 15 schools
• Build school libraries with age-appropriate reading materials
• Support literacy programs for young readers
• Donate educational resources for all grade levels
• Create learning environments that inspire curiosity and growth

Access to books transforms lives. When children have reading materials, their academic performance improves dramatically, and their dreams expand. Your donation directly places books in the hands of children who need them most.`,
            creator: {
              name: 'James Chen',
              avatar: 'https://via.placeholder.com/50x50?text=JC',
              organization: 'Education for All Initiative'
            },
            updates: [
              {
                id: 1,
                date: '2024-11-15',
                title: '5 Schools Now Have New Libraries!',
                content: 'We\'ve successfully delivered over 3,000 books to 5 schools. Teachers report increased reading enthusiasm among students!'
              },
              {
                id: 2,
                date: '2024-11-10',
                title: 'Library Construction Begins',
                content: 'Construction of the first dedicated library space is underway at Central Elementary School.'
              },
              {
                id: 3,
                date: '2024-11-01',
                title: 'Campaign Launch - Knowledge is Power',
                content: 'We\'re excited to announce our campaign to bring books and learning to every child.'
              }
            ],
            highlights: [
              { icon: '📚', title: 'Books Donated', description: '10,000+ books for schools' },
              { icon: '🎓', title: 'Students Reached', description: 'Hundreds of young learners' },
              { icon: '📖', title: 'Literacy Programs', description: 'Reading support & training' },
              { icon: '✨', title: 'Bright Futures', description: 'Empowering through education' }
            ]
          },
          3: {
            id: 3,
            title: 'Medical Supplies for Rural Clinics',
            category: 'Healthcare',
            image: 'https://via.placeholder.com/600x400?text=Healthcare+Support',
            goal: 75000,
            raised: 63750,
            donors: 1180,
            daysLeft: 50,
            description: `Rural communities often lack access to basic medical supplies and equipment. Many clinics operate with minimal resources, unable to provide quality care due to equipment shortages.

This campaign funds:
• Advanced diagnostic equipment for accurate testing
• Patient monitoring systems for better care tracking
• Surgical equipment for emergency procedures
• Medicine and first aid supplies
• Medical staff training programs
• Infrastructure improvements for clinic facilities

By supporting this campaign, you're ensuring that people in remote areas have access to the same quality healthcare available in urban centers. Healthcare is a right, not a privilege. Together, we can bridge this critical gap.`,
            creator: {
              name: 'Dr. Sarah Johnson',
              avatar: 'https://via.placeholder.com/50x50?text=SJ',
              organization: 'Global Health Initiative'
            },
            updates: [
              {
                id: 1,
                date: '2024-11-16',
                title: 'Milestone Reached: 85% Funded!',
                content: 'We\'re almost there! With 85% of our goal funded, we can now equip 4 rural clinics with essential diagnostic equipment.'
              },
              {
                id: 2,
                date: '2024-11-11',
                title: 'First Clinic Equipment Delivery Complete',
                content: 'Central Rural Hospital has received its first shipment of equipment. Local doctors report improved diagnostic capabilities!'
              },
              {
                id: 3,
                date: '2024-11-05',
                title: 'Healthcare for All - Campaign Launched',
                content: 'We\'re proud to launch this critical healthcare initiative to serve underserved communities.'
              }
            ],
            highlights: [
              { icon: '🏥', title: 'Clinics Served', description: '5 rural health centers' },
              { icon: '⚕️', title: 'Medical Staff', description: 'Trained professionals' },
              { icon: '🔬', title: 'Modern Equipment', description: 'Advanced diagnostic tools' },
              { icon: '🛡️', title: 'Community Health', description: 'Better care for all' }
            ]
          }
        };

        // If a created campaign matches this id prefer it
        const created = createdCampaigns.find(c => Number(c.id) === Number(campaignId));
        const mockCampaign = created || campaignDatabase[campaignId] || campaignDatabase[1];
        // Ensure minimal fields exist for created campaigns
        const normalized = {
          id: mockCampaign.id,
          title: mockCampaign.title || 'Untitled Campaign',
          category: mockCampaign.category || 'General',
          image: mockCampaign.image || 'https://via.placeholder.com/600x400?text=Campaign',
          goal: mockCampaign.goal || 10000,
          raised: mockCampaign.raised || 0,
          donors: mockCampaign.donors || 0,
          daysLeft: mockCampaign.daysLeft || 30,
          description: mockCampaign.description || '',
          creator: mockCampaign.creator || { name: mockCampaign.creatorName || 'Creator', avatar: 'https://via.placeholder.com/50x50?text=C', organization: '' },
          updates: mockCampaign.updates || [],
          highlights: mockCampaign.highlights || []
        };

        setCampaign(normalized);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching campaign:', error);
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [campaignId]);

  // Real-time donation polling
  useEffect(() => {
    if (!campaign || !campaign.campaignId) return;

    const pollInterval = setInterval(async () => {
      try {
        const updatedCampaign = await campaignService.getCampaignById(campaign.campaignId || campaign.id);
        
        // Check if there's a change in raised amount or donors
        if (updatedCampaign.raised !== campaign.raised || updatedCampaign.donors !== campaign.donors) {
          setCampaign(prev => ({
            ...prev,
            raised: updatedCampaign.raised,
            donors: updatedCampaign.donors
          }));
          
          // Trigger visual update animation
          setDonationUpdate(true);
          setTimeout(() => setDonationUpdate(false), 2000);
        }
      } catch (error) {
        console.error('Failed to poll campaign updates:', error);
      }
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(pollInterval);
  }, [campaign]);

  const handleDonate = (amount) => {
    setSelectedDonationAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmount = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value) {
      setSelectedDonationAmount(null);
    }
  };

  const handleSubmitDonation = () => {
    const finalAmount = customAmount || selectedDonationAmount;
    if (finalAmount > 0) {
      setShowDonationForm(true);
      setPaymentMethod('card');
    }
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

  const handleCloseDonationForm = () => {
    setShowDonationForm(false);
    setPaymentMethod('card');
  };

  const handleCompleteDonation = async (e) => {
    e.preventDefault();
    const finalAmount = customAmount || selectedDonationAmount;
    
    // Validation
    if (!donorInfo.firstName || !donorInfo.lastName || !donorInfo.email) {
      alert('Please fill in all required donor information');
      return;
    }
    
    if (!cardInfo.name || !cardInfo.expiry || !cardInfo.cvc) {
      alert('Please fill in all card information');
      return;
    }
    
    if (finalAmount <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }
    
    setLoading(true);
    
    try {
      const currentUser = userService.getCurrentUser();
      
      const donationData = {
        campaignId: campaign.campaignId || campaign.id,
        userId: currentUser?.userId || null,
        amount: finalAmount,
        paymentMethod: paymentMethod === 'card' ? 'CREDIT_CARD' : 'DEBIT_CARD',
        donorInfo: {
          firstName: donorInfo.firstName,
          lastName: donorInfo.lastName,
          email: donorInfo.email,
          phone: donorInfo.phone,
          message: donorInfo.message
        },
        cardInfo: {
          name: cardInfo.name,
          cvc: cardInfo.cvc,
          expiry: cardInfo.expiry
        }
      };
      
      const donationResponse = await donationService.createDonation(donationData);
      
      // Create receipt data
      const receipt = {
        receiptId: donationResponse.donationId || `RCP-${Date.now()}`,
        date: new Date().toISOString(),
        campaignTitle: campaign.campaignTitle || campaign.title,
        donorName: `${donorInfo.firstName} ${donorInfo.lastName}`,
        donorEmail: donorInfo.email,
        amount: Number(finalAmount),
        paymentMethod: paymentMethod === 'card' ? 'Credit Card' : 'Debit Card'
      };
      
      setReceiptData(receipt);
      setShowDonationForm(false);
      setDonorInfo({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      setCustomAmount('');
      setSelectedDonationAmount(25);
      
      // Refresh campaign data to show updated totals
      const updatedCampaign = await campaignService.getCampaignById(campaign.campaignId || campaign.id);
      setCampaign(updatedCampaign);
    } catch (error) {
      alert(`Donation failed: ${error.message || 'Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="campaign-loading">Loading campaign...</div>;
  }

  if (!campaign) {
    return <div className="campaign-error">Campaign not found</div>;
  }

  const progressPercentage = (campaign.raised / campaign.goal) * 100;

  return (
    <div className="campaign-page">
      {/* Hero Section */}
      <div className="campaign-hero" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${campaign.imageUrl || campaign.image || 'https://via.placeholder.com/1200x400?text=Campaign'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="campaign-hero-overlay">
          <button className="back-button" onClick={onBackToHome}>
            <span>←</span> Back
          </button>
          <span className="campaign-category">{campaign.categoryName || campaign.category}</span>
        </div>
      </div>

      <div className="campaign-container">
        <div className="campaign-main">
          {/* Campaign Header */}
          <div className="campaign-header">
            <h1>{campaign.title}</h1>
            <div className="campaign-meta">
              <div className="creator-info">
                {campaign.creator && (
                  <>
                    <img src={campaign.creator.avatar || 'https://via.placeholder.com/50'} alt={campaign.creator.name} className="creator-avatar" />
                    <div className="creator-details">
                      <p className="creator-name">{campaign.creator.name}</p>
                      <p className="creator-org">{campaign.creator.organization}</p>
                    </div>
                  </>
                )}
                {!campaign.creator && (
                  <div className="creator-details">
                    <p className="creator-name">Anonymous Creator</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="campaign-progress">
            {donationUpdate && (
              <div className="donation-update-banner">
                <span className="update-icon">💝</span>
                <span>New donation received! Thank you for your support!</span>
              </div>
            )}
            <div className="progress-bar-large">
              <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <div className="progress-stats">
              <div className={`stat ${donationUpdate ? 'stat-highlight' : ''}`}>
                <div className="stat-value">${campaign.raised.toLocaleString()}</div>
                <div className="stat-label">raised</div>
              </div>
              <div className="stat">
                <div className="stat-value">${campaign.goal.toLocaleString()}</div>
                <div className="stat-label">goal</div>
              </div>
              <div className={`stat ${donationUpdate ? 'stat-highlight' : ''}`}>
                <div className="stat-value">{campaign.donors.toLocaleString()}</div>
                <div className="stat-label">donors</div>
              </div>
              <div className="stat">
                <div className="stat-value">{campaign.daysLeft}</div>
                <div className="stat-label">days left</div>
              </div>
            </div>
          </div>

          {/* Highlights */}
          {campaign.highlights && campaign.highlights.length > 0 && (
            <div className="campaign-highlights">
              {campaign.highlights.map((highlight, index) => (
                <div key={index} className="highlight-item">
                  <div className="highlight-icon">{highlight.icon}</div>
                  <div className="highlight-content">
                    <h4>{highlight.title}</h4>
                    <p>{highlight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="campaign-description-section">
            <h2>About This Campaign</h2>
            <p>{campaign.description}</p>
          </div>

          {/* Updates Section */}
          {campaign.updates && campaign.updates.length > 0 && (
            <div className="campaign-updates">
              <h2>Campaign Updates</h2>
              <div className="updates-list">
                {campaign.updates.map((update) => (
                  <div key={update.id} className="update-item">
                    <div className="update-date">{new Date(update.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    <div className="update-content">
                      <h4>{update.title}</h4>
                      <p>{update.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Donation Section */}
        <div className="campaign-sidebar">
          <div className="donation-card">
            <h3>Donate Now</h3>
            
            <div className="donation-presets">
              {[10, 25, 50, 100].map((amount) => (
                <button
                  key={amount}
                  className={`preset-btn ${selectedDonationAmount === amount ? 'active' : ''}`}
                  onClick={() => handleDonate(amount)}
                >
                  ${amount}
                </button>
              ))}
            </div>

            <div className="custom-donation">
              <label htmlFor="custom-amount">Custom Amount</label>
              <div className="custom-input-wrapper">
                <span className="currency">$</span>
                <input
                  id="custom-amount"
                  type="number"
                  min="1"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={handleCustomAmount}
                />
              </div>
            </div>

            <button className="donate-now-btn" onClick={handleSubmitDonation}>
              Donate Now
            </button>

            <div className="donation-info">
              <p className="info-text">💡 Your donation is secure and 100% tax-deductible</p>
            </div>

            {/* Share Section */}
            <div className="share-section">
              <h4>Share This Campaign</h4>
              <div className="share-buttons">
                <button className="share-btn facebook" title="Share on Facebook">
                  <span>f</span>
                </button>
                <button className="share-btn twitter" title="Share on Twitter">
                  <span>𝕏</span>
                </button>
                <button className="share-btn linkedin" title="Share on LinkedIn">
                  <span>in</span>
                </button>
                <button className="share-btn copy" title="Copy link">
                  <span>🔗</span>
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="trust-badges">
              <p className="badge">✓ Verified Campaign</p>
              <p className="badge">✓ Secure Payment</p>
              <p className="badge">✓ Transparent Fund Usage</p>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Form Modal */}
      {showDonationForm && (
        <div className="donation-modal-overlay" onClick={handleCloseDonationForm}>
          <div className="donation-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseDonationForm}>×</button>
            
            <div className="modal-header">
              <h2>Complete Your Donation</h2>
              <p className="campaign-name">{campaign.title}</p>
              <div className="donation-amount-display">
                <span>Amount: </span>
                <span className="amount">${customAmount || selectedDonationAmount}</span>
              </div>
              <div className="payment-methods">
                <label>Payment Method</label>
                <div className="payment-method-buttons">
                  <button type="button" className="payment-btn active">Card</button>
                </div>
              </div>

              <div className="card-inputs">
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number *</label>
                  <input id="cardNumber" name="number" value={cardInfo.number} onChange={handleCardInfoChange} placeholder="1234 5678 9012 3456" required />
                </div>

                <div className="form-group">
                  <label htmlFor="cardName">Name on Card *</label>
                  <input id="cardName" name="name" value={cardInfo.name} onChange={handleCardInfoChange} placeholder="John Doe" required />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cardExpiry">Expiry (MM/YY) *</label>
                    <input id="cardExpiry" name="expiry" value={cardInfo.expiry} onChange={handleCardInfoChange} placeholder="MM/YY" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cardCvc">CVC *</label>
                    <input id="cardCvc" name="cvc" value={cardInfo.cvc} onChange={handleCardInfoChange} placeholder="123" required />
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleCompleteDonation} className="donation-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={donorInfo.firstName}
                    onChange={handleDonorInfoChange}
                    required
                    placeholder="John"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={donorInfo.lastName}
                    onChange={handleDonorInfoChange}
                    required
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={donorInfo.email}
                  onChange={handleDonorInfoChange}
                  required
                  placeholder="john@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number (Optional)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={donorInfo.phone}
                  onChange={handleDonorInfoChange}
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Leave a Message (Optional)</label>
                <textarea
                  id="message"
                  name="message"
                  value={donorInfo.message}
                  onChange={handleDonorInfoChange}
                  placeholder="Share why this cause matters to you..."
                  rows="4"
                ></textarea>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span>Make my donation anonymous</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span>Send me updates about this campaign</span>
                </label>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={handleCloseDonationForm}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Complete Donation - ${customAmount || selectedDonationAmount}
                </button>
              </div>
            </form>

            <div className="security-info">
              <p>🔒 Your payment information is secure and encrypted</p>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {receiptData && (
        <ReceiptModal 
          receipt={receiptData} 
          onClose={() => setReceiptData(null)} 
        />
      )}
    </div>
  );
};

export default Campaign;
