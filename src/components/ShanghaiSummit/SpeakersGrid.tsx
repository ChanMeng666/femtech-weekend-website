import React, { useEffect, useRef, useState } from 'react';
import { AnimatedLine } from '../ui/AnimatedLine';
import { speakers } from '../../data/shanghai-summit';
import type { SpeakerData } from '../../data/shanghai-summit';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function SpeakerCard({
  speaker,
  onSelect,
}: {
  speaker: SpeakerData;
  onSelect: (speaker: SpeakerData) => void;
}) {
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const locale = currentLocale === 'zh-Hans' ? 'zh' : 'en';

  return (
    <div
      className="group relative overflow-hidden bg-neutral-900 aspect-[3/4] cursor-pointer"
      onClick={() => onSelect(speaker)}
    >
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

function SpeakerModal({
  speaker,
  onClose,
}: {
  speaker: SpeakerData | null;
  onClose: () => void;
}) {
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const locale = currentLocale === 'zh-Hans' ? 'zh' : 'en';

  useEffect(() => {
    if (!speaker) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [speaker, onClose]);

  if (!speaker) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="p-6">
          {/* Close button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground p-2 transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Content: horizontal on desktop, stacked on mobile */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Speaker photo */}
            {speaker.image && (
              <div className="flex-shrink-0 w-full md:w-56 aspect-[3/4] bg-neutral-900 overflow-hidden">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            )}

            {/* Speaker info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-2xl text-foreground mb-1">
                {speaker.name}
              </h3>
              <p className="text-[#AA7C52] text-sm leading-snug">
                {speaker.title[locale]}
              </p>
              <p className="text-muted-foreground text-xs tracking-wide uppercase mt-1">
                {speaker.organization}
              </p>

              <div className="border-t border-border mt-5 pt-5">
                <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                  {speaker.bio[locale]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SpeakersGrid() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState<SpeakerData | null>(null);
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
            <SpeakerCard
              key={speaker.id}
              speaker={speaker}
              onSelect={setSelectedSpeaker}
            />
          ))}
        </div>
      </div>

      <SpeakerModal
        speaker={selectedSpeaker}
        onClose={() => setSelectedSpeaker(null)}
      />
    </div>
  );
}
