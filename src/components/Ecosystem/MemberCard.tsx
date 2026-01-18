import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { EcosystemMember } from '../../types/ecosystem';

interface MemberCardProps {
  member: EcosystemMember;
}

export function MemberCard({ member }: MemberCardProps) {
  return (
    <Card className="MemberCard h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 h-20 w-20 bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
          {member.image ? (
            <img 
              src={member.image} 
              alt={member.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="text-lg font-bold text-primary">
              {member.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
        </div>
        <CardTitle className="text-lg leading-tight">{member.name}</CardTitle>
        <p className="text-primary font-medium text-sm">{member.role}</p>
        {member.company && (
          <p className="text-muted-foreground text-sm">{member.company}</p>
        )}
        {member.location && (
          <p className="text-xs text-muted-foreground">📍 {member.location}</p>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{member.bio}</p>
        
        {member.expertise && (
          <div className="expertise mb-3">
            <div className="flex flex-wrap gap-1">
              {member.expertise.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="inline-block bg-primary/10 px-2 py-1 text-xs text-primary font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {member.achievements && (
          <div className="achievements text-xs text-muted-foreground bg-muted/50 p-2 rounded">
            <strong>Notable:</strong> {member.achievements}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 