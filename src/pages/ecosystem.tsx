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
import { getEcosystemTitle, getEcosystemDescription } from '../constants/ecosystem';

export default function Ecosystem(): React.ReactNode {
  const { siteConfig } = useDocusaurusContext();

  const title = getEcosystemTitle();
  const description = getEcosystemDescription();

  return (
    <Layout
      title={title}
      description={description}>
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