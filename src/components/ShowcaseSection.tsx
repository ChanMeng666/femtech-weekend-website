import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { AnimatedLine } from './ui/AnimatedLine';
import { translate } from '@docusaurus/Translate';

interface ShowcaseItemProps {
  image: string;
  title: string;
  category: string;
  index: number;
  isVisible: boolean;
  size?: 'large' | 'small';
}

function ShowcaseItem({ image, title, category, index, isVisible, size = 'small' }: ShowcaseItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative overflow-hidden  cursor-pointer ${
        size === 'large' ? 'md:col-span-2 md:row-span-2' : ''
      }`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transitionProperty: 'opacity, transform',
        transitionDuration: '700ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${200 + index * 100}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className={`relative ${size === 'large' ? 'aspect-[4/3]' : 'aspect-square'} overflow-hidden`}>
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-all duration-700"
          style={{
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0.7,
          }}
        />

        {/* Corner accents */}
        <div
          className="absolute left-4 top-4 h-6 w-px bg-white/70 transition-all duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'scaleY(1)' : 'scaleY(0)',
            transformOrigin: 'top',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '50ms',
          }}
        />
        <div
          className="absolute left-4 top-4 h-px w-6 bg-white/70 transition-all duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '100ms',
          }}
        />
        <div
          className="absolute bottom-4 right-4 h-6 w-px bg-white/70 transition-all duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'scaleY(1)' : 'scaleY(0)',
            transformOrigin: 'bottom',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '150ms',
          }}
        />
        <div
          className="absolute bottom-4 right-4 h-px w-6 bg-white/70 transition-all duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'right',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '200ms',
          }}
        />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          {/* Category label */}
          <span
            className="mckinsey-label text-white/80 mb-2 block transition-all duration-500"
            style={{
              transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
              opacity: isHovered ? 1 : 0.7,
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {category}
          </span>

          {/* Title */}
          <h3
            className={`font-display font-normal tracking-tight text-white transition-all duration-500 ${
              size === 'large' ? 'text-xl sm:text-2xl' : 'text-lg'
            }`}
            style={{
              transform: isHovered ? 'translateY(0)' : 'translateY(4px)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {title}
          </h3>

          {/* Arrow indicator */}
          <div
            className="mt-3 flex items-center gap-2 transition-all duration-500"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateX(0)' : 'translateX(-8px)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '100ms',
            }}
          >
            <ArrowRight className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShowcaseSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const sectionLabel = translate({
    id: 'homepage.showcase.label',
    message: 'Highlights',
  });

  const sectionTitle = translate({
    id: 'homepage.showcase.title',
    message: 'Moments from Our Community',
  });

  const sectionSubtitle = translate({
    id: 'homepage.showcase.subtitle',
    message: 'Capturing the spirit of innovation and collaboration',
  });

  // Placeholder images - Replace with actual event/community images
  const showcaseItems = [
    {
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&q=80',
      title: translate({ id: 'homepage.showcase.item1.title', message: 'FemTech Weekend 2024 Summit' }),
      category: translate({ id: 'homepage.showcase.item1.category', message: 'Event' }),
      size: 'large' as const,
    },
    {
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=400&fit=crop&q=80',
      title: translate({ id: 'homepage.showcase.item2.title', message: 'Innovation Workshop' }),
      category: translate({ id: 'homepage.showcase.item2.category', message: 'Workshop' }),
      size: 'small' as const,
    },
    {
      image: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=400&h=400&fit=crop&q=80',
      title: translate({ id: 'homepage.showcase.item3.title', message: 'Pitch Competition' }),
      category: translate({ id: 'homepage.showcase.item3.category', message: 'Competition' }),
      size: 'small' as const,
    },
    {
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=400&fit=crop&q=80',
      title: translate({ id: 'homepage.showcase.item4.title', message: 'Expert Panel Discussion' }),
      category: translate({ id: 'homepage.showcase.item4.category', message: 'Panel' }),
      size: 'small' as const,
    },
    {
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=400&fit=crop&q=80',
      title: translate({ id: 'homepage.showcase.item5.title', message: 'Networking Session' }),
      category: translate({ id: 'homepage.showcase.item5.category', message: 'Networking' }),
      size: 'small' as const,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-muted/30 py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          {/* Label */}
          <div
            className="mb-6 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <AnimatedLine variant="label" label={sectionLabel} />
          </div>

          {/* Title and Subtitle row */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground transition-all duration-700"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: '100ms',
                }}
              >
                {sectionTitle}
              </h2>
              <p
                className="mt-4 max-w-xl text-lg text-muted-foreground transition-all duration-700"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: '200ms',
                }}
              >
                {sectionSubtitle}
              </p>
            </div>

            {/* View All link */}
            <a
              href="/blog"
              className="group inline-flex items-center gap-2 text-primary font-medium transition-all duration-500 hover:gap-3"
              style={{
                opacity: isVisible ? 1 : 0,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: '300ms',
              }}
            >
              <span>
                {translate({
                  id: 'homepage.showcase.viewAll',
                  message: 'View all news',
                })}
              </span>
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Image Grid - Bento-style layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {showcaseItems.map((item, index) => (
            <ShowcaseItem
              key={index}
              image={item.image}
              title={item.title}
              category={item.category}
              index={index}
              isVisible={isVisible}
              size={item.size}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
