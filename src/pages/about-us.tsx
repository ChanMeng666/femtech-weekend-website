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

export default function AboutUs(): React.ReactNode {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <Layout
      title="About Us"
      description="Learn about FemTech Weekend's mission to advance women's health through innovation, entrepreneurship, and global collaboration.">
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