import React, { useEffect, useRef, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { AnimatedLine } from '../ui/AnimatedLine';
import { SUMMIT_META, FAB_FLYLINE_DATA } from '../../data/shanghai-summit';

const ecosystemStats = [
  { value: 20, suffix: '+', label: { en: 'Countries', zh: '国家' }, detail: { en: 'Global reach', zh: '全球覆盖' } },
  { value: 500, suffix: '+', label: { en: 'Startups', zh: '初创企业' }, detail: { en: 'In the network', zh: '生态网络内' } },
  { value: 50, suffix: '+', label: { en: 'Hubs', zh: '枢纽' }, detail: { en: 'Worldwide', zh: '遍布全球' } },
];

function useCountUp(target: number, isVisible: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, target, duration]);

  return count;
}

function FlatMapRenderer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let cancelled = false;
    const dom = containerRef.current;

    const initMap = async () => {
      try {
        const earthFlyLine = (await import('earth-flyline')).default;
        const geojson = (await import('../../data/world.json')).default;

        if (cancelled) return;

        earthFlyLine.registerMap('world', geojson as any);

        const chart = earthFlyLine.init({
          dom,
          map: 'world',
          autoRotate: false,
          mode: '2d',
          config: {
            R: 140,
            enableZoom: false,
            stopRotateByHover: false,
            bgStyle: {
              color: '#040D21',
              opacity: 0,
            },
            earth: {
              color: '#1a1510',
              dragConfig: {
                rotationSpeed: 0,
                inertiaFactor: 0,
                disableX: true,
                disableY: true,
              },
            },
            mapStyle: {
              areaColor: '#3d3028',
              lineColor: '#AA7C52',
            },
            spriteStyle: {
              color: '#AA7C52',
              show: false,
            },
            pathStyle: {
              color: '#D4A574',
              show: true,
            },
            flyLineStyle: {
              color: '#AA7C52',
            },
            scatterStyle: {
              color: '#AA7C52',
            },
            hoverRegionStyle: {
              areaColor: '#B58960',
              show: true,
            },
            regions: {
              China: {
                areaColor: '#4a3a2e',
              },
            },
          },
        });

        if (cancelled) {
          chart.destroy();
          return;
        }

        chart.addData('flyLine', FAB_FLYLINE_DATA);
        chartRef.current = chart;
      } catch (err) {
        console.error('Failed to initialize flat map:', err);
      }
    };

    initMap();

    return () => {
      cancelled = true;
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
      while (dom.firstChild) {
        dom.removeChild(dom.firstChild);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full"
      style={{ height: '100%', minHeight: '350px' }}
    />
  );
}

const t = {
  label: { en: 'GLOBAL NETWORK', zh: '全球网络' },
  heading: { en: 'FemTech Across Borders', zh: 'FemTech Across Borders' },
  description: {
    en: "FemTech Weekend is the China representative of FemTech Across Borders \u2014 a global network spanning 40+ countries, connecting women's health ecosystems worldwide.",
    zh: 'FemTech Weekend 是 FemTech Across Borders 的中国代表——一个覆盖40多个国家的全球网络，连接世界各地的女性健康生态系统。',
  },
  partners: { en: 'Partners', zh: '合作伙伴' },
};

function CountUpCard({
  stat,
  locale,
  isVisible,
}: {
  stat: (typeof ecosystemStats)[number];
  locale: 'en' | 'zh';
  isVisible: boolean;
}) {
  const count = useCountUp(stat.value, isVisible);
  return (
    <div className="group border border-white/10 bg-white/5 p-6 sm:p-8 transition-all duration-500 hover:border-[#AA7C52]/30 cursor-default">
      <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#AA7C52] block mb-1 tracking-tight">
        {count}{stat.suffix}
      </span>
      <span className="text-white text-sm block mb-0.5">{stat.label[locale]}</span>
      <span className="text-white/50 text-[10px] tracking-wider uppercase">{stat.detail[locale]}</span>
    </div>
  );
}

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
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden"
      style={{ backgroundColor: '#000000' }}
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

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white mb-6 max-w-4xl">
            {t.heading[locale]}
          </h2>

          <p className="text-white/60 text-base sm:text-lg max-w-2xl mb-14 leading-relaxed">
            {t.description[locale]}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
          {ecosystemStats.map((stat) => (
            <CountUpCard key={stat.label.en} stat={stat} locale={locale} isVisible={isVisible} />
          ))}
        </div>
      </div>

      {/* Flat World Map — full bleed */}
      <div
        className="w-full mb-14"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          height: 'clamp(400px, 50vw, 720px)',
        }}
      >
        <BrowserOnly fallback={<div style={{ height: '100%' }} />}>
          {() => <FlatMapRenderer />}
        </BrowserOnly>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Partner logos */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-white/50 text-[10px] tracking-[0.2em] uppercase">{t.partners[locale]}</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="flex flex-wrap items-center gap-6">
            {SUMMIT_META.partnerLogos.map((logo) => (
              <div
                key={logo.alt}
                className={`flex items-center justify-center px-8 py-5 border border-white/10 transition-all duration-300 hover:border-[#AA7C52]/30 ${
                  logo.alt === 'Clincase'
                    ? 'bg-[#165e58]'
                    : 'bg-white/5'
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
