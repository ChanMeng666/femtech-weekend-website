import { useState } from 'react';

interface JoinFormState {
  name: string;
  email: string;
  companyName: string;
  companyWebsite: string;
  companyLinkedin: string;
  companyInstagram: string;
  founderName: string;
  founderLinkedin: string;
  businessDescription: string;
  businessStage: string;
  categories: string[];
  additionalInfo: string;
  logo: string | null;
}

export function useJoinFormState() {
  // State for form data
  const [formState, setFormState] = useState<JoinFormState>({
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

  return {
    formState,
    setFormState,
    logoPreview,
    setLogoPreview,
    isSubmitting,
    setIsSubmitting,
    submitSuccess,
    setSubmitSuccess,
    handleInputChange,
    handleCheckboxChange,
    handleFileChange
  };
}

export type { JoinFormState }; 