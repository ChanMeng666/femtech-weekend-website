import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { 
  AboutHero, 
  MissionVision, 
  Values, 
  Team, 
  CallToAction 
} from '../components/AboutUs';
import { getAboutUsTitle, getAboutUsDescription } from '../constants/about-us';
import { LogoDivider } from '../components/ui/LogoDivider';
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
        <LogoDivider />
        <MissionVision />
        <Values />
        <Team />
        <CallToAction />
      </main>
    </Layout>
  );
} 