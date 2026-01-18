import React, { useEffect, useRef, useState } from 'react';
import { getOpinionsTitle, getOpinionsSubtitle } from '../../constants/opinions-components';
import { translate } from '@docusaurus/Translate';

export function OpinionsHero(): React.ReactNode {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const title = getOpinionsTitle();
  const subtitle = getOpinionsSubtitle();

  const sectionLabel = translate({
    id: 'opinions.hero.label',
    message: 'Opinions',
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
    <div
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-background border-b border-border pt-24 pb-16 lg:pt-32 lg:pb-20"
    >
      {/* Newspaper masthead style - clean and minimal */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Centered editorial layout */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Masthead-style label */}
          <div
            className="mb-8 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div className="inline-flex items-center gap-4">
              <div className="w-16 h-px bg-foreground/20" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-foreground/60">
                {sectionLabel}
              </span>
              <div className="w-16 h-px bg-foreground/20" />
            </div>
          </div>

          {/* Main headline - large bold newspaper style */}
          <h1
            className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05] transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '100ms',
            }}
          >
            {title}
          </h1>

          {/* Decorative divider */}
          <div
            className="my-8 flex justify-center transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transitionDelay: '200ms',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-foreground/20 rotate-45" />
              <div className="w-24 h-px bg-foreground/20" />
              <div className="w-2 h-2 bg-foreground/20 rotate-45" />
            </div>
          </div>

          {/* Subtitle - editorial deck */}
          <p
            className="text-lg lg:text-xl leading-8 text-muted-foreground max-w-2xl mx-auto font-light transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '300ms',
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
