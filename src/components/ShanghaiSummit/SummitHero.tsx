import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import { AnimatedLine } from '../ui/AnimatedLine';
import { SUMMIT_META, speakers } from '../../data/shanghai-summit';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';

export function SummitHero() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuredSpeakers = speakers.filter((s) => s.image);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const anim = (delay: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
    transition: `all 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #080808 0%, #0d0b09 40%, #0a0a0a 100%)' }}
    >
      {/* Atmospheric grain */}
      <div className="summit-grain absolute inset-0" />

      {/* Geometric accent lines */}
      <div
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#AA7C52]/30 to-transparent"
        style={{
          transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
          transformOrigin: 'center',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#AA7C52]/20 to-transparent"
        style={{
          transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.8s',
          transformOrigin: 'center',
        }}
      />

      {/* Side accent — vertical gold line */}
      <div
        className="absolute left-6 lg:left-12 top-1/4 bottom-1/4 w-px"
        style={{
          background: 'linear-gradient(to bottom, transparent, #AA7C52, transparent)',
          opacity: isVisible ? 0.2 : 0,
          transition: 'opacity 1.2s ease 0.6s',
        }}
      />

      {/* Large decorative number watermark */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 font-display text-[20rem] lg:text-[28rem] font-normal leading-none select-none pointer-events-none"
        style={{
          color: 'rgba(170, 124, 82, 0.03)',
          ...anim(300),
        }}
      >
        26
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 py-32 sm:py-40">
        {/* Label */}
        <div style={anim(0)}>
          <AnimatedLine
            variant="label"
            label="SHANGHAI SUMMIT 2026"
            className="mb-8 [&_span]:text-white/80 [&_div]:bg-[#AA7C52]"
          />
        </div>

        {/* Date + Location pills */}
        <div className="flex flex-wrap items-center gap-4 mb-8" style={anim(100)}>
          <span className="inline-flex items-center gap-2 text-[#AA7C52] text-sm tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            JUNE 22-25, 2026
          </span>
          <span className="h-3 w-px bg-white/20 hidden sm:block" />
          <span className="inline-flex items-center gap-2 text-white/60 text-sm tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            SHANGHAI, CHINA
          </span>
        </div>

        {/* Main headline — dramatically sized */}
        <h1
          className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[5rem] font-normal tracking-tight text-white mb-8 max-w-5xl leading-[1.05]"
          style={anim(200)}
        >
          Cross-Border Capital{' '}
          <span className="text-[#AA7C52]">&amp;</span>{' '}
          Partnerships in{' '}
          <span className="relative inline-block">
            Women&apos;s Health
            <span
              className="absolute -bottom-2 left-0 h-px bg-[#AA7C52]/40"
              style={{
                width: isVisible ? '100%' : '0%',
                transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.8s',
              }}
            />
          </span>
        </h1>

        {/* Description */}
        <p
          className="text-base sm:text-lg text-white/55 max-w-2xl mb-12 leading-relaxed font-body"
          style={anim(350)}
        >
          20-30 global women&apos;s health companies converge in Shanghai Qiantan for a 4-day
          international summit of keynotes, pitch sessions, park visits, and market
          observation — bridging global innovation with China&apos;s vast healthcare ecosystem.
        </p>

        {/* Stats — cinematic reveal */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-0 mb-14" style={anim(450)}>
          {SUMMIT_META.stats.map((stat, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="hidden sm:block h-10 w-px bg-white/10 mx-5 lg:mx-8" />}
              <div
                className="group cursor-default"
                style={{
                  animation: isVisible ? `summit-count-reveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${600 + i * 120}ms both` : 'none',
                }}
              >
                <span className="block text-[#AA7C52] font-display text-2xl sm:text-3xl tracking-tight group-hover:text-white transition-colors duration-300">
                  {stat.label.en.split(' ')[0]}
                </span>
                <span className="block text-white/40 text-[10px] tracking-[0.2em] uppercase mt-0.5">
                  {stat.label.en.split(' ').slice(1).join(' ')}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Speaker headshots — overlapping stack */}
        <div className="flex items-center mb-14" style={anim(700)}>
          <div className="flex -space-x-3">
            {featuredSpeakers.slice(0, 6).map((speaker, i) => (
              <div
                key={speaker.id}
                className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#0a0a0a] hover:border-[#AA7C52]/50 hover:z-10 hover:scale-110 transition-all duration-300"
                style={{
                  zIndex: featuredSpeakers.length - i,
                  animation: isVisible ? `summit-count-reveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${800 + i * 80}ms both` : 'none',
                }}
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
          <span className="text-white/40 text-sm ml-4 tracking-wide">
            +{speakers.length - 6} speakers
          </span>
        </div>

        {/* CTAs — elevated button design */}
        <div className="flex flex-wrap gap-4" style={anim(900)}>
          <a
            href={SUMMIT_META.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2.5 bg-[#AA7C52] text-white px-7 py-3.5 text-sm font-medium overflow-hidden no-underline hover:no-underline transition-all duration-300 hover:shadow-[0_0_30px_rgba(170,124,82,0.3)]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
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
            className="group inline-flex items-center gap-2.5 border border-white/15 text-white/70 px-7 py-3.5 text-sm font-medium hover:border-white/30 hover:text-white hover:bg-white/[0.02] transition-all duration-300 no-underline hover:no-underline"
          >
            Apply to Speak
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={anim(1100)}
      >
        <span className="text-white/25 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/25 to-transparent" />
      </div>
    </div>
  );
}
