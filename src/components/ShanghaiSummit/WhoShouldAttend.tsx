import React, { useEffect, useRef, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { AnimatedLine } from '../ui/AnimatedLine';
import {
  Rocket,
  TrendingUp,
  Building2,
  Network,
  type LucideIcon,
} from 'lucide-react';

interface AudienceItem {
  id: string;
  title: string;
  highlight: string;
  description: string;
  icon: LucideIcon;
}

const audienceItems: AudienceItem[] = [
  {
    id: 'innovators',
    title: 'Global Innovators',
    highlight: 'BUILDING',
    description:
      "in women's health and looking for visibility, partnerships, capital, or sharper cross-border insight that travels globally",
    icon: Rocket,
  },
  {
    id: 'investors',
    title: 'For Investors',
    highlight: 'SEEKING',
    description:
      "stronger understanding of the category, founder exposure, and government perspectives on China's role in the future of women's health.",
    icon: TrendingUp,
  },
  {
    id: 'industry',
    title: 'Industry Partners',
    highlight: 'EXPLORING',
    description:
      "innovation, strategic collaboration, market signals, and where women's health is gaining real global momentum.",
    icon: Building2,
  },
  {
    id: 'ecosystem',
    title: 'For Ecosystem Leaders',
    highlight: 'CONVENING',
    description:
      ', shaping, and supporting the field across policy, research, delivery, global exchange, and ecosystem development.',
    icon: Network,
  },
];

const sectionText = {
  label: { en: 'AUDIENCE', zh: '参会对象' },
  heading: { en: 'Who Should Be in the Room', zh: '谁应该在场' },
  subline: {
    en: "Designed for stakeholders who want to engage seriously with the future of women's health across markets.",
    zh: '专为希望认真参与跨市场女性健康未来的利益相关者而设计。',
  },
};

export function WhoShouldAttend() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();
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
    <div
      ref={sectionRef}
      className="relative bg-background py-20 sm:py-28 lg:py-32 overflow-hidden"
    >
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
          <AnimatedLine variant="label" label={sectionText.label[locale]} />
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mt-6 gap-4">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground">
              {sectionText.heading[locale]}
            </h2>
          </div>
          <p className="text-muted-foreground text-base sm:text-lg mt-4 max-w-3xl leading-relaxed">
            {sectionText.subline[locale]}
          </p>
        </div>

        {/* Audience list — single column */}
        <div className="max-w-3xl space-y-0">
          {audienceItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative flex gap-5 sm:gap-6 py-8 first:pt-0 last:pb-0"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                  transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${100 * index}ms`,
                }}
              >
                {/* Divider line — above each item except the first */}
                {index > 0 && (
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{
                      background: 'linear-gradient(to right, #AA7C52, transparent)',
                      opacity: 0.15,
                    }}
                  />
                )}

                {/* Icon */}
                <div className="flex-shrink-0 mt-0.5">
                  <Icon
                    size={22}
                    strokeWidth={1.5}
                    className="text-[#AA7C52] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-normal tracking-tight text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    <span className="text-[#AA7C52] font-medium tracking-wide text-xs uppercase">
                      {item.highlight}
                    </span>{' '}
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
