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
        <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
          {/* Left: Profile Section with quote - unique to Stories */}
          <div className="relative p-8 lg:p-10 bg-gradient-to-br from-primary/5 to-transparent flex flex-col justify-center">
            {/* Large quote mark */}
            <div className="absolute top-6 left-6 opacity-10">
              <svg className="w-16 h-16 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>

            {/* Profile placeholder */}
            <div className="relative z-10">
              <div
                className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 flex items-center justify-center mb-6 transition-transform duration-500"
                style={{
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                {story.image ? (
                  <img
                    src={story.image}
                    alt={story.interviewee || story.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-display text-2xl text-primary/60">
                    {story.interviewee?.[0] || 'S'}
                  </span>
                )}
              </div>

              {/* Interviewee name */}
              {story.interviewee && (
                <h3 className="font-display text-xl font-normal text-foreground mb-1">
                  {story.interviewee}
                </h3>
              )}

              {/* Role */}
              {story.role && (
                <p className="text-primary text-sm mb-4">
                  {story.role}
                </p>
              )}

              {/* Featured badge */}
              <span className="mckinsey-label text-primary border border-primary px-3 py-1 inline-block">
                {featuredStoryLabel}
              </span>
            </div>
          </div>

          {/* Right: Content Section */}
          <div className="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-center border-l border-border">
            {/* Category label */}
            <div className="mb-4">
              <span className="mckinsey-label text-primary">
                {story.category}
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

            {/* Description with quote style */}
            <div className="relative pl-4 border-l-2 border-primary/30 mb-6">
              <p className="text-muted-foreground text-lg leading-relaxed italic">
                "{story.description}"
              </p>
            </div>

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
              <span>Read Full Story</span>
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
