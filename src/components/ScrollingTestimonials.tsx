import React from 'react';
import { cn } from '../lib/utils';
import { Marquee } from './ui/marquee';
import { TestimonialData } from '../data/testimonials';
import { getTestimonialsTitle, getTestimonialsSubtitle } from '../constants/homepage';

interface ScrollingTestimonialsProps {
  title?: string;
  subtitle?: string;
  testimonials: TestimonialData[];
  className?: string;
}

const TestimonialCard = ({
  quote,
  author,
  role,
  company,
  avatarSrc
}: TestimonialData) => {
  return (
    <div
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:bg-gray-900/80 dark:border-gray-800/50 dark:hover:bg-gray-900/50",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        {avatarSrc ? (
          <img
            className="rounded-full"
            width="32"
            height="32"
            alt=""
            src={avatarSrc}
            onError={(e) => {
              // Fallback to initials if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `<div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">${author.split(' ').map(n => n[0]).join('')}</div>`;
              }
            }}
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
            {author.split(' ').map(n => n[0]).join('')}
          </div>
        )}
        <div className="flex flex-col">
          <div className="text-md font-medium dark:text-white">
            {author}
          </div>
          <p className="text-sm font-medium dark:text-white/40 mb-0">
            {role} · {company}
          </p>
        </div>
      </div>
      <div className="mt-2 text-md">{quote}</div>
    </div>
  );
};

export function ScrollingTestimonials({
  title: propTitle,
  subtitle: propSubtitle,
  testimonials,
  className = ""
}: ScrollingTestimonialsProps) {
  // Use provided title/subtitle or get from translations
  const title = propTitle || getTestimonialsTitle();
  const subtitle = propSubtitle || getTestimonialsSubtitle();
  
  // Split testimonials into two rows for better visual effect
  const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const secondRow = testimonials.slice(Math.ceil(testimonials.length / 2));

  return (
    <div className={`bg-background py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {subtitle}
          </p>
        </div>
        
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden mt-5">
          <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow.map((testimonial, index) => (
              <TestimonialCard key={`first-${testimonial.author}-${index}`} {...testimonial} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {secondRow.map((testimonial, index) => (
              <TestimonialCard key={`second-${testimonial.author}-${index}`} {...testimonial} />
            ))}
          </Marquee>
          
          {/* Gradient overlays for smooth fade effect */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
      </div>
    </div>
  );
} 