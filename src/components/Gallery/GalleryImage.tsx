import React, { useState } from 'react';
import { GalleryImageProps } from '../../types/gallery';
import { buildCloudinaryUrl } from '../../data/gallery';

export function GalleryImage({ image, index, onClick }: GalleryImageProps): React.ReactNode {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const imageUrl = buildCloudinaryUrl(image.public_id, { width: 720 });

  return (
    <div
      className="group relative mb-6 break-inside-avoid cursor-pointer overflow-hidden bg-muted corner-accents"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View ${image.alt || `photo ${index + 1}`}`}
    >
      {/* Image container with aspect ratio preservation */}
      <div className="relative overflow-hidden">
        {/* Loading skeleton */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}

        {/* Main image */}
        <img
          src={imageUrl}
          alt={image.alt || `Gallery image ${index + 1}`}
          className={`
            w-full h-auto object-cover
            transition-all duration-700
            group-hover:scale-105
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            filter: 'grayscale(30%)',
          }}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          loading="lazy"
          onMouseEnter={(e) => {
            (e.target as HTMLImageElement).style.filter = 'grayscale(0%)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLImageElement).style.filter = 'grayscale(30%)';
          }}
        />

        {/* Hover overlay with caption */}
        {image.caption && (
          <div
            className="
              absolute inset-x-0 bottom-0
              bg-gradient-to-t from-black/70 via-black/30 to-transparent
              p-4 pt-12
              opacity-0 group-hover:opacity-100
              transition-opacity duration-500
            "
            style={{
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <span className="mckinsey-label text-white/90 text-xs tracking-wider">
              {image.caption}
            </span>
          </div>
        )}

        {/* Error state */}
        {hasError && (
          <div className="flex items-center justify-center h-48 bg-muted text-muted-foreground">
            <span className="text-sm">Failed to load image</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default GalleryImage;
