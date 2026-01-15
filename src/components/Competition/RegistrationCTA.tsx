import React from 'react';
import Link from '@docusaurus/Link';
import { Button } from '../ui/button';
import { 
  getRegistrationTitle, 
  getRegistrationDescription, 
  getRegisterTeamButtonText, 
  getViewPreviousWinnersButtonText,
  getMentorshipFeatureText,
  getInvestorAccessFeatureText
} from '../../constants/competition-components';

export default function RegistrationCTA() {
  const title = getRegistrationTitle();
  const description = getRegistrationDescription();
  const registerTeamButtonText = getRegisterTeamButtonText();
  const viewPreviousWinnersButtonText = getViewPreviousWinnersButtonText();
  const mentorshipFeatureText = getMentorshipFeatureText();
  const investorAccessFeatureText = getInvestorAccessFeatureText();
  
  return (
    <div className="bg-primary/5 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {description}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="mailto:competition@femtechweekend.com?subject=Competition Registration">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                {registerTeamButtonText}
              </Button>
            </Link>
            <Link to="/database">
              <Button variant="outline" size="lg">
                {viewPreviousWinnersButtonText}
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {mentorshipFeatureText}
            </div>
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {investorAccessFeatureText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 