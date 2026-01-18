import { StoryItem } from '../types/stories';
import {
  translateStoryField,
  getStoryCategoryFounders,
  getStoryCategoryInvestors,
  getStoryCategoryResearchers,
  getStoryCategoryInnovators,
  getStoryReadTime
} from '../constants/stories-components';
import { STORY_CATEGORY_KEYS } from '../constants/stories';

// Define all possible story tags
const STORY_TAGS = {
  FOUNDER_STORY: 'founderStory',
  INVESTOR_PERSPECTIVE: 'investorPerspective',
  CAREER_JOURNEY: 'careerJourney',
  INNOVATION_STORY: 'innovationStory',
  INTERVIEW: 'interview',
  LEADERSHIP: 'leadership',
  ENTREPRENEURSHIP: 'entrepreneurship',
  RESEARCH_JOURNEY: 'researchJourney'
};

// Helper function to translate a tag
const translateTag = (tagKey: string) => {
  return translateStoryField(`stories.tag.${tagKey}`, tagKey
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
  );
};

// Static fallback data - initially empty, add stories as they are published
export const staticStoriesData: StoryItem[] = [
  // Example story entry (commented out until real content is available):
  // {
  //   id: '1',
  //   title: translateStoryField(
  //     'stories.data.example.title',
  //     'Example Interview Title'
  //   ),
  //   description: translateStoryField(
  //     'stories.data.example.description',
  //     'Example description of the interview story.'
  //   ),
  //   category: getStoryCategoryFounders(),
  //   date: 'January 15',
  //   readTime: getStoryReadTime('8'),
  //   author: 'Zhu Yihan',
  //   interviewee: 'Jane Doe',
  //   role: 'CEO of Example FemTech Startup',
  //   image: '/img/stories/example.jpg',
  //   link: '/stories/example-interview',
  //   tags: [
  //     translateTag(STORY_TAGS.FOUNDER_STORY),
  //     translateTag(STORY_TAGS.INTERVIEW),
  //     translateTag(STORY_TAGS.ENTREPRENEURSHIP)
  //   ],
  //   tagKeys: [
  //     STORY_TAGS.FOUNDER_STORY,
  //     STORY_TAGS.INTERVIEW,
  //     STORY_TAGS.ENTREPRENEURSHIP
  //   ],
  //   isFeatured: true
  // }
];

// Function to get stories data (can be extended to fetch from API)
export const getStoriesData = (): StoryItem[] => {
  return staticStoriesData;
};

// Function to get featured story
export const getFeaturedStory = (): StoryItem | undefined => {
  return staticStoriesData.find(story => story.isFeatured);
};

// Function to filter stories by category
export const filterStoriesByCategory = (stories: StoryItem[], category: string): StoryItem[] => {
  if (category === STORY_CATEGORY_KEYS.ALL_STORIES) {
    return stories;
  }

  let categoryKey = '';

  if (category === STORY_CATEGORY_KEYS.FOUNDERS ||
      category === getStoryCategoryFounders()) {
    categoryKey = getStoryCategoryFounders();
  } else if (category === STORY_CATEGORY_KEYS.INVESTORS ||
      category === getStoryCategoryInvestors()) {
    categoryKey = getStoryCategoryInvestors();
  } else if (category === STORY_CATEGORY_KEYS.RESEARCHERS ||
      category === getStoryCategoryResearchers()) {
    categoryKey = getStoryCategoryResearchers();
  } else if (category === STORY_CATEGORY_KEYS.INNOVATORS ||
      category === getStoryCategoryInnovators()) {
    categoryKey = getStoryCategoryInnovators();
  } else {
    categoryKey = category;
  }

  return stories.filter(story => story.category === categoryKey);
};

// Function to sort stories by date (newest first)
export const sortStoriesByDate = (stories: StoryItem[]): StoryItem[] => {
  const getYearFromDate = (dateStr: string): number => {
    if (dateStr.includes('January')) {
      return 2026;
    }
    return 2025;
  };

  return stories.sort((a, b) => {
    const yearA = getYearFromDate(a.date);
    const yearB = getYearFromDate(b.date);
    const dateA = new Date(`${yearA}-${a.date.replace(' ', '-')}`);
    const dateB = new Date(`${yearB}-${b.date.replace(' ', '-')}`);
    return dateB.getTime() - dateA.getTime();
  });
};
