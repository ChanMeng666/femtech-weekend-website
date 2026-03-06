import React, { useEffect, useRef, useState } from 'react';
import { AnimatedLine } from '../ui/AnimatedLine';
import { speakers } from '../../data/shanghai-summit';
import type { SpeakerData } from '../../data/shanghai-summit';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function SpeakerCard({ speaker }: { speaker: SpeakerData }) {
  const [isHovered, setIsHovered] = useState(false);
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const locale = currentLocale === 'zh-Hans' ? 'zh' : 'en';

  const initials = speaker.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="group relative border border-border bg-card p-6 transition-all duration-500 hover:border-primary/50 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Corner accent */}
      <div
        className="absolute right-4 bottom-4 h-6 w-px bg-primary/70 transition-all duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'bottom',
        }}
      />
      <div
        className="absolute right-4 bottom-4 h-px w-6 bg-primary/70 transition-all duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'right',
        }}
      />

      {/* Photo or initials */}
      <div className="relative mx-auto mb-6 h-32 w-32 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/40 flex-shrink-0">
        {speaker.image ? (
          <img
            src={speaker.image}
            alt={speaker.name}
            className="h-full w-full object-cover transition-transform duration-500"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <span className="font-display text-3xl text-primary/80">{initials}</span>
          </div>
        )}
        <div
          className="absolute inset-2 border border-white/50 transition-opacity duration-500"
          style={{ opacity: isHovered ? 1 : 0 }}
        />
      </div>

      {/* Name */}
      <h4 className="font-display text-xl text-center text-foreground">{speaker.name}</h4>

      {/* Title */}
      <p className="text-primary text-center mt-1 text-sm">{speaker.title[locale]}</p>

      {/* Organization */}
      <p className="text-muted-foreground text-center mt-1 text-xs">{speaker.organization}</p>

      {/* Bio (truncated) */}
      <p className="text-muted-foreground text-center mt-3 text-xs leading-relaxed line-clamp-3">
        {speaker.bio[locale]}
      </p>
    </div>
  );
}

export function SpeakersGrid() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-background py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="mb-16 transition-all duration-700"
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
          <p className="text-muted-foreground text-lg max-w-2xl mt-4 leading-relaxed">
            Pioneers in women's health science, investment, and cross-border innovation — sharing
            first-hand insights on the global FemTech ecosystem.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '200ms',
          }}
        >
          {speakers.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </div>
    </div>
  );
}
