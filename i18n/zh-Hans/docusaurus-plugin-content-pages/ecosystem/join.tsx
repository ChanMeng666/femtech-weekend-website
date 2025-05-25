import React, { useState, useRef, useEffect } from 'react';
import Layout from '@theme/Layout';
import { Button } from '@site/src/components/ui/button';
import { cn } from '@site/src/lib/utils';
import { getEcosystemJoinTitle, getEcosystemJoinDescription } from '../../../../src/constants/ecosystem-join';

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
        alert('提交失败，请稍后再试');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('提交失败，请稍后再试');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div 
        ref={successRef}
        className="max-w-2xl mx-auto p-8 my-12 bg-green-50 rounded-lg border border-green-200 text-center shadow-sm"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">提交成功！</h2>
        <p className="text-gray-600 mb-6">
          感谢您的申请。我们的团队将很快与您联系。
        </p>
        <Button 
          onClick={() => window.location.href = '/ecosystem'}
          className="bg-primary"
        >
          返回生态系统
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">加入生态系统</h1>
        <p className="text-center text-lg mb-8 text-muted-foreground">
          成为FemTech Weekend创新生态系统的一部分
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">个人信息</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1 font-medium">
                  姓名 <span className="text-red-500">*</span>
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
                  电子邮箱 <span className="text-red-500">*</span>
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
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">公司信息</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="companyName" className="block mb-1 font-medium">
                  公司名称 <span className="text-red-500">*</span>
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
                  公司网站
                </label>
                <input
                  type="url"
                  id="companyWebsite"
                  name="companyWebsite"
                  value={formState.companyWebsite}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label htmlFor="companyLinkedin" className="block mb-1 font-medium">
                  公司领英
                </label>
                <input
                  type="url"
                  id="companyLinkedin"
                  name="companyLinkedin"
                  value={formState.companyLinkedin}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label htmlFor="companyInstagram" className="block mb-1 font-medium">
                  公司Instagram
                </label>
                <input
                  type="url"
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
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">创始人信息</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="founderName" className="block mb-1 font-medium">
                  创始人姓名 <span className="text-red-500">*</span>
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
                  创始人领英 <span className="text-red-500">*</span>
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
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">业务信息</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="businessDescription" className="block mb-1 font-medium">
                  描述您的企业如何利用技术丰富女性的生活？
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
                  您的FemTech业务处于什么阶段？
                </p>
                <div className="space-y-2">
                  {['创意', '探索', '验证', '效率', '规模化'].map((stage, index) => (
                    <div key={stage} className="flex items-center">
                      <input
                        type="radio"
                        id={`stage-${index}`}
                        name="businessStage"
                        value={['Idea', 'Discovery', 'Validation', 'Efficiency', 'Scale'][index]}
                        checked={formState.businessStage === ['Idea', 'Discovery', 'Validation', 'Efficiency', 'Scale'][index]}
                        onChange={handleInputChange}
                        className="mr-2 h-4 w-4 text-primary"
                      />
                      <label htmlFor={`stage-${index}`}>{stage}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="block mb-2 font-medium">
                  哪些类别最能描述您公司的产品或服务？
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    '乳房健康',
                    '生育能力',
                    '一般健康',
                    '妇科与盆腔健康',
                    '更年期',
                    '心理健康',
                    '生殖健康与避孕',
                    '性健康',
                    '激素健康',
                    '少数群体健康',
                    '性健康产品',
                    'LGBTQIA+健康',
                    '卫生巾、卫生棉条、月经内裤和月经杯'
                  ].map((category, index) => (
                    <div key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${index}`}
                        name="categories"
                        value={[
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
                        ][index]}
                        onChange={handleCheckboxChange}
                        className="mr-2 h-4 w-4 text-primary"
                      />
                      <label htmlFor={`category-${index}`}>{category}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="additionalInfo" className="block mb-1 font-medium">
                  还有什么我们应该了解的吗？
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
                <p className="block mb-2 font-medium">公司标志</p>
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
                      <p className="text-sm text-gray-500">点击更改</p>
                    </div>
                  ) : (
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <p className="text-primary">
                        点击或拖拽文件到此区域上传
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
              className={isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
            >
              {isSubmitting ? '提交中...' : '提交'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function JoinEcosystemPage() {
  const title = getEcosystemJoinTitle();
  const description = getEcosystemJoinDescription();
  
  return (
    <Layout
      title={title}
      description={description}
    >
      <JoinForm />
    </Layout>
  );
} 