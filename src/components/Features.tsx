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

  // Section label
  const sectionLabel = translate({
    id: 'homepage.features.label',
    message: "What We Do"
  });

  const features = [
    {
      title: feature1Title,
      description: feature1Description,
      // Placeholder image - Replace with actual image: Innovation/technology/healthcare themed
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop&q=80",
      imageAlt: "Healthcare innovation and technology",
    },
    {
      title: feature2Title,
      description: feature2Description,
      // Placeholder image - Replace with actual image: Women entrepreneurs/leadership themed
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop&q=80",
      imageAlt: "Women in technology entrepreneurship",
    },
    {
      title: feature3Title,
      description: feature3Description,
      // Placeholder image - Replace with actual image: Global network/collaboration themed
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&q=80",
      imageAlt: "Global ecosystem and collaboration",
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
              image={feature.image}
              imageAlt={feature.imageAlt}
              ctaText={translate({
                id: 'homepage.features.cta',
                message: 'Learn More',
              })}
              href="#"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
