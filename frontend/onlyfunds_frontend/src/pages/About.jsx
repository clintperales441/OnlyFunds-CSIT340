import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>About OnlyFunds</h1>
          <p className="hero-tagline">Connecting hearts, changing lives, one donation at a time</p>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Transparency</h3>
              <p>We believe in complete openness about where donations go and how they're used, building trust through clear communication.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">🛡️</div>
              <h3>Integrity</h3>
              <p>We maintain the highest ethical standards in everything we do, ensuring every campaign is verified and legitimate.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">💙</div>
              <h3>Compassion</h3>
              <p>We lead with empathy, understanding that behind every campaign is a real person or community in need of support.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h3>Impact</h3>
              <p>We focus on creating real, measurable change in people's lives through effective and efficient donation distribution.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">The passionate people making OnlyFunds possible</p>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-photo" style={{background: '#C6BEFA'}}>
                <span>NG</span>
              </div>
              <h4>Nicolo Francis Gabiana</h4>
              <p className="role">Co-Founder & Developer</p>
            </div>
            
            <div className="team-member">
              <div className="member-photo" style={{background: '#b0a3fa'}}>
                <span>YO</span>
              </div>
              <h4>Yusuf Bin Mohammad Ali Oswa</h4>
              <p className="role">Co-Founder & Developer</p>
            </div>
            
            <div className="team-member">
              <div className="member-photo" style={{background: '#9b8df8'}}>
                <span>CP</span>
              </div>
              <h4>Clint Perales</h4>
              <p className="role">Co-Founder & Developer</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Make a Difference?</h2>
          <p>Join thousands of donors who are changing lives every day</p>
          <div className="cta-buttons">
            <button className="btn-primary">Start Donating</button>
            <button className="btn-secondary">Create Campaign</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;