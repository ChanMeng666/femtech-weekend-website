import React from 'react';
import { cn } from '../lib/utils';

interface TestimonialProps {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatarSrc?: string;
  className?: string;
}

export function Testimonial({
  quote,
  author,
  role,
  company,
  avatarSrc,
  className,
}: TestimonialProps) {
  return (
    <div className={cn("relative rounded-xl border border-border bg-card p-6 shadow-sm", className)}>
      <div className="flex flex-col gap-4">
        <div className="relative">
          <svg
            className="absolute left-0 top-0 h-8 w-8 -translate-x-4 -translate-y-4 transform text-muted-foreground opacity-50"
            fill="none"
            height="48"
            viewBox="0 0 48 48"
            width="48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.0269 18.0645H21.0159C21.0159 13.1935 18.7394 11.129 16.4629 10.4516V7.25806C21.2445 7.82258 27.0269 10.7742 27.0269 19.4193V36.7097H14.0269V18.0645ZM32.0484 18.0645H39.0374C39.0374 13.1935 36.761 11.129 34.4845 10.4516V7.25806C39.2661 7.82258 45.0484 10.7742 45.0484 19.4193V36.7097H32.0484V18.0645Z"
              fill="currentColor"
            />
          </svg>
          <blockquote className="text-lg font-medium leading-relaxed text-card-foreground">
            {quote}
          </blockquote>
        </div>
        <div className="flex items-center gap-3">
          {avatarSrc && (
            <div className="h-10 w-10 overflow-hidden rounded-full">
              <img
                alt={`${author} avatar`}
                className="h-full w-full object-cover"
                src={avatarSrc}
              />
            </div>
          )}
          <div>
            <div className="font-medium text-card-foreground">{author}</div>
            {(role || company) && (
              <div className="text-sm text-muted-foreground">
                {role}
                {role && company && " · "}
                {company}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
} 