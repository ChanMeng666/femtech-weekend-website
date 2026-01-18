import React from 'react';
import Link from '@docusaurus/Link';
import {
  getInsightsCTATitle,
  getInsightsCTADescription,
  getLearnMoreAboutUsText,
  getContactResearchTeamText
} from '../../constants/insights-components';
import { Button } from '../ui/button';

export function InsightsCTA(): React.ReactNode {
  const title = getInsightsCTATitle();
  const description = getInsightsCTADescription();
  const learnMoreButtonText = getLearnMoreAboutUsText();
  const contactButtonText = getContactResearchTeamText();

  return (
    <div className="mt-20 text-center">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8">
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
        </div>
      </div>
    </div>
  );
}
