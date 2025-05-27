import React from 'react';
import Link from '@docusaurus/Link';
import { 
  getReportsCTATitle, 
  getReportsCTADescription,
  getLearnMoreAboutUsText,
  getContactResearchTeamText
} from '../../constants/reports-components';
import { Button } from '../ui/button';

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
            className="no-underline"
          >
            <Button size="lg">
              {learnMoreButtonText}
            </Button>
          </Link>
          <Link 
            to="mailto:hello@femtechweekend.com"
            className="no-underline"
          >
            <Button variant="outline" size="lg">
              {contactButtonText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 