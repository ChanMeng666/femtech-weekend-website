import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryLightboxProps } from '../../types/gallery';
import { buildCloudinaryUrl } from '../../data/gallery';

export function GalleryLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: GalleryLightboxProps): React.ReactNode {
  const currentImage = images[currentIndex];
  const totalImages = images.length;

  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? totalImages - 1 : currentIndex - 1;
    onNavigate(newIndex);
  }, [currentIndex, totalImages, onNavigate]);

  const goToNext = useCallback(() => {
    const newIndex = currentIndex === totalImages - 1 ? 0 : currentIndex + 1;
    onNavigate(newIndex);
  }, [currentIndex, totalImages, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, goToPrevious, goToNext]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !currentImage) return null;

  const imageUrl = buildCloudinaryUrl(currentImage.public_id, { width: 1920 });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="
          absolute top-4 right-4 z-50
          p-3 bg-white/10 hover:bg-white/20
          text-white
          transition-colors duration-300
          focus:outline-none focus:ring-2 focus:ring-white/50
        "
        aria-label="Close gallery"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Image counter */}
      <div className="absolute top-4 left-4 z-50 text-white/80 font-mono text-sm">
        {currentIndex + 1} / {totalImages}
      </div>

      {/* Previous button */}
      <button
        onClick={goToPrevious}
        className="
          absolute left-4 top-1/2 -translate-y-1/2 z-50
          p-3 bg-white/10 hover:bg-white/20
          text-white
          transition-colors duration-300
          focus:outline-none focus:ring-2 focus:ring-white/50
        "
        aria-label="Previous image"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      {/* Next button */}
      <button
        onClick={goToNext}
        className="
          absolute right-4 top-1/2 -translate-y-1/2 z-50
          p-3 bg-white/10 hover:bg-white/20
          text-white
          transition-colors duration-300
          focus:outline-none focus:ring-2 focus:ring-white/50
        "
        aria-label="Next image"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Main image container */}
      <div className="relative z-40 max-w-[90vw] max-h-[85vh] flex flex-col items-center">
        <img
          src={imageUrl}
          alt={currentImage.alt || `Gallery image ${currentIndex + 1}`}
          className="max-w-full max-h-[80vh] object-contain"
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
        />

        {/* Caption */}
        {currentImage.caption && (
          <div className="mt-4 text-center">
            <p className="text-white/90 text-lg font-display">
              {currentImage.caption}
            </p>
            {currentImage.alt && currentImage.alt !== currentImage.caption && (
              <p className="text-white/60 text-sm mt-1">
                {currentImage.alt}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Thumbnail strip (optional, for larger screens) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 hidden lg:flex gap-2 max-w-[80vw] overflow-x-auto px-4">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => onNavigate(index)}
            className={`
              flex-shrink-0 w-16 h-12 overflow-hidden
              transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-white/50
              ${index === currentIndex
                ? 'ring-2 ring-white opacity-100'
                : 'opacity-50 hover:opacity-80'
              }
            `}
            aria-label={`Go to image ${index + 1}`}
          >
            <img
              src={buildCloudinaryUrl(image.public_id, { width: 100 })}
              alt=""
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default GalleryLightbox;
