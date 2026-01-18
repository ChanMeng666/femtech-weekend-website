import React from 'react';

interface PersonalInfoSectionProps {
  name: string;
  email: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PersonalInfoSection({
  name,
  email,
  handleInputChange
}: PersonalInfoSectionProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 shadow-sm border border-gray-100">
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
            value={name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
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
            value={email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
    </div>
  );
} 