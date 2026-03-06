import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import { SUMMIT_META } from '../../data/shanghai-summit';
import { ArrowRight } from 'lucide-react';

const ctaPaths = [
  {
    title: 'Apply to Pitch',
    subtitle: 'Day 2',
    description: 'Showcase your startup to global investors and industry leaders.',
    href: '/shanghai-summit/pitch',
    accent: '#AA7C52',
  },
  {
    title: 'Apply for the Programme',
    subtitle: 'Day 3',
    description: 'Join the curated China programme for global women\'s health companies.',
    href: '/shanghai-summit/programme',
    accent: '#AA7C52',
  },
  {
    title: 'Apply to Speak',
    subtitle: 'Summit',
    description: 'Share your expertise and insights at the summit stage.',
    href: '/shanghai-summit/speak',
    accent: '#AA7C52',
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
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(170deg, #080808 0%, #0d0b09 50%, #0a0a0a 100%)' }}
    >
      {/* Grain overlay */}
      <div className="summit-grain absolute inset-0" />

      {/* Decorative geometric lines */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#AA7C52]/20 to-transparent"
        style={{
          transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          transformOrigin: 'center',
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          className="text-center mb-16 lg:mb-20"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white mb-4">
            Join the Summit
          </h2>
          <p className="text-white/40 text-base max-w-lg mx-auto leading-relaxed">
            Multiple ways to participate in shaping the future of women&apos;s health in China and beyond.
          </p>
        </div>

        {/* CTA cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06] mb-16">
          {ctaPaths.map((path, i) => (
            <Link
              key={path.title}
              to={path.href}
              className="group relative bg-[#0a0a0a] p-8 sm:p-10 no-underline hover:no-underline transition-all duration-500 hover:bg-[#0e0c0a]"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${200 + i * 120}ms`,
              }}
            >
              {/* Top accent line on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-px bg-[#AA7C52] transition-all duration-500"
                style={{
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                }}
              />
              <style>{`
                .group:hover > div:first-child { transform: scaleX(1) !important; }
              `}</style>

              <span className="text-white/20 text-[10px] tracking-[0.2em] uppercase block mb-6">
                {path.subtitle}
              </span>

              <h3 className="font-display text-xl sm:text-2xl text-white mb-3 group-hover:text-[#AA7C52] transition-colors duration-300">
                {path.title}
              </h3>

              <p className="text-white/40 text-sm leading-relaxed mb-8">
                {path.description}
              </p>

              <span className="inline-flex items-center gap-2 text-[#AA7C52] text-sm font-medium">
                Apply now
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        {/* Conference ticket CTA */}
        <div
          className="text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.7s ease 0.8s',
          }}
        >
          <a
            href={SUMMIT_META.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 bg-[#AA7C52] text-white px-10 py-4 text-sm font-medium overflow-hidden no-underline hover:no-underline transition-all duration-300 hover:shadow-[0_0_40px_rgba(170,124,82,0.3)]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative">Get Conference Tickets</span>
            <ArrowRight className="w-4 h-4 relative transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <p className="text-white/25 text-xs mt-4 tracking-wider">
            JUNE 22, 2026 &mdash; GLOBAL LEADERS SUMMIT
          </p>
        </div>
      </div>
    </div>
  );
}
