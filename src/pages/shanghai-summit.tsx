import React from 'react';
import Layout from '@theme/Layout';
import { getPageTitle, getPageDescription } from '../constants/shanghai-summit';
import {
  SummitHero,
  GlobalEcosystem,
  SpeakersGrid,
  AgendaTimeline,
  VenueShowcase,
  CapitalSpotlight,
  WhyDifferent,
  FABGlobeSection,
  PartnersGrid,
  WhoShouldAttend,
} from '../components/ShanghaiSummit';

export default function ShanghaiSummitPage() {
  const title = getPageTitle();
  const description = getPageDescription();

  return (
    <Layout title={title} description={description}>
      <main style={{ marginTop: 'calc(-1 * var(--ifm-navbar-height))' }}>
        <SummitHero />
        <FABGlobeSection />
        <PartnersGrid />
        <SpeakersGrid />
        <AgendaTimeline />
        <WhoShouldAttend />
        <VenueShowcase />
        <CapitalSpotlight />
        <WhyDifferent />
        <GlobalEcosystem />
      </main>
    </Layout>
  );
}
