import Link from '@docusaurus/Link';
import { AnimatedLine } from './ui/AnimatedLine';
import { getBannerLabel, getBannerHeadline, getBannerDescription, getBannerDate, getBannerLocation, getBannerCta } from '../constants/shanghai-summit';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';

export function ShanghaiSummitBanner() {
  const label = getBannerLabel();
  const headline = getBannerHeadline();
  const description = getBannerDescription();
  const date = getBannerDate();
  const location = getBannerLocation();
  const cta = getBannerCta();

  return (
    <div className="relative py-20 sm:py-28 lg:py-32 overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div>
            <AnimatedLine
              variant="label"
              label={label}
              className="mb-6"
            />

            {/* Date + Location */}
            <div className="flex flex-wrap items-center gap-4 mb-5">
              <span className="inline-flex items-center gap-2 text-[#AA7C52] text-base sm:text-lg font-semibold tracking-wider">
                <Calendar className="w-4 h-4" />
                {date}
              </span>
              <span className="h-4 w-px bg-[#AA7C52]/40 hidden sm:block" />
              <span className="inline-flex items-center gap-2 text-foreground text-base sm:text-lg font-semibold tracking-wider">
                <MapPin className="w-4 h-4" />
                {location}
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground mb-6 max-w-4xl leading-[1.1]">
              {headline}
            </h2>

            {/* Description */}
            <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground mb-10">
              {description}
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/shanghai-summit"
                className="group relative inline-flex items-center gap-2.5 bg-[#AA7C52] text-white hover:text-white px-7 py-3.5 text-sm font-medium overflow-hidden no-underline hover:no-underline transition-all duration-300 hover:shadow-[0_0_24px_rgba(170,124,82,0.25)]"
              >
                <span className="relative">{cta}</span>
                <ArrowRight className="w-4 h-4 relative transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Right: Shanghai skyline image */}
          <div className="hidden lg:block relative">
            <div
              className="relative overflow-hidden summit-image-overlay"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)' }}
            >
              <img
                src="/img/shanghai/shanghai-suzhou-creek.jpg"
                alt="Shanghai Pudong skyline from Suzhou Creek at golden hour"
                className="w-full h-80 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#AA7C52]/10 to-transparent" />
            </div>
            {/* Frame corners */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t border-l border-[#AA7C52]/40" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-[#AA7C52]/40" />
          </div>
        </div>
      </div>
    </div>
  );
}
