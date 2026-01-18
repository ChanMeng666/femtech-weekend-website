import {translate} from '@docusaurus/Translate';

// Opinions Hero section
export const getOpinionsTitle = () => translate({
  id: 'opinions.hero.title',
  message: 'The FemTech Opinions',
});

export const getOpinionsSubtitle = () => translate({
  id: 'opinions.hero.subtitle',
  message: 'Short articles and essays on women\'s health technology, trends, and perspectives',
});

// Opinions Section
export const getLatestOpinionsTitle = () => translate({
  id: 'opinions.section.title',
  message: 'Latest Opinions',
});

export const getLatestOpinionsSubtitle = () => translate({
  id: 'opinions.section.subtitle',
  message: 'Perspectives and analysis from thought leaders in women\'s health',
});

// Opinions CTA Section
export const getOpinionsCTATitle = () => translate({
  id: 'opinions.cta.title',
  message: 'Share Your Perspective',
});

export const getOpinionsCTADescription = () => translate({
  id: 'opinions.cta.description',
  message: 'Have insights on women\'s health technology? We welcome thought-provoking essays and analysis from industry experts.',
});

export const getLearnMoreAboutUsText = () => translate({
  id: 'opinions.cta.learnMoreButton',
  message: 'Learn More About Us',
});

export const getSubmitArticleText = () => translate({
  id: 'opinions.cta.submitButton',
  message: 'Submit Article',
});

// Featured Opinion Component
export const getFeaturedOpinionLabel = () => translate({
  id: 'opinions.featured.label',
  message: 'Featured Opinion',
});

// Opinion Item Translations
export const translateOpinionField = (id: string, defaultMessage: string) => translate({
  id,
  message: defaultMessage,
});

// Common opinion category text
export const getOpinionCategoryAnalysis = () => translate({
  id: 'opinions.category.analysis',
  message: 'Analysis',
});

export const getOpinionCategoryTrends = () => translate({
  id: 'opinions.category.trends',
  message: 'Trends',
});

export const getOpinionCategoryCommentary = () => translate({
  id: 'opinions.category.commentary',
  message: 'Commentary',
});

export const getOpinionCategoryPolicy = () => translate({
  id: 'opinions.category.policy',
  message: 'Policy',
});

// Format read time with minutes
export const getOpinionReadTime = (minutes: string) => {
  return `${minutes} min read`;
};

// Define tag translation mapping for filtering
export const getTagTranslations = () => {
  return {
    [translateOpinionField('opinions.tag.industryAnalysis', 'Industry Analysis')]: 'Industry Analysis',
    [translateOpinionField('opinions.tag.marketTrends', 'Market Trends')]: 'Market Trends',
    [translateOpinionField('opinions.tag.policyPerspective', 'Policy Perspective')]: 'Policy Perspective',
    [translateOpinionField('opinions.tag.commentary', 'Commentary')]: 'Commentary',
    [translateOpinionField('opinions.tag.thoughtLeadership', 'Thought Leadership')]: 'Thought Leadership',
    [translateOpinionField('opinions.tag.investmentInsights', 'Investment Insights')]: 'Investment Insights',
    [translateOpinionField('opinions.tag.technologyTrends', 'Technology Trends')]: 'Technology Trends',
    [translateOpinionField('opinions.tag.healthcareInnovation', 'Healthcare Innovation')]: 'Healthcare Innovation',
  };
};

// Function to get the English tag from a translated tag
export const getOriginalTag = (translatedTag: string): string => {
  const tagMappings = getTagTranslations();
  return tagMappings[translatedTag] || translatedTag;
};
