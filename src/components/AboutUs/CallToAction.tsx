import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import { Button } from '../ui/button';
import { getCtaTitle, getCtaText, getCtaButtonText } from '../../constants/about-us-components';
import { AnimatedLine } from '../ui/AnimatedLine';
import { translate } from '@docusaurus/Translate';

export function CallToAction() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const title = getCtaTitle();
  const text = getCtaText();
  const buttonText = getCtaButtonText();

  const sectionLabel = translate({
    id: 'aboutUs.cta.label',
    message: 'Join Us',
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
    <div ref={sectionRef} className="bg-foreground text-background py-20 lg:py-28">
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
        <h2
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '100ms',
          }}
        >
          {title}
        </h2>

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
          {text}
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
          <Link to="/insights">
            <Button
              size="lg"
              className="bg-background text-foreground hover:bg-background/90"
            >
              {buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
