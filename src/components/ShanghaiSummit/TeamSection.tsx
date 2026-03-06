import React, { useEffect, useRef, useState } from 'react';
import { AnimatedLine } from '../ui/AnimatedLine';
import { teamMembers } from '../../data/team-members';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export function TeamSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const locale = currentLocale === 'zh-Hans' ? 'zh' : 'en';

  const founders = teamMembers.slice(0, 4);

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
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(170deg, #0a0a0a 0%, #0c0a08 50%, #080808 100%)' }}
    >
      <div className="summit-grain absolute inset-0" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div
          className="mb-16 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <AnimatedLine
            variant="label"
            label="THE TEAM"
            className="[&_span]:text-white/80 [&_div]:bg-[#AA7C52]"
          />
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white mt-6">
            FemTech Weekend
          </h2>
          <p className="text-white/45 text-base max-w-2xl mt-4 leading-relaxed">
            Founded in September 2024, our team brings together professionals from
            finance, banking, and consulting, with members across Europe and China.
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04]"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}
        >
          {founders.map((member, i) => (
            <div
              key={member.id}
              className="group bg-[#0a0a0a] p-6 sm:p-8 transition-all duration-500 hover:bg-[#0e0c0a]"
              style={{
                animation: isVisible
                  ? `summit-count-reveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${300 + i * 100}ms both`
                  : 'none',
              }}
            >
              {/* Photo with clipped shape */}
              <div
                className="mb-5 w-24 h-24 sm:w-28 sm:h-28 overflow-hidden bg-gradient-to-br from-[#AA7C52]/15 to-transparent"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)',
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <h4 className="font-display text-lg text-white group-hover:text-[#AA7C52] transition-colors duration-300">
                {member.name}
              </h4>
              <p className="text-[#AA7C52]/70 text-sm mt-1">{member.role[locale]}</p>
              <p className="text-white/30 text-xs mt-3 leading-relaxed line-clamp-3">
                {member.bio[locale]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
