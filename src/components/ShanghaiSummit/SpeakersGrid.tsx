import React, { useEffect, useRef, useState } from 'react';
import { AnimatedLine } from '../ui/AnimatedLine';
import { speakers } from '../../data/shanghai-summit';
import type { SpeakerData } from '../../data/shanghai-summit';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function SpeakerCard({ speaker }: { speaker: SpeakerData }) {
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const locale = currentLocale === 'zh-Hans' ? 'zh' : 'en';

  return (
    <div className="group relative overflow-hidden bg-neutral-900 aspect-[3/4]">
      <img
        src={speaker.image}
        alt={speaker.name}
        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
        loading="lazy"
      />
      {/* Dark gradient at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      {/* Text overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
        <h4 className="font-display text-lg sm:text-xl text-white leading-tight mb-1">
          {speaker.name}
        </h4>
        <p className="text-white/70 text-sm leading-snug">
          {speaker.title[locale]}
        </p>
        <p className="text-white/50 text-xs tracking-wide uppercase mt-1">
          {speaker.organization}
        </p>
      </div>
    </div>
  );
}

export function SpeakersGrid() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const speakersWithImages = speakers.filter((s) => s.image);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-background py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div
            className="transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <AnimatedLine variant="label" label="SPEAKERS" />
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground mt-6">
              Global Thought Leaders
            </h2>
          </div>
          <p
            className="text-muted-foreground text-base max-w-md leading-relaxed lg:text-right transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transitionDelay: '150ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            Pioneers in women&apos;s health science, investment, and cross-border
            innovation.
          </p>
        </div>

        {/* 4-column grid of large rectangular cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {speakersWithImages.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </div>
    </div>
  );
}
