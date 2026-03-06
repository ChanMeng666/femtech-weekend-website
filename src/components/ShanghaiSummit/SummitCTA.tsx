import React from 'react';
import Link from '@docusaurus/Link';
import { SUMMIT_META } from '../../data/shanghai-summit';
import { ArrowRight } from 'lucide-react';

const ctaPaths = [
  {
    title: 'Apply to Pitch',
    description: 'Showcase your startup to global investors on Day 2.',
    href: '/shanghai-summit/pitch',
    external: false,
  },
  {
    title: 'Apply for the Programme',
    description: 'Join the curated China programme for global women\'s health companies.',
    href: '/shanghai-summit/programme',
    external: false,
  },
  {
    title: 'Apply to Speak',
    description: 'Share your expertise at the summit.',
    href: '/shanghai-summit/speak',
    external: false,
  },
];

export function SummitCTA() {
  return (
    <div className="relative bg-background py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground mb-4">
            Join the Summit
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Multiple ways to participate in the Shanghai Summit 2026.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {ctaPaths.map((path) => (
            <Link
              key={path.title}
              to={path.href}
              className="group border border-border p-8 hover:border-primary/50 hover:shadow-lg transition-all duration-300 no-underline hover:no-underline"
            >
              <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                {path.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">{path.description}</p>
              <span className="inline-flex items-center gap-1 text-primary text-sm font-medium">
                Learn more <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>

        {/* Conference ticket CTA */}
        <div className="text-center">
          <a
            href={SUMMIT_META.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#AA7C52] text-white px-8 py-3 text-sm font-medium hover:bg-[#996F49] transition-colors no-underline hover:no-underline"
          >
            Get Conference Tickets
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
