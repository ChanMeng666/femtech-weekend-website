import React from 'react';

interface CompanyInfoSectionProps {
  companyName: string;
  companyWebsite: string;
  companyLinkedin: string;
  companyInstagram: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CompanyInfoSection({
  companyName,
  companyWebsite,
  companyLinkedin,
  companyInstagram,
  handleInputChange
}: CompanyInfoSectionProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-100">
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
            value={companyName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div>
          <label htmlFor="companyWebsite" className="block mb-1 font-medium">
            公司网站 <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            id="companyWebsite"
            name="companyWebsite"
            required
            value={companyWebsite}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div>
          <label htmlFor="companyLinkedin" className="block mb-1 font-medium">
            公司领英 <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            id="companyLinkedin"
            name="companyLinkedin"
            required
            value={companyLinkedin}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div>
          <label htmlFor="companyInstagram" className="block mb-1 font-medium">
            公司Instagram
          </label>
          <input
            type="text"
            id="companyInstagram"
            name="companyInstagram"
            value={companyInstagram}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
    </div>
  );
} 