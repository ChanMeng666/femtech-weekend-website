import { translate } from '@docusaurus/Translate';

export const SUMMIT_CONSTANTS = {
  BANNER_LABEL_ID: 'summit.banner.label',
  BANNER_HEADLINE_ID: 'summit.banner.headline',
  BANNER_DESCRIPTION_ID: 'summit.banner.description',
  PAGE_TITLE_ID: 'summit.page.title',
  PAGE_DESCRIPTION_ID: 'summit.page.description',
  DEFAULT_BANNER_LABEL: 'FEATURED EVENT',
  DEFAULT_BANNER_HEADLINE: 'Where Global Women\'s Health Meets China',
  DEFAULT_BANNER_DESCRIPTION: 'Join a 4-day Shanghai programme that brings together global and Chinese leaders across women\'s health — with a flagship conference, a dedicated capital and pitch day, and curated site visits designed to unlock real insight into China\'s market, partnerships, and innovation ecosystem.',
  DEFAULT_PAGE_TITLE: 'Shanghai Summit 2026',
  DEFAULT_PAGE_DESCRIPTION: 'Cross-Border Capital & Partnerships in Women\'s Health - Shanghai, June 22-25, 2026',
} as const;

export const getBannerLabel = () => translate({
  id: SUMMIT_CONSTANTS.BANNER_LABEL_ID,
  message: SUMMIT_CONSTANTS.DEFAULT_BANNER_LABEL,
});

export const getBannerHeadline = () => translate({
  id: SUMMIT_CONSTANTS.BANNER_HEADLINE_ID,
  message: SUMMIT_CONSTANTS.DEFAULT_BANNER_HEADLINE,
});

export const getBannerDescription = () => translate({
  id: SUMMIT_CONSTANTS.BANNER_DESCRIPTION_ID,
  message: SUMMIT_CONSTANTS.DEFAULT_BANNER_DESCRIPTION,
});

export const getPageTitle = () => translate({
  id: SUMMIT_CONSTANTS.PAGE_TITLE_ID,
  message: SUMMIT_CONSTANTS.DEFAULT_PAGE_TITLE,
});

export const getPageDescription = () => translate({
  id: SUMMIT_CONSTANTS.PAGE_DESCRIPTION_ID,
  message: SUMMIT_CONSTANTS.DEFAULT_PAGE_DESCRIPTION,
});
