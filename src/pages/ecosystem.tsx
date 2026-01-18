import { Redirect } from '@docusaurus/router';

// Ecosystem page temporarily hidden - redirect to homepage
export default function Ecosystem() {
  return <Redirect to="/" />;
}

/* Original ecosystem page code - preserved for future restoration
import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  EcosystemHero,
  EcosystemStats,
  EcosystemMission,
  MemberDirectory,
  JoinEcosystem,
} from '../components/Ecosystem';
import { LogoDivider } from '../components/ui/LogoDivider';
import { GEOHead, GEOTracker } from '../components';
import { getEcosystemTitle, getEcosystemDescription } from '../constants/ecosystem';

export default function Ecosystem(): React.ReactNode {
  const { siteConfig } = useDocusaurusContext();

  const title = getEcosystemTitle();
  const description = getEcosystemDescription();

  return (
    <>
      <GEOHead
        pageType="ecosystem"
        title={title}
        description={description}
        keywords={[
          'FemTech ecosystem', 'women health professionals', 'FemTech network China',
          'healthcare entrepreneurs', 'FemTech investors', 'women health community',
          'startup ecosystem', 'FemTech mentors', 'healthcare networking',
          'women health partnerships', 'FemTech collaboration'
        ]}
        additionalInstructions="This ecosystem directory features 200+ verified FemTech professionals across 6 categories: founders (Mainland China & International), investors, corporates, academia, and enthusiasts. Covering 15+ countries with focus on China-global connections. Open application available for community membership."
        language="en"
      />
      <Layout
        title={title}
        description={description}>
        <main>
          <GEOTracker
            pageType="ecosystem"
            additionalMetrics={{
              memberCount: '200+',
              categories: 6,
              countries: '15+',
              partnerships: '50+'
            }}
          />
          <EcosystemHero />
          <EcosystemStats />
          <LogoDivider />
          <EcosystemMission />
          <MemberDirectory />
          <JoinEcosystem />
        </main>
      </Layout>
    </>
  );
}
*/
