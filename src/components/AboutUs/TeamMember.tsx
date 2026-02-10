import React, { useState } from 'react';
import type { TeamMemberData } from '../../data/team-members';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export interface TeamMemberCardProps {
  member: TeamMemberData;
  onClick: (member: TeamMemberData) => void;
}

export function TeamMember({ member, onClick }: TeamMemberCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { i18n: { currentLocale } } = useDocusaurusContext();

  const locale = currentLocale === 'zh-Hans' ? 'zh' : 'en';
  const role = member.role[locale];

  // Generate a placeholder image URL based on the name
  const getPlaceholderImage = (name: string) => {
    const seed = name.replace(/\s+/g, '').toLowerCase();
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=f3f4f6`;
  };

  return (
    <div
      className="group relative border border-border bg-card p-6 transition-all duration-500 hover:border-primary/50 hover:shadow-lg h-full flex flex-col cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(member)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(member);
        }
      }}
    >
      {/* Corner accents */}
      <div
        className="absolute right-4 bottom-4 h-6 w-px bg-primary/70 transition-all duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'bottom',
        }}
      />
      <div
        className="absolute right-4 bottom-4 h-px w-6 bg-primary/70 transition-all duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'right',
        }}
      />

      {/* Photo - square with hover frame */}
      <div className="relative mx-auto mb-6 h-32 w-32 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/40 flex-shrink-0">
        <img
          src={member.image || getPlaceholderImage(member.name)}
          alt={member.name}
          className="h-full w-full object-cover transition-transform duration-500"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        {/* Frame overlay on hover */}
        <div
          className="absolute inset-2 border border-white/50 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
          }}
        />
      </div>

      {/* Name - serif */}
      <h4 className="font-display text-xl text-center text-foreground">{member.name}</h4>

      {/* Role */}
      <p className="text-primary text-center mt-1 text-sm">{role}</p>
    </div>
  );
}
