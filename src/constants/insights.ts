import {translate} from '@docusaurus/Translate';
import { InsightCategory } from '../types/insights';

// Available insight categories (keys for translation)
export const INSIGHT_CATEGORY_KEYS = {
  ALL_INSIGHTS: 'All Insights',
  TECHNOLOGY: 'Technology',
  INVESTMENT: 'Investment',
  RESEARCH: 'Research',
  GENERAL: 'General'
};

// Helper functions to get translated categories
export const getTranslatedCategory = (category: string) => {
  switch(category) {
    case INSIGHT_CATEGORY_KEYS.ALL_INSIGHTS:
      return translate({
        id: 'insights.category.allInsights',
        message: 'All Insights'
      });
    case INSIGHT_CATEGORY_KEYS.TECHNOLOGY:
      return translate({
        id: 'insights.category.technology',
        message: 'Technology'
      });
    case INSIGHT_CATEGORY_KEYS.INVESTMENT:
      return translate({
        id: 'insights.category.investment',
        message: 'Investment'
      });
    case INSIGHT_CATEGORY_KEYS.RESEARCH:
      return translate({
        id: 'insights.category.research',
        message: 'Research'
      });
    case INSIGHT_CATEGORY_KEYS.GENERAL:
      return translate({
        id: 'insights.category.general',
        message: 'General'
      });
    default:
      return category;
  }
};

// Available insight categories
export const INSIGHT_CATEGORIES: InsightCategory[] = [
  INSIGHT_CATEGORY_KEYS.ALL_INSIGHTS,
  INSIGHT_CATEGORY_KEYS.TECHNOLOGY,
  INSIGHT_CATEGORY_KEYS.INVESTMENT,
  INSIGHT_CATEGORY_KEYS.RESEARCH,
  INSIGHT_CATEGORY_KEYS.GENERAL
];

// Insights page constants
export const INSIGHTS_CONSTANTS = {
  TITLE_ID: 'insights.title',
  DESCRIPTION_ID: 'insights.description',
  DEFAULT_TITLE: 'Insights',
  DEFAULT_DESCRIPTION: 'Latest insights and research on women\'s health technology and innovation',
} as const;

// Helper functions to get translated content
export const getInsightsTitle = () => translate({
  id: INSIGHTS_CONSTANTS.TITLE_ID,
  message: INSIGHTS_CONSTANTS.DEFAULT_TITLE,
});

export const getInsightsDescription = () => translate({
  id: INSIGHTS_CONSTANTS.DESCRIPTION_ID,
  message: INSIGHTS_CONSTANTS.DEFAULT_DESCRIPTION,
});
