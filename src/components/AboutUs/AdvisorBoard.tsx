import React from 'react';
import { TeamMember, TeamMemberProps } from './TeamMember';
import { getAdvisorBoardTitle, getAdvisorBoardDescription } from '../../constants/about-us-components';

export function AdvisorBoard() {
  const title = getAdvisorBoardTitle();
  const description = getAdvisorBoardDescription();
  
  const advisors: TeamMemberProps[] = [
    {
      name: "Celina Chew",
      role: "Former President of Bayer Group Greater China",
      bio: "the former President of Bayer for Greater China. She spent most of her career with Bayer, both as Head of Legal in Greater China (1998-2011) and in management roles, such as Country Group Head for Bayer North ASEAN Region (2011-2014) and President of Bayer, Greater China (2014-2019) overseeing Bayer's operations in these regions. Celina has also been a Board member of various chambers of commerce, Enactus China and acts as advisor to organizations such as Ladies Who Tech. She is honoured to have been named in Forbes 100 Most Powerful Business Lists (2016 and 2017) and to receive the International Friendship Award from IESE in 2018.",
    },
    {
      name: "Sandy Lv",
      role: "Bayer Women's Health Department",
      bio: "Sandy is responsible for innovation and commercialization in early venture partnerships. One of Bayer Women's Health's key focus areas is to collaboratively build a women's health ecosystem with partners from government, industry, academia, research, and technology innovation companies. The goal is to dispel misconceptions, raise awareness of diseases, and provide high-quality, professional, and comprehensive healthcare services for women at all stages of life.",
    },
    {
      name: "Nicole Bu",
      role: "Healthcare Business Developer",
      bio: "An enthusiastic, self-driven healthcare industry business developer with 3.5 years of experience in provider sales, B2B healthcare partnerships, sales operations optimization, and client relationship management to consistently achieve and exceed OKRs.",
    }
  ];

  return (
    <div className="bg-background py-24 sm:py-32">
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
          {advisors.map((advisor, index) => (
            <TeamMember key={index} {...advisor} />
          ))}
        </div>
      </div>
    </div>
  );
} 