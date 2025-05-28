import {translate} from '@docusaurus/Translate';
import { ReportCategory } from '../types/reports';

// Available report categories
export const REPORT_CATEGORIES: ReportCategory[] = [
  'All Reports', 
  'Technology', 
  'Investment', 
  'Research',
  'General'
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