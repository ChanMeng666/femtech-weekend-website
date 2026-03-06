import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import { AnimatedLine } from './ui/AnimatedLine';
import { getBannerLabel, getBannerHeadline, getBannerDescription } from '../constants/shanghai-summit';
import { speakers, SUMMIT_META } from '../data/shanghai-summit';
import { ArrowRight } from 'lucide-react';

export function ShanghaiSummitBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const label = getBannerLabel();
  const headline = getBannerHeadline();
  const description = getBannerDescription();

  const featuredSpeakers = speakers.filter((s) => s.image);

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

  const animStyle = (delay: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: `${delay}ms`,
  });

  return (
    <div
      ref={sectionRef}
      className="relative bg-[#0a0a0a] py-20 sm:py-28 lg:py-32 overflow-hidden"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Label */}
        <div
          className="mb-6 transition-all duration-700"
          style={animStyle(0)}
        >
          <AnimatedLine
            variant="label"
            label={label}
            className="[&_span]:text-white [&_div]:bg-white"
          />
        </div>

        {/* Date / Location */}
        <p
          className="mckinsey-label text-[#AA7C52] mb-4 transition-all duration-700"
          style={animStyle(100)}
        >
          JUNE 22-25, 2026 | SHANGHAI, CHINA
        </p>

        {/* Headline */}
        <h2
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white mb-6 max-w-4xl transition-all duration-700"
          style={animStyle(200)}
        >
          {headline}
        </h2>

        {/* Description */}
        <p
          className="max-w-2xl text-lg leading-relaxed text-white/70 mb-10 transition-all duration-700"
          style={animStyle(300)}
        >
          {description}
        </p>

        {/* Stats row */}
        <div
          className="flex flex-wrap items-center gap-4 sm:gap-0 mb-12 transition-all duration-700"
          style={animStyle(400)}
        >
          {SUMMIT_META.stats.map((stat, i) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <div className="hidden sm:block h-8 w-px bg-white/20 mx-6" />
              )}
              <span className="mckinsey-label text-white/90 text-sm">
                {stat.label.en}
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* Speaker headshots */}
        <div
          className="flex flex-wrap items-center gap-6 sm:gap-8 mb-10 transition-all duration-700"
          style={animStyle(500)}
        >
          {featuredSpeakers.map((speaker) => (
            <div key={speaker.id} className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white/20">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className="text-white/80 text-xs text-center whitespace-nowrap">
                {speaker.name}
              </span>
            </div>
          ))}
        </div>

        {/* Partner logos */}
        <div
          className="flex items-center gap-8 mb-12 transition-all duration-700"
          style={animStyle(600)}
        >
          {SUMMIT_META.partnerLogos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="h-8 sm:h-10 opacity-60 hover:opacity-100 transition-opacity brightness-0 invert"
              loading="lazy"
            />
          ))}
        </div>

        {/* CTA buttons */}
        <div
          className="flex flex-wrap gap-4 transition-all duration-700"
          style={animStyle(700)}
        >
          <Link
            to="/shanghai-summit/pitch"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 text-sm font-medium hover:bg-white/90 transition-colors no-underline hover:no-underline"
          >
            Apply to Pitch
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/shanghai-summit"
            className="inline-flex items-center gap-2 border border-white/40 text-white px-6 py-3 text-sm font-medium hover:border-white/70 hover:bg-white/5 transition-colors no-underline hover:no-underline"
          >
            View Full Programme
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
