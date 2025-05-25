import {translate} from '@docusaurus/Translate';

// Ecosystem Join page constants
export const ECOSYSTEM_JOIN_CONSTANTS = {
  TITLE_ID: 'ecosystem.join.title',
  DESCRIPTION_ID: 'ecosystem.join.description',
  DEFAULT_TITLE: 'Join the FemTech Weekend Ecosystem',
  DEFAULT_DESCRIPTION: 'Become part of the FemTech Weekend innovation ecosystem',
} as const;

// Helper functions to get translated content
export const getEcosystemJoinTitle = () => translate({
  id: ECOSYSTEM_JOIN_CONSTANTS.TITLE_ID,
  message: ECOSYSTEM_JOIN_CONSTANTS.DEFAULT_TITLE,
});

export const getEcosystemJoinDescription = () => translate({
  id: ECOSYSTEM_JOIN_CONSTANTS.DESCRIPTION_ID,
  message: ECOSYSTEM_JOIN_CONSTANTS.DEFAULT_DESCRIPTION,
}); 