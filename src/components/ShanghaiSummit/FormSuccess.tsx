import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import { ArrowRight } from 'lucide-react';

export interface SuccessStep {
  title: string;
  description: string;
}

interface FormSuccessProps {
  title: string;
  message: string;
  nextSteps?: (string | SuccessStep)[];
  nextStepsHeading?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function FormSuccess({
  title,
  message,
  nextSteps,
  nextStepsHeading = 'What Happens Next',
  ctaLabel = 'Back to Summit',
  ctaHref = '/shanghai-summit',
}: FormSuccessProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100);
    const t2 = setTimeout(() => setPhase(2), 700);
    const t3 = setTimeout(() => setPhase(3), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center px-4 py-20 overflow-hidden bg-background">
      <div className="relative z-10 max-w-lg w-full text-center">
        {/* Animated checkmark */}
        <div
          className="mx-auto mb-10 relative"
          style={{
            width: 100,
            height: 100,
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'scale(1)' : 'scale(0.5)',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <svg
            viewBox="0 0 100 100"
            fill="none"
            className="w-full h-full"
          >
            {/* Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#AA7C52"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{
                strokeDasharray: 283,
                strokeDashoffset: phase >= 1 ? 0 : 283,
                transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
              }}
            />
            {/* Checkmark */}
            <path
              d="M30 52 L45 66 L72 38"
              stroke="#AA7C52"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 60,
                strokeDashoffset: phase >= 1 ? 0 : 60,
                transition: 'stroke-dashoffset 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.7s',
              }}
            />
          </svg>
        </div>

        {/* Title */}
        <h1
          className="font-display text-3xl sm:text-4xl font-normal tracking-tight text-foreground mb-4"
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {title}
        </h1>

        {/* Message */}
        <p
          className="text-muted-foreground text-base sm:text-lg mb-8 leading-relaxed"
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
          }}
        >
          {message}
        </p>

        {/* Next steps */}
        {nextSteps && nextSteps.length > 0 && (
          <div
            className="text-left border border-border p-6 sm:p-8 mb-10 bg-card relative"
            style={{
              opacity: phase >= 3 ? 1 : 0,
              transform: phase >= 3 ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-8 h-8">
              <div className="absolute top-0 right-0 w-full h-px bg-[#AA7C52]/30" />
              <div className="absolute top-0 right-0 h-full w-px bg-[#AA7C52]/30" />
            </div>

            <h3 className="text-xs tracking-[0.15em] uppercase text-[#AA7C52] mb-4 font-medium">
              {nextStepsHeading}
            </h3>
            <ol className="space-y-4">
              {nextSteps.map((step, i) => {
                const isStructured = typeof step === 'object';
                return (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="font-mono text-[10px] text-[#AA7C52]/50 mt-0.5 flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {isStructured ? (
                      <div className="leading-relaxed">
                        <span className="font-medium text-foreground">{step.title}</span>
                        <br />
                        <span>{step.description}</span>
                      </div>
                    ) : (
                      <span className="leading-relaxed">{step}</span>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        )}

        {/* CTA */}
        <div
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          <Link
            to={ctaHref}
            className="group inline-flex items-center gap-2.5 bg-[#AA7C52] text-white hover:text-white px-8 py-3.5 text-sm font-medium no-underline hover:no-underline transition-all duration-300 hover:shadow-[0_0_24px_rgba(170,124,82,0.25)]"
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Bottom decorative line */}
        <div
          className="mx-auto mt-14 h-px w-16 bg-gradient-to-r from-transparent via-[#AA7C52]/30 to-transparent"
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transition: 'opacity 0.5s ease 0.5s',
          }}
        />
      </div>
    </div>
  );
}
