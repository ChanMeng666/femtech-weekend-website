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
  isFeatured?: boolean;
}

// Report category type
export type ReportCategory = 'All Reports' | 'Technology' | 'Competition' | 'Investment' | 'Research';

// Props interfaces for components
export interface ReportCardProps {
  report: ReportItem;
}

export interface FeaturedReportProps {
  report: ReportItem;
} 