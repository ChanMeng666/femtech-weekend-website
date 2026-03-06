import React, { useEffect, useRef, useState } from 'react';
import { AnimatedLine } from '../ui/AnimatedLine';
import { teamMembers } from '../../data/team-members';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export function TeamSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const locale = currentLocale === 'zh-Hans' ? 'zh' : 'en';

  // Show first 4 team members (co-founders)
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
    <div ref={sectionRef} className="relative bg-[#0a0a0a] py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
            className="[&_span]:text-white [&_div]:bg-white"
          />
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white mt-6">
            FemTech Weekend
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mt-4 leading-relaxed">
            Founded in September 2024, our team brings together professionals from finance, banking,
            and consulting, with members across Europe and China — combining global vision with
            local insight.
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '200ms',
          }}
        >
          {founders.map((member) => (
            <div key={member.id} className="text-center">
              <div className="mx-auto mb-4 h-28 w-28 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/40">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <h4 className="font-display text-lg text-white">{member.name}</h4>
              <p className="text-[#AA7C52] text-sm mt-1">{member.role[locale]}</p>
              <p className="text-white/50 text-xs mt-2 leading-relaxed line-clamp-3">
                {member.bio[locale]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
