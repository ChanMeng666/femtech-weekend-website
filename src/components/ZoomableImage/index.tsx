import React from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

interface ZoomableImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

export default function ZoomableImage({
  src,
  alt,
  width,
  height,
  className,
}: ZoomableImageProps) {
  return (
    <Zoom>
      <img 
        src={src} 
        alt={alt} 
        width={width} 
        height={height} 
        className={className} 
      />
    </Zoom>
  );
} 