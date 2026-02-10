import React, { useEffect, useRef, useState } from 'react';
import { FeatureSpotlight } from './ui/feature-spotlight';
import { AnimatedLine } from './ui/AnimatedLine';
import { getFeaturesTitle, getFeaturesSubtitle } from '../constants/homepage';
import { translate } from '@docusaurus/Translate';

export function Features() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const title = getFeaturesTitle();
  const subtitle = getFeaturesSubtitle();

  // Feature 1
  const feature1Title = translate({
    id: 'homepage.features.feature1.title',
    message: "Cross-Border Bridge"
  });

  const feature1Description = translate({
    id: 'homepage.features.feature1.description',
    message: "We bridge China and global women's health ecosystems by bringing local market context and decision-grade insight to the table—so the right stakeholders align faster. We turn cross-border connections into structured collaborations with clear owners and outcomes."
  });

  // Feature 2
  const feature2Title = translate({
    id: 'homepage.features.feature2.title',
    message: "China GTM"
  });

  const feature2Description = translate({
    id: 'homepage.features.feature2.description',
    message: "We design China go-to-market strategies that are built to launch. From positioning and channels to evidence and partners, we help teams move from entry plans to scalable execution."
  });

  // Feature 3
  const feature3Title = translate({
    id: 'homepage.features.feature3.title',
    message: "Capital & Deals"
  });

  const feature3Description = translate({
    id: 'homepage.features.feature3.description',
    message: "We provide financial advisory to advance fundraising and strategic transactions. From investment readiness to deal structuring, we run a close-oriented process that moves capital and partnerships forward."
  });

  // Section label
  const sectionLabel = translate({
    id: 'homepage.features.label',
    message: "What We Do"
  });

  const features = [
    {
      title: feature1Title,
      description: feature1Description,
    },
    {
      title: feature2Title,
      description: feature2Description,
    },
    {
      title: feature3Title,
      description: feature3Description,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-background py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          {/* Label with animated line */}
          <div
            className="mb-6 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <AnimatedLine variant="label" label={sectionLabel} />
          </div>

          {/* Section Title */}
          <h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground mb-6 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '100ms',
            }}
          >
            {title}
          </h2>

          {/* Subtitle */}
          <p
            className="max-w-2xl text-lg leading-relaxed text-muted-foreground transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '200ms',
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '300ms',
          }}
        >
          {features.map((feature, index) => (
            <FeatureSpotlight
              key={index}
              index={index + 1}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
