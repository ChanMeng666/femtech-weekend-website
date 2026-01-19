import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import {
  getStoriesCTATitle,
  getStoriesCTADescription,
  getLearnMoreAboutUsText,
} from '../../constants/stories-components';
import { Button } from '../ui/button';
import { AnimatedLine } from '../ui/AnimatedLine';
import { NewsletterSubscribe } from '../ui/NewsletterSubscribe';
import { translate } from '@docusaurus/Translate';

export function StoriesCTA(): React.ReactNode {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const title = getStoriesCTATitle();
  const description = getStoriesCTADescription();
  const learnMoreButtonText = getLearnMoreAboutUsText();

  const sectionLabel = translate({
    id: 'stories.cta.label',
    message: 'Get Featured',
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
    <div ref={sectionRef} className="mt-20 bg-foreground text-background py-20 lg:py-28 relative">
      {/* Decorative quote mark - unique to Stories CTA */}
      <div className="absolute top-8 right-8 lg:right-16 opacity-5 pointer-events-none">
        <svg className="w-24 h-24 lg:w-32 lg:h-32 text-background" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
        </svg>
      </div>

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

        {/* Newsletter Subscribe Form */}
        <div
          className="mt-10 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '300ms',
          }}
        >
          <NewsletterSubscribe variant="dark" />
        </div>

        {/* CTA Button */}
        <div
          className="mt-8 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '400ms',
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
