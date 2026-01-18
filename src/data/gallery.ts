import { GalleryImage } from '../types/gallery';

// Cloudinary configuration
// The cloud name should be set in your environment variables
const CLOUDINARY_CLOUD_NAME = 'demo'; // Replace with your actual cloud name or use env variable
const CLOUDINARY_FOLDER = 'femtech-weekend-gallery';

/**
 * Build a Cloudinary URL for an image with transformations
 */
export const buildCloudinaryUrl = (
  publicId: string,
  options?: {
    width?: number;
    quality?: string | number;
    format?: string;
  }
): string => {
  const { width = 720, quality = 'auto', format } = options || {};
  const formatSuffix = format ? `.${format}` : '';
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_${width},q_${quality}/${publicId}${formatSuffix}`;
};

/**
 * Build a low-quality blur placeholder URL
 */
export const buildBlurPlaceholder = (publicId: string): string => {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_10,q_10,e_blur:1000/${publicId}`;
};

/**
 * Build a full-size image URL for lightbox view
 */
export const buildFullSizeUrl = (publicId: string, format?: string): string => {
  const formatSuffix = format ? `.${format}` : '';
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/q_auto/${publicId}${formatSuffix}`;
};

// Placeholder gallery images
// These use Cloudinary's demo images - replace with your actual images later
export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    public_id: 'samples/people/smiling-man',
    format: 'jpg',
    width: 1200,
    height: 800,
    alt: 'FemTech Weekend Event',
    caption: 'Opening Ceremony',
    category: 'events',
  },
  {
    id: 2,
    public_id: 'samples/people/kitchen-bar',
    format: 'jpg',
    width: 1200,
    height: 800,
    alt: 'Networking Session',
    caption: 'Networking',
    category: 'networking',
  },
  {
    id: 3,
    public_id: 'samples/people/jazz',
    format: 'jpg',
    width: 1200,
    height: 800,
    alt: 'Panel Discussion',
    caption: 'Panel Discussion',
    category: 'events',
  },
  {
    id: 4,
    public_id: 'samples/landscapes/nature-mountains',
    format: 'jpg',
    width: 1200,
    height: 800,
    alt: 'Workshop Session',
    caption: 'Innovation Workshop',
    category: 'workshops',
  },
  {
    id: 5,
    public_id: 'samples/food/spices',
    format: 'jpg',
    width: 1200,
    height: 800,
    alt: 'Award Ceremony',
    caption: 'Award Ceremony',
    category: 'events',
  },
  {
    id: 6,
    public_id: 'samples/landscapes/beach-boat',
    format: 'jpg',
    width: 1200,
    height: 800,
    alt: 'Team Building',
    caption: 'Team Building Activity',
    category: 'activities',
  },
  {
    id: 7,
    public_id: 'samples/animals/three-dogs',
    format: 'jpg',
    width: 1200,
    height: 800,
    alt: 'Hackathon',
    caption: 'Hackathon 2024',
    category: 'hackathon',
  },
  {
    id: 8,
    public_id: 'samples/ecommerce/leather-bag-gray',
    format: 'jpg',
    width: 1200,
    height: 800,
    alt: 'Pitch Competition',
    caption: 'Startup Pitch',
    category: 'competition',
  },
  {
    id: 9,
    public_id: 'samples/food/dessert',
    format: 'jpg',
    width: 1200,
    height: 800,
    alt: 'Closing Ceremony',
    caption: 'Closing Ceremony',
    category: 'events',
  },
  {
    id: 10,
    public_id: 'samples/landscapes/architecture-signs',
    format: 'jpg',
    width: 1200,
    height: 800,
    alt: 'Venue',
    caption: 'Event Venue',
    category: 'venue',
  },
  {
    id: 11,
    public_id: 'samples/people/boy-snow-hoodie',
    format: 'jpg',
    width: 1200,
    height: 800,
    alt: 'Mentorship Session',
    caption: 'Mentorship',
    category: 'mentorship',
  },
  {
    id: 12,
    public_id: 'samples/food/fish-vegetables',
    format: 'jpg',
    width: 1200,
    height: 800,
    alt: 'Networking Dinner',
    caption: 'Gala Dinner',
    category: 'networking',
  },
];

/**
 * Get images by category
 */
export const getImagesByCategory = (category: string): GalleryImage[] => {
  if (category === 'all') {
    return galleryImages;
  }
  return galleryImages.filter((img) => img.category === category);
};

/**
 * Get unique categories from images
 */
export const getCategories = (): string[] => {
  const categories = new Set(galleryImages.map((img) => img.category).filter(Boolean));
  return ['all', ...Array.from(categories)] as string[];
};
