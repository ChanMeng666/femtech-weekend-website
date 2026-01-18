import React from 'react';
import { OPINION_CATEGORIES, getTranslatedCategory } from '../../constants/opinions';
import { OpinionCategory } from '../../types/opinions';
import { cn } from '../../lib/utils';

interface OpinionsNavigationProps {
  activeCategory: OpinionCategory;
  onCategoryChange: (category: OpinionCategory) => void;
}

export function OpinionsNavigation({ activeCategory, onCategoryChange }: OpinionsNavigationProps): React.ReactNode {
  return (
    <nav className="bg-background sticky top-16 z-40 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-center gap-1 overflow-x-auto py-4 scrollbar-hide">
          {OPINION_CATEGORIES.map((category, index) => (
            <React.Fragment key={category}>
              {index > 0 && (
                <span className="text-border mx-1 hidden sm:inline">|</span>
              )}
              <button
                onClick={() => onCategoryChange(category)}
                className={cn(
                  "px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-300 relative",
                  activeCategory === category
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {getTranslatedCategory(category)}
                {/* Underline indicator */}
                <span
                  className={cn(
                    "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-foreground transition-all duration-300",
                    activeCategory === category ? "w-full" : "w-0"
                  )}
                />
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
}
