// Opinion data interface
export interface OpinionItem {
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
  tagKeys?: string[];
  isFeatured?: boolean;
}

// Opinion category type
export type OpinionCategory = string;

// Props interfaces for components
export interface OpinionCardProps {
  opinion: OpinionItem;
  onTagClick: (tag: string) => void;
}

export interface FeaturedOpinionProps {
  opinion: OpinionItem;
  onTagClick: (tag: string) => void;
}
