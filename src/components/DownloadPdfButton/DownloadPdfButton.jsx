"use client";

import React, { useState } from 'react';
import './styles.css';

export default function DownloadPdfButton({ pdfUrl, buttonText = "Download Full PDF Report", buttonStyle = {} }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    website: '',
    country: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Please enter your first name';
    if (!formData.lastName.trim()) newErrors.lastName = 'Please enter your last name';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.country.trim()) newErrors.country = 'Please enter your country';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Add metadata to form data
        const submissionData = {
          ...formData,
          pdfUrl,
          timestamp: new Date().toISOString(),
          userAgent: navigator?.userAgent,
          referrer: document?.referrer
        };
        
        console.log('Submitting form data:', submissionData);
        
        // Submit to API endpoint - using the API route which will be proxied to the API server
        // This matches the approach used in the ecosystem form
        const response = await fetch('/api/pdf-form-submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData),
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`API response not ok: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Response data:', result);
        
        if (result.success) {
          setSubmitSuccess(true);
          // Open PDF in new tab after short delay
          setTimeout(() => {
            window.open(pdfUrl, '_blank');
          }, 500);
        } else {
          throw new Error(result.message || 'Form submission failed');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors({
          form: 'An error occurred while submitting the form. Please try again.'
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      website: '',
      country: ''
    });
    setErrors({});
    setSubmitSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    setIsModalOpen(false);
  };

  const defaultButtonStyle = {
    backgroundColor: '#e84c88',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    display: 'inline-block',
    border: 'none',
    cursor: 'pointer',
    ...buttonStyle
  };

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)} 
        style={defaultButtonStyle}
      >
        {buttonText}
      </button>

      {isModalOpen && (
        <div className="pdf-form-overlay">
          <div className="pdf-form-modal">
            {submitSuccess ? (
              <div className="pdf-form-success">
                <div className="pdf-form-success-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="pdf-form-success-title">Thank You!</h2>
                <p className="pdf-form-success-text">
                  Your information has been submitted. The document will open in a new tab.
                </p>
                <button 
                  onClick={handleClose}
                  className="pdf-form-button pdf-form-button-primary"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="pdf-form-header">
                  <h2 className="pdf-form-title">Please Provide Your Information</h2>
                  <button 
                    onClick={handleClose}
                    className="pdf-form-close"
                    aria-label="Close"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="pdf-form-body">
                  {errors.form && (
                    <div className="pdf-form-error-banner">
                      <p className="pdf-form-error-message">{errors.form}</p>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    <div className="pdf-form-input-group">
                      <label className="pdf-form-label">
                        First Name <span className="pdf-form-required">*</span>
                      </label>
                      <input 
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`pdf-form-input ${errors.firstName ? 'pdf-form-input-error' : ''}`}
                      />
                      {errors.firstName && <p className="pdf-form-error-text">{errors.firstName}</p>}
                    </div>
                    
                    <div className="pdf-form-input-group">
                      <label className="pdf-form-label">
                        Last Name <span className="pdf-form-required">*</span>
                      </label>
                      <input 
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`pdf-form-input ${errors.lastName ? 'pdf-form-input-error' : ''}`}
                      />
                      {errors.lastName && <p className="pdf-form-error-text">{errors.lastName}</p>}
                    </div>
                    
                    <div className="pdf-form-input-group">
                      <label className="pdf-form-label">
                        Email Address <span className="pdf-form-required">*</span>
                      </label>
                      <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`pdf-form-input ${errors.email ? 'pdf-form-input-error' : ''}`}
                      />
                      {errors.email && <p className="pdf-form-error-text">{errors.email}</p>}
                    </div>
                    
                    <div className="pdf-form-input-group">
                      <label className="pdf-form-label">
                        Company <span className="pdf-form-optional">(可选)</span>
                      </label>
                      <input 
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className={`pdf-form-input ${errors.company ? 'pdf-form-input-error' : ''}`}
                      />
                      {errors.company && <p className="pdf-form-error-text">{errors.company}</p>}
                    </div>
                    
                    <div className="pdf-form-input-group">
                      <label className="pdf-form-label">
                        Website <span className="pdf-form-optional">(可选)</span>
                      </label>
                      <input 
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://example.com"
                        className={`pdf-form-input ${errors.website ? 'pdf-form-input-error' : ''}`}
                      />
                      {errors.website && <p className="pdf-form-error-text">{errors.website}</p>}
                    </div>
                    
                    <div className="pdf-form-input-group">
                      <label className="pdf-form-label">
                        Country <span className="pdf-form-required">*</span>
                      </label>
                      <input 
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className={`pdf-form-input ${errors.country ? 'pdf-form-input-error' : ''}`}
                      />
                      {errors.country && <p className="pdf-form-error-text">{errors.country}</p>}
                    </div>
                    
                    <div className="pdf-form-disclaimer">
                      By providing your email address, you consent to receive emails from Silicon Valley Bank. You also consent to the terms of our Privacy Policy. If you have privacy questions, you may contact us at privacy@svb.com. You can withdraw your consent at any time.
                    </div>
                    
                    <div className="pdf-form-footer">
                      <button 
                        type="button" 
                        onClick={handleClose}
                        className="pdf-form-button pdf-form-button-secondary"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="pdf-form-button pdf-form-button-primary"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
} 