import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { StoryCardProps } from '../../types/stories';
import { translateDate } from '../../utils/translateDate';
import { ArrowUpRight } from 'lucide-react';

export function StoryCard({ story }: StoryCardProps): React.ReactNode {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative cursor-pointer bg-card border border-border transition-all duration-500 hover:border-primary/30 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Corner accents */}
      <div
        className="absolute top-3 left-3 w-4 h-px bg-primary transition-all duration-500"
        style={{ opacity: isHovered ? 1 : 0 }}
      />
      <div
        className="absolute top-3 left-3 w-px h-4 bg-primary transition-all duration-500"
        style={{ opacity: isHovered ? 1 : 0 }}
      />
      <div
        className="absolute bottom-3 right-3 w-4 h-px bg-primary transition-all duration-500"
        style={{ opacity: isHovered ? 1 : 0 }}
      />
      <div
        className="absolute bottom-3 right-3 w-px h-4 bg-primary transition-all duration-500"
        style={{ opacity: isHovered ? 1 : 0 }}
      />

      <Link to={story.link} className="block h-full no-underline">
        <div className="flex flex-col h-full">
          {/* Cover Image Section */}
          {story.image ? (
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <img
                src={story.image}
                alt={story.interviewee || story.title}
                className="w-full h-full object-cover transition-transform duration-500"
                style={{
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                }}
              />
              {/* Category overlay */}
              <div className="absolute top-4 left-4">
                <span className="mckinsey-label text-white bg-primary/80 backdrop-blur-sm px-3 py-1">
                  {story.category}
                </span>
              </div>
            </div>
          ) : (
            /* Fallback: Profile Section for stories without cover image */
            <div className="p-6 bg-gradient-to-br from-primary/5 to-transparent flex flex-col items-center justify-center text-center border-b border-border relative">
              {/* Small quote mark */}
              <div className="absolute top-3 right-3 opacity-10">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>

              {/* Profile avatar */}
              <div
                className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 flex items-center justify-center mb-4 transition-transform duration-500"
                style={{
                  transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                <span className="font-display text-xl text-primary/60">
                  {story.interviewee?.[0] || 'S'}
                </span>
              </div>

              {/* Interviewee name */}
              {story.interviewee && (
                <h4 className="font-display text-base font-normal text-foreground mb-1">
                  {story.interviewee}
                </h4>
              )}

              {/* Role */}
              {story.role && (
                <p className="text-primary text-xs line-clamp-2">
                  {story.role}
                </p>
              )}
            </div>
          )}

          {/* Content Section */}
          <div className="p-6 flex flex-col flex-1">
            {/* Category - only show if no cover image (already shown as overlay) */}
            {!story.image && (
              <div className="mb-3">
                <span className="mckinsey-label text-primary">
                  {story.category}
                </span>
              </div>
            )}

            {/* Title */}
            <h3
              className="font-display text-lg font-normal tracking-tight text-foreground mb-3 line-clamp-2 transition-all duration-500"
              style={{
                transform: isHovered ? 'translateX(2px)' : 'translateX(0)',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {story.title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
              {story.description}
            </p>

            {/* Metadata */}
            <div className="flex items-center mckinsey-label text-muted-foreground mb-3">
              <span>{story.author}</span>
              <span className="mx-2">—</span>
              <span>{translateDate(story.date)}</span>
            </div>

            {/* Read indicator */}
            <div className="flex items-center gap-1 text-primary mckinsey-label mt-auto">
              <span>{story.readTime}</span>
              <ArrowUpRight
                className="h-3 w-3 transition-transform duration-300"
                style={{
                  transform: isHovered ? 'translate(2px, -2px)' : 'translate(0, 0)'
                }}
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
