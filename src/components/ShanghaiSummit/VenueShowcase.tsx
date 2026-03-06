import React, { useEffect, useRef, useState } from 'react';
import { AnimatedLine } from '../ui/AnimatedLine';
import { MapPin } from 'lucide-react';

export function VenueShowcase() {
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
        {/* Section header */}
        <div
          className="mb-16 lg:mb-20"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <AnimatedLine variant="label" label="THE VENUE" />
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mt-6 gap-4">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground">
              PwC, Shanghai
            </h2>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <MapPin className="w-4 h-4 text-[#AA7C52]" />
              <span>Shanghai Qiantan International Business District</span>
            </div>
          </div>
        </div>

        {/* Asymmetric image mosaic */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}
        >
          {/* Large lobby image — spans 7 columns */}
          <div className="lg:col-span-7 relative group">
            <div className="relative overflow-hidden" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 92%, 92% 100%, 0 100%)' }}>
              <img
                src="/img/shanghai/pwc-lobby.png"
                alt="PwC Shanghai lobby with warm amber lighting and marble floors"
                className="w-full h-64 sm:h-80 lg:h-[420px] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
              {/* Brand gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              {/* Label overlay */}
              <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                <span className="text-white/60 text-[10px] tracking-[0.2em] uppercase block mb-1">Lobby</span>
                <span className="text-white font-display text-lg sm:text-xl">PwC Experience Center</span>
              </div>
            </div>
            {/* Frame corner accents */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t border-l border-[#AA7C52]/40" />
          </div>

          {/* Right column — auditorium + info card */}
          <div className="lg:col-span-5 flex flex-col gap-4 lg:gap-5">
            {/* Auditorium image */}
            <div className="relative group flex-1">
              <div className="relative overflow-hidden h-full" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 8% 88%)' }}>
                <img
                  src="/img/shanghai/pwc-auditorium.png"
                  alt="PwC Shanghai auditorium with curved LED screen and modern seating"
                  className="w-full h-52 sm:h-64 lg:h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                {/* Brand gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                {/* Label overlay */}
                <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                  <span className="text-white/60 text-[10px] tracking-[0.2em] uppercase block mb-1">Main Stage</span>
                  <span className="text-white font-display text-lg sm:text-xl">Immersive Auditorium</span>
                </div>
              </div>
              {/* Frame corner accent */}
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-[#AA7C52]/40" />
            </div>

            {/* Venue info card */}
            <div className="border border-border bg-card p-6 sm:p-8 relative">
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-8 h-8">
                <div className="absolute top-0 right-0 w-full h-px bg-[#AA7C52]/30" />
                <div className="absolute top-0 right-0 h-full w-px bg-[#AA7C52]/30" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <span className="font-display text-2xl text-[#AA7C52] block tracking-tight">4</span>
                  <span className="text-muted-foreground text-xs uppercase tracking-wider">Days</span>
                </div>
                <div>
                  <span className="font-display text-2xl text-[#AA7C52] block tracking-tight">200+</span>
                  <span className="text-muted-foreground text-xs uppercase tracking-wider">Seats</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="font-display text-2xl text-[#AA7C52] block tracking-tight">LED</span>
                  <span className="text-muted-foreground text-xs uppercase tracking-wider">Curved Stage</span>
                </div>
              </div>

              <div className="h-px bg-border my-5" />

              <p className="text-muted-foreground text-sm leading-relaxed">
                A world-class venue in the heart of Shanghai&apos;s new financial hub,
                featuring an immersive curved-screen auditorium, premium networking
                spaces, and panoramic river views.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
