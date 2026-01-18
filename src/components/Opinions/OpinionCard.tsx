import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { OpinionCardProps } from '../../types/opinions';
import { ArrowRight } from 'lucide-react';

interface OpinionCardTagProps {
  tag: string;
  onClick: (tag: string) => void;
}

const OpinionCardTag = ({ tag, onClick }: OpinionCardTagProps) => (
  <span
    className="inline-block text-foreground/50 text-xs cursor-pointer hover:text-foreground transition-colors"
    onClick={(e) => {
      e.preventDefault();
      onClick(tag);
    }}
  >
    #{tag}
  </span>
);

export function OpinionCard({ opinion, onTagClick }: OpinionCardProps): React.ReactNode {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={opinion.link} className="block no-underline">
        {/* Newspaper column style - text-heavy, minimal decoration */}
        <article className="relative h-full">
          {/* Top border that animates on hover */}
          <div
            className="absolute top-0 left-0 h-1 bg-foreground transition-all duration-500"
            style={{
              width: isHovered ? '100%' : '40px'
            }}
          />

          <div className="pt-6 pb-8 border-b border-border/50 h-full flex flex-col">
            {/* Category */}
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                {opinion.category}
              </span>
            </div>

            {/* Headline - bold newspaper style */}
            <h3
              className="font-display text-xl lg:text-2xl font-bold tracking-tight text-foreground mb-4 leading-tight transition-all duration-300"
              style={{
                transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
              }}
            >
              {opinion.title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
              {opinion.description}
            </p>

            {/* Byline */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
              <span className="font-semibold text-foreground">{opinion.author}</span>
              <span>|</span>
              <span>{opinion.date}</span>
              <span>|</span>
              <span>{opinion.readTime}</span>
            </div>

            {/* Tags row */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {opinion.tags.slice(0, 3).map((tag, index) => (
                <OpinionCardTag
                  key={index}
                  tag={tag}
                  onClick={onTagClick}
                />
              ))}
            </div>

            {/* Read more - subtle */}
            <div
              className="flex items-center gap-2 text-foreground text-sm font-medium mt-auto"
            >
              <span
                className="transition-all duration-300"
                style={{
                  borderBottom: isHovered ? '1px solid currentColor' : '1px solid transparent'
                }}
              >
                Continue Reading
              </span>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300"
                style={{
                  transform: isHovered ? 'translateX(4px)' : 'translateX(0)'
                }}
              />
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}
