import React, { useEffect, useRef, useState } from 'react';
import { AnimatedLine } from '../ui/AnimatedLine';
import { speakers } from '../../data/shanghai-summit';
import type { SpeakerData } from '../../data/shanghai-summit';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function SpeakerCard({ speaker, index }: { speaker: SpeakerData; index: number }) {
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
      className="group relative border border-border bg-card transition-all duration-500 hover:border-[#AA7C52]/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6 sm:p-8">
        {/* Top row: photo + name/title side by side */}
        <div className="flex gap-5 mb-5">
          {/* Photo */}
          <div className="flex-shrink-0">
            <div
              className="relative w-20 h-20 sm:w-24 sm:h-24 overflow-hidden"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)',
              }}
            >
              {speaker.image ? (
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700"
                  style={{ transform: isHovered ? 'scale(1.08)' : 'scale(1)' }}
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#AA7C52]/15 to-[#AA7C52]/5">
                  <span className="font-display text-2xl text-[#AA7C52]/60">{initials}</span>
                </div>
              )}
            </div>
          </div>

          {/* Name, title, org */}
          <div className="flex-1 min-w-0 pt-1">
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-display text-lg text-foreground leading-tight">
                {speaker.name}
              </h4>
              <span className="font-mono text-[10px] text-muted-foreground/30 tracking-wider flex-shrink-0">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <p className="text-[#AA7C52] mt-1 text-sm leading-snug">
              {speaker.title[locale]}
            </p>
            <p className="text-muted-foreground mt-0.5 text-xs tracking-wide uppercase">
              {speaker.organization}
            </p>
          </div>
        </div>

        {/* Bio — always visible, full text */}
        <div className="border-t border-border pt-4">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {speaker.bio[locale]}
          </p>
        </div>
      </div>
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

        {/* 2-column grid for speaker cards with full bios */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {speakers.map((speaker, i) => (
            <SpeakerCard key={speaker.id} speaker={speaker} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
