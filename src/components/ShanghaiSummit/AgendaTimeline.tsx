import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import { AnimatedLine } from '../ui/AnimatedLine';
import { agendaDays } from '../../data/shanghai-summit';
import { ArrowRight } from 'lucide-react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export function AgendaTimeline() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const locale = currentLocale === 'zh-Hans' ? 'zh' : 'en';

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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-background py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="mb-16 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <AnimatedLine variant="label" label="AGENDA" />
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground mt-6">
            4 Days of Innovation
          </h2>
        </div>

        <div className="space-y-12 lg:space-y-16">
          {agendaDays.map((day, i) => (
            <div
              key={day.day}
              className="flex flex-col lg:flex-row gap-6 lg:gap-12 transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: `${(i + 1) * 150}ms`,
              }}
            >
              {/* Day number */}
              <div className="flex-shrink-0 lg:w-32">
                <span className="font-display text-5xl lg:text-6xl text-[#AA7C52]/30">
                  {String(day.day).padStart(2, '0')}
                </span>
                <p className="text-muted-foreground text-sm mt-1">{day.date}</p>
              </div>

              {/* Content */}
              <div className="flex-1 border-l border-border pl-6 lg:pl-10">
                <h3 className="font-display text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  {day.title[locale]}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {day.description[locale]}
                </p>

                {/* Highlights */}
                <ul className="space-y-2 mb-6">
                  {day.highlights[locale].map((highlight, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-[#AA7C52] mt-1 flex-shrink-0">&bull;</span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                {/* Day-specific CTA */}
                {day.cta && (
                  day.cta.external ? (
                    <a
                      href={day.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#AA7C52] text-white px-5 py-2.5 text-sm font-medium hover:bg-[#996F49] transition-colors no-underline hover:no-underline"
                    >
                      {day.cta.label[locale]}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <Link
                      to={day.cta.href}
                      className="inline-flex items-center gap-2 bg-[#AA7C52] text-white px-5 py-2.5 text-sm font-medium hover:bg-[#996F49] transition-colors no-underline hover:no-underline"
                    >
                      {day.cta.label[locale]}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
