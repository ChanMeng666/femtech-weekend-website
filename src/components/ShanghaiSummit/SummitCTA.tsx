import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import { SUMMIT_META } from '../../data/shanghai-summit';
import { ArrowRight } from 'lucide-react';

const tracks = [
  {
    title: 'Attend the Conference',
    description:
      'Join the flagship one-day international conference on Day 1, featuring keynotes, panels, and networking with global leaders in women\'s health.',
    note: null,
    cta: 'Get Conference Tickets',
    href: SUMMIT_META.ticketUrl,
    external: true,
  },
  {
    title: 'Apply for the Full Programme',
    description:
      'A curated 4-day experience including the conference, Capital & Pitch Day, and ecosystem visits — designed for companies serious about the China market.',
    note: 'Curated access | Limited places',
    cta: 'Request Full Programme Access',
    href: '/shanghai-summit/programme',
    external: false,
  },
  {
    title: 'Apply to Pitch',
    description:
      'A selective pitch opportunity on Day 2, led by Bayer, connecting founders with global investors and corporate partners in a closed-door setting.',
    note: 'Selected companies only | Application required',
    cta: 'Submit Pitch Application',
    href: '/shanghai-summit/pitch',
    external: false,
  },
];

export function SummitCTA() {
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
    <div
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-background"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          className="mb-16 lg:mb-20"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground mb-4">
            Choose Your Way In
          </h2>
          <p className="text-muted-foreground text-base max-w-lg leading-relaxed">
            Three distinct tracks to participate — whether you want to attend, apply for the full programme, or pitch.
          </p>
        </div>

        {/* Track cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tracks.map((track, i) => (
            <div
              key={track.title}
              className="group relative border border-border bg-card p-8 sm:p-10 transition-all duration-500 hover:border-[#AA7C52]/30 border-t-2 border-t-transparent hover:border-t-[#AA7C52] flex flex-col"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 100}ms`,
              }}
            >
              <span className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase block mb-6">
                Track {i + 1}
              </span>

              <h3 className="font-display text-xl sm:text-2xl text-foreground mb-3 group-hover:text-[#AA7C52] transition-colors duration-300">
                {track.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                {track.description}
              </p>

              {track.note && (
                <p className="text-[#AA7C52] text-xs tracking-wide mb-6">
                  {track.note}
                </p>
              )}

              {track.external ? (
                <a
                  href={track.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#AA7C52] text-sm font-medium no-underline hover:no-underline"
                >
                  {track.cta}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              ) : (
                <Link
                  to={track.href}
                  className="inline-flex items-center gap-2 text-[#AA7C52] text-sm font-medium no-underline hover:no-underline"
                >
                  {track.cta}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
