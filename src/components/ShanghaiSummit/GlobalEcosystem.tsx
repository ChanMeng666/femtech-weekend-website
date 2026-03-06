import React, { useEffect, useRef, useState } from 'react';
import { AnimatedLine } from '../ui/AnimatedLine';
import { SUMMIT_META } from '../../data/shanghai-summit';

const ecosystemStats = [
  { value: '40+', label: 'Countries' },
  { value: '500+', label: 'Startups' },
  { value: '100K+', label: 'LinkedIn Impressions' },
  { value: '200K+', label: 'LinkedIn Followers' },
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

  const animStyle = (delay: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' as const,
    transitionDelay: `${delay}ms`,
  });

  return (
    <div ref={sectionRef} className="relative bg-[#0a0a0a] py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="transition-all duration-700" style={animStyle(0)}>
          <AnimatedLine
            variant="label"
            label="GLOBAL NETWORK"
            className="mb-6 [&_span]:text-white [&_div]:bg-white"
          />
        </div>

        <h2
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white mb-6 max-w-4xl transition-all duration-700"
          style={animStyle(100)}
        >
          FemTech Across Borders
        </h2>

        <p
          className="text-white/70 text-lg max-w-2xl mb-12 leading-relaxed transition-all duration-700"
          style={animStyle(200)}
        >
          FemTech Weekend is the China representative of FemTech Across Borders — a global network
          spanning 40+ countries. We connect China's women's health ecosystem with the world,
          accelerating innovation through cross-border collaboration.
        </p>

        {/* Stats grid */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12 transition-all duration-700"
          style={animStyle(300)}
        >
          {ecosystemStats.map((stat) => (
            <div key={stat.label} className="border border-white/10 p-6">
              <span className="font-display text-3xl sm:text-4xl text-[#AA7C52] block mb-2">
                {stat.value}
              </span>
              <span className="text-white/60 text-sm">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Partner logos */}
        <div
          className="flex items-center gap-8 transition-all duration-700"
          style={animStyle(400)}
        >
          {SUMMIT_META.partnerLogos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="h-10 sm:h-12 opacity-60 hover:opacity-100 transition-opacity brightness-0 invert"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
