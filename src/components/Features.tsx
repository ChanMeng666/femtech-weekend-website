import React from 'react';
import { cn } from '../lib/utils';
import Waves from './Waves';
import { getFeaturesTitle, getFeaturesSubtitle } from '../constants/homepage';
import {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

function Feature({ title, description, icon, className }: FeatureProps) {
  return (
    <div className={cn("flex flex-col items-start", className)}>
      <div className="mb-4 rounded-lg bg-primary/10 p-3 text-primary">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-medium text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export function Features() {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  
  const title = getFeaturesTitle();
  const subtitle = getFeaturesSubtitle();
  
  // Feature 1
  const feature1Title = translate({
    id: 'homepage.features.feature1.title',
    message: "Drive Women's Health Innovation"
  });
  
  const feature1Description = translate({
    id: 'homepage.features.feature1.description',
    message: "We are dedicated to pioneering innovation in women's health, advocating for cutting-edge technology to break barriers, improve care, and empower women from China."
  });
  
  // Feature 2
  const feature2Title = translate({
    id: 'homepage.features.feature2.title',
    message: "Amplify Women in Tech Entrepreneurship"
  });
  
  const feature2Description = translate({
    id: 'homepage.features.feature2.description',
    message: "We redefine who builds the future of women's health – creating an inclusive ecosystem where every woman from China can access the knowledge, capital and support needed to succeed."
  });
  
  // Feature 3
  const feature3Title = translate({
    id: 'homepage.features.feature3.title',
    message: "Ecosystem Building"
  });
  
  const feature3Description = translate({
    id: 'homepage.features.feature3.description',
    message: "We build a thriving homegrown innovation hub while fostering cross-border collaboration - strengthening local industry-academia-investment-research ties while opening doors for worldwide knowledge exchange."
  });

  return (
    <div className="relative bg-background py-24 sm:py-32 overflow-hidden">
      {/* Waves background */}
      <Waves 
        lineColor="rgba(214, 171, 147, 0.85)"
        backgroundColor="transparent"
        waveSpeedX={0.01}
        waveSpeedY={0.007}
        waveAmpX={25}
        waveAmpY={12}
        friction={0.93}
        tension={0.007}
        maxCursorMove={80}
        xGap={18}
        yGap={45}
        className="z-0 opacity-40"
      />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {subtitle}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <Feature
              title={feature1Title}
              description={feature1Description}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                </svg>
              }
            />
            <Feature
              title={feature2Title}
              description={feature2Description}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              }
            />
            <Feature
              title={feature3Title}
              description={feature3Description}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
} 