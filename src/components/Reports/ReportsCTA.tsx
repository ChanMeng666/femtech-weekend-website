import React from 'react';
import Link from '@docusaurus/Link';

export function ReportsCTA(): React.ReactNode {
  return (
    <div className="mt-20 text-center">
      <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 p-8">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Stay Updated with Our Research
        </h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Get the latest reports and insights delivered directly to your inbox. 
          Join our community of women's health innovators and investors.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/about-us"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 rounded-md px-8 text-decoration-none"
          >
            Learn More About Us
          </Link>
          <Link 
            to="mailto:hello@femtechweekend.com"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-10 rounded-md px-8 text-decoration-none"
          >
            Contact Research Team
          </Link>
        </div>
      </div>
    </div>
  );
} 