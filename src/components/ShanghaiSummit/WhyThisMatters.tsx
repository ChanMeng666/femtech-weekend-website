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
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-background py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div
          className="mb-20 lg:mb-28 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <AnimatedLine variant="label" label="WHY THIS MATTERS" />
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground mt-6 max-w-3xl">
            The Convergence of Capital, Policy &amp; Innovation
          </h2>
        </div>

        {/* Narrative blocks */}
        <div className="space-y-24 lg:space-y-32">
          {narrativeBlocks.map((block, i) => (
            <div
              key={block.label}
              className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-20 items-start`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${(i + 1) * 180}ms`,
              }}
            >
              {/* Content side */}
              <div className="flex-1">
                {/* Label with index */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-muted-foreground/40">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="h-px w-6 bg-[#AA7C52]/40" />
                  <span className="text-[#AA7C52] text-xs tracking-[0.2em] font-medium">
                    {block.label}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-5 leading-tight">
                  {block.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed text-base">
                  {block.content}
                </p>
              </div>

              {/* Stat card — elevated design */}
              {block.stat && (
                <div className="flex-shrink-0 w-full lg:w-72">
                  <div
                    className="relative border border-border p-8 bg-card overflow-hidden group hover:border-[#AA7C52]/30 transition-colors duration-500"
                  >
                    {/* Decorative corner */}
                    <div className="absolute top-0 right-0 w-12 h-12">
                      <div className="absolute top-0 right-0 w-full h-px bg-[#AA7C52]/30" />
                      <div className="absolute top-0 right-0 h-full w-px bg-[#AA7C52]/30" />
                    </div>

                    <span className="font-display text-4xl sm:text-5xl text-[#AA7C52] block mb-3 tracking-tight">
                      {block.stat.value}
                    </span>
                    <div className="h-px w-8 bg-border mb-3" />
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {block.stat.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Spacer for blocks without stats — keep visual rhythm */}
              {!block.stat && (
                <div className="hidden lg:block flex-shrink-0 w-72" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
