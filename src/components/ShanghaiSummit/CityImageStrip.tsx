import React from 'react';

interface CityImageStripProps {
  image: string;
  alt: string;
  caption?: string;
  height?: string;
}

export function CityImageStrip({
  image,
  alt,
  caption,
  height = 'h-48 sm:h-64 lg:h-80',
}: CityImageStripProps) {
  return (
    <div className="relative overflow-hidden bg-background">
      {/* Top fade from background */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background to-transparent z-10" />

      {/* Image with fixed-position feel */}
      <div className={`relative ${height} overflow-hidden`}>
        <img
          src={image}
          alt={alt}
          className="absolute inset-0 w-full h-[120%] object-cover -top-[10%]"
          loading="lazy"
        />
        {/* Warm brand overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#AA7C52]/10 via-transparent to-[#AA7C52]/5" />
      </div>

      {/* Bottom fade to background */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent z-10" />

      {/* Optional caption overlay */}
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 z-20 pb-6 pt-12 bg-gradient-to-t from-black/30 to-transparent">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <span className="text-white/70 text-[10px] tracking-[0.2em] uppercase">{caption}</span>
          </div>
        </div>
      )}
    </div>
  );
}
