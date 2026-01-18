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
    <nav className="border-y border-border bg-background sticky top-16 z-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex gap-1 overflow-x-auto py-3 -mb-px">
          {STORY_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={cn(
                "mckinsey-label whitespace-nowrap px-4 py-2 transition-all duration-300 relative border",
                activeCategory === category
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-muted-foreground border-transparent hover:text-foreground hover:border-border"
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
