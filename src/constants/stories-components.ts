import {translate} from '@docusaurus/Translate';

// Stories Hero section
export const getStoriesTitle = () => translate({
  id: 'stories.hero.title',
  message: 'The FemTech Stories',
});

export const getStoriesSubtitle = () => translate({
  id: 'stories.hero.subtitle',
  message: 'Character interviews and inspiring stories from women\'s health innovators, founders, and leaders',
});

// Stories Section
export const getLatestStoriesTitle = () => translate({
  id: 'stories.section.title',
  message: 'Latest Stories',
});

export const getLatestStoriesSubtitle = () => translate({
  id: 'stories.section.subtitle',
  message: 'Discover the journeys of women shaping the future of health technology',
});

// Stories CTA Section
export const getStoriesCTATitle = () => translate({
  id: 'stories.cta.title',
  message: 'Share Your Story',
});

export const getStoriesCTADescription = () => translate({
  id: 'stories.cta.description',
  message: 'Are you a founder, investor, or innovator in women\'s health? We\'d love to feature your journey and insights.',
});

export const getLearnMoreAboutUsText = () => translate({
  id: 'stories.cta.learnMoreButton',
  message: 'Learn More About Us',
});

export const getContactUsText = () => translate({
  id: 'stories.cta.contactButton',
  message: 'Contact Us',
});

// Featured Story Component
export const getFeaturedStoryLabel = () => translate({
  id: 'stories.featured.label',
  message: 'Featured Story',
});

// Story Item Translations
export const translateStoryField = (id: string, defaultMessage: string) => translate({
  id,
  message: defaultMessage,
});

// Common story category text
export const getStoryCategoryFounders = () => translate({
  id: 'stories.category.founders',
  message: 'Founders',
});

export const getStoryCategoryInvestors = () => translate({
  id: 'stories.category.investors',
  message: 'Investors',
});

export const getStoryCategoryResearchers = () => translate({
  id: 'stories.category.researchers',
  message: 'Researchers',
});

export const getStoryCategoryInnovators = () => translate({
  id: 'stories.category.innovators',
  message: 'Innovators',
});

// Format read time with minutes
export const getStoryReadTime = (minutes: string) => {
  return `${minutes} min read`;
};

// Define tag translation mapping for filtering
export const getTagTranslations = () => {
  return {
    [translateStoryField('stories.tag.founderStory', 'Founder Story')]: 'Founder Story',
    [translateStoryField('stories.tag.investorPerspective', 'Investor Perspective')]: 'Investor Perspective',
    [translateStoryField('stories.tag.careerJourney', 'Career Journey')]: 'Career Journey',
    [translateStoryField('stories.tag.innovationStory', 'Innovation Story')]: 'Innovation Story',
    [translateStoryField('stories.tag.interview', 'Interview')]: 'Interview',
    [translateStoryField('stories.tag.leadership', 'Leadership')]: 'Leadership',
    [translateStoryField('stories.tag.entrepreneurship', 'Entrepreneurship')]: 'Entrepreneurship',
    [translateStoryField('stories.tag.researchJourney', 'Research Journey')]: 'Research Journey',
  };
};

// Function to get the English tag from a translated tag
export const getOriginalTag = (translatedTag: string): string => {
  const tagMappings = getTagTranslations();
  return tagMappings[translatedTag] || translatedTag;
};
