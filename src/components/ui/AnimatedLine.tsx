import React from 'react';
import { cn } from '../../lib/utils';

interface AnimatedLineProps {
  className?: string;
  variant?: 'default' | 'label' | 'divider';
  label?: string;
  animated?: boolean;
}

/**
 * McKinsey-inspired animated line component
 * Used for section headers, labels, and dividers
 */
export function AnimatedLine({
  className,
  variant = 'default',
  label,
  animated = true,
}: AnimatedLineProps) {
  if (variant === 'label' && label) {
    return (
      <div className={cn('group flex items-center gap-3 md:gap-4', className)}>
        <div
          className={cn(
            'h-px bg-foreground transition-all duration-700',
            animated && 'group-hover:w-12',
            'w-8'
          )}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
        <span
          className={cn(
            'mckinsey-label text-foreground transition-all duration-700',
            animated && 'group-hover:tracking-[0.2em]'
          )}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {label}
        </span>
      </div>
    );
  }

  if (variant === 'divider') {
    return (
      <div className={cn('w-full py-8', className)}>
        <div
          className={cn(
            'h-px bg-border mx-auto transition-all duration-700',
            animated && 'hover:bg-primary/50',
            'max-w-4xl'
          )}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>
    );
  }

  // Default variant - simple animated line
  return (
    <div
      className={cn(
        'h-px bg-foreground transition-all duration-700',
        animated && 'hover:w-12',
        'w-8',
        className
      )}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    />
  );
}

export default AnimatedLine;
