import React, { useEffect, useRef, useState } from 'react';
import { AnimatedLine } from './ui/AnimatedLine';
import { translate } from '@docusaurus/Translate';

export const PartnershipSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const title = translate({
    id: 'homepage.partnership.title',
    message: 'Our Partners'
  });

  const subtitle = translate({
    id: 'homepage.partnership.subtitle',
    message: 'Collaborating with leading organizations to advance women\'s health technology'
  });

  const partners = [
    {
      name: 'C2C',
      logo: '/img/partnership-logo/c2c-logo.svg',
    },
    {
      name: 'She Rewires',
      logo: '/img/partnership-logo/she-rewires-logo.svg',
    },
    {
      name: 'Yue Ji Yi Mu',
      logo: '/img/partnership-logo/yue-ji-yi-mu-logo.svg',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative bg-background py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Top divider line */}
        <div
          className="mb-12 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="h-px bg-border w-full" />
        </div>

        {/* Section Header */}
        <div className="text-center mb-12">
          <div
            className="flex justify-center mb-4 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <AnimatedLine variant="label" label={title} />
          </div>

          <p
            className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '100ms',
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Partners Grid */}
        <div
          className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 lg:gap-16 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '200ms',
          }}
        >
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className="group relative flex items-center justify-center"
              style={{
                transitionDelay: `${200 + idx * 100}ms`,
              }}
            >
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="h-12 sm:h-14 lg:h-16 w-auto object-contain grayscale-hover transition-all duration-500"
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </div>
          ))}
        </div>

        {/* Bottom divider line */}
        <div
          className="mt-12 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '400ms',
          }}
        >
          <div className="h-px bg-border w-full" />
        </div>
      </div>
    </div>
  );
};
