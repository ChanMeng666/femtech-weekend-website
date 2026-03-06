import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import { AnimatedLine } from './ui/AnimatedLine';
import { getBannerLabel, getBannerHeadline, getBannerDescription } from '../constants/shanghai-summit';
import { speakers, SUMMIT_META } from '../data/shanghai-summit';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';

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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const anim = (delay: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  return (
    <div
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #080808 0%, #0d0b09 40%, #0a0a0a 100%)' }}
    >
      {/* Grain */}
      <div className="summit-grain absolute inset-0" />

      {/* Geometric accents */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#AA7C52]/20 to-transparent"
        style={{
          transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          transformOrigin: 'center',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#AA7C52]/10 to-transparent"
        style={{
          transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
          transformOrigin: 'center',
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Label */}
        <div style={anim(0)}>
          <AnimatedLine
            variant="label"
            label={label}
            className="mb-6 [&_span]:text-white/80 [&_div]:bg-[#AA7C52]"
          />
        </div>

        {/* Date + Location */}
        <div className="flex flex-wrap items-center gap-4 mb-5" style={anim(100)}>
          <span className="inline-flex items-center gap-2 text-[#AA7C52] text-sm tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            JUNE 22-25, 2026
          </span>
          <span className="h-3 w-px bg-white/15 hidden sm:block" />
          <span className="inline-flex items-center gap-2 text-white/50 text-sm tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            SHANGHAI, CHINA
          </span>
        </div>

        {/* Headline */}
        <h2
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white mb-6 max-w-4xl leading-[1.1]"
          style={anim(200)}
        >
          {headline}
        </h2>

        {/* Description */}
        <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-white/50 mb-10" style={anim(300)}>
          {description}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-0 mb-12" style={anim(400)}>
          {SUMMIT_META.stats.map((stat, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="hidden sm:block h-8 w-px bg-white/10 mx-5 lg:mx-7" />}
              <div
                className="cursor-default"
                style={{
                  animation: isVisible ? `summit-count-reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${500 + i * 100}ms both` : 'none',
                }}
              >
                <span className="mckinsey-label text-white/80 text-sm">{stat.label.en}</span>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Speaker headshots — overlapping */}
        <div className="flex items-center mb-10" style={anim(600)}>
          <div className="flex -space-x-3">
            {featuredSpeakers.map((speaker, i) => (
              <div
                key={speaker.id}
                className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#0a0a0a] hover:border-[#AA7C52]/40 hover:z-10 hover:scale-110 transition-all duration-300"
                style={{
                  zIndex: featuredSpeakers.length - i,
                  animation: isVisible ? `summit-count-reveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${700 + i * 60}ms both` : 'none',
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
          <span className="text-white/30 text-sm ml-4">+{speakers.length - featuredSpeakers.length} more</span>
        </div>

        {/* Partner logos */}
        <div className="flex items-center gap-6 mb-12" style={anim(750)}>
          {SUMMIT_META.partnerLogos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="h-7 sm:h-9 opacity-35 hover:opacity-70 transition-opacity duration-300 brightness-0 invert"
              loading="lazy"
            />
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4" style={anim(850)}>
          <Link
            to="/shanghai-summit/pitch"
            className="group relative inline-flex items-center gap-2.5 bg-white text-black px-7 py-3.5 text-sm font-medium overflow-hidden no-underline hover:no-underline transition-all duration-300"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#AA7C52]/0 via-[#AA7C52]/10 to-[#AA7C52]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative">Apply to Pitch</span>
            <ArrowRight className="w-4 h-4 relative transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/shanghai-summit"
            className="group inline-flex items-center gap-2.5 border border-white/20 text-white/80 px-7 py-3.5 text-sm font-medium hover:border-white/40 hover:text-white hover:bg-white/[0.02] transition-all duration-300 no-underline hover:no-underline"
          >
            View Full Programme
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
