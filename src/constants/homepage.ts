import {translate} from '@docusaurus/Translate';

// Homepage constants
export const HOMEPAGE_CONSTANTS = {
  TITLE_ID: 'homepage.title',
  DESCRIPTION_ID: 'homepage.description',
  HERO_TITLE_ID: 'homepage.hero.title',
  HERO_SUBTITLE_ID: 'homepage.hero.subtitle',
  CTA_START_ID: 'homepage.hero.cta.start',
  CTA_LEARN_MORE_ID: 'homepage.hero.cta.learnMore',
  FEATURES_TITLE_ID: 'homepage.features.title',
  FEATURES_SUBTITLE_ID: 'homepage.features.subtitle',
  TESTIMONIALS_TITLE_ID: 'homepage.testimonials.title',
  TESTIMONIALS_SUBTITLE_ID: 'homepage.testimonials.subtitle',
  DEFAULT_TITLE: 'FemTech Weekend',
  DEFAULT_DESCRIPTION: "FemTech Weekend - Rooted in China, Connecting globally. We pioneer Women's Health Innovation in China to drive worldwide impact.",
  DEFAULT_HERO_TITLE: 'FemTech Weekend',
  DEFAULT_HERO_SUBTITLE: "Rooted in China, Connecting globally. We pioneer Women's Health Innovation in China to drive worldwide impact.",
  DEFAULT_CTA_START: 'Get Started',
  DEFAULT_CTA_LEARN_MORE: 'Learn More',
  DEFAULT_FEATURES_TITLE: 'Empowering Women\'s Health Innovation',
  DEFAULT_FEATURES_SUBTITLE: 'FemTech Weekend brings together entrepreneurs, investors, and healthcare professionals to advance women\'s health solutions.',
  DEFAULT_TESTIMONIALS_TITLE: 'What Our Community Says',
  DEFAULT_TESTIMONIALS_SUBTITLE: 'Hear from entrepreneurs, investors, and healthcare professionals who are part of our growing ecosystem.'
} as const;

// 添加轮播词翻译常量
export const HERO_ROTATING_WORDS = {
  WORD1_ID: 'homepage.hero.rotating.word1',
  WORD2_ID: 'homepage.hero.rotating.word2',
  WORD3_ID: 'homepage.hero.rotating.word3',
};

// Helper functions to get translated content
export const getHomepageTitle = () => translate({
  id: HOMEPAGE_CONSTANTS.TITLE_ID,
  message: HOMEPAGE_CONSTANTS.DEFAULT_TITLE,
});

export const getHomepageDescription = () => translate({
  id: HOMEPAGE_CONSTANTS.DESCRIPTION_ID,
  message: HOMEPAGE_CONSTANTS.DEFAULT_DESCRIPTION,
});

export const getHeroTitle = () => translate({
  id: HOMEPAGE_CONSTANTS.HERO_TITLE_ID,
  message: HOMEPAGE_CONSTANTS.DEFAULT_HERO_TITLE,
});

export const getHeroSubtitle = () => translate({
  id: HOMEPAGE_CONSTANTS.HERO_SUBTITLE_ID,
  message: HOMEPAGE_CONSTANTS.DEFAULT_HERO_SUBTITLE,
});

export const getCtaStart = () => translate({
  id: HOMEPAGE_CONSTANTS.CTA_START_ID,
  message: HOMEPAGE_CONSTANTS.DEFAULT_CTA_START,
});

export const getCtaLearnMore = () => translate({
  id: HOMEPAGE_CONSTANTS.CTA_LEARN_MORE_ID,
  message: HOMEPAGE_CONSTANTS.DEFAULT_CTA_LEARN_MORE,
});

export const getFeaturesTitle = () => translate({
  id: HOMEPAGE_CONSTANTS.FEATURES_TITLE_ID,
  message: HOMEPAGE_CONSTANTS.DEFAULT_FEATURES_TITLE,
});

export const getFeaturesSubtitle = () => translate({
  id: HOMEPAGE_CONSTANTS.FEATURES_SUBTITLE_ID,
  message: HOMEPAGE_CONSTANTS.DEFAULT_FEATURES_SUBTITLE,
});

export const getTestimonialsTitle = () => translate({
  id: HOMEPAGE_CONSTANTS.TESTIMONIALS_TITLE_ID,
  message: HOMEPAGE_CONSTANTS.DEFAULT_TESTIMONIALS_TITLE,
});

export const getTestimonialsSubtitle = () => translate({
  id: HOMEPAGE_CONSTANTS.TESTIMONIALS_SUBTITLE_ID,
  message: HOMEPAGE_CONSTANTS.DEFAULT_TESTIMONIALS_SUBTITLE,
});

// 添加轮播词获取函数
export const getHeroRotatingWord1 = () => translate({
  id: HERO_ROTATING_WORDS.WORD1_ID,
  message: "Drive women's health innovation with technology",
});

export const getHeroRotatingWord2 = () => translate({
  id: HERO_ROTATING_WORDS.WORD2_ID,
  message: "Amplify women in tech entrepreneurship",
});

export const getHeroRotatingWord3 = () => translate({
  id: HERO_ROTATING_WORDS.WORD3_ID,
  message: "Build a global collaborative ecosystem",
}); 