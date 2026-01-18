import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import {
  getInsightsCTATitle,
  getInsightsCTADescription,
  getLearnMoreAboutUsText,
  getContactResearchTeamText
} from '../../constants/insights-components';
import { Button } from '../ui/button';
import { AnimatedLine } from '../ui/AnimatedLine';
import { translate } from '@docusaurus/Translate';

export function InsightsCTA(): React.ReactNode {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const title = getInsightsCTATitle();
  const description = getInsightsCTADescription();
  const learnMoreButtonText = getLearnMoreAboutUsText();

  const sectionLabel = translate({
    id: 'insights.cta.label',
    message: 'Learn More',
  });

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
    <div ref={sectionRef} className="mt-20 bg-foreground text-background py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        {/* Animated label */}
        <div
          className="mb-6 flex justify-center transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <AnimatedLine variant="label" label={sectionLabel} className="text-background/70 before:bg-background/50" />
        </div>

        {/* Title - serif */}
        <h3
          className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '100ms',
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="mt-6 text-lg text-background/80 max-w-2xl mx-auto leading-relaxed transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '200ms',
          }}
        >
          {description}
        </p>

        {/* CTA Button */}
        <div
          className="mt-10 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '300ms',
          }}
        >
          <Link to="/about-us" className="no-underline">
            <Button
              size="lg"
              className="bg-background text-foreground hover:bg-background/90"
            >
              {learnMoreButtonText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
