import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { AnimatedLine } from './ui/AnimatedLine';
import {
  getHeroTitle,
  getHeroSubtitle,
  getCtaStart,
  getCtaLearnMore,
} from '../constants/homepage';
import { translate } from '@docusaurus/Translate';

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const title = getHeroTitle();
  const subtitle = getHeroSubtitle();
  const ctaStart = getCtaStart();
  const ctaLearnMore = getCtaLearnMore();

  // Get translated headline parts
  const headlinePart1 = translate({
    id: 'homepage.hero.headline.part1',
    message: "Pioneering Women's",
  });
  const headlinePart2 = translate({
    id: 'homepage.hero.headline.part2',
    message: 'Health Innovation',
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative isolate bg-background overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23AA7C52' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="order-2 lg:order-1">
            {/* Label with animated line */}
            <div
              className="mb-6 transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <AnimatedLine variant="label" label={title} />
            </div>

            {/* Main Headline - Serif Typography */}
            <h1 className="mb-6">
              <span
                className="block font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground transition-all duration-700"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: '100ms',
                }}
              >
                {headlinePart1}
              </span>
              <span
                className="block font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-primary transition-all duration-700"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: '200ms',
                }}
              >
                {headlinePart2}
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground mb-8 transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: '300ms',
              }}
            >
              {subtitle}
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: '400ms',
              }}
            >
              {/* Primary CTA */}
              <a
                href="/insights"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium transition-all duration-500 hover:shadow-lg hover:shadow-primary/20 hover:text-primary-foreground hover:bg-primary-dark no-underline"
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <span>{ctaStart}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </a>

              {/* Secondary CTA */}
              <a
                href="/insights"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground font-medium transition-all duration-500 hover:border-primary hover:text-primary no-underline"
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <span>{ctaLearnMore}</span>
                <ChevronRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </a>
            </div>

            {/* Decorative line */}
            <div
              className="mt-10 transition-all duration-1000"
              style={{
                opacity: isVisible ? 1 : 0,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: '600ms',
              }}
            >
              <div
                className="h-px bg-gradient-to-r from-primary/50 via-primary/20 to-transparent"
                style={{
                  maxWidth: isVisible ? '200px' : '0px',
                  transition: 'max-width 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: '700ms',
                }}
              />
            </div>
          </div>

          {/* Right: Featured Image */}
          <div
            className="order-1 lg:order-2 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '200ms',
            }}
          >
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => setIsImageHovered(true)}
              onMouseLeave={() => setIsImageHovered(false)}
            >
              {/* Frame outline */}
              <div
                className="absolute -inset-3 md:-inset-4 border transition-all duration-700"
                style={{
                  borderColor: isImageHovered ? 'hsl(var(--primary) / 0.2)' : 'transparent',
                  transform: isImageHovered ? 'scale(1.01)' : 'scale(1)',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />

              {/* Main image container */}
              <div className="relative aspect-[4/3] overflow-hidden ">
                <div
                  className="absolute -inset-1 transition-all duration-700"
                  style={{
                    boxShadow: isImageHovered ? '0 24px 64px hsl(var(--primary) / 0.15)' : '0 0 0 transparent',
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />

                {/* Placeholder Image - Replace with actual hero image */}
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop&q=80"
                  alt="Women in health technology innovation"
                  className="h-full w-full object-cover transition-all duration-1000"
                  style={{
                    transform: isImageHovered ? 'scale(1.03)' : 'scale(1)',
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent transition-opacity duration-700"
                  style={{
                    opacity: isImageHovered ? 1 : 0.5,
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />

                {/* Corner accents */}
                <div
                  className="absolute left-3 top-3 h-6 w-px bg-white/80 transition-all duration-500"
                  style={{
                    opacity: isImageHovered ? 1 : 0,
                    transform: isImageHovered ? 'scaleY(1)' : 'scaleY(0)',
                    transformOrigin: 'top',
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: '50ms',
                  }}
                />
                <div
                  className="absolute left-3 top-3 h-px w-6 bg-white/80 transition-all duration-500"
                  style={{
                    opacity: isImageHovered ? 1 : 0,
                    transform: isImageHovered ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: '100ms',
                  }}
                />
                <div
                  className="absolute bottom-3 right-3 h-6 w-px bg-white/80 transition-all duration-500"
                  style={{
                    opacity: isImageHovered ? 1 : 0,
                    transform: isImageHovered ? 'scaleY(1)' : 'scaleY(0)',
                    transformOrigin: 'bottom',
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: '150ms',
                  }}
                />
                <div
                  className="absolute bottom-3 right-3 h-px w-6 bg-white/80 transition-all duration-500"
                  style={{
                    opacity: isImageHovered ? 1 : 0,
                    transform: isImageHovered ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'right',
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: '200ms',
                  }}
                />
              </div>

              {/* Caption */}
              <p
                className="mt-4 text-xs text-muted-foreground transition-all duration-700"
                style={{
                  opacity: isImageHovered ? 1 : 0.6,
                  transform: isImageHovered ? 'translateY(0)' : 'translateY(-4px)',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {translate({
                  id: 'homepage.hero.image.caption',
                  message: 'Empowering innovators across China and beyond',
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
