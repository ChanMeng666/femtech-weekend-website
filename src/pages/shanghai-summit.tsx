import React from 'react';
import Layout from '@theme/Layout';
import { getPageTitle, getPageDescription } from '../constants/shanghai-summit';
import {
  SummitHero,
  WhyThisMatters,
  GlobalEcosystem,
  SpeakersGrid,
  AgendaTimeline,
  VenueShowcase,
  SummitCTA,
  CapitalSpotlight,
  WhyDifferent,
} from '../components/ShanghaiSummit';

export default function ShanghaiSummitPage() {
  const title = getPageTitle();
  const description = getPageDescription();

  return (
    <Layout title={title} description={description}>
      <main style={{ marginTop: 'calc(-1 * var(--ifm-navbar-height))' }}>
        <SummitHero />
        <WhyThisMatters />
        <AgendaTimeline />
        <SpeakersGrid />
        <VenueShowcase />
        <CapitalSpotlight />
        <SummitCTA />
        <WhyDifferent />
        <GlobalEcosystem />
      </main>
    </Layout>
  );
}
