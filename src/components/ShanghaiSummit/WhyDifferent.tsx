import React, { useEffect, useRef, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const t = {
  heading: { en: 'Why This Programme Is Different', zh: '为什么这个项目与众不同' },
  body: {
    en: "This is not simply a conference about women's health. It is a structured, relationship-driven programme designed to create lasting outcomes \u2014 real partnerships, real investment conversations, and real market access. Every element, from the curated pitch sessions to the ecosystem visits, is built to move things forward, not just inform. If you are serious about the China opportunity, this is where it starts.",
    zh: '这不仅仅是一场关于女性健康的会议。这是一个以关系为驱动的结构化项目，旨在创造持久成果——真正的合作伙伴关系、真正的投资对话和真正的市场准入。从精心策划的路演环节到生态参访，每一个环节都是为了推进实质性进展，而非仅提供信息。如果您对中国机遇认真以待，这里就是起点。',
  },
};

export function WhyDifferent() {
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
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="max-w-3xl"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground mb-8">
            {t.heading[locale]}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            {t.body[locale]}
          </p>
        </div>
      </div>
    </div>
  );
}
