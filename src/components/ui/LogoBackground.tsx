import React from 'react';
import { LogoAnimation } from './LogoAnimation';

interface LogoBackgroundProps {
  pattern?: 'scattered' | 'grid' | 'corners' | 'diagonal';
  opacity?: number;
  animate?: boolean;
  className?: string;
}

export function LogoBackground({
  pattern = 'scattered',
  opacity = 0.05,
  animate = false,
  className = '',
}: LogoBackgroundProps) {
  if (pattern === 'grid') {
    return (
      <div className={`absolute inset-0 -z-10 logo-grid-bg ${className}`} 
           style={{ opacity }}></div>
    );
  }

  if (pattern === 'corners') {
    return (
      <div className={`absolute inset-0 -z-10 pointer-events-none ${className}`}>
        <LogoAnimation 
          size={120} 
          opacity={opacity} 
          className="absolute top-0 left-0"
          pulse={animate}
        />
        <LogoAnimation 
          size={120} 
          opacity={opacity} 
          className="absolute top-0 right-0"
          pulse={animate}
        />
        <LogoAnimation 
          size={120} 
          opacity={opacity} 
          className="absolute bottom-0 left-0"
          pulse={animate}
        />
        <LogoAnimation 
          size={120} 
          opacity={opacity} 
          className="absolute bottom-0 right-0"
          pulse={animate}
        />
      </div>
    );
  }

  if (pattern === 'diagonal') {
    return (
      <div className={`absolute inset-0 -z-10 pointer-events-none ${className}`}>
        <LogoAnimation 
          size={100} 
          opacity={opacity} 
          className="absolute top-[10%] left-[10%]"
          float={animate}
        />
        <LogoAnimation 
          size={80} 
          opacity={opacity} 
          className="absolute top-[30%] left-[30%]"
          rotate={animate}
        />
        <LogoAnimation 
          size={120} 
          opacity={opacity} 
          className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"
          pulse={animate}
        />
        <LogoAnimation 
          size={90} 
          opacity={opacity} 
          className="absolute top-[70%] left-[70%]"
          float={animate}
        />
        <LogoAnimation 
          size={110} 
          opacity={opacity} 
          className="absolute top-[90%] left-[90%]"
          rotate={animate}
        />
      </div>
    );
  }

  // Default scattered pattern
  return (
    <div className={`absolute inset-0 -z-10 pointer-events-none ${className}`}>
      <LogoAnimation 
        size={80} 
        opacity={opacity} 
        className="absolute top-[15%] left-[10%]"
        float={animate}
      />
      <LogoAnimation 
        size={120} 
        opacity={opacity} 
        className="absolute top-[40%] left-[85%]"
        rotate={animate}
      />
      <LogoAnimation 
        size={100} 
        opacity={opacity} 
        className="absolute top-[75%] left-[25%]"
        pulse={animate}
      />
      <LogoAnimation 
        size={90} 
        opacity={opacity} 
        className="absolute top-[20%] left-[65%]"
        float={animate}
      />
      <LogoAnimation 
        size={110} 
        opacity={opacity} 
        className="absolute top-[65%] left-[75%]"
        rotate={animate}
      />
    </div>
  );
} 