import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Hero } from '../components/Hero';
import { CompetitionSection } from '../components/CompetitionSection';
import { Features } from '../components/Features';
import { Testimonial, TestimonialGrid } from '../components/Testimonial';

export default function Home(): React.ReactNode {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="FemTech Weekend - Rooted in China, Connecting globally">
      <main>
        <Hero />
        <CompetitionSection />
        <Features />
        
        <div className="bg-background py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                What Our Community Says
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Hear from entrepreneurs, investors, and healthcare professionals who are part of our growing ecosystem.
              </p>
            </div>
            
            <div className="mx-auto mt-16 max-w-7xl">
              <TestimonialGrid>
                <Testimonial 
                  quote="FemTech Weekend provided the perfect platform to connect with investors who truly understand the women's health market in China."
                  author="Zhang Wei"
                  role="Founder"
                  company="HerHealth Tech"
                />
                <Testimonial 
                  quote="The mentorship and connections I made at FemTech Weekend were instrumental in helping us expand our product line internationally."
                  author="Sarah Johnson"
                  role="CEO"
                  company="Femme Innovations"
                />
                <Testimonial 
                  quote="As an investor, FemTech Weekend introduced me to some of the most promising startups addressing critical needs in women's healthcare."
                  author="Li Mei"
                  role="Partner"
                  company="Horizon Ventures"
                />
              </TestimonialGrid>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
