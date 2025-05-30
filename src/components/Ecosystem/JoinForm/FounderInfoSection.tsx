import React from 'react';

interface FounderInfoSectionProps {
  founderName: string;
  founderLinkedin: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FounderInfoSection({
  founderName,
  founderLinkedin,
  handleInputChange
}: FounderInfoSectionProps) {
  return (
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
            value={founderName}
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
            value={founderLinkedin}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
    </div>
  );
} 