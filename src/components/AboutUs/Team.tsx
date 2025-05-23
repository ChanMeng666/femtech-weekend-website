import React from 'react';
import { TeamMember, TeamMemberProps } from './TeamMember';

export function Team() {
  const teamMembers: TeamMemberProps[] = [
    {
      name: "Dr. Sarah Chen",
      role: "Founder & CEO",
      bio: "Healthcare entrepreneur with 15+ years of experience in women's health innovation and investment.",
    },
    {
      name: "Michael Zhang",
      role: "Co-founder & CTO",
      bio: "Tech veteran specializing in healthcare platforms and digital health solutions for emerging markets.",
    },
    {
      name: "Dr. Li Wei",
      role: "Medical Director",
      bio: "Renowned gynecologist and researcher focused on personalized women's healthcare technologies.",
    },
    {
      name: "Emma Johnson",
      role: "Global Partnerships Lead",
      bio: "International business development expert connecting Asian and Western healthcare ecosystems.",
    }
  ];

  return (
    <div className="bg-muted/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Meet Our Team
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Passionate leaders driving innovation in women's health across the globe.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
} 