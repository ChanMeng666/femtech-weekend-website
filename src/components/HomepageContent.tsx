import React from 'react';
import { Hero } from './Hero';
import { CompetitionSection } from './CompetitionSection';
import { Features } from './Features';
import { TestimonialsSection } from './TestimonialsSection';
import { homepageConfig } from '../data';

export const HomepageContent: React.FC = () => {
  return (
    <>
      <Hero />
      <CompetitionSection />
      <Features />
      <TestimonialsSection 
        title={homepageConfig.testimonials.title}
        subtitle={homepageConfig.testimonials.subtitle}
      />
    </>
  );
}; 