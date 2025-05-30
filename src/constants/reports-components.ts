import {translate} from '@docusaurus/Translate';

// Reports Hero section
export const getReportsTitle = () => translate({
  id: 'reports.hero.title',
  message: 'The FemTech Reports',
});

export const getReportsSubtitle = () => translate({
  id: 'reports.hero.subtitle',
  message: "Latest insights and research on women's health technology, innovation, and market trends",
});

// Reports Section
export const getLatestReportsTitle = () => translate({
  id: 'reports.section.title',
  message: 'Latest Reports',
});

export const getLatestReportsSubtitle = () => translate({
  id: 'reports.section.subtitle',
  message: 'Stay updated with our comprehensive research and analysis',
});

// Reports CTA Section
export const getReportsCTATitle = () => translate({
  id: 'reports.cta.title',
  message: 'Stay Updated with Our Research',
});

export const getReportsCTADescription = () => translate({
  id: 'reports.cta.description',
  message: 'Get the latest reports and insights delivered directly to your inbox. Join our community of women\'s health innovators and investors.',
});

export const getLearnMoreAboutUsText = () => translate({
  id: 'reports.cta.learnMoreButton',
  message: 'Learn More About Us',
});

export const getContactResearchTeamText = () => translate({
  id: 'reports.cta.contactButton',
  message: 'Contact Research Team',
});

// Featured Report Component
export const getFeaturedReportLabel = () => translate({
  id: 'reports.featured.label',
  message: 'Featured Report',
});

// Report Item Translations
export const translateReportField = (id, defaultMessage) => translate({
  id,
  message: defaultMessage,
});

// Common report item text
export const getReportCategoryResearch = () => translate({
  id: 'reports.category.research',
  message: 'Research',
});

export const getReportCategoryTechnology = () => translate({
  id: 'reports.category.technology',
  message: 'Technology',
});

export const getReportCategoryGeneral = () => translate({
  id: 'reports.category.general',
  message: 'General',
});

export const getReportCategoryInvestment = () => translate({
  id: 'reports.category.investment',
  message: 'Investment',
});

// Format read time with minutes
export const getReportReadTime = (minutes: string) => {
  return `${minutes} min read`;
};

// Define tag translation mapping for filtering
export const getTagTranslations = () => {
  // Return a mapping of translated tags to English tags
  return {
    // Research tags
    [translateReportField('reports.tag.research', 'Research')]: 'Research',
    [translateReportField('reports.tag.marketAnalysis', 'Market Analysis')]: 'Market Analysis',
    [translateReportField('reports.tag.china', 'China')]: 'China',
    [translateReportField('reports.tag.hongKong', 'Hong Kong')]: 'Hong Kong',
    
    // Technology tags
    [translateReportField('reports.tag.hackathon', 'Hackathon')]: 'Hackathon',
    [translateReportField('reports.tag.technology', 'Technology')]: 'Technology',
    [translateReportField('reports.tag.innovation', 'Innovation')]: 'Innovation',
    
    // General tags
    [translateReportField('reports.tag.competition', 'Competition')]: 'Competition',
    [translateReportField('reports.tag.womensHealth', 'Women\'s Health')]: 'Women\'s Health',
    
    // Investment tags
    [translateReportField('reports.tag.startup', 'Startup')]: 'Startup',
    [translateReportField('reports.tag.investment', 'Investment')]: 'Investment',
  };
};

// Function to get the English tag from a translated tag
export const getOriginalTag = (translatedTag: string): string => {
  const tagMappings = getTagTranslations();
  // Return the English version if found, otherwise return the input tag
  return tagMappings[translatedTag] || translatedTag;
}; 