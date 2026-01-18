import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { FeaturedStoryProps } from '../../types/stories';
import { getFeaturedStoryLabel } from '../../constants/stories-components';
import { ArrowUpRight } from 'lucide-react';

interface StoryTagProps {
  tag: string;
  onClick: (tag: string) => void;
}

const StoryTag = ({ tag, onClick }: StoryTagProps) => (
  <span
    className="mckinsey-label inline-block bg-primary/10 px-3 py-1 text-primary cursor-pointer hover:bg-primary/20 transition-colors"
    onClick={(e) => {
      e.preventDefault();
      onClick(tag);
    }}
  >
    {tag}
  </span>
);

export function FeaturedStory({ story, onTagClick }: FeaturedStoryProps): React.ReactNode {
  const featuredStoryLabel = getFeaturedStoryLabel();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative cursor-pointer bg-card border border-border transition-all duration-500 hover:border-primary/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Corner accents */}
      <div
        className="absolute top-4 left-4 w-6 h-px bg-primary transition-all duration-500"
        style={{ opacity: isHovered ? 1 : 0 }}
      />
      <div
        className="absolute top-4 left-4 w-px h-6 bg-primary transition-all duration-500"
        style={{ opacity: isHovered ? 1 : 0 }}
      />
      <div
        className="absolute bottom-4 right-4 w-6 h-px bg-primary transition-all duration-500"
        style={{ opacity: isHovered ? 1 : 0 }}
      />
      <div
        className="absolute bottom-4 right-4 w-px h-6 bg-primary transition-all duration-500"
        style={{ opacity: isHovered ? 1 : 0 }}
      />

      <Link to={story.link} className="block no-underline">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Image section */}
          <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
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
                  className="absolute inset-4 border border-white/40 pointer-events-none transition-opacity duration-500"
                  style={{ opacity: isHovered ? 1 : 0 }}
                />
              </>
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20">
                <div className="text-center">
                  <div className="font-display text-6xl font-normal text-primary/30 mb-4">
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
          <div className="p-8 lg:p-10 flex flex-col justify-center">
            {/* Featured label */}
            <div className="mb-6">
              <span className="mckinsey-label text-primary">
                {featuredStoryLabel}
              </span>
            </div>

            {/* Title - serif */}
            <h2
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-foreground mb-4 transition-all duration-500"
              style={{
                transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {story.title}
            </h2>

            {/* Interviewee info if available */}
            {story.interviewee && (
              <p className="text-primary text-lg mb-4">
                {story.interviewee}{story.role && ` — ${story.role}`}
              </p>
            )}

            {/* Description */}
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              {story.description}
            </p>

            {/* Metadata */}
            <div className="flex items-center mckinsey-label text-muted-foreground mb-6">
              <span>{story.author}</span>
              <span className="mx-3">—</span>
              <span>{story.date}</span>
              <span className="mx-3">—</span>
              <span>{story.readTime}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {story.tags.map((tag, index) => (
                <StoryTag
                  key={index}
                  tag={tag}
                  onClick={onTagClick}
                />
              ))}
            </div>

            {/* CTA with arrow */}
            <div className="flex items-center gap-2 text-primary mckinsey-label">
              <span>Read More</span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300"
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
