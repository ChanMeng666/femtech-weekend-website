// Story data interface
export interface StoryItem {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  interviewee?: string;
  role?: string;
  image?: string;
  link: string;
  tags: string[];
  tagKeys?: string[];
  isFeatured?: boolean;
}

// Story category type
export type StoryCategory = string;

// Props interfaces for components
export interface StoryCardProps {
  story: StoryItem;
  onTagClick: (tag: string) => void;
}

export interface FeaturedStoryProps {
  story: StoryItem;
  onTagClick: (tag: string) => void;
}
