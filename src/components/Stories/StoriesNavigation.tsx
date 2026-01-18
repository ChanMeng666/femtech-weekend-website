import React from 'react';
import { STORY_CATEGORIES, getTranslatedCategory } from '../../constants/stories';
import { StoryCategory } from '../../types/stories';
import { cn } from '../../lib/utils';

interface StoriesNavigationProps {
  activeCategory: StoryCategory;
  onCategoryChange: (category: StoryCategory) => void;
}

export function StoriesNavigation({ activeCategory, onCategoryChange }: StoriesNavigationProps): React.ReactNode {
  return (
    <nav className="bg-gradient-to-r from-rose-50/50 via-background to-amber-50/50 dark:from-rose-950/10 dark:via-background dark:to-amber-950/10 sticky top-16 z-40 border-b border-rose-100/50 dark:border-rose-900/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center gap-3 overflow-x-auto py-5 scrollbar-hide">
          {STORY_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300",
                activeCategory === category
                  ? "bg-rose-500 text-white shadow-md shadow-rose-500/25 dark:bg-rose-600"
                  : "bg-white/80 dark:bg-white/5 text-muted-foreground hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/20 dark:hover:text-rose-400 border border-rose-100 dark:border-rose-900/30"
              )}
            >
              {getTranslatedCategory(category)}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
