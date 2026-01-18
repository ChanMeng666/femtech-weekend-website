import {translate} from '@docusaurus/Translate';
import { OpinionCategory } from '../types/opinions';

// Available opinion categories (keys for translation)
export const OPINION_CATEGORY_KEYS = {
  ALL_OPINIONS: 'All Opinions',
  ANALYSIS: 'Analysis',
  TRENDS: 'Trends',
  COMMENTARY: 'Commentary',
  POLICY: 'Policy'
};

// Helper functions to get translated categories
export const getTranslatedCategory = (category: string) => {
  switch(category) {
    case OPINION_CATEGORY_KEYS.ALL_OPINIONS:
      return translate({
        id: 'opinions.category.allOpinions',
        message: 'All Opinions'
      });
    case OPINION_CATEGORY_KEYS.ANALYSIS:
      return translate({
        id: 'opinions.category.analysis',
        message: 'Analysis'
      });
    case OPINION_CATEGORY_KEYS.TRENDS:
      return translate({
        id: 'opinions.category.trends',
        message: 'Trends'
      });
    case OPINION_CATEGORY_KEYS.COMMENTARY:
      return translate({
        id: 'opinions.category.commentary',
        message: 'Commentary'
      });
    case OPINION_CATEGORY_KEYS.POLICY:
      return translate({
        id: 'opinions.category.policy',
        message: 'Policy'
      });
    default:
      return category;
  }
};

// Available opinion categories
export const OPINION_CATEGORIES: OpinionCategory[] = [
  OPINION_CATEGORY_KEYS.ALL_OPINIONS,
  OPINION_CATEGORY_KEYS.ANALYSIS,
  OPINION_CATEGORY_KEYS.TRENDS,
  OPINION_CATEGORY_KEYS.COMMENTARY,
  OPINION_CATEGORY_KEYS.POLICY
];

// Opinions page constants
export const OPINIONS_CONSTANTS = {
  TITLE_ID: 'opinions.title',
  DESCRIPTION_ID: 'opinions.description',
  DEFAULT_TITLE: 'Opinions',
  DEFAULT_DESCRIPTION: 'Short articles and essays on women\'s health technology',
} as const;

// Helper functions to get translated content
export const getOpinionsTitle = () => translate({
  id: OPINIONS_CONSTANTS.TITLE_ID,
  message: OPINIONS_CONSTANTS.DEFAULT_TITLE,
});

export const getOpinionsDescription = () => translate({
  id: OPINIONS_CONSTANTS.DESCRIPTION_ID,
  message: OPINIONS_CONSTANTS.DEFAULT_DESCRIPTION,
});
