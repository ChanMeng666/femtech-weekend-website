import React, { useEffect, useRef, useState } from 'react';
import { AnimatedLine } from '../ui/AnimatedLine';
import { partners } from '../../data/shanghai-summit';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

/* ── Visual-area normalisation ─────────────────────────────────────────
   Every logo is sized so its display area ≈ TARGET_AREA px².
   Wide logos stretch horizontally; square logos grow taller —
   the perceived "weight" stays roughly the same across the grid.        */
const TARGET_AREA = 4200;
const MAX_W = 150;
const MAX_H = 56;
const MIN_H = 24;

const ASPECT_RATIOS: Record<string, number> = {
  PwC: 2.07,
  Bayer: 1.0,
  HeraNova: 3.23,
  'GE Healthcare': 4.51,
  'Fosun Health Capital': 1.20,
  AVPN: 2.89,
  Foreground: 1.25,
  'Gobi Partners': 3.37,
  BD: 2.60,
  Roche: 1.92,
  'Raffles Medical': 3.42,
  'Renji Hospital': 1.01,
  Tigermed: 3.70,
  'China Merchants Bank': 1.0,
  HSBC: 4.61,
  Medtronic: 6.10,
  'Ministry of Foreign Affairs of Denmark': 4.43,
  'British Consulate': 6.44,
  'Government of Canada': 4.21,
  'Gates Foundation': 3.91,
};

function getLogoSize(name: string): { maxWidth: number; maxHeight: number } {
  const ratio = ASPECT_RATIOS[name] ?? 3.0;
  let h = Math.sqrt(TARGET_AREA / ratio);
  let w = h * ratio;
  if (w > MAX_W) { w = MAX_W; h = w / ratio; }
  if (h > MAX_H) { h = MAX_H; w = h * ratio; }
  if (h < MIN_H) { h = MIN_H; w = h * ratio; }
  return { maxWidth: Math.round(w), maxHeight: Math.round(h) };
}

/* ── Fixed card backgrounds ────────────────────────────────────────────
   Each logo sits on a card whose background never changes with the
   theme, guaranteeing contrast regardless of light/dark mode.
   - 'onLight' = white card  (for dark / coloured logos)
   - 'onDark'  = dark card   (for white / very-light logos)             */
type CardBg = 'onLight' | 'onDark';

const DARK_CARD_LOGOS = new Set([
  'AVPN',            // pure white fills
  'Raffles Medical', // pure white fills
  'Gobi Partners',   // near-white (#FEFEFE) text + yellow accent
]);

function getCardBg(name: string): CardBg {
  return DARK_CARD_LOGOS.has(name) ? 'onDark' : 'onLight';
}

const CARD_STYLES: Record<CardBg, string> = {
  onLight: 'bg-white',
  onDark: 'bg-slate-800',
};

const sectionText = {
  label: { en: 'LEADERSHIP COHORT', zh: '领导力群体' },
  heading: {
    en: 'Where Innovation Meets Sovereign and Institutional Access',
    zh: '创新与主权及机构资源的交汇',
  },
  subheading: {
    en: 'Our 2026 Leadership Cohort includes decision-makers from',
    zh: '我们2026年领导力群体汇聚来自以下机构的决策者',
  },
};

export function PartnersGrid() {
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
      { threshold: 0.05 }
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
          <p className="text-muted-foreground text-base sm:text-lg mt-4 leading-relaxed">
            {sectionText.subheading[locale]}
          </p>
        </div>

        {/* Logo grid */}
        <div
          className="flex justify-center transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transitionDelay: '200ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <ul className="inline-grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4 lg:grid-cols-5">
            {partners.map((partner) => {
              const { maxWidth, maxHeight } = getLogoSize(partner.name);
              const cardBg = getCardBg(partner.name);
              return (
                <li
                  key={partner.name}
                  className={`flex items-center justify-center rounded-xl px-5 py-5 ${CARD_STYLES[cardBg]}`}
                >
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={partner.name}
                    className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-300"
                    style={{ width: maxWidth, height: maxHeight }}
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
