import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { SUMMIT_META } from '../../data/shanghai-summit';
import { ArrowRight } from 'lucide-react';

const sectionText = {
  heading: { en: 'Choose Your Way In', zh: '选择您的参与方式' },
  description: {
    en: 'Three distinct tracks to participate \u2014 whether you want to attend, apply for the full programme, or pitch.',
    zh: '三种参与方式——无论您想参会、申请完整项目还是路演。',
  },
  trackLabel: { en: 'Track', zh: '方式' },
};

const tracks = [
  {
    title: { en: 'Attend the Conference', zh: '参加峰会' },
    description: {
      en: 'Join the flagship one-day international conference on Day 1, featuring keynotes, panels, and networking with global leaders in women\'s health.',
      zh: '参加第一天的旗舰国际峰会，聆听主题演讲、圆桌对话，并与全球女性健康领袖交流。',
    },
    note: null as { en: string; zh: string } | null,
    cta: { en: 'Get Conference Tickets', zh: '获取峰会门票' },
    href: SUMMIT_META.ticketUrl,
    external: true,
  },
  {
    title: { en: 'Apply for the Full Programme', zh: '申请完整项目' },
    description: {
      en: 'A curated 4-day experience including the conference, Capital & Pitch Day, and ecosystem visits \u2014 designed for companies serious about the China market.',
      zh: '精心策划的四天体验，涵盖峰会、资本与路演日和生态参访——专为认真对待中国市场的企业设计。',
    },
    note: { en: 'Curated access | Limited places', zh: '精选准入 | 名额有限' },
    cta: { en: 'Request Full Programme Access', zh: '申请完整项目' },
    href: '/shanghai-summit/programme',
    external: false,
  },
  {
    title: { en: 'Apply to Pitch', zh: '申请路演' },
    description: {
      en: 'A selective pitch opportunity on Day 2, led by Bayer, connecting founders with global investors and corporate partners in a closed-door setting.',
      zh: '第二天由拜耳主导的精选路演机会，在闭门环节中连接创始人与全球投资人及企业合作伙伴。',
    },
    note: { en: 'Selected companies only | Application required', zh: '仅限入选企业 | 需提交申请' },
    cta: { en: 'Submit Pitch Application', zh: '提交路演申请' },
    href: '/shanghai-summit/pitch',
    external: false,
  },
];

export function SummitCTA() {
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
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-background"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          className="mb-16 lg:mb-20"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground mb-4">
            {sectionText.heading[locale]}
          </h2>
          <p className="text-muted-foreground text-base max-w-lg leading-relaxed">
            {sectionText.description[locale]}
          </p>
        </div>

        {/* Track cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tracks.map((track, i) => (
            <div
              key={track.title.en}
              className="group relative border border-border bg-card p-8 sm:p-10 transition-all duration-500 hover:border-[#AA7C52]/30 border-t-2 border-t-transparent hover:border-t-[#AA7C52] flex flex-col"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 100}ms`,
              }}
            >
              <span className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase block mb-6">
                {sectionText.trackLabel[locale]} {i + 1}
              </span>

              <h3 className="font-display text-xl sm:text-2xl text-foreground mb-3 group-hover:text-[#AA7C52] transition-colors duration-300">
                {track.title[locale]}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                {track.description[locale]}
              </p>

              {track.note && (
                <p className="text-[#AA7C52] text-xs tracking-wide mb-6">
                  {track.note[locale]}
                </p>
              )}

              {track.external ? (
                <a
                  href={track.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#AA7C52] text-sm font-medium no-underline hover:no-underline"
                >
                  {track.cta[locale]}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              ) : (
                <Link
                  to={track.href}
                  className="inline-flex items-center gap-2 text-[#AA7C52] text-sm font-medium no-underline hover:no-underline"
                >
                  {track.cta[locale]}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
