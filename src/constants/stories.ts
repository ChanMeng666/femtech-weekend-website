import {translate} from '@docusaurus/Translate';
import { StoryCategory } from '../types/stories';

// Available story categories (keys for translation)
export const STORY_CATEGORY_KEYS = {
  ALL_STORIES: 'All Stories',
  FOUNDERS: 'Founders',
  INVESTORS: 'Investors',
  RESEARCHERS: 'Researchers',
  INNOVATORS: 'Innovators'
};

// Helper functions to get translated categories
export const getTranslatedCategory = (category: string) => {
  switch(category) {
    case STORY_CATEGORY_KEYS.ALL_STORIES:
      return translate({
        id: 'stories.category.allStories',
        message: 'All Stories'
      });
    case STORY_CATEGORY_KEYS.FOUNDERS:
      return translate({
        id: 'stories.category.founders',
        message: 'Founders'
      });
    case STORY_CATEGORY_KEYS.INVESTORS:
      return translate({
        id: 'stories.category.investors',
        message: 'Investors'
      });
    case STORY_CATEGORY_KEYS.RESEARCHERS:
      return translate({
        id: 'stories.category.researchers',
        message: 'Researchers'
      });
    case STORY_CATEGORY_KEYS.INNOVATORS:
      return translate({
        id: 'stories.category.innovators',
        message: 'Innovators'
      });
    default:
      return category;
  }
};

// Available story categories
export const STORY_CATEGORIES: StoryCategory[] = [
  STORY_CATEGORY_KEYS.ALL_STORIES,
  STORY_CATEGORY_KEYS.FOUNDERS,
  STORY_CATEGORY_KEYS.INVESTORS,
  STORY_CATEGORY_KEYS.RESEARCHERS,
  STORY_CATEGORY_KEYS.INNOVATORS
];

// Stories page constants
export const STORIES_CONSTANTS = {
  TITLE_ID: 'stories.title',
  DESCRIPTION_ID: 'stories.description',
  DEFAULT_TITLE: 'Stories',
  DEFAULT_DESCRIPTION: 'Character interviews and inspiring stories from the FemTech community',
} as const;

// Helper functions to get translated content
export const getStoriesTitle = () => translate({
  id: STORIES_CONSTANTS.TITLE_ID,
  message: STORIES_CONSTANTS.DEFAULT_TITLE,
});

export const getStoriesDescription = () => translate({
  id: STORIES_CONSTANTS.DESCRIPTION_ID,
  message: STORIES_CONSTANTS.DEFAULT_DESCRIPTION,
});
