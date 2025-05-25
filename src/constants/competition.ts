import {translate} from '@docusaurus/Translate';

// Competition page constants
export const COMPETITION_CONSTANTS = {
  TITLE_ID: 'competition.title',
  DESCRIPTION_ID: 'competition.description',
  DEFAULT_TITLE: 'Competition',
  DEFAULT_DESCRIPTION: 'Join the premier women\'s health innovation competition in China. Showcase your FemTech solutions and connect with leading investors.',
} as const;

// Helper functions to get translated content
export const getCompetitionTitle = () => translate({
  id: COMPETITION_CONSTANTS.TITLE_ID,
  message: COMPETITION_CONSTANTS.DEFAULT_TITLE,
});

export const getCompetitionDescription = () => translate({
  id: COMPETITION_CONSTANTS.DESCRIPTION_ID,
  message: COMPETITION_CONSTANTS.DEFAULT_DESCRIPTION,
}); 