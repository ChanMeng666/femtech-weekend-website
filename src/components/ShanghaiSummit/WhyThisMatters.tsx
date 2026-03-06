import React, { useEffect, useRef, useState } from 'react';
import { AnimatedLine } from '../ui/AnimatedLine';

interface NarrativeBlock {
  label: string;
  title: string;
  content: string;
  stat?: { value: string; description: string };
}

const narrativeBlocks: NarrativeBlock[] = [
  {
    label: 'THE OPPORTUNITY',
    title: "Women's Health Gap = A $1 Trillion Opportunity",
    content:
      'Until 1993, medical research used the male body as the "default template," systematically excluding women from clinical trials. The historical research bias still affects diagnostic criteria, treatment plans, and drug dosages today. Closing the women\'s health gap could generate approximately $1 trillion in annual global economic value by 2040.',
    stat: { value: '$1T', description: 'Annual economic opportunity by 2040 — McKinsey & WEF' },
  },
  {
    label: 'GLOBAL MOMENTUM',
    title: 'Gates, Milken, Davos Are All In',
    content:
      'The Gates Foundation is investing $2.5 billion by 2030 to advance 40+ innovations in women\'s health. The Milken Institute launched a new Women\'s Health Network chaired by Former First Lady Jill Biden. Davos 2025 featured "Investing in Women\'s Health" as a key theme. The global capital shift is accelerating.',
    stat: { value: '$2.5B', description: "Gates Foundation investment in women's health by 2030" },
  },
  {
    label: 'REDEFINING HEALTH',
    title: "Women's Health Is Not Just Reproductive Health",
    content:
      "Women's health encompasses conditions that exclusively affect women (menstrual health, gynecological diseases, menopause, female oncology), conditions that disproportionately affect women (migraines, osteoporosis, autoimmune diseases, UTIs, depression), and conditions with different manifestations in women (cardiovascular disease, diabetes, Alzheimer's).",
  },
  {
    label: 'CHINA CONTEXT',
    title: 'China: The Largest Untapped Market',
    content:
      "China's 2025 birth rate dropped to 5.63 per thousand — the lowest among the world's most populous nations. The State Council has issued comprehensive policies to advance women's health services, cervical/breast cancer screening, and HPV vaccination. This creates massive demand for innovative women's health solutions.",
    stat: { value: '5.63\u2030', description: "China's birth rate in 2025 — a historic low" },
  },
];

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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-background py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="mb-16 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <AnimatedLine variant="label" label="WHY THIS MATTERS" />
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground mt-6">
            The Convergence of Capital, Policy &amp; Innovation
          </h2>
        </div>

        <div className="space-y-20 lg:space-y-28">
          {narrativeBlocks.map((block, i) => (
            <div
              key={block.label}
              className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-start transition-all duration-700`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: `${(i + 1) * 150}ms`,
              }}
            >
              {/* Content */}
              <div className="flex-1">
                <span className="mckinsey-label text-[#AA7C52] mb-3 block">
                  {block.label}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-4">
                  {block.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                  {block.content}
                </p>
              </div>

              {/* Stat card */}
              {block.stat && (
                <div className="flex-shrink-0 w-full lg:w-80">
                  <div className="border border-border p-8 bg-card">
                    <span className="font-display text-4xl sm:text-5xl text-[#AA7C52] block mb-3">
                      {block.stat.value}
                    </span>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {block.stat.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
