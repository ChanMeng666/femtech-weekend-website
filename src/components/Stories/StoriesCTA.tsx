import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import {
  getStoriesCTATitle,
  getStoriesCTADescription,
  getLearnMoreAboutUsText,
} from '../../constants/stories-components';
import { Button } from '../ui/button';
import { translate } from '@docusaurus/Translate';
import { Quote, ArrowRight } from 'lucide-react';

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
    <div ref={sectionRef} className="mt-20">
      {/* Magazine-style CTA with warm gradient */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 via-rose-600 to-amber-600 py-16 lg:py-20">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-8 right-12 opacity-10">
          <Quote className="w-24 h-24 text-white" strokeWidth={1} />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          {/* Label */}
          <div
            className="mb-6 flex justify-center transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium tracking-wide uppercase">
                {sectionLabel}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-white transition-all duration-700"
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
            className="mt-6 text-lg text-white/80 max-w-2xl mx-auto leading-relaxed transition-all duration-700"
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
                className="bg-white text-rose-600 hover:bg-white/90 shadow-lg shadow-rose-900/30 group"
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
