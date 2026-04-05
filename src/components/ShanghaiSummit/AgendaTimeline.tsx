import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import { AnimatedLine } from '../ui/AnimatedLine';
import { agendaDays } from '../../data/shanghai-summit';
import { ArrowRight } from 'lucide-react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const sectionText = {
  label: { en: 'PROGRAMME', zh: '项目日程' },
  heading: { en: 'What the 4-Day Programme Includes', zh: '四天项目包含哪些内容' },
  subline: { en: 'June 22-25, 2026 \u2014 Shanghai Qiantan', zh: '2026年6月22-25日 \u2014 上海前滩' },
  dayPrefix: { en: 'Day', zh: '第' },
  daySuffix: { en: '', zh: '天' },
};

function DayCard({
  day,
  index,
  isVisible,
}: {
  day: (typeof agendaDays)[0];
  index: number;
  isVisible: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const locale = currentLocale === 'zh-Hans' ? 'zh' : 'en';

  // Display label for merged Day 3&4
  const dayLabel = day.day === 3 ? '3&4' : String(day.day);
  const dayNumber = day.day === 3 ? '03-04' : String(day.day).padStart(2, '0');

  return (
    <div
      className="relative flex gap-6 lg:gap-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Timeline spine */}
      <div className="hidden sm:flex flex-col items-center flex-shrink-0 w-20 lg:w-28">
        {/* Pulsing dot */}
        <div className="relative">
          <div className="w-3 h-3 bg-[#AA7C52] rounded-full relative z-10" />
        </div>
        {/* Vertical line */}
        {index < agendaDays.length - 1 && (
          <div
            className="w-px flex-1 mt-3"
            style={{
              background: 'linear-gradient(to bottom, #AA7C52, transparent)',
              opacity: 0.2,
            }}
          />
        )}
      </div>

      {/* Day content card */}
      <div className="flex-1 group pb-14 lg:pb-20">
        {/* Day number & date */}
        <div className="flex items-baseline gap-4 mb-4">
          <span
            className="font-display text-5xl lg:text-7xl tracking-tight transition-colors duration-500"
            style={{ color: isHovered ? '#AA7C52' : 'rgba(170, 124, 82, 0.2)' }}
          >
            {dayNumber}
          </span>
          <p className="text-muted-foreground text-xs tracking-[0.15em] uppercase">
            {day.date}
          </p>
        </div>

        {/* Day image */}
        {day.image && (
          <div className="mb-5 overflow-hidden rounded-sm">
            <img
              src={day.image}
              alt={day.title.en}
              className="w-full h-auto object-cover max-h-[320px] sm:max-h-[400px]"
              loading="lazy"
            />
          </div>
        )}

        {/* Day title */}
        <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight text-foreground mb-4">
          {locale === 'zh'
            ? `${sectionText.dayPrefix.zh}${dayLabel}${sectionText.daySuffix.zh}：${day.title[locale]}`
            : `Day ${dayLabel}: ${day.title[locale]}`}
        </h3>

        {/* Description */}
        <p className={`text-muted-foreground leading-relaxed max-w-2xl text-sm sm:text-base ${day.note ? 'mb-4' : 'mb-6'}`}>
          {day.description[locale]}
        </p>

        {/* Note */}
        {day.note && (
          <p className="text-[#AA7C52] text-xs tracking-wide mb-6">
            {day.note[locale]}
          </p>
        )}

        {/* CTA */}
        {day.cta && (
          <div>
            {day.cta.highlight ? (
              /* Premium highlight button — subtle emphasis, no icons */
              <Link
                to={day.cta.href}
                className="group/btn relative inline-flex items-center gap-2.5 bg-[#AA7C52] text-white hover:text-white px-8 py-3.5 text-sm font-semibold overflow-hidden no-underline hover:no-underline transition-all duration-300 shadow-[0_0_16px_rgba(170,124,82,0.25)] hover:shadow-[0_0_24px_rgba(170,124,82,0.4)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                <span className="relative">{day.cta.label[locale]}</span>
                <ArrowRight className="w-4 h-4 relative transition-transform duration-300 group-hover/btn:translate-x-0.5" />
              </Link>
            ) : day.cta.external || day.cta.variant === 'solid' ? (
              /* Solid filled button */
              day.cta.external ? (
                <a
                  href={day.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn relative inline-flex items-center gap-2.5 bg-[#AA7C52] text-white hover:text-white px-6 py-3 text-sm font-medium overflow-hidden no-underline hover:no-underline transition-all duration-300 hover:shadow-[0_0_24px_rgba(170,124,82,0.25)]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative">{day.cta.label[locale]}</span>
                  <ArrowRight className="w-4 h-4 relative transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                </a>
              ) : (
                <Link
                  to={day.cta.href}
                  className="group/btn relative inline-flex items-center gap-2.5 bg-[#AA7C52] text-white hover:text-white px-6 py-3 text-sm font-medium overflow-hidden no-underline hover:no-underline transition-all duration-300 hover:shadow-[0_0_24px_rgba(170,124,82,0.25)]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative">{day.cta.label[locale]}</span>
                  <ArrowRight className="w-4 h-4 relative transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                </Link>
              )
            ) : (
              /* Outline button (default) */
              <Link
                to={day.cta.href}
                className="group/btn relative inline-flex items-center gap-2.5 border border-[#AA7C52]/50 text-[#AA7C52] px-6 py-3 text-sm font-medium hover:bg-[#AA7C52]/5 hover:border-[#AA7C52] transition-all duration-300 no-underline hover:no-underline"
              >
                {day.cta.label[locale]}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function AgendaTimeline() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const agendaLocale = currentLocale === 'zh-Hans' ? 'zh' : 'en';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="programme" ref={sectionRef} className="relative bg-background py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div
          className="mb-16 lg:mb-20 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <AnimatedLine variant="label" label={sectionText.label[agendaLocale]} />
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mt-6 gap-4">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground">
              {sectionText.heading[agendaLocale]}
            </h2>
            <p className="text-muted-foreground text-sm tracking-wider uppercase">
              {sectionText.subline[agendaLocale]}
            </p>
          </div>
        </div>

        {/* Timeline entries */}
        <div className="relative">
          {agendaDays.map((day, i) => (
            <DayCard key={day.day} day={day} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </div>
  );
}
