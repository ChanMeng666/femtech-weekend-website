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

const HERO_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop&q=80';

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const subtitle = getHeroSubtitle();
  const ctaStart = getCtaStart();

  const words = [
    getHeroRotatingWord1(),
    getHeroRotatingWord2(),
    getHeroRotatingWord3(),
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);

    // Programmatic play() is more reliable than autoPlay attribute on mobile
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        setVideoFailed(true);
      });
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Fallback background image - shown when video fails to play */}
      {videoFailed && (
        <img
          src={HERO_FALLBACK_IMAGE}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Fullscreen background video */}
      {!videoFailed && (
        <video
          ref={videoRef}
          src="/img/bg/homepage-hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={HERO_FALLBACK_IMAGE}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setVideoFailed(true)}
        />
      )}

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
