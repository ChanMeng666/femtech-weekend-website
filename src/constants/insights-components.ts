import {translate} from '@docusaurus/Translate';

// Insights Hero section
export const getInsightsTitle = () => translate({
  id: 'insights.hero.title',
  message: 'The FemTech Insights',
});

export const getInsightsSubtitle = () => translate({
  id: 'insights.hero.subtitle',
  message: "Latest insights and research on women's health technology, innovation, and market trends",
});

// Insights Section
export const getLatestInsightsTitle = () => translate({
  id: 'insights.section.title',
  message: 'Latest Insights',
});

export const getLatestInsightsSubtitle = () => translate({
  id: 'insights.section.subtitle',
  message: 'Stay updated with our comprehensive research and analysis',
});

// Insights CTA Section
export const getInsightsCTATitle = () => translate({
  id: 'insights.cta.title',
  message: 'Stay Updated with Our Research',
});

export const getInsightsCTADescription = () => translate({
  id: 'insights.cta.description',
  message: 'Get the latest insights and research delivered directly to your inbox. Join our community of women\'s health innovators and investors.',
});

export const getLearnMoreAboutUsText = () => translate({
  id: 'insights.cta.learnMoreButton',
  message: 'Learn More About Us',
});

export const getContactResearchTeamText = () => translate({
  id: 'insights.cta.contactButton',
  message: 'Contact Research Team',
});

// Featured Insight Component
export const getFeaturedInsightLabel = () => translate({
  id: 'insights.featured.label',
  message: 'Featured Insight',
});

// Insight Item Translations
export const translateInsightField = (id, defaultMessage) => translate({
  id,
  message: defaultMessage,
});

// Common insight item text
export const getInsightCategoryResearch = () => translate({
  id: 'insights.category.research',
  message: 'Research',
});

export const getInsightCategoryTechnology = () => translate({
  id: 'insights.category.technology',
  message: 'Technology',
});

export const getInsightCategoryGeneral = () => translate({
  id: 'insights.category.general',
  message: 'General',
});

export const getInsightCategoryInvestment = () => translate({
  id: 'insights.category.investment',
  message: 'Investment',
});

// Format read time with minutes
export const getInsightReadTime = (minutes: string) => {
  return `${minutes} min read`;
};

// Define tag translation mapping for filtering
export const getTagTranslations = () => {
  // Return a mapping of translated tags to English tags
  return {
    // Research tags
    [translateInsightField('insights.tag.research', 'Research')]: 'Research',
    [translateInsightField('insights.tag.marketAnalysis', 'Market Analysis')]: 'Market Analysis',
    [translateInsightField('insights.tag.china', 'China')]: 'China',
    [translateInsightField('insights.tag.hongKong', 'Hong Kong')]: 'Hong Kong',

    // Technology tags
    [translateInsightField('insights.tag.hackathon', 'Hackathon')]: 'Hackathon',
    [translateInsightField('insights.tag.technology', 'Technology')]: 'Technology',
    [translateInsightField('insights.tag.innovation', 'Innovation')]: 'Innovation',

    // General tags
    [translateInsightField('insights.tag.womensHealth', 'Women\'s Health')]: 'Women\'s Health',

    // Investment tags
    [translateInsightField('insights.tag.startup', 'Startup')]: 'Startup',
    [translateInsightField('insights.tag.investment', 'Investment')]: 'Investment',
  };
};

// Function to get the English tag from a translated tag
export const getOriginalTag = (translatedTag: string): string => {
  const tagMappings = getTagTranslations();
  // Return the English version if found, otherwise return the input tag
  return tagMappings[translatedTag] || translatedTag;
};
