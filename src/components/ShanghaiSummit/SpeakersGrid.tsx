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
      className="group relative overflow-hidden transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered
          ? 'linear-gradient(165deg, rgba(170,124,82,0.06) 0%, transparent 50%)'
          : 'transparent',
      }}
    >
      {/* Gold accent line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#AA7C52] via-[#AA7C52]/50 to-transparent"
        style={{
          transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      <div className="p-6 sm:p-8">
        {/* Photo area */}
        <div className="relative mb-6">
          <div
            className="relative w-28 h-28 sm:w-32 sm:h-32 overflow-hidden"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)',
            }}
          >
            {speaker.image ? (
              <>
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover transition-transform duration-700"
                  style={{ transform: isHovered ? 'scale(1.08)' : 'scale(1)' }}
                  loading="lazy"
                />
                {/* Shimmer on hover */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  style={{
                    transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#AA7C52]/15 to-[#AA7C52]/5">
                <span className="font-display text-3xl text-[#AA7C52]/60">{initials}</span>
              </div>
            )}
          </div>

          {/* Small index number */}
          <span
            className="absolute -right-1 top-0 font-mono text-[10px] text-muted-foreground/30 tracking-wider"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Name — with hover shift */}
        <h4
          className="font-display text-xl text-foreground transition-all duration-500"
          style={{ transform: isHovered ? 'translateX(4px)' : 'translateX(0)' }}
        >
          {speaker.name}
        </h4>

        {/* Title */}
        <p
          className="text-[#AA7C52] mt-1.5 text-sm leading-snug transition-all duration-500"
          style={{
            transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
            transitionDelay: '30ms',
          }}
        >
          {speaker.title[locale]}
        </p>

        {/* Organization */}
        <p className="text-muted-foreground mt-1 text-xs tracking-wide uppercase">
          {speaker.organization}
        </p>

        {/* Bio — reveal on hover */}
        <div
          className="overflow-hidden transition-all duration-500"
          style={{
            maxHeight: isHovered ? '80px' : '0px',
            opacity: isHovered ? 1 : 0,
            marginTop: isHovered ? '12px' : '0px',
          }}
        >
          <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">
            {speaker.bio[locale]}
          </p>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-6 right-6 h-px bg-border" />
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
      {/* Subtle diagonal lines background */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 80px,
            currentColor 80px,
            currentColor 81px
          )`,
        }}
      />

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

        {/* Grid with staggered reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {speakers.map((speaker, i) => (
            <div
              key={speaker.id}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${250 + i * 80}ms`,
              }}
            >
              <SpeakerCard speaker={speaker} index={i} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
