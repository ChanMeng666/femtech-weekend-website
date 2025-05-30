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
} from '../../../src/components/Competition';
import { getCompetitionTitle, getCompetitionDescription } from '../../../src/constants/competition';

export default function Competition(): React.ReactNode {
  const {siteConfig} = useDocusaurusContext();
  
  const title = getCompetitionTitle();
  const description = getCompetitionDescription();
  
  return (
    <Layout
      title={title}
      description={description}>
      <main>
        <CompetitionHero />
        <CompetitionStats />
        <Timeline />
        {/* <Prizes /> */}
        <Requirements />
        <RegistrationCTA />
      </main>
    </Layout>
  );
} 