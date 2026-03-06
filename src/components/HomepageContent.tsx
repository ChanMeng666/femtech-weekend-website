import React from 'react';
import { Hero } from './Hero';
import { StatsSection } from './StatsSection';
import { Features } from './Features';
import { ShowcaseSection } from './ShowcaseSection';
import { PartnershipSection } from './PartnershipSection';
import { HomepageCTA } from './HomepageCTA';
import { ShanghaiSummitBanner } from './ShanghaiSummitBanner';

export const HomepageContent: React.FC = () => {
  return (
    <>
      <Hero />
      <ShanghaiSummitBanner />
      <Features />
      {/* <StatsSection /> */}
      {/* <ShowcaseSection /> */}
      <PartnershipSection />
      <HomepageCTA />
    </>
  );
};
