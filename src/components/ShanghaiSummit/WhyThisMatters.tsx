import React, { useEffect, useRef, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { AnimatedLine } from '../ui/AnimatedLine';

interface BenefitCard {
  title: { en: string; zh: string };
  description: { en: string; zh: string };
}

const benefitCards: BenefitCard[] = [
  {
    title: { en: 'Breadth of Opportunity', zh: '广阔的机遇' },
    description: {
      en: 'From fertility to healthy ageing, China\'s women\'s health market spans the full lifecycle — with growing demand, rising investment, and policy tailwinds accelerating every segment.',
      zh: '从生育到健康老龄化，中国女性健康市场覆盖全生命周期——需求增长、投资涌入、政策东风正在加速每一个细分领域。',
    },
  },
  {
    title: { en: 'Execution at Speed', zh: '高效的执行力' },
    description: {
      en: 'China\'s innovation ecosystem moves quickly — from pilot to scale, from concept to commercialisation. This programme gives you a front-row seat to how it works.',
      zh: '中国的创新生态系统运转迅速——从试点到规模化，从概念到商业化。本项目让您亲身体验这一高效运作。',
    },
  },
  {
    title: { en: 'Partnership Potential', zh: '合作潜力' },
    description: {
      en: 'Connect with the investors, corporates, hospitals, and distribution partners who are actively building the next chapter of women\'s health in China.',
      zh: '对接正在积极构建中国女性健康下一篇章的投资人、企业、医院和渠道合作伙伴。',
    },
  },
  {
    title: { en: 'Global Takeaways', zh: '全球收获' },
    description: {
      en: 'Gain lessons, models, and relationships that strengthen your business — whether you\'re entering the China market or applying its pace and scale elsewhere.',
      zh: '获得经验、模式和人脉，助力您的业务——无论是进入中国市场还是将其速度与规模应用到其他地区。',
    },
  },
];

const sectionText = {
  label: { en: 'WHY CHINA, WHY NOW', zh: '为什么是中国，为什么是现在' },
  heading: {
    en: 'The Opportunity Is No Longer One to Watch from a Distance',
    zh: '这个机遇已不再是隔岸观火',
  },
  description: {
    en: 'China\u2019s women\u2019s health opportunity is no longer one to watch from a distance. The market is moving \u2014 fast. Policy support is growing, capital is flowing, and the ecosystem is ready for global collaboration. This programme puts you at the centre of it.',
    zh: '中国女性健康的机遇已不再是远观即可。市场正在快速变化，政策支持不断增强，资本持续流入，生态系统已为全球合作做好准备。本项目将带您置身其中。',
  },
};

export function WhyThisMatters() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const { i18n: { currentLocale } } = useDocusaurusContext();
  const locale = currentLocale === 'zh-Hans' ? 'zh' : 'en';

  return (
    <div ref={sectionRef} className="relative bg-background py-20 sm:py-28 lg:py-32 overflow-hidden">
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
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground mt-6 max-w-4xl">
            {sectionText.heading[locale]}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mt-6 leading-relaxed">
            {sectionText.description[locale]}
          </p>
        </div>

        {/* 2x2 grid of benefit cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefitCards.map((card, i) => (
            <div
              key={card.title.en}
              className="group border border-border bg-card p-8 sm:p-10 transition-all duration-500 hover:border-[#AA7C52]/30 relative"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 100}ms`,
              }}
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-8 h-8">
                <div className="absolute top-0 right-0 w-full h-px bg-[#AA7C52]/30 transition-all duration-500 group-hover:w-12" />
                <div className="absolute top-0 right-0 h-full w-px bg-[#AA7C52]/30 transition-all duration-500 group-hover:h-12" />
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-muted-foreground/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="h-px w-6 bg-[#AA7C52]/40" />
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-normal tracking-tight text-foreground mb-4 leading-tight group-hover:text-[#AA7C52] transition-colors duration-300">
                {card.title[locale]}
              </h3>

              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {card.description[locale]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
