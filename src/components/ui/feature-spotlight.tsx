"use client"

import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FeatureSpotlightProps {
  index: number;
  title: string;
  description: string;
  ctaText?: string;
  href?: string;
  icon?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  className?: string;
}

/**
 * McKinsey-inspired spotlight card component
 * Features subtle hover animations with cubic-bezier easing
 */
export function FeatureSpotlight({
  index,
  title,
  description,
  ctaText = 'Learn More',
  href = '#',
  icon,
  image,
  imageAlt,
  className,
}: FeatureSpotlightProps) {
  const [isHovered, setIsHovered] = useState(false);

  const indexString = index.toString().padStart(2, '0');

  return (
    <a
      href={href}
      className={cn(
        'group relative block cursor-pointer',
        'border border-transparent  overflow-hidden',
        'transition-all duration-500',
        className
      )}
      style={{
        borderColor: isHovered ? 'hsl(var(--primary) / 0.3)' : 'hsl(var(--border))',
        backgroundColor: isHovered ? 'hsl(var(--primary) / 0.02)' : 'transparent',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 20px 40px hsl(var(--foreground) / 0.08)' : '0 0 0 transparent',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image section */}
      {image && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={image}
            alt={imageAlt || title}
            className="h-full w-full object-cover transition-all duration-700"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent transition-opacity duration-500"
            style={{
              opacity: isHovered ? 0.9 : 0.7,
            }}
          />
          {/* Index number on image */}
          <span
            className="absolute top-4 left-4 mckinsey-index text-white/90 transition-all duration-700"
            style={{
              opacity: isHovered ? 1 : 0.7,
              transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {indexString}
          </span>
          {/* Corner accents on image */}
          <div
            className="absolute left-3 top-3 h-5 w-px bg-white/60 transition-all duration-500"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'scaleY(1)' : 'scaleY(0)',
              transformOrigin: 'top',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '50ms',
            }}
          />
          <div
            className="absolute left-3 top-3 h-px w-5 bg-white/60 transition-all duration-500"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'left',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '100ms',
            }}
          />
          <div
            className="absolute bottom-3 right-3 h-5 w-px bg-white/60 transition-all duration-500"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'scaleY(1)' : 'scaleY(0)',
              transformOrigin: 'bottom',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '150ms',
            }}
          />
          <div
            className="absolute bottom-3 right-3 h-px w-5 bg-white/60 transition-all duration-500"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'right',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '200ms',
            }}
          />
        </div>
      )}

      {/* Content section */}
      <div className="p-6 md:p-8 relative">
        {/* Corner accents (when no image) */}
        {!image && (
          <>
            <div
              className="absolute left-3 top-3 h-4 w-px bg-primary transition-all duration-500"
              style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'scaleY(1)' : 'scaleY(0)',
                transformOrigin: 'top',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: '50ms',
              }}
            />
            <div
              className="absolute left-3 top-3 h-px w-4 bg-primary transition-all duration-500"
              style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: '100ms',
              }}
            />
            <div
              className="absolute bottom-3 right-3 h-4 w-px bg-primary transition-all duration-500"
              style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'scaleY(1)' : 'scaleY(0)',
                transformOrigin: 'bottom',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: '150ms',
              }}
            />
            <div
              className="absolute bottom-3 right-3 h-px w-4 bg-primary transition-all duration-500"
              style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'right',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: '200ms',
              }}
            />

            {/* Index number (when no image) */}
            <span
              className="mckinsey-index block mb-4 transition-all duration-700"
              style={{
                opacity: isHovered ? 1 : 0.5,
                transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {indexString}
            </span>
          </>
        )}

        {/* Icon */}
        {icon && (
          <div
            className="mb-4 w-12 h-12  bg-primary/10 flex items-center justify-center text-primary transition-all duration-500"
            style={{
              backgroundColor: isHovered ? 'hsl(var(--primary) / 0.15)' : 'hsl(var(--primary) / 0.1)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {icon}
          </div>
        )}

        {/* Title */}
        <h3
          className="font-display text-xl md:text-2xl font-normal tracking-tight text-foreground mb-3 transition-all duration-700"
          style={{
            transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="text-sm md:text-base leading-relaxed mb-6 transition-all duration-700"
          style={{
            color: isHovered ? 'hsl(var(--muted-foreground))' : 'hsl(var(--muted-foreground) / 0.8)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {description}
        </p>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center  border transition-all duration-500"
            style={{
              borderColor: isHovered ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground) / 0.3)',
              backgroundColor: isHovered ? 'hsl(var(--primary))' : 'transparent',
              color: isHovered ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              boxShadow: isHovered ? '0 8px 24px hsl(var(--primary) / 0.2)' : '0 0 0 transparent',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-500"
              style={{
                transform: isHovered ? 'rotate(45deg)' : 'rotate(0deg)',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </div>
          <span
            className="mckinsey-label transition-all duration-700"
            style={{
              opacity: isHovered ? 1 : 0.6,
              transform: isHovered ? 'translateX(0)' : 'translateX(-4px)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: isHovered ? '100ms' : '0ms',
            }}
          >
            {ctaText}
          </span>
        </div>
      </div>
    </a>
  );
}

export default FeatureSpotlight;
