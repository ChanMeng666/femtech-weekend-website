import React from 'react';
import Layout from '@theme/Layout';
import { WordRotate } from '../components/ui/word-rotate';
import { ScrollingTestimonials } from '../components/ScrollingTestimonials';
import { testimonialsData } from '../data/testimonials';

export default function TestComponents(): React.ReactNode {
  const shortWords = ["Innovation", "Technology", "Healthcare", "Future"];
  const longWords = [
    "Drive Women's health innovation with Technology",
    "Amplify women in Tech entrepreneurship", 
    "Build a global collaborative ecosystem"
  ];

  return (
    <Layout
      title="Test Components"
      description="Testing new components"
    >
      <main className="container mx-auto py-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-8">Component Tests</h1>
          
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-4">WordRotate Component - Short Words</h2>
            <div className="text-center mb-8">
              <span className="text-xl">FemTech Weekend - </span>
              <WordRotate
                className="text-xl font-semibold text-primary"
                words={shortWords}
                duration={2000}
              />
            </div>
            
            <h2 className="text-2xl font-semibold mb-4">WordRotate Component - Long Sentences</h2>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">FemTech Weekend</div>
              <WordRotate
                className="text-lg font-semibold text-primary"
                words={longWords}
                duration={3000}
              />
            </div>
          </div>
        </div>
        
        <ScrollingTestimonials
          title="Scrolling Testimonials Test"
          subtitle="Testing the horizontal scrolling testimonials component with new card styling"
          testimonials={testimonialsData}
        />
      </main>
    </Layout>
  );
} 