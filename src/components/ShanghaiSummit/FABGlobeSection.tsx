import React, { useEffect, useRef, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { AnimatedLine } from '../ui/AnimatedLine';

const SHANGHAI = { lon: 121.47, lat: 31.23 };

const COUNTRY_COORDS: Record<string, { lon: number; lat: number }> = {
  Canada: { lon: -106.35, lat: 56.13 },
  China: { lon: 104.20, lat: 35.86 },
  France: { lon: 2.21, lat: 46.23 },
  Ireland: { lon: -8.24, lat: 53.41 },
  Switzerland: { lon: 8.23, lat: 46.82 },
  Ukraine: { lon: 31.17, lat: 48.38 },
  Israel: { lon: 34.85, lat: 31.05 },
  Mexico: { lon: -102.55, lat: 23.63 },
  Denmark: { lon: 9.50, lat: 56.26 },
  'United Kingdom': { lon: -3.44, lat: 55.38 },
  Japan: { lon: 138.25, lat: 36.20 },
  'United States': { lon: -95.71, lat: 37.09 },
  Italy: { lon: 12.57, lat: 41.87 },
  Germany: { lon: 10.45, lat: 51.17 },
  Singapore: { lon: 103.82, lat: 1.35 },
  Vietnam: { lon: 108.28, lat: 14.06 },
  Philippines: { lon: 121.77, lat: 12.88 },
  Indonesia: { lon: 106.52, lat: -6.10 },
  Thailand: { lon: 100.99, lat: 15.87 },
  Korea: { lon: 127.77, lat: 35.91 },
  Bhutan: { lon: 90.43, lat: 27.51 },
  Malaysia: { lon: 101.98, lat: 4.21 },
  Norway: { lon: 8.47, lat: 60.47 },
  Sweden: { lon: 18.64, lat: 60.13 },
  Netherlands: { lon: 5.29, lat: 52.13 },
  Finland: { lon: 25.75, lat: 61.92 },
  Iceland: { lon: -19.02, lat: 64.96 },
  Greenland: { lon: -42.60, lat: 71.71 },
  Spain: { lon: -3.75, lat: 40.46 },
  Australia: { lon: 133.78, lat: -25.27 },
  Russia: { lon: 105.32, lat: 61.52 },
  Uzbekistan: { lon: 64.59, lat: 41.38 },
  Kazakhstan: { lon: 66.92, lat: 48.02 },
  Argentina: { lon: -63.62, lat: -38.42 },
  Brazil: { lon: -51.93, lat: -14.24 },
  Uruguay: { lon: -55.77, lat: -32.52 },
  UAE: { lon: 53.85, lat: 23.42 },
  Kenya: { lon: 37.91, lat: -0.02 },
  'South Africa': { lon: 22.94, lat: -30.56 },
};

// All countries fly INTO Shanghai
const FLYLINE_DATA = Object.entries(COUNTRY_COORDS).map(([name, coords]) => ({
  from: { id: name, ...coords },
  to: { id: 'shanghai', ...SHANGHAI },
}));

function GlobeRenderer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let cancelled = false;
    const dom = containerRef.current;

    const initGlobe = async () => {
      try {
        const earthFlyLine = (await import('earth-flyline')).default;
        const geojson = (await import('../../data/world.json')).default;

        if (cancelled) return;

        earthFlyLine.registerMap('world', geojson as any);

        const chart = earthFlyLine.init({
          dom,
          map: 'world',
          autoRotate: true,
          rotateSpeed: 0.01,
          mode: '3d',
          config: {
            R: 140,
            enableZoom: false,
            stopRotateByHover: true,
            bgStyle: {
              color: '#040D21',
              opacity: 0,
            },
            earth: {
              color: '#1a1410',
            },
            mapStyle: {
              areaColor: '#2a2420',
              lineColor: '#AA7C52',
            },
            spriteStyle: {
              color: '#AA7C52',
              show: true,
            },
            pathStyle: {
              color: '#D4A574',
            },
            flyLineStyle: {
              color: '#AA7C52',
            },
            scatterStyle: {
              color: '#AA7C52',
            },
            hoverRegionStyle: {
              areaColor: '#B58960',
            },
            regions: {
              China: {
                areaColor: '#3d2e22',
              },
            },
          },
        });

        if (cancelled) {
          chart.destroy();
          return;
        }

        chart.addData('flyLine', FLYLINE_DATA);
        chartRef.current = chart;
      } catch (err) {
        console.error('Failed to initialize globe:', err);
      }
    };

    initGlobe();

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

const HL: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-white font-semibold">{children}</span>
);

const t = {
  label: { en: 'FEMTECH ACROSS BORDERS', zh: 'FEMTECH ACROSS BORDERS' },
};

function CopyEN() {
  return (
    <div className="space-y-5">
      <p className="text-base sm:text-lg leading-relaxed text-white/70">
        <HL>FemTech Across Borders (FAB)</HL> is a global consortium connecting
        women's health ecosystems across borders. It is founded on a simple
        belief: the future of women's health innovation will be shaped not by one
        market alone, but through deeper exchange between ecosystems,
        institutions, and operators around the world.
      </p>
      <p className="text-base sm:text-lg leading-relaxed text-white/70">
        As FAB's China representative, <HL>FemTech Weekend</HL> is bringing this
        vision to life in Shanghai through a curated programme designed to foster
        more meaningful cross-border dialogue.
      </p>
      <p className="text-base sm:text-lg leading-relaxed text-white/70">
        The programme is organised in strategic partnership with{' '}
        <HL>Bayer Women's Healthcare</HL> and <HL>PwC</HL>, and co-convened with
        the <HL>Shanghai Government</HL>.
      </p>
    </div>
  );
}

function CopyZH() {
  return (
    <div className="space-y-5">
      <p className="text-base sm:text-lg leading-relaxed text-white/70">
        <HL>FemTech Across Borders (FAB)</HL>{' '}
        是一个连接全球女性健康生态系统的国际联盟。它建立在一个简单的信念之上：女性健康创新的未来不会由单一市场塑造，而是通过全球生态系统、机构和运营者之间更深层次的交流来推动。
      </p>
      <p className="text-base sm:text-lg leading-relaxed text-white/70">
        作为 FAB 的中国代表，<HL>FemTech Weekend</HL>{' '}
        正在上海将这一愿景变为现实，通过精心策划的项目促进更有意义的跨境对话。
      </p>
      <p className="text-base sm:text-lg leading-relaxed text-white/70">
        该项目与<HL>拜耳女性健康事业部</HL>和<HL>普华永道</HL>战略合作，并与
        <HL>上海市政府</HL>联合召集。
      </p>
    </div>
  );
}

export function FABGlobeSection() {
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
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: '#040D21' }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <div
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <AnimatedLine variant="label">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
                  {t.label[locale]}
                </span>
              </AnimatedLine>
            </div>

            <div
              className="mt-8"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: '150ms',
              }}
            >
              {locale === 'zh' ? <CopyZH /> : <CopyEN />}
            </div>
          </div>

          {/* Right: Globe */}
          <div
            className="relative"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '400ms',
              height: '500px',
            }}
          >
            <BrowserOnly fallback={<div style={{ height: '100%' }} />}>
              {() => <GlobeRenderer />}
            </BrowserOnly>
          </div>
        </div>
      </div>
    </section>
  );
}
