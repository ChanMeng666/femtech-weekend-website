import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  EcosystemHero,
  EcosystemStats,
  EcosystemMission,
  MemberDirectory,
  JoinEcosystem
} from '../../../src/components/Ecosystem';
import { LogoDivider } from '../../../src/components/ui/LogoDivider';
import { getEcosystemTitle, getEcosystemDescription } from '../../../src/constants/ecosystem';

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
        <LogoDivider />
        <EcosystemMission />
        <MemberDirectory />
        <JoinEcosystem />
      </main>
    </Layout>
  );
} 