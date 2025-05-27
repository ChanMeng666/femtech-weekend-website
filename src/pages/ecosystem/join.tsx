import React, { useState, useRef, useEffect } from 'react';
import Layout from '@theme/Layout';
import { Button } from '@site/src/components/ui/button';
import { cn } from '@site/src/lib/utils';
import { getEcosystemJoinTitle, getEcosystemJoinDescription } from '../../constants/ecosystem-join';

function JoinForm() {
  // State for form data
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    companyName: '',
    companyWebsite: '',
    companyLinkedin: '',
    companyInstagram: '',
    founderName: '',
    founderLinkedin: '',
    businessDescription: '',
    businessStage: '',
    categories: [],
    additionalInfo: '',
    logo: null
  });
  
  // States for form submission process
  const [logoPreview, setLogoPreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const successRef = useRef(null);
  
  // Effect to scroll to success message
  useEffect(() => {
    if (submitSuccess && successRef.current) {
      // Scroll to success message
      successRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [submitSuccess]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormState(prev => {
      if (checked) {
        return { ...prev, categories: [...prev.categories, value] };
      } else {
        return { ...prev, categories: prev.categories.filter(cat => cat !== value) };
      }
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create file preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result as string;
        setLogoPreview(base64Data);
        // Store the Base64 string in formState
        setFormState(prev => ({ ...prev, logo: base64Data }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let finalFormData = {...formState};
      
      // If we have a logo image (Base64 format), upload to Cloudinary first
      if (formState.logo && typeof formState.logo === 'string' && formState.logo.startsWith('data:image')) {
        try {
          // Upload image to Cloudinary
          const imageResponse = await fetch('/api/upload-image', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: formState.logo }),
          });
          
          const imageResult = await imageResponse.json();
          
          if (imageResult.success) {
            // Replace Base64 with returned URL
            finalFormData.logo = imageResult.url;
          } else {
            console.error('Image upload failed:', imageResult.message);
            // Continue submission but without image
            finalFormData.logo = null;
          }
        } catch (imageError) {
          console.error('Image upload error:', imageError);
          // Continue submission but without image
          finalFormData.logo = null;
        }
      }
      
      // Send form data to Notion API endpoint
      const response = await fetch('/api/submit-ecosystem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalFormData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitSuccess(true);
        // Scroll to top to ensure user sees success message
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        console.error('Form submission failed:', result.message);
        alert('Submission failed, please try again later');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Submission failed, please try again later');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div 
        ref={successRef}
        className="max-w-2xl mx-auto p-8 my-12 bg-green-50 rounded-lg border border-green-200 text-center shadow-sm backdrop-blur-sm"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Submission Successful!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your application. Our team will be in touch with you soon.
        </p>
        <Button 
          onClick={() => window.location.href = '/ecosystem'}
          className="bg-primary"
        >
          Return to Ecosystem
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-2">Join the Ecosystem</h1>
      <p className="text-center text-lg mb-6 text-muted-foreground">
        Become part of the FemTech Weekend innovation ecosystem
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formState.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formState.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Company Information</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="companyName" className="block mb-1 font-medium">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                required
                value={formState.companyName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label htmlFor="companyWebsite" className="block mb-1 font-medium">
                Company Website <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="companyWebsite"
                name="companyWebsite"
                required
                value={formState.companyWebsite}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label htmlFor="companyLinkedin" className="block mb-1 font-medium">
                Company LinkedIn Profile <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="companyLinkedin"
                name="companyLinkedin"
                required
                value={formState.companyLinkedin}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label htmlFor="companyInstagram" className="block mb-1 font-medium">
                Company Instagram
              </label>
              <input
                type="text"
                id="companyInstagram"
                name="companyInstagram"
                value={formState.companyInstagram}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Founder Information */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Founder Information</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="founderName" className="block mb-1 font-medium">
                Founder Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="founderName"
                name="founderName"
                required
                value={formState.founderName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label htmlFor="founderLinkedin" className="block mb-1 font-medium">
                Founder LinkedIn <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="founderLinkedin"
                name="founderLinkedin"
                required
                value={formState.founderLinkedin}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Business Information */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Business Information</h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="businessDescription" className="block mb-1 font-medium">
                Describe how your business utilises technology to enrich the lives of women?
              </label>
              <textarea
                id="businessDescription"
                name="businessDescription"
                rows={4}
                value={formState.businessDescription}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <p className="block mb-2 font-medium">
                What stage is your FemTech business at?
              </p>
              <div className="space-y-2">
                {['Idea', 'Discovery', 'Validation', 'Efficiency', 'Scale'].map((stage) => (
                  <div key={stage} className="flex items-center">
                    <input
                      type="radio"
                      id={`stage-${stage}`}
                      name="businessStage"
                      value={stage}
                      checked={formState.businessStage === stage}
                      onChange={handleInputChange}
                      className="mr-2 h-4 w-4 text-primary"
                    />
                    <label htmlFor={`stage-${stage}`}>{stage}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <p className="block mb-2 font-medium">
                What categories best describe your company's product or service?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  'Breast Health',
                  'Fertility',
                  'General Health',
                  'Gynaecological & Pelvic Health',
                  'Menopause',
                  'Mental Health',
                  'Reproductive Health & Contraception',
                  'Sexual Health',
                  'Hormone Health',
                  'Minority Health',
                  'Sexual Wellness Products',
                  'LGBTQIA+ Health',
                  'Pads, Tampons, Period Underwear, and Cups'
                ].map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category}`}
                      name="categories"
                      value={category}
                      onChange={handleCheckboxChange}
                      className="mr-2 h-4 w-4 text-primary"
                    />
                    <label htmlFor={`category-${category}`}>{category}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="additionalInfo" className="block mb-1 font-medium">
                Anything else we should know about you?
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                rows={3}
                value={formState.additionalInfo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <p className="block mb-2 font-medium">Company Logo</p>
              <div 
                className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center ${logoPreview ? 'border-primary border-solid' : ''} hover:bg-gray-50 cursor-pointer transition-all`}
                onClick={() => document.getElementById('logo').click()}
              >
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                
                {logoPreview ? (
                  <div className="flex flex-col items-center">
                    <img 
                      src={logoPreview} 
                      alt="Logo preview" 
                      className="max-h-48 object-contain mb-2" 
                    />
                    <p className="text-sm text-gray-500">Click to change</p>
                  </div>
                ) : (
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <p className="text-primary">
                      Click or drag a file to this area to upload
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button 
            type="submit" 
            size="lg"
            disabled={isSubmitting}
            className={cn(
              "px-8 py-3 text-lg font-medium shadow-md hover:shadow-lg transition-all",
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            )}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function JoinEcosystemPage() {
  const title = getEcosystemJoinTitle();
  const description = getEcosystemJoinDescription();
  
  // 添加自定义滚动条样式
  useEffect(() => {
    // 创建style元素
    const style = document.createElement('style');
    style.innerHTML = `
      .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.3);
      }
      /* 添加自定义阴影样式，确保表单阴影显示完整 */
      .form-container {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        padding: 24px;
        background-color: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(12px);
        border-radius: 12px;
        margin: 24px 0 32px 0;
      }
    `;
    // 添加到head
    document.head.appendChild(style);
    
    // 清理函数
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <Layout
      title={title}
      description={description}
    >
      <div className="absolute inset-0 w-full h-screen bg-cover bg-center" 
           style={{ backgroundImage: 'url(/img/bg/abstract-flowing-lines-and-elegant-curves-represen1-0.png)' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-white/90"></div>
      </div>
      <div className="min-h-screen pt-8 pb-24 relative z-10">
        <div className="w-full max-w-4xl mx-auto h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar px-4">
          <div className="py-8">
            <div className="form-container">
              <JoinForm />
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-20">
        {/* 这里是空的div，但它有一个较高的z-index，确保footer可见 */}
      </div>
    </Layout>
  );
} 