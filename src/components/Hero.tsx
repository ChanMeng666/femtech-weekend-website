import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { WordRotate } from './ui/word-rotate';
import {
  getHeroSubtitle,
  getCtaStart,
  getHeroRotatingWord1,
  getHeroRotatingWord2,
  getHeroRotatingWord3,
} from '../constants/homepage';

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const subtitle = getHeroSubtitle();
  const ctaStart = getCtaStart();

  const words = [
    getHeroRotatingWord1(),
    getHeroRotatingWord2(),
    getHeroRotatingWord3(),
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // DEBUG: log hero and ancestor layout info
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    console.log('=== HERO DEBUG ===');
    console.log('--ifm-navbar-height:', getComputedStyle(document.documentElement).getPropertyValue('--ifm-navbar-height'));
    console.log('Hero rect:', { top: rect.top, height: rect.height, bottom: rect.bottom });
    console.log('Hero computed:', {
      position: cs.position,
      top: cs.top,
      marginTop: cs.marginTop,
      marginBottom: cs.marginBottom,
      height: cs.height,
      overflow: cs.overflow,
    });

    // Walk up ancestors
    let ancestor: HTMLElement | null = el.parentElement;
    let depth = 1;
    while (ancestor && depth <= 8) {
      const acs = getComputedStyle(ancestor);
      const arect = ancestor.getBoundingClientRect();
      console.log(`Ancestor ${depth}: <${ancestor.tagName.toLowerCase()}> class="${ancestor.className}"`, {
        rect: { top: arect.top, height: arect.height },
        paddingTop: acs.paddingTop,
        marginTop: acs.marginTop,
        overflow: acs.overflow,
        position: acs.position,
      });
      ancestor = ancestor.parentElement;
      depth++;
    }

    // Navbar info
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      const ncs = getComputedStyle(navbar);
      const nrect = navbar.getBoundingClientRect();
      console.log('Navbar:', {
        rect: { top: nrect.top, height: nrect.height, bottom: nrect.bottom },
        position: ncs.position,
        background: ncs.backgroundColor,
      });
    }
    console.log('=== END HERO DEBUG ===');
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden"
      style={{
        top: 'calc(-1 * var(--ifm-navbar-height))',
        marginBottom: 'calc(-1 * var(--ifm-navbar-height))',
      }}
    >
      {/* Fullscreen background video */}
      <video
        src="/img/bg/homepage-hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        {/* Rotating headline */}
        <div
          className="transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <WordRotate
            words={words}
            duration={3000}
            className="text-5xl sm:text-6xl lg:text-8xl font-bold uppercase tracking-wider text-white"
          />
        </div>

        {/* Fixed subtitle */}
        <p
          className="max-w-3xl text-sm sm:text-base lg:text-lg uppercase tracking-[0.2em] text-white/90 mt-4 mb-10 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '200ms',
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
          <a
            href="/insights"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-medium transition-all duration-500 hover:bg-white/90 hover:text-black no-underline"
          >
            <span>{ctaStart}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
