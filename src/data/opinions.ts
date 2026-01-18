import { OpinionItem } from '../types/opinions';
import {
  translateOpinionField,
  getOpinionCategoryAnalysis,
  getOpinionCategoryTrends,
  getOpinionCategoryCommentary,
  getOpinionCategoryPolicy,
  getOpinionReadTime
} from '../constants/opinions-components';
import { OPINION_CATEGORY_KEYS } from '../constants/opinions';

// Define all possible opinion tags
const OPINION_TAGS = {
  INDUSTRY_ANALYSIS: 'industryAnalysis',
  MARKET_TRENDS: 'marketTrends',
  POLICY_PERSPECTIVE: 'policyPerspective',
  COMMENTARY: 'commentary',
  THOUGHT_LEADERSHIP: 'thoughtLeadership',
  INVESTMENT_INSIGHTS: 'investmentInsights',
  TECHNOLOGY_TRENDS: 'technologyTrends',
  HEALTHCARE_INNOVATION: 'healthcareInnovation'
};

// Helper function to translate a tag
const translateTag = (tagKey: string) => {
  return translateOpinionField(`opinions.tag.${tagKey}`, tagKey
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
  );
};

// Static fallback data - initially empty, add opinions as they are published
export const staticOpinionsData: OpinionItem[] = [
  // Example opinion entry (commented out until real content is available):
  // {
  //   id: '1',
  //   title: translateOpinionField(
  //     'opinions.data.example.title',
  //     'Example Opinion Title'
  //   ),
  //   description: translateOpinionField(
  //     'opinions.data.example.description',
  //     'Example description of the opinion piece.'
  //   ),
  //   category: getOpinionCategoryAnalysis(),
  //   date: 'January 15',
  //   readTime: getOpinionReadTime('5'),
  //   author: 'Zhu Yihan',
  //   image: '/img/opinions/example.jpg',
  //   link: '/opinions/example-opinion',
  //   tags: [
  //     translateTag(OPINION_TAGS.INDUSTRY_ANALYSIS),
  //     translateTag(OPINION_TAGS.THOUGHT_LEADERSHIP)
  //   ],
  //   tagKeys: [
  //     OPINION_TAGS.INDUSTRY_ANALYSIS,
  //     OPINION_TAGS.THOUGHT_LEADERSHIP
  //   ],
  //   isFeatured: true
  // }
];

// Function to get opinions data (can be extended to fetch from API)
export const getOpinionsData = (): OpinionItem[] => {
  return staticOpinionsData;
};

// Function to get featured opinion
export const getFeaturedOpinion = (): OpinionItem | undefined => {
  return staticOpinionsData.find(opinion => opinion.isFeatured);
};

// Function to filter opinions by category
export const filterOpinionsByCategory = (opinions: OpinionItem[], category: string): OpinionItem[] => {
  if (category === OPINION_CATEGORY_KEYS.ALL_OPINIONS) {
    return opinions;
  }

  let categoryKey = '';

  if (category === OPINION_CATEGORY_KEYS.ANALYSIS ||
      category === getOpinionCategoryAnalysis()) {
    categoryKey = getOpinionCategoryAnalysis();
  } else if (category === OPINION_CATEGORY_KEYS.TRENDS ||
      category === getOpinionCategoryTrends()) {
    categoryKey = getOpinionCategoryTrends();
  } else if (category === OPINION_CATEGORY_KEYS.COMMENTARY ||
      category === getOpinionCategoryCommentary()) {
    categoryKey = getOpinionCategoryCommentary();
  } else if (category === OPINION_CATEGORY_KEYS.POLICY ||
      category === getOpinionCategoryPolicy()) {
    categoryKey = getOpinionCategoryPolicy();
  } else {
    categoryKey = category;
  }

  return opinions.filter(opinion => opinion.category === categoryKey);
};

// Function to sort opinions by date (newest first)
export const sortOpinionsByDate = (opinions: OpinionItem[]): OpinionItem[] => {
  const getYearFromDate = (dateStr: string): number => {
    if (dateStr.includes('January')) {
      return 2026;
    }
    return 2025;
  };

  return opinions.sort((a, b) => {
    const yearA = getYearFromDate(a.date);
    const yearB = getYearFromDate(b.date);
    const dateA = new Date(`${yearA}-${a.date.replace(' ', '-')}`);
    const dateB = new Date(`${yearB}-${b.date.replace(' ', '-')}`);
    return dateB.getTime() - dateA.getTime();
  });
};
