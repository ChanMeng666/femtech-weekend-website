import React, { useRef, useEffect } from 'react';
import { Button } from '@site/src/components/ui/button';

interface SuccessMessageProps {
  successRef: React.RefObject<HTMLDivElement>;
}

export default function SuccessMessage({ successRef }: SuccessMessageProps) {
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