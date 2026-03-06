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

  return (
    <div
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden bg-background"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <AnimatedLine
            variant="label"
            label="GLOBAL NETWORK"
            className="mb-6"
          />

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground mb-6 max-w-4xl">
            FemTech Across Borders
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mb-14 leading-relaxed">
            FemTech Weekend is the China representative of FemTech Across Borders — a global
            network spanning 40+ countries, connecting women&apos;s health ecosystems worldwide.
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {ecosystemStats.map((stat) => (
            <div
              key={stat.label}
              className="group border border-border bg-card p-6 sm:p-8 transition-all duration-500 hover:border-[#AA7C52]/30 cursor-default"
            >
              <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#AA7C52] block mb-1 tracking-tight">
                {stat.value}
              </span>
              <span className="text-foreground text-sm block mb-0.5">{stat.label}</span>
              <span className="text-muted-foreground text-[10px] tracking-wider uppercase">{stat.detail}</span>
            </div>
          ))}
        </div>

        {/* Partner logos */}
        <div
          className="flex items-center gap-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          }}
        >
          <span className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase">Partners</span>
          <div className="h-px w-6 bg-border" />
          {SUMMIT_META.partnerLogos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="h-8 sm:h-10 opacity-40 hover:opacity-80 transition-opacity duration-300"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
