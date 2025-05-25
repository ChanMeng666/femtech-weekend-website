import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { 
  AboutHero, 
  MissionVision, 
  Values, 
  Team, 
  CallToAction 
} from '../../../src/components/AboutUs';
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
        <CallToAction />
      </main>
    </Layout>
  );
} 