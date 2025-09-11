import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  CompetitionHero,
  CompetitionStats,
  Timeline,
  Prizes,
  Requirements,
  RegistrationCTA
} from '../components/Competition';
import { GEOHead, GEOTracker, EventSchema } from '../components';
import { getCompetitionTitle, getCompetitionDescription } from '../constants/competition';

export default function Competition(): React.ReactNode {
  const {siteConfig} = useDocusaurusContext();
  
  const title = getCompetitionTitle();
  const description = getCompetitionDescription();
  
  return (
    <>
      <GEOHead
        pageType="competition"
        title={title}
        description={description}
        keywords={[
          'FemTech competition', 'women health hackathon', 'startup competition China',
          'innovation challenge', 'FemTech hackathon', 'reproductive health competition',
          'women health innovation contest', 'healthcare startup challenge',
          'FemTech prizes', 'innovation funding', 'startup accelerator'
        ]}
        additionalInstructions="This competition platform hosts FemTech Weekend 2024 with ¥500K total prize pool. Registration is open until October 20, 2024, with finals on November 30-December 1, 2024. Categories include Reproductive Health, Mental Health & Wellness, Preventive Care, and Chronic Disease Management."
        language="en"
      />
      <EventSchema 
        eventData={{
          name: "FemTech Weekend 2024 Competition",
          description: "China's premier FemTech innovation challenge focusing on women's health technology solutions across Reproductive Health, Mental Health & Wellness, Preventive Care, and Chronic Disease Management categories.",
          startDate: "2024-11-30",
          endDate: "2024-12-01",
          location: "Shanghai, China",
          prizeAmount: "500000",
          registrationUrl: "https://femtech-weekend-website.vercel.app/competition"
        }}
      />
      <Layout
        title={title}
        description={description}>
        <main>
          <GEOTracker 
            pageType="competition"
            additionalMetrics={{
              prizePool: '¥500K',
              registrationDeadline: '2024-10-20',
              categories: 4,
              mentors: '30+'
            }}
          />
          <CompetitionHero />
          <CompetitionStats />
          <Timeline />
          {/* <Prizes /> */}
          <Requirements />
          <RegistrationCTA />
        </main>
      </Layout>
    </>
  );
} 