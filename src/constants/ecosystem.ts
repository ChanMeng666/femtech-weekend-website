import {translate} from '@docusaurus/Translate';

// Ecosystem page constants
export const ECOSYSTEM_CONSTANTS = {
  TITLE_ID: 'ecosystem.title',
  DESCRIPTION_ID: 'ecosystem.description',
  DEFAULT_TITLE: 'Ecosystem',
  DEFAULT_DESCRIPTION: 'Join the FemTech Weekend community - connecting founders, investors, corporates, academia, and enthusiasts in women\'s health innovation.',
} as const;

// Helper functions to get translated content
export const getEcosystemTitle = () => translate({
  id: ECOSYSTEM_CONSTANTS.TITLE_ID,
  message: ECOSYSTEM_CONSTANTS.DEFAULT_TITLE,
});

export const getEcosystemDescription = () => translate({
  id: ECOSYSTEM_CONSTANTS.DESCRIPTION_ID,
  message: ECOSYSTEM_CONSTANTS.DEFAULT_DESCRIPTION,
}); 