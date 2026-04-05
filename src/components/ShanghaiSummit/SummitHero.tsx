import React, { useEffect, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { AnimatedLine } from '../ui/AnimatedLine';
import { ArrowDown } from 'lucide-react';

const t = {
  label: { en: 'SHANGHAI SUMMIT 2025', zh: '2025上海峰会' },
  headline: {
    en: "Cross-Border Capital & Partnerships in Women's Health",
    zh: '女性健康领域的跨境资本与合作',
  },
  description: {
    en: "Bringing together leaders across women's health, innovation, investment, and industry to explore where the sector is going next — and why China matters in that future.",
    zh: '汇聚女性健康、创新、投资和产业领域的领袖，共同探索行业未来方向——以及中国在其中的重要角色。',
  },
  dateLocation: {
    en: '22 - 25 June 2025 · Shanghai, China',
    zh: '2025年6月22-25日 · 中国上海',
  },
  ctaProgramme: { en: 'VIEW PROGRAMME', zh: '查看日程' },
};

export function SummitHero() {
  const [isVisible, setIsVisible] = useState(false);
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const locale = currentLocale === 'zh-Hans' ? 'zh' : 'en';

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Full-bleed Shanghai image background */}
      <img
        src="/img/shanghai/shanghai-hero.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content on top */}
      <div
        className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32 text-center"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Label */}
        <AnimatedLine
          variant="label"
          label={t.label[locale]}
          className="mb-8 justify-center [&_span]:text-white/70"
        />

        {/* Main headline */}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-white mb-8 max-w-4xl mx-auto leading-[1.15]">
          {t.headline[locale]}
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-6 leading-relaxed font-body">
          {t.description[locale]}
        </p>

        {/* Date & Location */}
        <p className="text-sm sm:text-base text-[#D4A574] tracking-wider font-medium mb-14">
          {t.dateLocation[locale]}
        </p>

        {/* CTA */}
        <div className="flex justify-center">
          <a
            href="#programme"
            className="group inline-flex items-center gap-2.5 bg-[#AA7C52] text-white hover:text-white px-8 py-4 text-sm font-semibold tracking-wider overflow-hidden no-underline hover:no-underline transition-all duration-300 hover:shadow-[0_0_24px_rgba(170,124,82,0.35)] hover:bg-[#96693f]"
          >
            <span>{t.ctaProgramme[locale]}</span>
            <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
