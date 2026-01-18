import React from 'react';
import { GalleryGridProps } from '../../types/gallery';
import { GalleryImage } from './GalleryImage';

export function GalleryGrid({ images, onImageClick }: GalleryGridProps): React.ReactNode {
  if (!images || images.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 text-center">
        <p className="text-muted-foreground">No images to display</p>
      </div>
    );
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Masonry grid using CSS columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
          {images.map((image, index) => (
            <GalleryImage
              key={image.id}
              image={image}
              index={index}
              onClick={() => onImageClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default GalleryGrid;
