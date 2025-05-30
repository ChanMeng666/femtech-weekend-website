import React, { useRef, useEffect } from 'react';
import { Button } from '@site/src/components/ui/button';
import { cn } from '@site/src/lib/utils';
import { useJoinFormState } from './useJoinFormState';
import { submitEcosystemForm } from './formSubmitService';
import PersonalInfoSection from './PersonalInfoSection';
import CompanyInfoSection from './CompanyInfoSection';
import FounderInfoSection from './FounderInfoSection';
import BusinessInfoSection from './BusinessInfoSection';
import SuccessMessage from './SuccessMessage';

export default function JoinForm() {
  const {
    formState,
    logoPreview,
    isSubmitting,
    submitSuccess,
    setIsSubmitting,
    setSubmitSuccess,
    handleInputChange,
    handleCheckboxChange,
    handleFileChange
  } = useJoinFormState();
  
  const successRef = useRef(null);
  
  // Effect to scroll to success message
  useEffect(() => {
    if (submitSuccess && successRef.current) {
      // Scroll to success message
      successRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [submitSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await submitEcosystemForm(formState);
      
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
    return <SuccessMessage successRef={successRef} />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-2">加入生态系统</h1>
      <p className="text-center text-lg mb-6 text-muted-foreground">
        成为FemTech Weekend创新生态系统的一部分
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <PersonalInfoSection 
          name={formState.name}
          email={formState.email}
          handleInputChange={handleInputChange}
        />

        {/* Company Information */}
        <CompanyInfoSection 
          companyName={formState.companyName}
          companyWebsite={formState.companyWebsite}
          companyLinkedin={formState.companyLinkedin}
          companyInstagram={formState.companyInstagram}
          handleInputChange={handleInputChange}
        />

        {/* Founder Information */}
        <FounderInfoSection 
          founderName={formState.founderName}
          founderLinkedin={formState.founderLinkedin}
          handleInputChange={handleInputChange}
        />

        {/* Business Information */}
        <BusinessInfoSection 
          businessDescription={formState.businessDescription}
          businessStage={formState.businessStage}
          categories={formState.categories}
          additionalInfo={formState.additionalInfo}
          logoPreview={logoPreview}
          handleInputChange={handleInputChange}
          handleCheckboxChange={handleCheckboxChange}
          handleFileChange={handleFileChange}
        />

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
            {isSubmitting ? '提交中...' : '提交'}
          </Button>
        </div>
      </form>
    </div>
  );
} 