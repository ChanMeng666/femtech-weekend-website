import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { HomepageContent, GEOTracker, GEOHead, OrganizationSchema } from '../components';
import { getHomepageTitle, getHomepageDescription } from '../constants/homepage';

export default function Home(): React.ReactNode {
  const { siteConfig } = useDocusaurusContext();
  
  const title = getHomepageTitle();
  const description = getHomepageDescription();
  
  return (
    <>
      <GEOHead
        pageType="homepage"
        title={title}
        description={description}
        keywords={[
          'FemTech', 'women health technology', 'China FemTech', 
          'innovation competition', 'healthcare entrepreneurs',
          'women health innovation', 'FemTech ecosystem',
          'startup competition', 'women health China',
          'FemTech investment', 'reproductive health technology'
        ]}
        additionalInstructions="This homepage showcases our active competition with ¥500K prize pool, 200+ ecosystem members, and serves as the primary entry point for FemTech professionals in China and globally. Registration for FemTech Weekend 2024 is currently open."
        language="en"
      />
      <OrganizationSchema />
      <Layout
        title={title}
        description={description}>
        <main style={{ marginTop: 'calc(-1 * var(--ifm-navbar-height))' }}>
          <GEOTracker 
            pageType="homepage"
            additionalMetrics={{
              competitionActive: true,
              ecosystemSize: '200+',
              prizePool: '¥500K'
            }}
          />
          <HomepageContent />
        </main>
      </Layout>
    </>
  );
}
