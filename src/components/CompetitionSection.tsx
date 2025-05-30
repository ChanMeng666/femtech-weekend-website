import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {
  getCompetitionBadgeText,
  getCompetitionTitle,
  getCompetitionDescription,
  getPrizePoolText,
  getTeamsText,
  getPartnersText,
  getRegistrationOpenText,
  getRegistrationDateText,
  getFinalEventText,
  getFinalEventDateText,
  getJoinButtonText,
  getLearnMoreButtonText,
  getParticipationInfoText,
  getContinentsText,
  getApplicationsText,
  getRegistrationUntilDateText,
  getFinalEventSpecificDateText
} from '../constants/competition-section';

export function CompetitionSection() {
  const treeSvgUrl = useBaseUrl('/img/bg/abstract-flowing-lines-and-elegant-curves-represen1.png');
  
  // Get translated texts
  const badgeText = getCompetitionBadgeText();
  const title = getCompetitionTitle();
  const description = getCompetitionDescription();
  const prizePoolText = getPrizePoolText();
  const teamsText = getTeamsText();
  const partnersText = getPartnersText();
  const continentsText = getContinentsText();
  const applicationsText = getApplicationsText();
  const registrationOpenText = getRegistrationOpenText();
  const registrationDateText = getRegistrationDateText();
  const registrationUntilDateText = getRegistrationUntilDateText();
  const finalEventText = getFinalEventText();
  const finalEventDateText = getFinalEventDateText();
  const finalEventSpecificDateText = getFinalEventSpecificDateText();
  const joinButtonText = getJoinButtonText();
  const learnMoreButtonText = getLearnMoreButtonText();
  const participationInfoText = getParticipationInfoText();
  
  return (
    <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-24 sm:py-32 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="w-full h-full flex items-center justify-center opacity-15"
          style={{
            overflow: 'hidden',
          }}
        >
          <img 
            src={treeSvgUrl} 
            alt="Background pattern" 
            className="max-w-full max-h-full object-contain"
            style={{
              filter: 'blur(1px)',
            }}
          />
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl">
          {/* Badge */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center rounded-full bg-primary/20 px-4 py-2 text-sm font-medium text-primary animate-pulse">
              {badgeText}
            </span>
          </div>

          {/* Main Content */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
              {title}
            </h2>
            <p className="text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          {/* Competition Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center border-primary/20 bg-background/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="mx-auto h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <CardTitle className="text-2xl font-bold text-primary">¥10,000</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{prizePoolText}</p>
              </CardContent>
            </Card>

            <Card className="text-center border-primary/20 bg-background/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="mx-auto h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </div>
                <CardTitle className="text-2xl font-bold text-primary">4</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{continentsText}</p>
              </CardContent>
            </Card>

            <Card className="text-center border-primary/20 bg-background/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="mx-auto h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>
                </div>
                <CardTitle className="text-2xl font-bold text-primary">150+</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{applicationsText}</p>
              </CardContent>
            </Card>

            <Card className="text-center border-primary/20 bg-background/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="mx-auto h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                </div>
                <CardTitle className="text-2xl font-bold text-primary">10</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{partnersText}</p>
              </CardContent>
            </Card>
          </div>

          {/* Key Dates */}
          <div className="bg-background/90 backdrop-blur-sm rounded-xl p-6 mb-8 border border-primary/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <div className="h-3 w-3 rounded-full bg-primary animate-pulse"></div>
                <div>
                  <p className="font-medium text-foreground">{registrationOpenText}</p>
                  <p className="text-sm text-muted-foreground">{registrationUntilDateText}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-3 w-3 rounded-full bg-muted"></div>
                <div>
                  <p className="font-medium text-foreground">{finalEventText}</p>
                  <p className="text-sm text-muted-foreground">{finalEventSpecificDateText}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/competition">
                <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg">
                  {joinButtonText}
                </Button>
              </Link>
              <Link to="/competition#timeline">
                <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                  {learnMoreButtonText}
                </Button>
              </Link>
            </div>
            
            <p className="mt-4 text-sm text-muted-foreground">
              {participationInfoText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 