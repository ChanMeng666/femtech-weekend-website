import React, { useEffect, useRef, useState } from 'react';
import { getStoriesTitle, getStoriesSubtitle } from '../../constants/stories-components';
import { translate } from '@docusaurus/Translate';
import { Quote } from 'lucide-react';

export function StoriesHero(): React.ReactNode {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const title = getStoriesTitle();
  const subtitle = getStoriesSubtitle();

  const sectionLabel = translate({
    id: 'stories.hero.label',
    message: 'Stories',
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
      className="relative isolate overflow-hidden bg-gradient-to-br from-rose-50 via-background to-amber-50/30 dark:from-rose-950/20 dark:via-background dark:to-amber-950/10 pt-24 pb-20 lg:pt-32 lg:pb-28"
    >
      {/* Decorative quote marks */}
      <div className="absolute top-16 right-8 lg:right-24 opacity-[0.03]" aria-hidden="true">
        <Quote className="w-48 h-48 lg:w-80 lg:h-80 text-foreground" strokeWidth={1} />
      </div>

      {/* Decorative circles - magazine style */}
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-gradient-to-tr from-rose-200/20 to-transparent dark:from-rose-800/10 -translate-x-1/2 translate-y-1/2" aria-hidden="true" />
      <div className="absolute top-20 right-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-amber-200/30 to-transparent dark:from-amber-800/10" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <div className="lg:col-span-7">
            {/* Magazine-style label with line */}
            <div
              className="flex items-center gap-4 mb-8 transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div className="w-12 h-px bg-rose-400 dark:bg-rose-500" />
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-rose-600 dark:text-rose-400">
                {sectionLabel}
              </span>
            </div>

            {/* Main headline - editorial serif */}
            <h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground leading-[1.1] transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: '100ms',
              }}
            >
              {title}
            </h1>

            {/* Subtitle with editorial feel */}
            <p
              className="mt-6 text-lg lg:text-xl leading-8 text-muted-foreground max-w-xl transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: '200ms',
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Right side - decorative element */}
          <div className="lg:col-span-5 hidden lg:block">
            <div
              className="relative transition-all duration-1000"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1) rotate(0deg)' : 'scale(0.9) rotate(-3deg)',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: '300ms',
              }}
            >
              {/* Stacked profile cards visual */}
              <div className="relative h-64">
                <div className="absolute top-0 right-0 w-48 h-48 rounded-2xl bg-gradient-to-br from-rose-100 to-rose-50 dark:from-rose-900/30 dark:to-rose-800/20 shadow-lg transform rotate-6" />
                <div className="absolute top-4 right-8 w-48 h-48 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/20 shadow-lg transform -rotate-3" />
                <div className="absolute top-8 right-16 w-48 h-48 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 shadow-xl flex items-center justify-center border border-primary/10">
                  <div className="text-center">
                    <Quote className="w-8 h-8 text-primary/40 mx-auto mb-2" />
                    <div className="text-xs uppercase tracking-wider text-primary/60 font-medium">
                      Voices of Innovation
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
