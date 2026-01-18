import React, { useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Import data
import { galleryImages } from '../data/gallery';

// Import components
import {
  GalleryHero,
  GalleryGrid,
  GalleryLightbox,
} from '../components/Gallery';

// Import constants
import { getGalleryTitle, getGallerySubtitle } from '../constants/gallery';

export default function Gallery(): React.ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const title = getGalleryTitle();
  const subtitle = getGallerySubtitle();

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handleLightboxClose = () => {
    setLightboxOpen(false);
  };

  const handleNavigate = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <Layout
      title={title}
      description={subtitle}
    >
      {/* Hero Section */}
      <GalleryHero />

      {/* Gallery Grid */}
      <GalleryGrid
        images={galleryImages}
        onImageClick={handleImageClick}
      />

      {/* Lightbox Modal */}
      <GalleryLightbox
        images={galleryImages}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={handleLightboxClose}
        onNavigate={handleNavigate}
      />
    </Layout>
  );
}
