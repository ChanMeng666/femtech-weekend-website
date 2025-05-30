import React from 'react';
import { Button } from '../ui/button';
import { REPORT_CATEGORIES, getTranslatedCategory } from '../../constants/reports';
import { ReportCategory } from '../../types/reports';

interface ReportsNavigationProps {
  activeCategory: ReportCategory;
  onCategoryChange: (category: ReportCategory) => void;
}

export function ReportsNavigation({ activeCategory, onCategoryChange }: ReportsNavigationProps): React.ReactNode {
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center space-x-1 py-4 overflow-x-auto">
          {REPORT_CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "ghost"}
              size="sm"
              onClick={() => onCategoryChange(category)}
              className={`whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {getTranslatedCategory(category)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
} 