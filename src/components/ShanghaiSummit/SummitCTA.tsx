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
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-background"
    >
      {/* Shanghai conference image as subtle background */}
      <img
        src="/img/shanghai/shanghai-conference.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-[0.04]"
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
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground mb-4">
            Join the Summit
          </h2>
          <p className="text-muted-foreground text-base max-w-lg mx-auto leading-relaxed">
            Multiple ways to participate in shaping the future of women&apos;s health in China and beyond.
          </p>
        </div>

        {/* CTA cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {ctaPaths.map((path) => (
            <Link
              key={path.title}
              to={path.href}
              className="group relative border border-border bg-card p-8 sm:p-10 no-underline hover:no-underline transition-all duration-500 hover:border-[#AA7C52]/30 border-t-2 border-t-transparent hover:border-t-[#AA7C52]"
            >
              <span className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase block mb-6">
                {path.subtitle}
              </span>

              <h3 className="font-display text-xl sm:text-2xl text-foreground mb-3 group-hover:text-[#AA7C52] transition-colors duration-300">
                {path.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
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
            transition: 'opacity 0.7s ease 0.3s',
          }}
        >
          <a
            href={SUMMIT_META.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 bg-[#AA7C52] text-white hover:text-white px-10 py-4 text-sm font-medium overflow-hidden no-underline hover:no-underline transition-all duration-300 hover:shadow-[0_0_24px_rgba(170,124,82,0.25)]"
          >
            <span className="relative">Get Conference Tickets</span>
            <ArrowRight className="w-4 h-4 relative transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <p className="text-muted-foreground text-xs mt-4 tracking-wider">
            JUNE 22, 2026 &mdash; GLOBAL LEADERS SUMMIT
          </p>
        </div>
      </div>
    </div>
  );
}
