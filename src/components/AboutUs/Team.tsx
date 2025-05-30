import React from 'react';
import { TeamMember, TeamMemberProps } from './TeamMember';
import { getTeamMeetOurTeamTitle, getTeamDescription } from '../../constants/about-us-components';

export function Team() {
  const title = getTeamMeetOurTeamTitle();
  const description = getTeamDescription();
  
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

  return (
    <div className="bg-muted/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
} 