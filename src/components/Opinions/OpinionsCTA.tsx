import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import {
  getOpinionsCTATitle,
  getOpinionsCTADescription,
  getLearnMoreAboutUsText,
} from '../../constants/opinions-components';
import { Button } from '../ui/button';
import { NewsletterSubscribe } from '../ui/NewsletterSubscribe';
import { translate } from '@docusaurus/Translate';
import { ArrowRight, PenLine } from 'lucide-react';

export function OpinionsCTA(): React.ReactNode {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const title = getOpinionsCTATitle();
  const description = getOpinionsCTADescription();
  const learnMoreButtonText = getLearnMoreAboutUsText();

  const sectionLabel = translate({
    id: 'opinions.cta.label',
    message: 'Contribute',
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
    <div ref={sectionRef} className="mt-20">
      {/* Editorial-style CTA - brand colors */}
      <div className="relative bg-primary text-primary-foreground py-20 lg:py-28">
        {/* Decorative corner elements */}
        <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-primary-foreground/20" />
        <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-primary-foreground/20" />
        <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-primary-foreground/20" />
        <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-primary-foreground/20" />

        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          {/* Icon */}
          <div
            className="mb-6 flex justify-center transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 border border-primary-foreground/30 rounded-full">
              <PenLine className="w-7 h-7 text-primary-foreground/70" />
            </div>
          </div>

          {/* Label */}
          <div
            className="mb-4 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '50ms',
            }}
          >
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-primary-foreground/50">
              {sectionLabel}
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight transition-all duration-700"
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
            className="mt-6 text-lg text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed font-light transition-all duration-700"
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
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold group"
              >
                {learnMoreButtonText}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
