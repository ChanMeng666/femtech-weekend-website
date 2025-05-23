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

export default function Competition(): React.ReactNode {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <Layout
      title="Competition"
      description="Join the premier women's health innovation competition in China. Showcase your FemTech solutions and connect with leading investors.">
      <main>
        <CompetitionHero />
        <CompetitionStats />
        <Timeline />
        <Prizes />
        <Requirements />
        <RegistrationCTA />
      </main>
    </Layout>
  );
} 