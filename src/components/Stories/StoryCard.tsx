import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { StoryCardProps } from '../../types/stories';
import { ArrowUpRight } from 'lucide-react';

interface StoryCardTagProps {
  tag: string;
  onClick: (tag: string) => void;
}

const StoryCardTag = ({ tag, onClick }: StoryCardTagProps) => (
  <span
    className="mckinsey-label inline-block bg-muted px-2 py-1 text-muted-foreground cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
    onClick={(e) => {
      e.preventDefault();
      onClick(tag);
    }}
  >
    {tag}
  </span>
);

export function StoryCard({ story, onTagClick }: StoryCardProps): React.ReactNode {
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
        {/* Horizontal card layout - unique to Stories */}
        <div className="flex flex-col sm:flex-row h-full">
          {/* Left: Profile Section */}
          <div className="sm:w-1/3 p-6 bg-gradient-to-br from-primary/5 to-transparent flex flex-col items-center justify-center text-center border-b sm:border-b-0 sm:border-r border-border relative">
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
              {story.image ? (
                <img
                  src={story.image}
                  alt={story.interviewee || story.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-display text-xl text-primary/60">
                  {story.interviewee?.[0] || 'S'}
                </span>
              )}
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

          {/* Right: Content Section */}
          <div className="sm:w-2/3 p-6 flex flex-col">
            {/* Category */}
            <div className="mb-3">
              <span className="mckinsey-label text-primary">
                {story.category}
              </span>
            </div>

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
              <span>{story.date}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {story.tags.slice(0, 2).map((tag, index) => (
                <StoryCardTag
                  key={index}
                  tag={tag}
                  onClick={onTagClick}
                />
              ))}
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
