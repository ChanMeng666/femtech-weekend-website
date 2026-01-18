import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { FeaturedOpinionProps } from '../../types/opinions';
import { getFeaturedOpinionLabel } from '../../constants/opinions-components';
import { ArrowUpRight } from 'lucide-react';

interface OpinionTagProps {
  tag: string;
  onClick: (tag: string) => void;
}

const OpinionTag = ({ tag, onClick }: OpinionTagProps) => (
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

export function FeaturedOpinion({ opinion, onTagClick }: FeaturedOpinionProps): React.ReactNode {
  const featuredOpinionLabel = getFeaturedOpinionLabel();
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

      <Link to={opinion.link} className="block no-underline">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Image section */}
          <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
            {opinion.image ? (
              <>
                <img
                  src={opinion.image}
                  alt={opinion.title}
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
                    {opinion.title.split(' ')[0]}
                  </div>
                  <div className="mckinsey-label text-primary/60">
                    {opinion.category}
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
                {featuredOpinionLabel}
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
              {opinion.title}
            </h2>

            {/* Description */}
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              {opinion.description}
            </p>

            {/* Metadata */}
            <div className="flex items-center mckinsey-label text-muted-foreground mb-6">
              <span>{opinion.author}</span>
              <span className="mx-3">—</span>
              <span>{opinion.date}</span>
              <span className="mx-3">—</span>
              <span>{opinion.readTime}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {opinion.tags.map((tag, index) => (
                <OpinionTag
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
