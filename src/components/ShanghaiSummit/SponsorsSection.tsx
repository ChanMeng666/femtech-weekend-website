import React, { useEffect, useRef, useState } from 'react';
import { AnimatedLine } from '../ui/AnimatedLine';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type Sponsor = {
  name: string;
  logo: string;
  url: string;
  cardBg: 'light' | 'dark';
};

type SponsorTier = {
  label: { en: string; zh: string };
  sponsors: Sponsor[];
  placeholder?: { en: string; zh: string };
};

const TIERS: SponsorTier[] = [
  {
    label: { en: 'Co-Convener', zh: '联合召集人' },
    sponsors: [],
    placeholder: { en: 'Government partners — to be confirmed', zh: '政府合作伙伴——待确认' },
  },
  {
    label: { en: 'Strategic Partners', zh: '战略合作伙伴' },
    sponsors: [
      { name: 'Bayer', logo: '/img/summit-partners/bayer.svg', url: 'https://www.bayer.com/en/', cardBg: 'light' },
      { name: 'PwC', logo: '/img/summit-partners/pwc.svg', url: 'https://www.pwc.co.uk/', cardBg: 'light' },
    ],
  },
  {
    label: { en: 'Gold Sponsors', zh: '金牌赞助商' },
    sponsors: [
      { name: 'HeraNova', logo: '/img/summit-partners/heranova.svg', url: 'https://heranova.com/', cardBg: 'light' },
      { name: 'GE Healthcare', logo: '/img/summit-partners/ge-healthcare.svg', url: 'https://www.gehealthcare.co.uk/', cardBg: 'light' },
    ],
  },
  {
    label: { en: 'Silver Sponsors', zh: '银牌赞助商' },
    sponsors: [],
  },
];

const sectionText = {
  label: { en: 'SPONSORS', zh: '赞助商' },
  heading: {
    en: 'Powering the Future of Women\'s Health',
    zh: '驱动女性健康的未来',
  },
};

const CARD_BG = { light: 'bg-white', dark: 'bg-slate-800' } as const;

export function SponsorsSection() {
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
      { threshold: 0.05 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-background py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        {/* Section header */}
        <div
          className="max-w-3xl mx-auto text-center mb-16 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <AnimatedLine variant="label" label={sectionText.label[locale]} />
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground mt-6">
            {sectionText.heading[locale]}
          </h2>
        </div>

        {/* Sponsor tiers */}
        <div className="space-y-12">
          {TIERS.map((tier, i) => (
            <div
              key={tier.label.en}
              className="transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                transitionDelay: `${200 + i * 100}ms`,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Tier label */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-muted-foreground text-xs tracking-[0.15em] uppercase font-medium whitespace-nowrap">
                  {tier.label[locale]}
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Sponsor logos or placeholder */}
              {tier.sponsors.length > 0 ? (
                <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                  {tier.sponsors.map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={s.name}
                      className={`flex items-center justify-center rounded-xl px-6 py-5 opacity-80 hover:opacity-100 transition-opacity duration-300 ${CARD_BG[s.cardBg]}`}
                    >
                      <img
                        src={s.logo}
                        alt={s.name}
                        className="h-10 sm:h-14 w-auto max-w-[180px] object-contain"
                        loading="lazy"
                      />
                    </a>
                  ))}
                </div>
              ) : tier.placeholder ? (
                <p className="text-muted-foreground/60 text-sm italic">
                  {tier.placeholder[locale]}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
