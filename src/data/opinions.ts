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

// Static opinions data (only listed items appear on /opinions; others are hidden)
export const staticOpinionsData: OpinionItem[] = [
  {
    id: '1',
    title: translateOpinionField(
      'opinions.data.hims-hers-eucalyptus.title',
      "When I Saw This $1.15bn Acquisition, My First Reaction Wasn't Excitement"
    ),
    description: translateOpinionField(
      'opinions.data.hims-hers-eucalyptus.description',
      "On February 19, 2026, Hims & Hers announced the acquisition of Eucalyptus for up to $1.15 billion. A capital story worth reading carefully—and what it means for women's health."
    ),
    category: getOpinionCategoryAnalysis(),
    date: 'February 19',
    readTime: getOpinionReadTime('8'),
    author: 'Zhu Yihan',
    link: '/opinions/hims-hers-eucalyptus-deal',
    tags: [
      translateTag(OPINION_TAGS.INDUSTRY_ANALYSIS),
      translateTag(OPINION_TAGS.MARKET_TRENDS),
      translateTag(OPINION_TAGS.COMMENTARY),
      translateTag(OPINION_TAGS.INVESTMENT_INSIGHTS)
    ],
    tagKeys: [
      OPINION_TAGS.INDUSTRY_ANALYSIS,
      OPINION_TAGS.MARKET_TRENDS,
      OPINION_TAGS.COMMENTARY,
      OPINION_TAGS.INVESTMENT_INSIGHTS
    ],
    isFeatured: true
  }
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
    if (dateStr.includes('January') || dateStr.includes('February')) {
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
