import React from 'react';
import Link from '@docusaurus/Link';
import { AnimatedLine } from '../ui/AnimatedLine';
import { SUMMIT_META } from '../../data/shanghai-summit';
import { ArrowRight } from 'lucide-react';

export function SummitHero() {
  return (
    <div className="relative bg-[#0a0a0a] min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 py-24 sm:py-32">
        <AnimatedLine
          variant="label"
          label="SHANGHAI SUMMIT 2026"
          className="mb-6 [&_span]:text-white [&_div]:bg-white"
        />

        <p className="mckinsey-label text-[#AA7C52] mb-6">
          JUNE 22-25, 2026 | SHANGHAI, CHINA
        </p>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tight text-white mb-8 max-w-5xl">
          Cross-Border Capital &amp; Partnerships in Women's Health
        </h1>

        <p className="text-lg sm:text-xl text-white/70 max-w-3xl mb-8 leading-relaxed">
          20-30 global women's health companies converge in Shanghai Qiantan for a 4-day international
          summit of keynotes, pitch sessions, park visits, and market observation — bridging global
          innovation with China's vast healthcare ecosystem.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-0 mb-12">
          {SUMMIT_META.stats.map((stat, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="hidden sm:block h-8 w-px bg-white/20 mx-6" />}
              <span className="mckinsey-label text-white/90 text-sm">{stat.label.en}</span>
            </React.Fragment>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <a
            href={SUMMIT_META.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 text-sm font-medium hover:bg-white/90 transition-colors no-underline hover:no-underline"
          >
            Get Tickets
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            to="/shanghai-summit/pitch"
            className="inline-flex items-center gap-2 border border-[#AA7C52] text-[#AA7C52] px-6 py-3 text-sm font-medium hover:bg-[#AA7C52]/10 transition-colors no-underline hover:no-underline"
          >
            Apply to Pitch
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/shanghai-summit/speak"
            className="inline-flex items-center gap-2 border border-white/40 text-white px-6 py-3 text-sm font-medium hover:border-white/70 hover:bg-white/5 transition-colors no-underline hover:no-underline"
          >
            Apply to Speak
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
