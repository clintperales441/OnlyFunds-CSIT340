import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
      
      setTimeout(() => {
        setSubmitStatus('');
      }, 5000);
    }
  };

  return (
    <div className="contact-page">

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-content">
          <h1>Get in Touch</h1>
          <p className="hero-tagline">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>
      </section>


      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="container">
          <div className="form-container">
            <div className="form-left">
              <h2>Send Us a Message</h2>
              <p className="form-description">
                Fill out the form and our team will get back to you within 24 hours.
              </p>

              <div className="contact-form">
                {submitStatus === 'success' && (
                  <div className="success-message">
                    ✓ Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </div>
                )}

                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                    placeholder="John Doe"
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                    placeholder="john.doe@example.com"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label>Inquiry Type</label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="donation">Donation Question</option>
                    <option value="campaign">Campaign Support</option>
                    <option value="technical">Technical Issue</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={errors.subject ? 'error' : ''}
                    placeholder="How can we help you?"
                  />
                  {errors.subject && <span className="error-message">{errors.subject}</span>}
                </div>

                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'error' : ''}
                    placeholder="Tell us more about your inquiry..."
                    rows="6"
                  ></textarea>
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>

                <button type="button" onClick={handleSubmit} className="submit-button">
                  Send Message
                </button>
              </div>
            </div>

            <div className="form-right">
              <div className="contact-details">
                <h3>Contact Information</h3>
                <p>Feel free to reach out through any of these channels</p>

                <div className="detail-item">
                  <div className="detail-icon">⏰</div>
                  <div className="detail-text">
                    <h4>Business Hours</h4>
                    <p>Monday - Friday: 9:00 AM - 5:00 PM<br />Saturday: 10:00 AM - 2:00 PM<br />Sunday: Closed</p>
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-icon">🌐</div>
                  <div className="detail-text">
                    <h4>Follow Us</h4>
                    <div className="social-links">
                      <a href="#facebook">Facebook</a>
                      <a href="#twitter">Twitter</a>
                      <a href="#instagram">Instagram</a>
                      <a href="#linkedin">LinkedIn</a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Contact;