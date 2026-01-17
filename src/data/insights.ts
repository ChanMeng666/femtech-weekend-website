import { InsightItem } from '../types/insights';
import {
  translateInsightField,
  getInsightCategoryResearch,
  getInsightCategoryTechnology,
  getInsightCategoryGeneral,
  getInsightCategoryInvestment,
  getInsightReadTime
} from '../constants/insights-components';
import { INSIGHT_CATEGORY_KEYS } from '../constants/insights';

// Define all possible insight tags
const INSIGHT_TAGS = {
  RESEARCH: 'research',
  MARKET_ANALYSIS: 'marketAnalysis',
  CHINA: 'china',
  HONG_KONG: 'hongKong',
  HACKATHON: 'hackathon',
  TECHNOLOGY: 'technology',
  INNOVATION: 'innovation',
  WOMENS_HEALTH: 'womensHealth',
  STARTUP: 'startup',
  INVESTMENT: 'investment',
  PARTNERSHIP: 'partnership',
  EUROPE: 'europe',
  GLOBAL: 'global'
};

// Helper function to translate a tag
const translateTag = (tagKey: string) => {
  return translateInsightField(`insights.tag.${tagKey}`, tagKey
    .replace(/([A-Z])/g, ' $1') // Add spaces before capital letters
    .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
  );
};

// Static fallback data based on existing blog posts
export const staticInsightsData: InsightItem[] = [
  {
    id: '6',
    title: translateInsightField(
      'insights.data.femmehealth-alliance.title',
      'FemTech Weekend Partners with FemmeHealth Ventures Alliance to Bridge China-Europe Women\'s Health Investment'
    ),
    description: translateInsightField(
      'insights.data.femmehealth-alliance.description',
      'A groundbreaking content partnership to bring investment-grade women\'s health insights to Chinese-speaking audiences, fostering cross-border alignment in femtech innovation and strategic capital.'
    ),
    category: getInsightCategoryInvestment(),
    date: 'June 12',
    readTime: getInsightReadTime('5'),
    author: 'Zhu Yihan',
    image: '/img/reports/femmehealth-alliance-partnership.png',
    link: '/blog/femmehealth-ventures-alliance-partnership',
    tags: [
      translateTag(INSIGHT_TAGS.PARTNERSHIP),
      translateTag(INSIGHT_TAGS.INVESTMENT),
      translateTag(INSIGHT_TAGS.CHINA),
      translateTag(INSIGHT_TAGS.EUROPE),
      translateTag(INSIGHT_TAGS.WOMENS_HEALTH)
    ],
    tagKeys: [
      INSIGHT_TAGS.PARTNERSHIP,
      INSIGHT_TAGS.INVESTMENT,
      INSIGHT_TAGS.CHINA,
      INSIGHT_TAGS.EUROPE,
      INSIGHT_TAGS.WOMENS_HEALTH
    ],
    isFeatured: true
  },
  {
    id: '5',
    title: translateInsightField(
      'insights.data.femtech-market-map.title',
      'FemTech Market Map 2025: Comprehensive Analysis of Women\'s Health Innovation in Mainland China and Hong Kong'
    ),
    description: translateInsightField(
      'insights.data.femtech-market-map.description',
      'The FemTech market in Greater China is experiencing unprecedented growth, entering a phase of rapid expansion supported by favorable developments across policy, economic, social, and technological fronts.'
    ),
    category: getInsightCategoryResearch(),
    date: 'May 30',
    readTime: getInsightReadTime('10'),
    author: 'Zhu Yihan & Maaike Steinebach',
    image: '/img/reports/FemTech-Map-in-Greater-China-report-cover.svg',
    link: '/blog/femtech-market-map-greater-china-2025',
    tags: [
      translateTag(INSIGHT_TAGS.RESEARCH),
      translateTag(INSIGHT_TAGS.MARKET_ANALYSIS),
      translateTag(INSIGHT_TAGS.CHINA),
      translateTag(INSIGHT_TAGS.HONG_KONG)
    ],
    tagKeys: [
      INSIGHT_TAGS.RESEARCH,
      INSIGHT_TAGS.MARKET_ANALYSIS,
      INSIGHT_TAGS.CHINA,
      INSIGHT_TAGS.HONG_KONG
    ],
    isFeatured: false
  }
];

// Function to get insights data (can be extended to fetch from API)
export const getInsightsData = (): InsightItem[] => {
  return staticInsightsData;
};

// Function to get featured insight
export const getFeaturedInsight = (): InsightItem | undefined => {
  return staticInsightsData.find(insight => insight.isFeatured);
};

// Function to filter insights by category
export const filterInsightsByCategory = (insights: InsightItem[], category: string): InsightItem[] => {
  // If the category is "All Insights", return all insights
  if (category === INSIGHT_CATEGORY_KEYS.ALL_INSIGHTS) {
    return insights;
  }

  // Get the corresponding category key for consistency
  let categoryKey = '';

  if (category === INSIGHT_CATEGORY_KEYS.TECHNOLOGY ||
      category === getInsightCategoryTechnology()) {
    categoryKey = getInsightCategoryTechnology();
  } else if (category === INSIGHT_CATEGORY_KEYS.INVESTMENT ||
      category === getInsightCategoryInvestment()) {
    categoryKey = getInsightCategoryInvestment();
  } else if (category === INSIGHT_CATEGORY_KEYS.RESEARCH ||
      category === getInsightCategoryResearch()) {
    categoryKey = getInsightCategoryResearch();
  } else if (category === INSIGHT_CATEGORY_KEYS.GENERAL ||
      category === getInsightCategoryGeneral()) {
    categoryKey = getInsightCategoryGeneral();
  } else {
    categoryKey = category; // Fallback
  }

  // Filter insights by the standardized category
  return insights.filter(insight => insight.category === categoryKey);
};

// Function to sort insights by date (newest first)
export const sortInsightsByDate = (insights: InsightItem[]): InsightItem[] => {
  const getYearFromDate = (dateStr: string): number => {
    // If date contains "January" and is 2026, return 2026
    // Otherwise assume 2025 for other dates
    if (dateStr.includes('January')) {
      return 2026;
    }
    return 2025;
  };

  return insights.sort((a, b) => {
    const yearA = getYearFromDate(a.date);
    const yearB = getYearFromDate(b.date);
    const dateA = new Date(`${yearA}-${a.date.replace(' ', '-')}`);
    const dateB = new Date(`${yearB}-${b.date.replace(' ', '-')}`);
    return dateB.getTime() - dateA.getTime();
  });
};
