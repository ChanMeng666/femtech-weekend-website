import React, { useEffect, useRef, useState } from 'react';
import { AnimatedLine } from '../ui/AnimatedLine';

interface BenefitCard {
  title: string;
  description: string;
}

const benefitCards: BenefitCard[] = [
  {
    title: 'Breadth of Opportunity',
    description:
      'From fertility to healthy ageing, China\'s women\'s health market spans the full lifecycle — with growing demand, rising investment, and policy tailwinds accelerating every segment.',
  },
  {
    title: 'Execution at Speed',
    description:
      'China\'s innovation ecosystem moves quickly — from pilot to scale, from concept to commercialisation. This programme gives you a front-row seat to how it works.',
  },
  {
    title: 'Partnership Potential',
    description:
      'Connect with the investors, corporates, hospitals, and distribution partners who are actively building the next chapter of women\'s health in China.',
  },
  {
    title: 'Global Takeaways',
    description:
      'Gain lessons, models, and relationships that strengthen your business — whether you\'re entering the China market or applying its pace and scale elsewhere.',
  },
];

export function WhyThisMatters() {
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
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-background py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div
          className="mb-16 lg:mb-20 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <AnimatedLine variant="label" label="WHY CHINA, WHY NOW" />
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground mt-6 max-w-4xl">
            The Opportunity Is No Longer One to Watch from a Distance
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mt-6 leading-relaxed">
            China&apos;s women&apos;s health opportunity is no longer one to watch from a distance.
            The market is moving — fast. Policy support is growing, capital is flowing, and
            the ecosystem is ready for global collaboration. This programme puts you at the centre of it.
          </p>
        </div>

        {/* 2x2 grid of benefit cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefitCards.map((card, i) => (
            <div
              key={card.title}
              className="group border border-border bg-card p-8 sm:p-10 transition-all duration-500 hover:border-[#AA7C52]/30 relative"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 100}ms`,
              }}
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-8 h-8">
                <div className="absolute top-0 right-0 w-full h-px bg-[#AA7C52]/30 transition-all duration-500 group-hover:w-12" />
                <div className="absolute top-0 right-0 h-full w-px bg-[#AA7C52]/30 transition-all duration-500 group-hover:h-12" />
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-muted-foreground/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="h-px w-6 bg-[#AA7C52]/40" />
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-normal tracking-tight text-foreground mb-4 leading-tight group-hover:text-[#AA7C52] transition-colors duration-300">
                {card.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
