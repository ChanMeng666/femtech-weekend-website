import React, { useState } from 'react';

export interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image?: string;
  linkedin?: string;
}

export function TeamMember({ name, role, bio, image, linkedin }: TeamMemberProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Generate a placeholder image URL based on the name
  const getPlaceholderImage = (name: string) => {
    const seed = name.replace(/\s+/g, '').toLowerCase();
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=f3f4f6`;
  };

  return (
    <div
      className="group relative border border-border bg-card p-6 transition-all duration-500 hover:border-primary/50 hover:shadow-lg h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
          src={image || getPlaceholderImage(name)}
          alt={name}
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
      <h4 className="font-display text-xl text-center text-foreground">{name}</h4>

      {/* Role */}
      <p className="text-primary text-center mt-1 text-sm">{role}</p>

      {/* Bio - full content displayed */}
      <p className="text-muted-foreground text-sm leading-relaxed mt-4 flex-1">{bio}</p>

      {/* LinkedIn link */}
      {linkedin && (
        <div className="mt-4 pt-4 border-t border-border">
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors text-sm"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span>LinkedIn</span>
          </a>
        </div>
      )}
    </div>
  );
}
