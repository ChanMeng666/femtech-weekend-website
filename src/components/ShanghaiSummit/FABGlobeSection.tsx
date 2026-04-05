import React, { useEffect, useRef, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { AnimatedLine } from '../ui/AnimatedLine';
import { FAB_FLYLINE_DATA } from '../../data/shanghai-summit';

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
              color: '#2a2218',
            },
            mapStyle: {
              areaColor: '#3d3028',
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
      style={{ backgroundColor: '#000000' }}
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
