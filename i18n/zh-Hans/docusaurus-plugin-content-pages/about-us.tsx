import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { 
  AboutHero, 
  MissionVision, 
  Values, 
  CallToAction 
} from '../../../src/components/AboutUs';
import { Team } from './Team';
import { AdvisorBoard } from './AdvisorBoard';
import { getAboutUsTitle, getAboutUsDescription } from '../../../src/constants/about-us';

export default function AboutUs(): React.ReactNode {
  const {siteConfig} = useDocusaurusContext();
  
  const title = getAboutUsTitle();
  const description = getAboutUsDescription();
  
  return (
    <Layout
      title={title}
      description={description}>
      <main>
        <AboutHero />
        <MissionVision />
        <Values />
        <Team />
        <AdvisorBoard />
        <CallToAction />
      </main>
    </Layout>
  );
} 