import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { FeaturedOpinionProps } from '../../types/opinions';
import { getFeaturedOpinionLabel } from '../../constants/opinions-components';
import { ArrowRight } from 'lucide-react';

interface OpinionTagProps {
  tag: string;
  onClick: (tag: string) => void;
}

const OpinionTag = ({ tag, onClick }: OpinionTagProps) => (
  <span
    className="inline-block border border-foreground/20 px-3 py-1 text-foreground/70 text-xs font-medium cursor-pointer hover:border-foreground hover:text-foreground transition-colors"
    onClick={(e) => {
      e.preventDefault();
      onClick(tag);
    }}
  >
    {tag}
  </span>
);

export function FeaturedOpinion({ opinion, onTagClick }: FeaturedOpinionProps): React.ReactNode {
  const featuredOpinionLabel = getFeaturedOpinionLabel();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={opinion.link} className="block no-underline">
        {/* Editorial-style featured article */}
        <div className="relative border-t-4 border-foreground pt-8">
          {/* Featured label */}
          <div className="mb-6 flex items-center gap-4">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-foreground/60 border border-foreground/30 px-3 py-1">
              {featuredOpinionLabel}
            </span>
            <span className="text-xs font-medium uppercase tracking-wider text-primary">
              {opinion.category}
            </span>
          </div>

          {/* Large headline */}
          <h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground mb-6 leading-[1.1] transition-all duration-500"
            style={{
              transform: isHovered ? 'translateX(8px)' : 'translateX(0)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {opinion.title}
          </h2>

          {/* Description - editorial deck */}
          <p className="text-muted-foreground text-xl lg:text-2xl mb-8 leading-relaxed max-w-4xl font-light">
            {opinion.description}
          </p>

          {/* Byline */}
          <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-border">
            <span className="font-semibold text-foreground">{opinion.author}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{opinion.date}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{opinion.readTime}</span>
          </div>

          {/* Tags and CTA row */}
          <div className="flex flex-wrap items-center justify-between gap-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {opinion.tags.slice(0, 4).map((tag, index) => (
                <OpinionTag
                  key={index}
                  tag={tag}
                  onClick={onTagClick}
                />
              ))}
            </div>

            {/* CTA */}
            <div
              className="flex items-center gap-2 text-foreground font-semibold group/cta"
            >
              <span className="border-b-2 border-foreground">Read Full Article</span>
              <ArrowRight
                className="w-5 h-5 transition-transform duration-300"
                style={{
                  transform: isHovered ? 'translateX(6px)' : 'translateX(0)'
                }}
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
