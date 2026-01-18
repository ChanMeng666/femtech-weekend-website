import React, { useEffect, useRef, useState } from 'react';
import { AnimatedLine } from './ui/AnimatedLine';
import {
  getStatsSectionTitle,
  getStatsSectionSubtitle,
  getCountriesLabel,
  getExpertsLabel,
  getPublicationsLabel,
  getAwardsLabel
} from '../constants/stats-section';

interface StatItemProps {
  value: string;
  label: string;
  index: number;
  isVisible: boolean;
}

function StatItem({ value, label, index, isVisible }: StatItemProps) {
  return (
    <div
      className="flex flex-col items-center text-center px-4 md:px-8 transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${200 + index * 100}ms`,
      }}
    >
      {/* Large serif number */}
      <span className="font-display text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white mb-2">
        {value}
      </span>
      {/* Label */}
      <span className="text-sm sm:text-base text-white/80 font-medium">
        {label}
      </span>
    </div>
  );
}

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Get translated texts
  const title = getStatsSectionTitle();
  const subtitle = getStatsSectionSubtitle();
  const countriesLabel = getCountriesLabel();
  const expertsLabel = getExpertsLabel();
  const publicationsLabel = getPublicationsLabel();
  const awardsLabel = getAwardsLabel();

  const stats = [
    { value: '15+', label: countriesLabel },
    { value: '200+', label: expertsLabel },
    { value: '50+', label: publicationsLabel },
    { value: '10+', label: awardsLabel },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden"
    >
      {/* Background Image with overlay */}
      <div className="absolute inset-0 z-0">
        {/* Placeholder background image - Replace with actual image */}
        <img
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop&q=80"
          alt=""
          className="h-full w-full object-cover"
        />
        {/* Dark overlay with primary color tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-primary-dark/95" />
        {/* Additional texture overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFFFFF' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div
            className="flex justify-center mb-6 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <AnimatedLine
              variant="label"
              label={title}
              className="[&_span]:text-white [&_.h-px]:bg-white"
            />
          </div>
        </div>

        {/* Stats Grid - Horizontal on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/20">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              value={stat.value}
              label={stat.label}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Subtitle at bottom */}
        <div
          className="mt-12 lg:mt-16 text-center transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '600ms',
          }}
        >
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
