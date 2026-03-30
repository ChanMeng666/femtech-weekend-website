import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { AnimatedLine } from '../ui/AnimatedLine';
import { SUMMIT_META } from '../../data/shanghai-summit';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';

const t = {
  label: { en: 'SHANGHAI SUMMIT 2026', zh: '2026上海峰会' },
  date: { en: 'JUNE 22-25, 2026', zh: '2026年6月22-25日' },
  location: { en: 'SHANGHAI, CHINA', zh: '中国·上海' },
  headline: {
    en: ['Cross-Border Capital,', 'Partnerships,', 'Market Access in'],
    zh: ['跨境资本、', '合作伙伴', '与市场准入——'],
  },
  headlineAccent: { en: "Women's Health", zh: '女性健康' },
  description: {
    en: 'A 4-day China programme in Shanghai connecting global and Chinese leaders through a flagship conference, a dedicated capital and pitch day, and curated ecosystem visits.',
    zh: '为期四天的上海中国项目，通过旗舰峰会、资本与路演日及精选生态参访，连接全球与中国女性健康领袖。',
  },
  ctaTickets: { en: 'Get Conference Tickets', zh: '获取峰会门票' },
  ctaProgramme: { en: 'Request Full Programme Access', zh: '申请完整项目' },
  ctaPitch: { en: 'Submit Pitch Application', zh: '提交路演申请' },
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
    <div className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Full-bleed Shanghai image background */}
      <img
        src="/img/shanghai/shanghai-bund.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Light overlay for text readability */}
      <div className="absolute inset-0 bg-white/75" />
      {/* Brand gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent" />

      {/* Content on top */}
      <div
        className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32"
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
          className="mb-8"
        />

        {/* Date + Location */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <span className="inline-flex items-center gap-2 text-[#AA7C52] text-sm tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            {t.date[locale]}
          </span>
          <span className="h-3 w-px bg-border hidden sm:block" />
          <span className="inline-flex items-center gap-2 text-muted-foreground text-sm tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            {t.location[locale]}
          </span>
        </div>

        {/* Main headline */}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[5rem] font-normal tracking-tight text-foreground mb-8 max-w-5xl leading-[1.05]">
          {t.headline[locale][0]}{' '}
          {t.headline[locale][1]}{' '}
          <span className="text-[#AA7C52]">&amp;</span>{' '}
          {t.headline[locale][2]}{' '}
          <span className="relative inline-block">
            {t.headlineAccent[locale]}
            <span className="absolute -bottom-2 left-0 w-full h-px bg-[#AA7C52]/40" />
          </span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-14 leading-relaxed font-body">
          {t.description[locale]}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <a
            href={SUMMIT_META.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2.5 bg-[#AA7C52] text-white hover:text-white px-7 py-3.5 text-sm font-medium overflow-hidden no-underline hover:no-underline transition-all duration-300 hover:shadow-[0_0_24px_rgba(170,124,82,0.25)]"
          >
            <span className="relative">{t.ctaTickets[locale]}</span>
            <ArrowRight className="w-4 h-4 relative transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <Link
            to="/shanghai-summit/programme"
            className="group inline-flex items-center gap-2.5 border border-[#AA7C52]/40 text-[#AA7C52] px-7 py-3.5 text-sm font-medium hover:bg-[#AA7C52]/5 hover:border-[#AA7C52]/70 transition-all duration-300 no-underline hover:no-underline"
          >
            {t.ctaProgramme[locale]}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/shanghai-summit/pitch"
            className="group inline-flex items-center gap-2.5 border border-border text-muted-foreground px-7 py-3.5 text-sm font-medium hover:border-[#AA7C52]/30 hover:text-foreground transition-all duration-300 no-underline hover:no-underline"
          >
            {t.ctaPitch[locale]}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
