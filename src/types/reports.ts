// Report data interface
export interface ReportItem {
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

// Report category type
export type ReportCategory = string;

// Props interfaces for components
export interface ReportCardProps {
  report: ReportItem;
  onTagClick: (tag: string) => void;
}

export interface FeaturedReportProps {
  report: ReportItem;
  onTagClick: (tag: string) => void;
} 