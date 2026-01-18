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

// Static opinions data
export const staticOpinionsData: OpinionItem[] = [
  {
    id: '1',
    title: translateOpinionField(
      'opinions.data.ai-revolution.title',
      "The AI Revolution in Women's Health: What 2025 Will Bring"
    ),
    description: translateOpinionField(
      'opinions.data.ai-revolution.description',
      "As artificial intelligence transforms healthcare, women's health stands to benefit most—but only if we get the implementation right."
    ),
    category: getOpinionCategoryAnalysis(),
    date: 'January 12',
    readTime: getOpinionReadTime('6'),
    author: 'Zhu Yihan',
    link: '/opinions/ai-revolution-womens-health-2025',
    tags: [
      translateTag(OPINION_TAGS.INDUSTRY_ANALYSIS),
      translateTag(OPINION_TAGS.TECHNOLOGY_TRENDS),
      translateTag(OPINION_TAGS.THOUGHT_LEADERSHIP)
    ],
    tagKeys: [
      OPINION_TAGS.INDUSTRY_ANALYSIS,
      OPINION_TAGS.TECHNOLOGY_TRENDS,
      OPINION_TAGS.THOUGHT_LEADERSHIP
    ],
    isFeatured: true
  },
  {
    id: '2',
    title: translateOpinionField(
      'opinions.data.china-policy.title',
      "Policy Tailwinds: How China's New Healthcare Reforms Will Shape FemTech"
    ),
    description: translateOpinionField(
      'opinions.data.china-policy.description',
      "Recent policy shifts in China are creating unprecedented opportunities for women's health innovation. Here's what entrepreneurs and investors need to know."
    ),
    category: getOpinionCategoryPolicy(),
    date: 'January 8',
    readTime: getOpinionReadTime('7'),
    author: 'Maaike Steinebach',
    link: '/opinions/china-femtech-policy-outlook-2025',
    tags: [
      translateTag(OPINION_TAGS.POLICY_PERSPECTIVE),
      translateTag(OPINION_TAGS.MARKET_TRENDS),
      translateTag(OPINION_TAGS.COMMENTARY)
    ],
    tagKeys: [
      OPINION_TAGS.POLICY_PERSPECTIVE,
      OPINION_TAGS.MARKET_TRENDS,
      OPINION_TAGS.COMMENTARY
    ],
    isFeatured: false
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
