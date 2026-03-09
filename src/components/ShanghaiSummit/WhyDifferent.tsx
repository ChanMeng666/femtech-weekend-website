import React, { useEffect, useRef, useState } from 'react';

export function WhyDifferent() {
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
            Why This Programme Is Different
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            This is not simply a conference about women&apos;s health. It is a structured,
            relationship-driven programme designed to create lasting outcomes — real
            partnerships, real investment conversations, and real market access. Every
            element, from the curated pitch sessions to the ecosystem visits, is built
            to move things forward, not just inform. If you are serious about the China
            opportunity, this is where it starts.
          </p>
        </div>
      </div>
    </div>
  );
}
