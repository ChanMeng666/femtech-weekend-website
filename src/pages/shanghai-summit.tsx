import React from 'react';
import Layout from '@theme/Layout';
import { getPageTitle, getPageDescription } from '../constants/shanghai-summit';
import {
  SummitHero,
  WhyThisMatters,
  CityImageStrip,
  GlobalEcosystem,
  SpeakersGrid,
  AgendaTimeline,
  VenueShowcase,
  TeamSection,
  SummitCTA,
} from '../components/ShanghaiSummit';

export default function ShanghaiSummitPage() {
  const title = getPageTitle();
  const description = getPageDescription();

  return (
    <Layout title={title} description={description}>
      <main style={{ marginTop: 'calc(-1 * var(--ifm-navbar-height))' }}>
        <SummitHero />
        <WhyThisMatters />
        <CityImageStrip
          image="/img/shanghai/shanghai-lujiazui.jpg"
          alt="Shanghai Lujiazui skyline at dusk"
          caption="Shanghai, China"
        />
        <GlobalEcosystem />
        <SpeakersGrid />
        <CityImageStrip
          image="/img/shanghai/shanghai-aerial.jpg"
          alt="Shanghai skyscrapers reaching toward the sky"
          height="h-40 sm:h-52 lg:h-64"
        />
        <AgendaTimeline />
        <VenueShowcase />
        <TeamSection />
        <SummitCTA />
      </main>
    </Layout>
  );
}
