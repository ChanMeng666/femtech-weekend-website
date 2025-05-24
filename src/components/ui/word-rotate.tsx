"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "../../lib/utils";

interface WordRotateProps {
  words: string[];
  duration?: number;
  animationProps?: {
    yOffset?: number;
    animationDuration?: number;
    ease?: string;
  };
  className?: string;
}

export function WordRotate({
  words,
  duration = 2500,
  animationProps = {
    yOffset: 75,
    animationDuration: 0.25,
    ease: "power2.inOut",
  },
  className,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);
  const spanRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [words, duration]);

  useEffect(() => {
    if (spanRef.current) {
      const span = spanRef.current;
      const { yOffset = 75, animationDuration = 0.25, ease = "power2.inOut" } = animationProps;
      
      // Create timeline for word rotation animation
      const tl = gsap.timeline();
      
      // Animate out (exit animation)
      tl.fromTo(span, 
        { y: 0, opacity: 1 },
        { 
          y: yOffset, 
          opacity: 0, 
          duration: animationDuration, 
          ease: ease 
        }
      )
      // Update content
      .call(() => {
        span.textContent = words[index];
      })
      // Animate in (enter animation)
      .fromTo(span,
        { y: -yOffset, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: animationDuration, 
          ease: ease 
        }
      );
    }
  }, [index, words, animationProps]);

  useEffect(() => {
    // Initial animation
    if (spanRef.current) {
      gsap.fromTo(spanRef.current,
        { y: -animationProps.yOffset || -75, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: animationProps.animationDuration || 0.25, 
          ease: animationProps.ease || "power2.inOut" 
        }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden py-4">
      <span
        ref={spanRef}
        className={cn("block", className)}
      >
        {words[0]}
      </span>
    </div>
  );
} 