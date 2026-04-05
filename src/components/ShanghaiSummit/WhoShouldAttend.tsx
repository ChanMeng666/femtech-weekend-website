import React, { useEffect, useRef, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { AnimatedLine } from '../ui/AnimatedLine';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import {
  Rocket,
  TrendingUp,
  Building2,
  Network,
  ChevronRight,
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

function AudienceCard({
  item,
  index,
  isVisible,
}: {
  item: AudienceItem;
  index: number;
  isVisible: boolean;
}) {
  const Icon = item.icon;

  return (
    <Collapsible defaultOpen={index === 0}>
      <div
        className="group border border-[#AA7C52]/10 hover:border-[#AA7C52]/30 rounded-sm transition-all duration-500 hover:shadow-[0_0_24px_rgba(170,124,82,0.06)]"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
          transitionProperty: 'opacity, transform, border-color, box-shadow',
          transitionDuration: '700ms',
          transitionDelay: `${150 * index}ms`,
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left">
          <div className="flex items-center gap-4">
            {/* Icon container */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#AA7C52]/20 bg-[#AA7C52]/5 transition-colors duration-300 group-hover:bg-[#AA7C52]/10 group-hover:border-[#AA7C52]/30">
              <Icon
                size={20}
                className="text-[#AA7C52] transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div>
              <span className="font-display text-lg sm:text-xl font-semibold tracking-tight text-foreground">
                {item.title}
              </span>
            </div>
          </div>
          <ChevronRight
            size={18}
            className="shrink-0 text-[#AA7C52]/50 transition-transform duration-200 [[data-state=open]_&]:rotate-90"
          />
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
            <div className="ml-15 pl-[60px]">
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                <span className="text-[#AA7C52] font-semibold tracking-wide">
                  {item.highlight}
                </span>{' '}
                {item.description}
              </p>
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

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
          <div className="mt-6">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground">
              {sectionText.heading[locale]}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mt-4 max-w-3xl leading-relaxed">
              {sectionText.subline[locale]}
            </p>
          </div>
        </div>

        {/* Audience cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {audienceItems.map((item, index) => (
            <AudienceCard
              key={item.id}
              item={item}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
