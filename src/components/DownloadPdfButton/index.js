import React, { useState } from 'react';
import './styles.css';

/**
 * A button component that shows a form before allowing PDF download
 * @param {Object} props - Component properties
 * @param {string} props.pdfUrl - URL of the PDF to download
 * @param {string} props.buttonText - Text to display on the button
 * @param {string} props.buttonClassName - Optional className for button styling
 */
function DownloadPdfButton({ pdfUrl, buttonText = 'Download PDF', buttonClassName = '' }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    website: '',
    country: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Handle opening the modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setError(null);
    
    // If the form was submitted successfully, open the PDF
    if (formSubmitted) {
      window.open(pdfUrl, '_blank');
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.country.trim()) {
      setError('Please fill in all required fields');
      return;
    }
    
    // Email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      console.log('Submitting form data:', formData);
      
      // Add the PDF URL to the form data
      const submitData = {
        ...formData,
        pdfUrl,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || window.location.href
      };
      
      // Submit the form data to the API
      const response = await fetch('/api/pdf-form-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });
      
      console.log('Response status:', response.status);
      
      // Handle the response
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API error:', errorData);
        throw new Error(`API response not ok: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Form submission successful:', data);
      
      // Set form as submitted and reset form data
      setFormSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        website: '',
        country: ''
      });
      
      // Automatically open the PDF after a short delay
      setTimeout(() => {
        window.open(pdfUrl, '_blank');
        setShowModal(false);
      }, 1500);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button 
        className={`download-pdf-button ${buttonClassName}`} 
        onClick={handleOpenModal}
      >
        {buttonText}
      </button>
      
      {showModal && (
        <div className="pdf-form-modal-overlay">
          <div className="pdf-form-modal">
            <button className="pdf-form-close-button" onClick={handleCloseModal}>×</button>
            
            {!formSubmitted ? (
              <>
                <h2>Please Provide Your Information</h2>
                <p>Fill out this quick form to download the PDF</p>
                
                {error && <div className="pdf-form-error">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                  <div className="pdf-form-field">
                    <label htmlFor="firstName">First Name *</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName" 
                      value={formData.firstName} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  
                  <div className="pdf-form-field">
                    <label htmlFor="lastName">Last Name *</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName" 
                      value={formData.lastName} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  
                  <div className="pdf-form-field">
                    <label htmlFor="email">Email *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  
                  <div className="pdf-form-field">
                    <label htmlFor="company">Company <span className="pdf-form-optional">(Optional)</span></label>
                    <input 
                      type="text" 
                      id="company" 
                      name="company" 
                      value={formData.company} 
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="pdf-form-field">
                    <label htmlFor="website">Website <span className="pdf-form-optional">(Optional)</span></label>
                    <input 
                      type="url" 
                      id="website" 
                      name="website" 
                      value={formData.website} 
                      onChange={handleChange}
                      placeholder="https://example.com"
                    />
                  </div>
                  
                  <div className="pdf-form-field">
                    <label htmlFor="country">Country *</label>
                    <input 
                      type="text" 
                      id="country" 
                      name="country" 
                      value={formData.country} 
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="pdf-form-submit-button" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Download PDF'}
                  </button>
                </form>
              </>
            ) : (
              <div className="pdf-form-success">
                <h2>Thank You!</h2>
                <p>Your PDF is downloading now.</p>
                <p>If the download doesn't start automatically, <a href={pdfUrl} target="_blank" rel="noopener noreferrer">click here</a>.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default DownloadPdfButton; 