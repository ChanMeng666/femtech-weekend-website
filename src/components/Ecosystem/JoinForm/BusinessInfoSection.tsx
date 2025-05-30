import React from 'react';

const BUSINESS_STAGES = ['Idea', 'Discovery', 'Validation', 'Efficiency', 'Scale'];

const BUSINESS_CATEGORIES = [
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
  'Pads - Tampons - Period Underwear - and Cups'
];

interface BusinessInfoSectionProps {
  businessDescription: string;
  businessStage: string;
  categories: string[];
  additionalInfo: string;
  logoPreview: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BusinessInfoSection({
  businessDescription,
  businessStage,
  categories,
  additionalInfo,
  logoPreview,
  handleInputChange,
  handleCheckboxChange,
  handleFileChange
}: BusinessInfoSectionProps) {
  return (
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
            value={businessDescription}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div>
          <p className="block mb-2 font-medium">
            What stage is your FemTech business at?
          </p>
          <div className="space-y-2">
            {BUSINESS_STAGES.map((stage) => (
              <div key={stage} className="flex items-center">
                <input
                  type="radio"
                  id={`stage-${stage}`}
                  name="businessStage"
                  value={stage}
                  checked={businessStage === stage}
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
            {BUSINESS_CATEGORIES.map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category}`}
                  name="categories"
                  value={category}
                  onChange={handleCheckboxChange}
                  checked={categories.includes(category)}
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
            value={additionalInfo}
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
  );
} 