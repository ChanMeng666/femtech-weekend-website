import React, { useEffect, useRef, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { AnimatedLine } from '../ui/AnimatedLine';
import { SUMMIT_META } from '../../data/shanghai-summit';

const ecosystemStats = [
  { value: '40+', label: { en: 'Countries', zh: '国家' }, detail: { en: 'Global reach', zh: '全球覆盖' } },
  { value: '500+', label: { en: 'Startups', zh: '初创企业' }, detail: { en: 'In the network', zh: '生态网络内' } },
  { value: '100K+', label: { en: 'Impressions', zh: '曝光量' }, detail: { en: 'LinkedIn monthly', zh: 'LinkedIn月度' } },
  { value: '200K+', label: { en: 'Followers', zh: '关注者' }, detail: { en: 'Community size', zh: '社区规模' } },
];

const t = {
  label: { en: 'GLOBAL NETWORK', zh: '全球网络' },
  heading: { en: 'FemTech Across Borders', zh: 'FemTech Across Borders' },
  description: {
    en: "FemTech Weekend is the China representative of FemTech Across Borders \u2014 a global network spanning 40+ countries, connecting women's health ecosystems worldwide.",
    zh: 'FemTech Weekend 是 FemTech Across Borders 的中国代表——一个覆盖40多个国家的全球网络，连接世界各地的女性健康生态系统。',
  },
  connecting: { en: 'Connecting', zh: '连接' },
  countries40: { en: '40+ Countries', zh: '40+个国家' },
  partners: { en: 'Partners', zh: '合作伙伴' },
};

export function GlobalEcosystem() {
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
    <div
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden bg-background"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <AnimatedLine
            variant="label"
            label={t.label[locale]}
            className="mb-6"
          />

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground mb-6 max-w-4xl">
            {t.heading[locale]}
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mb-14 leading-relaxed">
            {t.description[locale]}
          </p>
        </div>

        {/* Stats + Image layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-14">
          {/* Stats grid — 8 columns */}
          <div className="lg:col-span-8 grid grid-cols-2 gap-6">
            {ecosystemStats.map((stat) => (
              <div
                key={stat.label.en}
                className="group border border-border bg-card p-6 sm:p-8 transition-all duration-500 hover:border-[#AA7C52]/30 cursor-default"
              >
                <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#AA7C52] block mb-1 tracking-tight">
                  {stat.value}
                </span>
                <span className="text-foreground text-sm block mb-0.5">{stat.label[locale]}</span>
                <span className="text-muted-foreground text-[10px] tracking-wider uppercase">{stat.detail[locale]}</span>
              </div>
            ))}
          </div>

          {/* Shanghai skyline accent — 4 columns */}
          <div className="hidden lg:block lg:col-span-4 relative group">
            <div
              className="relative overflow-hidden h-full min-h-[240px] summit-image-overlay"
            >
              <img
                src="/img/shanghai/shanghai-skyline.jpg"
                alt="Shanghai Pudong skyline"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <span className="text-white/50 text-[10px] tracking-[0.2em] uppercase block mb-0.5">{t.connecting[locale]}</span>
                <span className="text-white font-display text-base">{t.countries40[locale]}</span>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-[#AA7C52]/40" />
          </div>
        </div>

        {/* Partner logos */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase">{t.partners[locale]}</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="flex flex-wrap items-center gap-6">
            {SUMMIT_META.partnerLogos.map((logo) => (
              <div
                key={logo.alt}
                className={`flex items-center justify-center px-8 py-5 border border-border transition-all duration-300 hover:border-[#AA7C52]/30 ${
                  logo.alt === 'Clincase'
                    ? 'bg-[#165e58]'
                    : 'bg-card'
                }`}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-10 sm:h-14 w-auto max-w-[200px] object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
