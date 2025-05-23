import {translate} from '@docusaurus/Translate';

// Showcase page constants
export const SHOWCASE_CONSTANTS = {
  TITLE_ID: 'header.title',
  DESCRIPTION_ID: 'header.description',
  DEFAULT_TITLE: 'FemTech Companies Showcase',
  DEFAULT_DESCRIPTION: 'Directory of innovative companies in the women\'s health industry in China',
} as const;

// Helper functions to get translated content
export const getShowcaseTitle = () => translate({
  id: SHOWCASE_CONSTANTS.TITLE_ID,
  message: SHOWCASE_CONSTANTS.DEFAULT_TITLE,
});

export const getShowcaseDescription = () => translate({
  id: SHOWCASE_CONSTANTS.DESCRIPTION_ID,
  message: SHOWCASE_CONSTANTS.DEFAULT_DESCRIPTION,
}); 