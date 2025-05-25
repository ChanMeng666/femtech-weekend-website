import {translate} from '@docusaurus/Translate';

// About Us page constants
export const ABOUT_US_CONSTANTS = {
  TITLE_ID: 'about.title',
  DESCRIPTION_ID: 'about.description',
  DEFAULT_TITLE: 'About Us',
  DEFAULT_DESCRIPTION: 'Learn about FemTech Weekend\'s mission to advance women\'s health through innovation, entrepreneurship, and global collaboration.',
} as const;

// Helper functions to get translated content
export const getAboutUsTitle = () => translate({
  id: ABOUT_US_CONSTANTS.TITLE_ID,
  message: ABOUT_US_CONSTANTS.DEFAULT_TITLE,
});

export const getAboutUsDescription = () => translate({
  id: ABOUT_US_CONSTANTS.DESCRIPTION_ID,
  message: ABOUT_US_CONSTANTS.DEFAULT_DESCRIPTION,
}); 