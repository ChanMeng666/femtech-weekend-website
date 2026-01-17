import React from 'react';
import { Hero } from './Hero';
import { StatsSection } from './StatsSection';
import { Features } from './Features';
import { LogoDivider } from './ui/LogoDivider';
import { PartnershipSection } from './PartnershipSection';

export const HomepageContent: React.FC = () => {
  return (
    <>
      <Hero />
      <LogoDivider />
      <StatsSection />
      <LogoDivider />
      <Features />
      <LogoDivider />
      <PartnershipSection />
    </>
  );
}; 