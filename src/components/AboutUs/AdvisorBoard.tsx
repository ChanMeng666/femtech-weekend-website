import React, { useEffect, useRef, useState } from 'react';
import { TeamMember } from './TeamMember';
import { TeamMemberModal } from './TeamMemberModal';
import { advisors } from '../../data/team-members';
import type { TeamMemberData } from '../../data/team-members';
import { getAdvisorBoardTitle, getAdvisorBoardDescription } from '../../constants/about-us-components';
import { AnimatedLine } from '../ui/AnimatedLine';
import { translate } from '@docusaurus/Translate';

export function AdvisorBoard() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMemberData | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const title = getAdvisorBoardTitle();
  const description = getAdvisorBoardDescription();

  const sectionLabel = translate({
    id: 'aboutUs.advisors.label',
    message: 'Advisory Board',
  });

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <div
            className="mb-6 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <AnimatedLine variant="label" label={sectionLabel} />
          </div>

          <h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '100ms',
            }}
          >
            {title}
          </h2>

          <p
            className="mt-4 max-w-2xl text-lg text-muted-foreground transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '200ms',
            }}
          >
            {description}
          </p>
        </div>

        {/* Advisors Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {advisors.map((advisor, index) => (
            <div
              key={advisor.id}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transitionProperty: 'opacity, transform',
                transitionDuration: '700ms',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: `${300 + index * 100}ms`,
              }}
            >
              <TeamMember member={advisor} onClick={setSelectedMember} />
            </div>
          ))}
        </div>
      </div>

      <TeamMemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
    </div>
  );
}
