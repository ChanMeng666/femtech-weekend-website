import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import { AnimatedLine } from '../ui/AnimatedLine';
import { ArrowRight } from 'lucide-react';

const whyApplyPoints = [
  'Pitch directly to global investors and corporate partners in a curated, closed-door setting.',
  'Gain visibility with Bayer and other leading players actively sourcing in women\'s health.',
  'Access follow-on introductions, mentorship, and strategic support beyond the event.',
  'Join a select cohort of 20-30 companies chosen from a global applicant pool.',
];

export function CapitalSpotlight() {
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
        <div
          className="transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Section header */}
          <AnimatedLine variant="label" label="CAPITAL SPOTLIGHT" />
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground mt-6 max-w-4xl">
            Women&apos;s Health Capital Spotlight
          </h2>

          {/* Intro */}
          <div className="mt-8 max-w-3xl space-y-4">
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              In collaboration with Bayer, Day 2 of the programme features a dedicated
              Capital &amp; Pitch Day — a closed-door session where selected companies
              present to a curated audience of global investors, corporate venture arms,
              and strategic partners.
            </p>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              This is not a stage pitch. It is a structured, high-signal opportunity designed
              to create real conversations between founders and funders — with follow-on
              support built into the programme.
            </p>
          </div>

          {/* Two-column layout: Why Apply + Who It Is For */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mt-14">
            {/* Why Apply */}
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-normal tracking-tight text-foreground mb-6">
                Why Apply
              </h3>
              <ul className="space-y-4">
                {whyApplyPoints.map((point, i) => (
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
                Who It Is For
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Early and growth-stage women&apos;s health companies — across digital health,
                medical devices, diagnostics, biotech, and consumer health — who are
                seeking investment, strategic partnerships, or cross-border market access.
                Priority is given to companies with a clear product, initial traction, and
                a compelling vision for women&apos;s health globally.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-14">
            <Link
              to="/shanghai-summit/pitch"
              className="group relative inline-flex items-center gap-2.5 bg-[#AA7C52] text-white hover:text-white px-7 py-3.5 text-sm font-medium overflow-hidden no-underline hover:no-underline transition-all duration-300 hover:shadow-[0_0_24px_rgba(170,124,82,0.25)]"
            >
              <span className="relative">Submit Pitch Application</span>
              <ArrowRight className="w-4 h-4 relative transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
