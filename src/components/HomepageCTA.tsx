import React, { useEffect, useRef, useState } from 'react';
import { AnimatedLine } from './ui/AnimatedLine';
import { NewsletterSubscribe } from './ui/NewsletterSubscribe';
import {
  getNewsletterCTALabel,
  getNewsletterCTATitle,
  getNewsletterCTADescription,
} from '../constants/newsletter';

export function HomepageCTA(): React.ReactNode {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const sectionLabel = getNewsletterCTALabel();
  const title = getNewsletterCTATitle();
  const description = getNewsletterCTADescription();

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
    <div ref={sectionRef} className="bg-primary text-primary-foreground py-20 lg:py-28">
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
          <AnimatedLine variant="label" label={sectionLabel} className="text-primary-foreground/70 before:bg-primary-foreground/50" />
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
          className="mt-6 text-lg text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed transition-all duration-700"
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
      </div>
    </div>
  );
}
