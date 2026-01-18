export interface GalleryImage {
  id: number;
  public_id: string;
  format: string;
  width: number;
  height: number;
  alt?: string;
  caption?: string;
  category?: string;
}

export interface GalleryLightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

export interface GalleryImageProps {
  image: GalleryImage;
  index: number;
  onClick: () => void;
}
