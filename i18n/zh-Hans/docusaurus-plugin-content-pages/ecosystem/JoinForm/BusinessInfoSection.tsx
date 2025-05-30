import React from 'react';

const BUSINESS_STAGES = [
  { display: '创意', value: 'Idea' },
  { display: '探索', value: 'Discovery' },
  { display: '验证', value: 'Validation' },
  { display: '效率', value: 'Efficiency' },
  { display: '规模化', value: 'Scale' }
];

const BUSINESS_CATEGORIES = [
  { display: '乳房健康', value: 'Breast Health' },
  { display: '生育能力', value: 'Fertility' },
  { display: '一般健康', value: 'General Health' },
  { display: '妇科与盆腔健康', value: 'Gynaecological & Pelvic Health' },
  { display: '更年期', value: 'Menopause' },
  { display: '心理健康', value: 'Mental Health' },
  { display: '生殖健康与避孕', value: 'Reproductive Health & Contraception' },
  { display: '性健康', value: 'Sexual Health' },
  { display: '激素健康', value: 'Hormone Health' },
  { display: '少数群体健康', value: 'Minority Health' },
  { display: '性健康产品', value: 'Sexual Wellness Products' },
  { display: 'LGBTQIA+健康', value: 'LGBTQIA+ Health' },
  { display: '卫生巾、卫生棉条、月经内裤和月经杯', value: 'Pads - Tampons - Period Underwear - and Cups' }
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
            value={businessDescription}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div>
          <p className="block mb-2 font-medium">
            您的FemTech业务处于什么阶段？
          </p>
          <div className="space-y-2">
            {BUSINESS_STAGES.map((stage) => (
              <div key={stage.value} className="flex items-center">
                <input
                  type="radio"
                  id={`stage-${stage.value}`}
                  name="businessStage"
                  value={stage.value}
                  checked={businessStage === stage.value}
                  onChange={handleInputChange}
                  className="mr-2 h-4 w-4 text-primary"
                />
                <label htmlFor={`stage-${stage.value}`}>{stage.display}</label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <p className="block mb-2 font-medium">
            哪些类别最能描述您公司的产品或服务？
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {BUSINESS_CATEGORIES.map((category) => (
              <div key={category.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category.value}`}
                  name="categories"
                  value={category.value}
                  onChange={handleCheckboxChange}
                  checked={categories.includes(category.value)}
                  className="mr-2 h-4 w-4 text-primary"
                />
                <label htmlFor={`category-${category.value}`}>{category.display}</label>
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
            value={additionalInfo}
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
  );
} 