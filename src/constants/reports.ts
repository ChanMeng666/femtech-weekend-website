import {translate} from '@docusaurus/Translate';
import { ReportCategory } from '../types/reports';

// Available report categories (keys for translation)
export const REPORT_CATEGORY_KEYS = {
  ALL_REPORTS: 'All Reports',
  TECHNOLOGY: 'Technology',
  INVESTMENT: 'Investment',
  RESEARCH: 'Research',
  GENERAL: 'General'
};

// Helper functions to get translated categories
export const getTranslatedCategory = (category: string) => {
  switch(category) {
    case REPORT_CATEGORY_KEYS.ALL_REPORTS:
      return translate({
        id: 'reports.category.allReports',
        message: 'All Reports'
      });
    case REPORT_CATEGORY_KEYS.TECHNOLOGY:
      return translate({
        id: 'reports.category.technology',
        message: 'Technology'
      });
    case REPORT_CATEGORY_KEYS.INVESTMENT:
      return translate({
        id: 'reports.category.investment',
        message: 'Investment'
      });
    case REPORT_CATEGORY_KEYS.RESEARCH:
      return translate({
        id: 'reports.category.research',
        message: 'Research'
      });
    case REPORT_CATEGORY_KEYS.GENERAL:
      return translate({
        id: 'reports.category.general',
        message: 'General'
      });
    default:
      return category;
  }
};

// Available report categories
export const REPORT_CATEGORIES: ReportCategory[] = [
  REPORT_CATEGORY_KEYS.ALL_REPORTS, 
  REPORT_CATEGORY_KEYS.TECHNOLOGY, 
  REPORT_CATEGORY_KEYS.INVESTMENT, 
  REPORT_CATEGORY_KEYS.RESEARCH,
  REPORT_CATEGORY_KEYS.GENERAL
];

// Reports page constants
export const REPORTS_CONSTANTS = {
  TITLE_ID: 'reports.title',
  DESCRIPTION_ID: 'reports.description',
  DEFAULT_TITLE: 'Reports',
  DEFAULT_DESCRIPTION: 'Latest insights and research on women\'s health technology and innovation',
} as const;

// Helper functions to get translated content
export const getReportsTitle = () => translate({
  id: REPORTS_CONSTANTS.TITLE_ID,
  message: REPORTS_CONSTANTS.DEFAULT_TITLE,
});

export const getReportsDescription = () => translate({
  id: REPORTS_CONSTANTS.DESCRIPTION_ID,
  message: REPORTS_CONSTANTS.DEFAULT_DESCRIPTION,
}); 