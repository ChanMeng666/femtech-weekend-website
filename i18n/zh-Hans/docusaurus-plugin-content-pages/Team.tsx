import React, { useState } from 'react';
import { TeamMember } from '../../../src/components/AboutUs/TeamMember';
import { TeamMemberModal } from '../../../src/components/AboutUs/TeamMemberModal';
import { teamMembers } from '../../../src/data/team-members';
import type { TeamMemberData } from '../../../src/data/team-members';
import { getTeamMeetOurTeamTitle, getTeamDescription } from '../../../src/constants/about-us-components';

export function Team() {
  const [selectedMember, setSelectedMember] = useState<TeamMemberData | null>(null);

  const title = getTeamMeetOurTeamTitle();
  const description = getTeamDescription();

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
          {teamMembers.map((member) => (
            <TeamMember key={member.id} member={member} onClick={setSelectedMember} />
          ))}
        </div>
      </div>

      <TeamMemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
    </div>
  );
}
