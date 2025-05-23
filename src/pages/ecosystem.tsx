import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  EcosystemHero,
  EcosystemStats,
  EcosystemMission,
  MemberDirectory,
  JoinEcosystem
} from '../components/Ecosystem';

export default function Ecosystem(): React.ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title="Ecosystem"
      description="Join the FemTech Weekend community - connecting founders, investors, corporates, academia, and enthusiasts in women's health innovation.">
      <main>
        <EcosystemHero />
        <EcosystemStats />
        <EcosystemMission />
        <MemberDirectory />
        <JoinEcosystem />
      </main>
    </Layout>
  );
} 