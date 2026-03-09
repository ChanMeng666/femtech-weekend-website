import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { AnimatedLine } from '../ui/AnimatedLine';
import { ArrowRight } from 'lucide-react';

const whyApplyPoints = {
  en: [
    'Pitch directly to global investors and corporate partners in a curated, closed-door setting.',
    'Gain visibility with Bayer and other leading players actively sourcing in women\'s health.',
    'Access follow-on introductions, mentorship, and strategic support beyond the event.',
    'Join a select cohort of 20-30 companies chosen from a global applicant pool.',
  ],
  zh: [
    '在精心策划的闭门场景中，直接向全球投资人和企业合作伙伴路演。',
    '获得拜耳及其他正在积极寻找女性健康标的的行业领军者的关注。',
    '获取活动后续的介绍对接、导师指导和战略支持。',
    '加入从全球申请者中精选的20-30家企业的路演队列。',
  ],
};

const t = {
  label: { en: 'CAPITAL SPOTLIGHT', zh: '资本聚焦' },
  heading: { en: "Women's Health Capital Spotlight", zh: '女性健康资本聚焦' },
  intro1: {
    en: 'In collaboration with Bayer, Day 2 of the programme features a dedicated Capital & Pitch Day \u2014 a closed-door session where selected companies present to a curated audience of global investors, corporate venture arms, and strategic partners.',
    zh: '与拜耳联合举办，项目第二天为专场资本与路演日——入选企业在闭门环节中向精选的全球投资人、企业风投和战略合作伙伴进行展示。',
  },
  intro2: {
    en: 'This is not a stage pitch. It is a structured, high-signal opportunity designed to create real conversations between founders and funders \u2014 with follow-on support built into the programme.',
    zh: '这不是一场舞台展示。这是一个结构化、高价值的机会，旨在促成创始人与投资者之间的真实对话——后续支持已融入项目设计中。',
  },
  whyApply: { en: 'Why Apply', zh: '为什么申请' },
  whoFor: { en: 'Who It Is For', zh: '面向对象' },
  whoForDesc: {
    en: "Early and growth-stage women's health companies \u2014 across digital health, medical devices, diagnostics, biotech, and consumer health \u2014 who are seeking investment, strategic partnerships, or cross-border market access. Priority is given to companies with a clear product, initial traction, and a compelling vision for women's health globally.",
    zh: '早期和成长期女性健康企业——涵盖数字健康、医疗器械、诊断、生物技术和消费健康——正在寻求投资、战略合作或跨境市场准入。优先考虑拥有明确产品、初步市场验证和全球女性健康愿景的企业。',
  },
  cta: { en: 'Submit Pitch Application', zh: '提交路演申请' },
};

export function CapitalSpotlight() {
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
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-background py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Section header */}
          <AnimatedLine variant="label" label={t.label[locale]} />
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground mt-6 max-w-4xl">
            {t.heading[locale]}
          </h2>

          {/* Intro */}
          <div className="mt-8 max-w-3xl space-y-4">
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              {t.intro1[locale]}
            </p>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              {t.intro2[locale]}
            </p>
          </div>

          {/* Two-column layout: Why Apply + Who It Is For */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mt-14">
            {/* Why Apply */}
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-normal tracking-tight text-foreground mb-6">
                {t.whyApply[locale]}
              </h3>
              <ul className="space-y-4">
                {whyApplyPoints[locale].map((point, i) => (
                  <li key={i} className="flex gap-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
                    <span className="w-1.5 h-1.5 bg-[#AA7C52] rounded-full mt-2 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Who It Is For */}
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-normal tracking-tight text-foreground mb-6">
                {t.whoFor[locale]}
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {t.whoForDesc[locale]}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-14">
            <Link
              to="/shanghai-summit/pitch"
              className="group relative inline-flex items-center gap-2.5 bg-[#AA7C52] text-white hover:text-white px-7 py-3.5 text-sm font-medium overflow-hidden no-underline hover:no-underline transition-all duration-300 hover:shadow-[0_0_24px_rgba(170,124,82,0.25)]"
            >
              <span className="relative">{t.cta[locale]}</span>
              <ArrowRight className="w-4 h-4 relative transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
