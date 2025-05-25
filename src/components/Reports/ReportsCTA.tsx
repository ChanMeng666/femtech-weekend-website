import React from 'react';
import Link from '@docusaurus/Link';
import { 
  getReportsCTATitle, 
  getReportsCTADescription,
  getLearnMoreAboutUsText,
  getContactResearchTeamText
} from '../../constants/reports-components';

export function ReportsCTA(): React.ReactNode {
  const title = getReportsCTATitle();
  const description = getReportsCTADescription();
  const learnMoreButtonText = getLearnMoreAboutUsText();
  const contactButtonText = getContactResearchTeamText();
  
  return (
    <div className="mt-20 text-center">
      <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 p-8">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          {title}
        </h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/about-us"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 rounded-md px-8 text-decoration-none"
          >
            {learnMoreButtonText}
          </Link>
          <Link 
            to="mailto:hello@femtechweekend.com"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-10 rounded-md px-8 text-decoration-none"
          >
            {contactButtonText}
          </Link>
        </div>
      </div>
    </div>
  );
} 