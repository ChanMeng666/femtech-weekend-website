// Insight data interface
export interface InsightItem {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image?: string;
  link: string;
  tags: string[];
  tagKeys?: string[]; // Keys for tag translations
  isFeatured?: boolean;
}

// Insight category type
export type InsightCategory = string;

// Props interfaces for components
export interface InsightCardProps {
  insight: InsightItem;
  onTagClick: (tag: string) => void;
}

export interface FeaturedInsightProps {
  insight: InsightItem;
  onTagClick: (tag: string) => void;
}
