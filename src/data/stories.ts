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

// Static stories data
export const staticStoriesData: StoryItem[] = [
  {
    id: '1',
    title: translateStoryField(
      'stories.data.jane-chen.title',
      "From Lab to Launch: Jane Chen's Journey Building a Fertility Tech Startup in China"
    ),
    description: translateStoryField(
      'stories.data.jane-chen.description',
      "An exclusive interview with Jane Chen, founder of FertilityAI, on her journey from biomedical research to building one of China's most promising fertility technology startups."
    ),
    category: getStoryCategoryFounders(),
    date: 'January 15',
    readTime: getStoryReadTime('8'),
    author: 'Zhu Yihan',
    interviewee: 'Jane Chen',
    role: 'Founder & CEO of FertilityAI',
    link: '/stories/interview-jane-chen-femtech-founder',
    tags: [
      translateTag(STORY_TAGS.FOUNDER_STORY),
      translateTag(STORY_TAGS.INTERVIEW),
      translateTag(STORY_TAGS.ENTREPRENEURSHIP),
      translateTag(STORY_TAGS.INNOVATION_STORY)
    ],
    tagKeys: [
      STORY_TAGS.FOUNDER_STORY,
      STORY_TAGS.INTERVIEW,
      STORY_TAGS.ENTREPRENEURSHIP,
      STORY_TAGS.INNOVATION_STORY
    ],
    isFeatured: true
  },
  {
    id: '2',
    title: translateStoryField(
      'stories.data.lisa-wang.title',
      "Why I Bet Big on Women's Health: Lisa Wang's Investment Philosophy"
    ),
    description: translateStoryField(
      'stories.data.lisa-wang.description',
      "Lisa Wang, Partner at Horizon Ventures and one of Asia's most active FemTech investors, shares her perspective on why women's health is the next frontier in healthcare investing."
    ),
    category: getStoryCategoryInvestors(),
    date: 'January 10',
    readTime: getStoryReadTime('7'),
    author: 'Zhu Yihan',
    interviewee: 'Lisa Wang',
    role: 'Partner at Horizon Ventures',
    link: '/stories/investor-spotlight-lisa-wang',
    tags: [
      translateTag(STORY_TAGS.INVESTOR_PERSPECTIVE),
      translateTag(STORY_TAGS.INTERVIEW),
      translateTag(STORY_TAGS.LEADERSHIP)
    ],
    tagKeys: [
      STORY_TAGS.INVESTOR_PERSPECTIVE,
      STORY_TAGS.INTERVIEW,
      STORY_TAGS.LEADERSHIP
    ],
    isFeatured: false
  }
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
