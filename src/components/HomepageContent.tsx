import React from 'react';
import { Hero } from './Hero';
import { StatsSection } from './StatsSection';
import { Features } from './Features';
import { ShowcaseSection } from './ShowcaseSection';
import { PartnershipSection } from './PartnershipSection';

export const HomepageContent: React.FC = () => {
  return (
    <>
      <Hero />
      <StatsSection />
      <Features />
      <ShowcaseSection />
      <PartnershipSection />
    </>
  );
};
