import React from 'react';
import { Hero } from './Hero';
import { CompetitionSection } from './CompetitionSection';
import { Features } from './Features';
import { ScrollingTestimonials } from './ScrollingTestimonials';
import { LogoDivider } from './ui/LogoDivider';
import { homepageConfig } from '../data';
import { testimonialsData } from '../data/testimonials';

export const HomepageContent: React.FC = () => {
  return (
    <>
      <Hero />
      <LogoDivider />
      <CompetitionSection />
      <LogoDivider />
      <Features />
      <ScrollingTestimonials 
        title={homepageConfig.testimonials.title}
        subtitle={homepageConfig.testimonials.subtitle}
        testimonials={testimonialsData}
      />
    </>
  );
}; 