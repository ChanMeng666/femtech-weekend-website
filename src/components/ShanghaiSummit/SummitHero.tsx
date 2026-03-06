import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import { AnimatedLine } from '../ui/AnimatedLine';
import { SUMMIT_META, speakers } from '../../data/shanghai-summit';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';

export function SummitHero() {
  const [isVisible, setIsVisible] = useState(false);
  const featuredSpeakers = speakers.filter((s) => s.image);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Full-bleed Shanghai image background */}
      <img
        src="/img/shanghai/shanghai-bund.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Light overlay for text readability */}
      <div className="absolute inset-0 bg-white/75" />
      {/* Brand gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent" />

      {/* Content on top */}
      <div
        className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Label */}
        <AnimatedLine
          variant="label"
          label="SHANGHAI SUMMIT 2026"
          className="mb-8"
        />

        {/* Date + Location */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <span className="inline-flex items-center gap-2 text-[#AA7C52] text-sm tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            JUNE 22-25, 2026
          </span>
          <span className="h-3 w-px bg-border hidden sm:block" />
          <span className="inline-flex items-center gap-2 text-muted-foreground text-sm tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            SHANGHAI, CHINA
          </span>
        </div>

        {/* Main headline */}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[5rem] font-normal tracking-tight text-foreground mb-8 max-w-5xl leading-[1.05]">
          Cross-Border Capital{' '}
          <span className="text-[#AA7C52]">&amp;</span>{' '}
          Partnerships in{' '}
          <span className="relative inline-block">
            Women&apos;s Health
            <span className="absolute -bottom-2 left-0 w-full h-px bg-[#AA7C52]/40" />
          </span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-12 leading-relaxed font-body">
          20-30 global women&apos;s health companies converge in Shanghai Qiantan for a 4-day
          international summit of keynotes, pitch sessions, park visits, and market
          observation — bridging global innovation with China&apos;s vast healthcare ecosystem.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-0 mb-14">
          {SUMMIT_META.stats.map((stat, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="hidden sm:block h-10 w-px bg-border mx-5 lg:mx-8" />}
              <div className="group cursor-default">
                <span className="block text-[#AA7C52] font-display text-2xl sm:text-3xl tracking-tight">
                  {stat.label.en.split(' ')[0]}
                </span>
                <span className="block text-muted-foreground text-[10px] tracking-[0.2em] uppercase mt-0.5">
                  {stat.label.en.split(' ').slice(1).join(' ')}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Speaker headshots */}
        <div className="flex items-center mb-14">
          <div className="flex -space-x-3">
            {featuredSpeakers.slice(0, 6).map((speaker, i) => (
              <div
                key={speaker.id}
                className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white hover:border-[#AA7C52]/50 hover:z-10 hover:scale-110 transition-all duration-300"
                style={{ zIndex: featuredSpeakers.length - i }}
                title={speaker.name}
              >
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <span className="text-muted-foreground text-sm ml-4 tracking-wide">
            +{speakers.length - 6} speakers
          </span>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <a
            href={SUMMIT_META.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2.5 bg-[#AA7C52] text-white hover:text-white px-7 py-3.5 text-sm font-medium overflow-hidden no-underline hover:no-underline transition-all duration-300 hover:shadow-[0_0_24px_rgba(170,124,82,0.25)]"
          >
            <span className="relative">Get Tickets</span>
            <ArrowRight className="w-4 h-4 relative transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <Link
            to="/shanghai-summit/pitch"
            className="group inline-flex items-center gap-2.5 border border-[#AA7C52]/40 text-[#AA7C52] px-7 py-3.5 text-sm font-medium hover:bg-[#AA7C52]/5 hover:border-[#AA7C52]/70 transition-all duration-300 no-underline hover:no-underline"
          >
            Apply to Pitch
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/shanghai-summit/speak"
            className="group inline-flex items-center gap-2.5 border border-border text-muted-foreground px-7 py-3.5 text-sm font-medium hover:border-[#AA7C52]/30 hover:text-foreground transition-all duration-300 no-underline hover:no-underline"
          >
            Apply to Speak
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
