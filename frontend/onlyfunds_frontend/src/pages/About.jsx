import React from 'react';
import './About.css';
import yoPhoto from '../assets/images/Yo.jpg';
import cpPhoto from '../assets/images/Cp.jpg';
import NicoloPhoto from '../assets/images/nicolo.jpg';


// Import your core values icons/images
import transparencyImg from '../assets/images/transparency.png';
import integrityImg from '../assets/images/collaborate.png';
import compassionImg from '../assets/images/compassion.png';
import impactImg from '../assets/images/target.png';

const coreValues = [
  { title: "Transparency", img: transparencyImg, desc: "We believe in complete openness about where donations go and how they're used, building trust through clear communication." },
  { title: "Integrity", img: integrityImg, desc: "We maintain the highest ethical standards in everything we do, ensuring every campaign is verified and legitimate." },
  { title: "Compassion", img: compassionImg, desc: "We lead with empathy, understanding that behind every campaign is a real person or community in need of support." },
  { title: "Impact", img: impactImg, desc: "We focus on creating real, measurable change in people's lives through effective and efficient donation distribution." },
];

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content container">
          <h1>About OnlyFunds</h1>
          <p className="hero-tagline">Connecting hearts, changing lives, one donation at a time</p>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <div className="values-grid">
            {coreValues.map((v) => (
              <div className="value-card" key={v.title}>
                <div className="value-icon-image">
                  <img src={v.img} alt={v.title} />
                </div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
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
              <div className="member-photo">
                <img src={yoPhoto} alt="Yo" />
              </div>
              <h4>Yusuf Oswa</h4>
              <p className="role">Co-Founder & Developer</p>
            </div>
            <div className="team-member">
              <div className="member-photo">
                <img src={cpPhoto} alt="Cp" />
              </div>
              <h4>Clint Perales</h4>
              <p className="role">Co-Founder & Developer</p>
            </div>
            <div className="team-member">
              <div className="member-photo">
                <img src={NicoloPhoto} alt="nicolo" />
              </div>
              <h4>Nicolo Francis Gabiana</h4>
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