import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { FeaturedStoryProps } from '../../types/stories';
import { getFeaturedStoryLabel } from '../../constants/stories-components';
import { ArrowRight, Quote, User } from 'lucide-react';

interface StoryTagProps {
  tag: string;
  onClick: (tag: string) => void;
}

const StoryTag = ({ tag, onClick }: StoryTagProps) => (
  <span
    className="inline-block bg-rose-100 dark:bg-rose-900/30 px-3 py-1.5 text-rose-700 dark:text-rose-300 text-xs font-medium rounded-full cursor-pointer hover:bg-rose-200 dark:hover:bg-rose-800/40 transition-colors"
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
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={story.link} className="block no-underline">
        {/* Magazine-style featured card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-50 via-white to-amber-50 dark:from-rose-950/40 dark:via-background dark:to-amber-950/30 border border-rose-100/50 dark:border-rose-900/30">
          {/* Large decorative quote */}
          <div className="absolute top-8 right-8 opacity-5">
            <Quote className="w-32 h-32 text-foreground" strokeWidth={1} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[400px]">
            {/* Left: Profile Section */}
            <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-center items-center lg:items-start text-center lg:text-left bg-gradient-to-br from-rose-100/50 to-transparent dark:from-rose-900/20">
              {/* Profile avatar placeholder */}
              <div
                className="w-28 h-28 rounded-full bg-gradient-to-br from-rose-200 to-amber-100 dark:from-rose-800 dark:to-amber-900 flex items-center justify-center mb-6 shadow-lg transition-transform duration-500"
                style={{
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                {story.image ? (
                  <img
                    src={story.image}
                    alt={story.interviewee || story.title}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-rose-400 dark:text-rose-500" />
                )}
              </div>

              {/* Interviewee name */}
              {story.interviewee && (
                <h3 className="font-display text-2xl font-medium text-foreground mb-2">
                  {story.interviewee}
                </h3>
              )}

              {/* Role */}
              {story.role && (
                <p className="text-rose-600 dark:text-rose-400 text-sm font-medium mb-4">
                  {story.role}
                </p>
              )}

              {/* Featured badge */}
              <div className="inline-flex items-center gap-2 bg-rose-500 text-white px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wide">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                {featuredStoryLabel}
              </div>
            </div>

            {/* Right: Content Section */}
            <div className="lg:col-span-3 p-8 lg:p-12 flex flex-col justify-center">
              {/* Category */}
              <div className="mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-rose-500 dark:text-rose-400">
                  {story.category}
                </span>
              </div>

              {/* Title */}
              <h2
                className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-foreground mb-4 leading-tight transition-all duration-500"
                style={{
                  transform: isHovered ? 'translateX(8px)' : 'translateX(0)',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {story.title}
              </h2>

              {/* Pull quote style description */}
              <div className="relative pl-6 border-l-2 border-rose-300 dark:border-rose-700 mb-6">
                <p className="text-muted-foreground text-lg italic leading-relaxed">
                  "{story.description}"
                </p>
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <span className="font-medium">{story.author}</span>
                <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                <span>{story.date}</span>
                <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                <span>{story.readTime}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {story.tags.slice(0, 4).map((tag, index) => (
                  <StoryTag
                    key={index}
                    tag={tag}
                    onClick={onTagClick}
                  />
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400 font-medium group/cta">
                <span>Read Full Story</span>
                <ArrowRight
                  className="w-5 h-5 transition-transform duration-300 group-hover/cta:translate-x-2"
                  style={{
                    transform: isHovered ? 'translateX(8px)' : 'translateX(0)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
