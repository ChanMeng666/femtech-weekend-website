import React from 'react';
import { Hero } from './Hero';
import { CompetitionSection } from './CompetitionSection';
import { Features } from './Features';
import { LogoDivider } from './ui/LogoDivider';

export const HomepageContent: React.FC = () => {
  return (
    <>
      <Hero />
      <LogoDivider />
      <CompetitionSection />
      <LogoDivider />
      <Features />
    </>
  );
}; 