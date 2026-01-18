import React, { useEffect, useRef, useState } from 'react';
import { TeamMember, TeamMemberProps } from './TeamMember';
import { getTeamMeetOurTeamTitle, getTeamDescription } from '../../constants/about-us-components';
import { AnimatedLine } from '../ui/AnimatedLine';
import { translate } from '@docusaurus/Translate';

export function Team() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const title = getTeamMeetOurTeamTitle();
  const description = getTeamDescription();

  const sectionLabel = translate({
    id: 'aboutUs.team.label',
    message: 'Our Team',
  });

  const teamMembers: TeamMemberProps[] = [
    {
      name: "Zhu Yihan",
      role: "Founder & CEO",
      bio: "Data, Balance Sheet Management and a global citizen with expertise in driving women's health innovation across borders.",
      image: "/img/team/zhu-yihan.jpg",
    },
    {
      name: "Michelle Li",
      role: "Head of Partnerships",
      bio: "Expert in Private Equity investment and Due Diligence, specializing in connecting FemTech startups with strategic investors.",
      image: "/img/team/michelle-li.jpg",
    },
    {
      name: "Leaf He",
      role: "Chief Operating Officer",
      bio: "Expert in Financial Advisory and community building, focused on creating sustainable ecosystem growth and operational excellence.",
      image: "/img/team/leaf-he.jpg",
    },
    {
      name: "Joji Lee",
      role: "Chief Marketing Officer",
      bio: "Specializes in PR, consumer marketing and events organisation, driving global awareness for women's health innovation.",
      image: "/img/team/joji-lee.jpg",
    },
    {
      name: "Lingxi Zhang",
      role: "Chief Design Officer",
      bio: "Specializes in Animation, Video editing and story telling, creating compelling narratives for the FemTech community.",
      image: "/img/team/lingxi-zhang.jpg",
    },
    {
      name: "Chan Meng",
      role: "Chief Technology Officer",
      bio: "Senior AI/ML Infrastructure Engineer with expertise in architecting robust technical foundations that power AI-driven health insights. Passionate about increasing representation in STEM fields and creating inclusive AI systems for diverse populations in women's health.",
      image: "/img/team/chan-meng.jpg",
    }
  ];

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
    <div ref={sectionRef} className="bg-muted/30 py-20 lg:py-28">
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

        {/* Team Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transitionProperty: 'opacity, transform',
                transitionDuration: '700ms',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: `${300 + index * 100}ms`,
              }}
            >
              <TeamMember {...member} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
