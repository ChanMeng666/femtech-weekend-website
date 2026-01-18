import React, { useEffect, useRef, useState } from 'react';
import {
  getMissionTitle,
  getMissionText,
  getVisionTitle,
  getVisionText
} from '../../constants/about-us-components';
import { AnimatedLine } from '../ui/AnimatedLine';
import { translate } from '@docusaurus/Translate';

export function MissionVision() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const missionTitle = getMissionTitle();
  const missionText = getMissionText();
  const visionTitle = getVisionTitle();
  const visionText = getVisionText();

  const sectionLabel = translate({
    id: 'aboutUs.missionVision.label',
    message: 'Our Purpose',
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
    <div ref={sectionRef} className="bg-muted/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="mb-12 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <AnimatedLine variant="label" label={sectionLabel} />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Mission Card */}
          <div
            className="group relative border border-border bg-card p-8 lg:p-10 transition-all duration-500 hover:border-primary/50 hover:shadow-lg"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '100ms',
            }}
          >
            {/* Corner accents */}
            <div
              className="absolute left-4 top-4 h-6 w-px bg-primary/70 transition-all duration-500"
              style={{
                opacity: 0,
                transform: 'scaleY(0)',
                transformOrigin: 'top',
              }}
            />
            <div
              className="absolute left-4 top-4 h-px w-6 bg-primary/70 transition-all duration-500"
              style={{
                opacity: 0,
                transform: 'scaleX(0)',
                transformOrigin: 'left',
              }}
            />
            <style>{`
              .group:hover .absolute.left-4.top-4.h-6 { opacity: 1 !important; transform: scaleY(1) !important; }
              .group:hover .absolute.left-4.top-4.h-px { opacity: 1 !important; transform: scaleX(1) !important; }
            `}</style>

            {/* Index number */}
            <span className="mckinsey-label text-primary/60 mb-4 block">01</span>

            {/* Icon */}
            <div className="mb-6 bg-primary/10 p-4 w-fit">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
              </svg>
            </div>

            {/* Title - serif */}
            <h3 className="font-display text-2xl lg:text-3xl text-foreground mb-4">{missionTitle}</h3>

            {/* Description */}
            <p className="text-muted-foreground leading-7">{missionText}</p>
          </div>

          {/* Vision Card */}
          <div
            className="group relative border border-border bg-card p-8 lg:p-10 transition-all duration-500 hover:border-primary/50 hover:shadow-lg"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '200ms',
            }}
          >
            {/* Corner accents */}
            <div
              className="absolute right-4 bottom-4 h-6 w-px bg-primary/70 transition-all duration-500 opacity-0 group-hover:opacity-100"
              style={{ transformOrigin: 'bottom' }}
            />
            <div
              className="absolute right-4 bottom-4 h-px w-6 bg-primary/70 transition-all duration-500 opacity-0 group-hover:opacity-100"
              style={{ transformOrigin: 'right' }}
            />

            {/* Index number */}
            <span className="mckinsey-label text-primary/60 mb-4 block">02</span>

            {/* Icon */}
            <div className="mb-6 bg-primary/10 p-4 w-fit">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </div>

            {/* Title - serif */}
            <h3 className="font-display text-2xl lg:text-3xl text-foreground mb-4">{visionTitle}</h3>

            {/* Description */}
            <p className="text-muted-foreground leading-7">{visionText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
