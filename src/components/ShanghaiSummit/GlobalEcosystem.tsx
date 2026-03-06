import React, { useEffect, useRef, useState } from 'react';
import { AnimatedLine } from '../ui/AnimatedLine';
import { SUMMIT_META } from '../../data/shanghai-summit';

const ecosystemStats = [
  { value: '40+', label: 'Countries', detail: 'Global reach' },
  { value: '500+', label: 'Startups', detail: 'In the network' },
  { value: '100K+', label: 'Impressions', detail: 'LinkedIn monthly' },
  { value: '200K+', label: 'Followers', detail: 'Community size' },
];

export function GlobalEcosystem() {
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

  const anim = (delay: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  return (
    <div
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(170deg, #080808 0%, #0c0a08 50%, #0a0a0a 100%)' }}
    >
      {/* Grain */}
      <div className="summit-grain absolute inset-0" />

      {/* Geometric accents */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#AA7C52]/15 to-transparent"
        style={{
          transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          transformOrigin: 'center',
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div style={anim(0)}>
          <AnimatedLine
            variant="label"
            label="GLOBAL NETWORK"
            className="mb-6 [&_span]:text-white/80 [&_div]:bg-[#AA7C52]"
          />
        </div>

        <h2
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white mb-6 max-w-4xl"
          style={anim(100)}
        >
          FemTech Across Borders
        </h2>

        <p
          className="text-white/50 text-base sm:text-lg max-w-2xl mb-14 leading-relaxed"
          style={anim(200)}
        >
          FemTech Weekend is the China representative of FemTech Across Borders — a global
          network spanning 40+ countries, connecting women&apos;s health ecosystems worldwide.
        </p>

        {/* Stats — dramatic cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] mb-14">
          {ecosystemStats.map((stat, i) => (
            <div
              key={stat.label}
              className="group bg-[#0a0a0a] p-6 sm:p-8 transition-all duration-500 hover:bg-[#0e0c0a] cursor-default"
              style={{
                animation: isVisible
                  ? `summit-count-reveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${350 + i * 100}ms both`
                  : 'none',
              }}
            >
              <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#AA7C52] block mb-1 tracking-tight group-hover:text-white transition-colors duration-300">
                {stat.value}
              </span>
              <span className="text-white/70 text-sm block mb-0.5">{stat.label}</span>
              <span className="text-white/25 text-[10px] tracking-wider uppercase">{stat.detail}</span>
            </div>
          ))}
        </div>

        {/* Partner logos */}
        <div className="flex items-center gap-8" style={anim(600)}>
          <span className="text-white/20 text-[10px] tracking-[0.2em] uppercase">Partners</span>
          <div className="h-px w-6 bg-white/10" />
          {SUMMIT_META.partnerLogos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="h-8 sm:h-10 opacity-40 hover:opacity-80 transition-opacity duration-300 brightness-0 invert"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
