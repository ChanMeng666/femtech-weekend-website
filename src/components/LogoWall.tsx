import React, { useState, useEffect } from 'react';
import { LogoAnimation } from './ui/LogoAnimation';
import { cn } from '../lib/utils';

interface LogoWallProps {
  title?: string;
  subtitle?: string;
  count?: number;
  interactive?: boolean;
  className?: string;
}

export function LogoWall({
  title = "FemTech Weekend",
  subtitle = "品牌形象墙",
  count = 12,
  interactive = true,
  className = '',
}: LogoWallProps) {
  const [activeIndex, setActiveIndex] = useState(-1);
  
  // 生成不同大小和位置的Logo数组
  const logos = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: 80 + Math.floor(Math.random() * 60),
      rotation: Math.random() > 0.5 ? Math.random() * 20 : Math.random() * -20,
      delay: i * 0.1,
      float: Math.random() > 0.5,
      rotate: Math.random() > 0.5,
      pulse: Math.random() > 0.5,
      opacity: 0.6 + Math.random() * 0.4,
    }));
  }, [count]);
  
  // 定期随机更改活跃的Logo
  useEffect(() => {
    if (!interactive) return;
    
    const interval = setInterval(() => {
      setActiveIndex(Math.floor(Math.random() * count));
    }, 3000);
    
    return () => clearInterval(interval);
  }, [count, interactive]);
  
  return (
    <div className={cn("relative py-20 overflow-hidden bg-background", className)}>
      <div className="logo-wall-bg absolute inset-0 -z-10" style={{ opacity: 0.03 }}>
        {/* 网格背景 */}
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="border border-primary/5"></div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 text-center mb-10">
        <h2 className="text-3xl font-bold text-foreground mb-4">{title}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
      </div>
      
      <div className="logo-wall relative mx-auto w-full max-w-5xl h-[400px]">
        {logos.map((logo, index) => (
          <div
            key={logo.id}
            className={cn(
              "logo-wall-item absolute transition-all duration-500",
              activeIndex === index ? "logo-wall-active z-10" : ""
            )}
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${Math.random() * 80}%`,
              transform: `translate(-50%, -50%) rotate(${logo.rotation}deg)`,
              transition: 'all 0.5s ease',
              animationDelay: `${logo.delay}s`,
              filter: activeIndex === index ? 'drop-shadow(0 0 10px var(--ifm-color-primary))' : 'none',
            }}
          >
            <LogoAnimation
              size={logo.size}
              opacity={activeIndex === index ? 1 : logo.opacity}
              float={activeIndex === index ? true : logo.float}
              rotate={activeIndex === index ? false : logo.rotate}
              pulse={activeIndex === index ? true : logo.pulse}
              className={cn(
                "cursor-pointer transition-all duration-300 hover:scale-110",
                activeIndex === index ? "scale-125" : ""
              )}
              onClick={() => interactive && setActiveIndex(index === activeIndex ? -1 : index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
} 