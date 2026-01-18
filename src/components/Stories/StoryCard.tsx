import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { StoryCardProps } from '../../types/stories';
import { ArrowRight, Quote, User } from 'lucide-react';

interface StoryCardTagProps {
  tag: string;
  onClick: (tag: string) => void;
}

const StoryCardTag = ({ tag, onClick }: StoryCardTagProps) => (
  <span
    className="inline-block bg-rose-50 dark:bg-rose-900/20 px-2.5 py-1 text-rose-600 dark:text-rose-400 text-xs font-medium rounded-full cursor-pointer hover:bg-rose-100 dark:hover:bg-rose-800/30 transition-colors"
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
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={story.link} className="block no-underline">
        {/* Horizontal card layout - magazine style */}
        <div
          className="relative overflow-hidden rounded-2xl bg-white dark:bg-card border border-rose-100/50 dark:border-rose-900/20 transition-all duration-500 hover:shadow-xl hover:shadow-rose-500/10 hover:border-rose-200 dark:hover:border-rose-800/40"
        >
          <div className="flex flex-col sm:flex-row">
            {/* Left: Profile Section */}
            <div className="sm:w-1/3 p-6 flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 to-amber-50/50 dark:from-rose-950/30 dark:to-amber-950/20 relative">
              {/* Decorative quote */}
              <div className="absolute top-2 right-2 opacity-10">
                <Quote className="w-8 h-8 text-rose-500" strokeWidth={1.5} />
              </div>

              {/* Profile avatar */}
              <div
                className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-200 to-amber-100 dark:from-rose-800 dark:to-amber-900 flex items-center justify-center mb-4 shadow-md transition-transform duration-500"
                style={{
                  transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                {story.image ? (
                  <img
                    src={story.image}
                    alt={story.interviewee || story.title}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-rose-400 dark:text-rose-500" />
                )}
              </div>

              {/* Interviewee name */}
              {story.interviewee && (
                <h4 className="font-display text-base font-medium text-foreground text-center mb-1">
                  {story.interviewee}
                </h4>
              )}

              {/* Role */}
              {story.role && (
                <p className="text-rose-600 dark:text-rose-400 text-xs text-center line-clamp-2">
                  {story.role}
                </p>
              )}
            </div>

            {/* Right: Content Section */}
            <div className="sm:w-2/3 p-6 flex flex-col justify-between">
              {/* Category */}
              <div className="mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-rose-500 dark:text-rose-400">
                  {story.category}
                </span>
              </div>

              {/* Title */}
              <h3
                className="font-display text-lg font-medium tracking-tight text-foreground mb-3 line-clamp-2 transition-all duration-500"
                style={{
                  transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {story.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
                {story.description}
              </p>

              {/* Bottom section */}
              <div className="space-y-3">
                {/* Metadata */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="font-medium">{story.author}</span>
                  <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                  <span>{story.date}</span>
                  <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                  <span>{story.readTime}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {story.tags.slice(0, 2).map((tag, index) => (
                    <StoryCardTag
                      key={index}
                      tag={tag}
                      onClick={onTagClick}
                    />
                  ))}
                </div>

                {/* Read more */}
                <div
                  className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-sm font-medium pt-2"
                >
                  <span>Read Story</span>
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-300"
                    style={{
                      transform: isHovered ? 'translateX(4px)' : 'translateX(0)'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
