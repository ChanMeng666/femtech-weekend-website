import React, { useEffect, useRef, useState } from 'react';
import { AnimatedLine } from '../ui/AnimatedLine';
import { teamMembers } from '../../data/team-members';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export function TeamSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const locale = currentLocale === 'zh-Hans' ? 'zh' : 'en';

  const founders = teamMembers.slice(0, 4);

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
        <div
          className="mb-16 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <AnimatedLine
            variant="label"
            label={locale === 'zh' ? '核心团队' : 'THE TEAM'}
          />
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground mt-6">
            FemTech Weekend
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mt-4 leading-relaxed">
            {locale === 'zh'
              ? '成立于2024年9月，我们的团队汇聚了金融、银行和咨询领域的专业人士，成员遍布欧洲和中国。'
              : 'Founded in September 2024, our team brings together professionals from finance, banking, and consulting, with members across Europe and China.'}
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}
        >
          {founders.map((member) => (
            <div
              key={member.id}
              className="group border border-border bg-card p-6 sm:p-8 transition-all duration-500 hover:border-[#AA7C52]/30"
            >
              {/* Photo with clipped shape */}
              <div
                className="mb-5 w-24 h-24 sm:w-28 sm:h-28 overflow-hidden bg-gradient-to-br from-[#AA7C52]/15 to-transparent"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)',
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <h4 className="font-display text-lg text-foreground group-hover:text-[#AA7C52] transition-colors duration-300">
                {member.name}
              </h4>
              <p className="text-[#AA7C52]/70 text-sm mt-1">{member.role[locale]}</p>
              <p className="text-muted-foreground text-xs mt-3 leading-relaxed line-clamp-3">
                {member.bio[locale]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
