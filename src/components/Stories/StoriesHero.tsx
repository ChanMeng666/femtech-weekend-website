import React, { useEffect, useRef, useState } from 'react';
import { getStoriesTitle, getStoriesSubtitle } from '../../constants/stories-components';
import { AnimatedLine } from '../ui/AnimatedLine';
import { translate } from '@docusaurus/Translate';

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
      className="relative isolate overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background pt-24 pb-20 lg:pt-32 lg:pb-28"
    >
      {/* Subtle gradient decoration */}
      <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div
          className="relative left-[calc(50%-20rem)] aspect-[1155/678] w-[50rem] -translate-x-1/2 bg-gradient-to-tr from-primary/20 to-primary/5 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      {/* Large decorative quote mark - unique to Stories */}
      <div className="absolute top-16 right-8 lg:right-24 opacity-[0.04] pointer-events-none" aria-hidden="true">
        <svg className="w-48 h-48 lg:w-72 lg:h-72 text-foreground" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Main content */}
          <div className="lg:col-span-8">
            {/* Animated label */}
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

            {/* Main headline - serif */}
            <h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: '100ms',
              }}
            >
              {title}
            </h1>

            {/* Subtitle */}
            <p
              className="mt-6 text-lg lg:text-xl leading-8 text-muted-foreground max-w-2xl transition-all duration-700"
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

          {/* Decorative element - interview visual */}
          <div className="lg:col-span-4 hidden lg:flex justify-end">
            <div
              className="relative transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: '300ms',
              }}
            >
              {/* Stacked cards representing interviews */}
              <div className="relative">
                <div className="absolute -top-2 -left-2 w-32 h-40 border border-primary/20 bg-background" />
                <div className="absolute top-2 left-2 w-32 h-40 border border-primary/30 bg-background" />
                <div className="relative w-32 h-40 border border-primary bg-card flex items-center justify-center">
                  <div className="text-center px-4">
                    <svg className="w-8 h-8 text-primary/40 mx-auto mb-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                    <span className="mckinsey-label text-primary/60">Voices</span>
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
