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
      className="group relative cursor-pointer bg-card border border-border transition-all duration-500 hover:border-primary/30 h-full flex flex-col"
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

      <Link to={story.link} className="block h-full no-underline flex flex-col">
        {/* Image section */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
          {story.image ? (
            <>
              <img
                src={story.image}
                alt={story.title}
                className="h-full w-full object-cover transition-transform duration-700"
                style={{
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
              {/* Frame overlay on hover */}
              <div
                className="absolute inset-3 border border-white/40 pointer-events-none transition-opacity duration-500"
                style={{ opacity: isHovered ? 1 : 0 }}
              />
            </>
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="font-display text-4xl font-normal text-primary/20 mb-2">
                  {story.title.split(' ')[0]}
                </div>
                <div className="mckinsey-label text-primary/60">
                  {story.category}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content section */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Category label */}
          <div className="mb-3">
            <span className="mckinsey-label text-primary">
              {story.category}
            </span>
          </div>

          {/* Title - serif */}
          <h3
            className="font-display text-xl font-normal tracking-tight text-foreground mb-3 transition-all duration-500"
            style={{
              transform: isHovered ? 'translateX(2px)' : 'translateX(0)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {story.title}
          </h3>

          {/* Interviewee info if available */}
          {story.interviewee && (
            <p className="text-primary text-sm mb-2">
              {story.interviewee}{story.role && ` — ${story.role}`}
            </p>
          )}

          {/* Description */}
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
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
            {story.tags.slice(0, 3).map((tag, index) => (
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
      </Link>
    </div>
  );
}
