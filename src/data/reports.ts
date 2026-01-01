import { ReportItem } from '../types/reports';
import { 
  translateReportField,
  getReportCategoryResearch,
  getReportCategoryTechnology,
  getReportCategoryGeneral,
  getReportCategoryInvestment,
  getReportReadTime
} from '../constants/reports-components';
import { REPORT_CATEGORY_KEYS } from '../constants/reports';

// Define all possible report tags
const REPORT_TAGS = {
  RESEARCH: 'research',
  MARKET_ANALYSIS: 'marketAnalysis',
  CHINA: 'china',
  HONG_KONG: 'hongKong',
  HACKATHON: 'hackathon',
  TECHNOLOGY: 'technology',
  INNOVATION: 'innovation',
  COMPETITION: 'competition',
  WOMENS_HEALTH: 'womensHealth',
  STARTUP: 'startup',
  INVESTMENT: 'investment',
  PARTNERSHIP: 'partnership',
  EUROPE: 'europe',
  GLOBAL: 'global'
};

// Helper function to translate a tag
const translateTag = (tagKey: string) => {
  return translateReportField(`reports.tag.${tagKey}`, tagKey
    .replace(/([A-Z])/g, ' $1') // Add spaces before capital letters
    .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
  );
};

// Static fallback data based on existing blog posts
export const staticReportsData: ReportItem[] = [
  {
    id: '7',
    title: translateReportField(
      'reports.data.femtech-investment-landscape-2025.title',
      '2025 Global FemTech Investment Landscape Review: Capital Shift from Consumer Narrative to Serious Healthcare'
    ),
    description: translateReportField(
      'reports.data.femtech-investment-landscape-2025.description',
      'In 2025, the global FemTech sector has witnessed a surge in investment and financing activities. This comprehensive two-way analysis between Western countries and China reviews 50+ major transactions, deconstructing the underlying logic of capital preferences and sector structure.'
    ),
    category: getReportCategoryInvestment(),
    date: 'January 1',
    readTime: getReportReadTime('10'),
    author: 'Zhu Yihan',
    link: '/blog/femtech-investment-landscape-2025',
    tags: [
      translateTag(REPORT_TAGS.INVESTMENT),
      translateTag(REPORT_TAGS.MARKET_ANALYSIS),
      translateTag(REPORT_TAGS.CHINA),
      translateTag(REPORT_TAGS.GLOBAL),
      translateTag(REPORT_TAGS.WOMENS_HEALTH)
    ],
    tagKeys: [
      REPORT_TAGS.INVESTMENT,
      REPORT_TAGS.MARKET_ANALYSIS,
      REPORT_TAGS.CHINA,
      REPORT_TAGS.GLOBAL,
      REPORT_TAGS.WOMENS_HEALTH
    ],
    isFeatured: true
  },
  {
    id: '6',
    title: translateReportField(
      'reports.data.femmehealth-alliance.title',
      'FemTech Weekend Partners with FemmeHealth Ventures Alliance to Bridge China-Europe Women\'s Health Investment'
    ),
    description: translateReportField(
      'reports.data.femmehealth-alliance.description',
      'A groundbreaking content partnership to bring investment-grade women\'s health insights to Chinese-speaking audiences, fostering cross-border alignment in femtech innovation and strategic capital.'
    ),
    category: getReportCategoryInvestment(),
    date: 'June 12',
    readTime: getReportReadTime('5'),
    author: 'Zhu Yihan',
    image: '/img/reports/femmehealth-alliance-partnership.png',
    link: '/blog/femmehealth-ventures-alliance-partnership',
    tags: [
      translateTag(REPORT_TAGS.PARTNERSHIP),
      translateTag(REPORT_TAGS.INVESTMENT),
      translateTag(REPORT_TAGS.CHINA),
      translateTag(REPORT_TAGS.EUROPE),
      translateTag(REPORT_TAGS.WOMENS_HEALTH)
    ],
    tagKeys: [
      REPORT_TAGS.PARTNERSHIP,
      REPORT_TAGS.INVESTMENT,
      REPORT_TAGS.CHINA,
      REPORT_TAGS.EUROPE,
      REPORT_TAGS.WOMENS_HEALTH
    ],
    isFeatured: true
  },
  {
    id: '5',
    title: translateReportField(
      'reports.data.femtech-market-map.title',
      'FemTech Market Map 2025: Comprehensive Analysis of Women\'s Health Innovation in Mainland China and Hong Kong'
    ),
    description: translateReportField(
      'reports.data.femtech-market-map.description',
      'The FemTech market in Greater China is experiencing unprecedented growth, entering a phase of rapid expansion supported by favorable developments across policy, economic, social, and technological fronts.'
    ),
    category: getReportCategoryResearch(),
    date: 'May 30',
    readTime: getReportReadTime('10'),
    author: 'Zhu Yihan & Maaike Steinebach',
    image: '/img/reports/FemTech-Map-in-Greater-China-report-cover.svg',
    link: '/blog/femtech-market-map-greater-china-2025',
    tags: [
      translateTag(REPORT_TAGS.RESEARCH),
      translateTag(REPORT_TAGS.MARKET_ANALYSIS),
      translateTag(REPORT_TAGS.CHINA),
      translateTag(REPORT_TAGS.HONG_KONG)
    ],
    tagKeys: [
      REPORT_TAGS.RESEARCH,
      REPORT_TAGS.MARKET_ANALYSIS,
      REPORT_TAGS.CHINA,
      REPORT_TAGS.HONG_KONG
    ],
    isFeatured: false
  }
];

// Function to get reports data (can be extended to fetch from API)
export const getReportsData = (): ReportItem[] => {
  return staticReportsData;
};

// Function to get featured report
export const getFeaturedReport = (): ReportItem | undefined => {
  return staticReportsData.find(report => report.isFeatured);
};

// Function to filter reports by category
export const filterReportsByCategory = (reports: ReportItem[], category: string): ReportItem[] => {
  // If the category is "All Reports", return all reports
  if (category === REPORT_CATEGORY_KEYS.ALL_REPORTS) {
    return reports;
  }
  
  // Get the corresponding category key for consistency
  let categoryKey = '';
  
  if (category === REPORT_CATEGORY_KEYS.TECHNOLOGY || 
      category === getReportCategoryTechnology()) {
    categoryKey = getReportCategoryTechnology();
  } else if (category === REPORT_CATEGORY_KEYS.INVESTMENT || 
      category === getReportCategoryInvestment()) {
    categoryKey = getReportCategoryInvestment();
  } else if (category === REPORT_CATEGORY_KEYS.RESEARCH || 
      category === getReportCategoryResearch()) {
    categoryKey = getReportCategoryResearch();
  } else if (category === REPORT_CATEGORY_KEYS.GENERAL || 
      category === getReportCategoryGeneral()) {
    categoryKey = getReportCategoryGeneral();
  } else {
    categoryKey = category; // Fallback
  }
  
  // Filter reports by the standardized category
  return reports.filter(report => report.category === categoryKey);
};

// Function to sort reports by date (newest first)
export const sortReportsByDate = (reports: ReportItem[]): ReportItem[] => {
  const getYearFromDate = (dateStr: string): number => {
    // If date contains "January" and is 2026, return 2026
    // Otherwise assume 2025 for other dates
    if (dateStr.includes('January')) {
      return 2026;
    }
    return 2025;
  };

  return reports.sort((a, b) => {
    const yearA = getYearFromDate(a.date);
    const yearB = getYearFromDate(b.date);
    const dateA = new Date(`${yearA}-${a.date.replace(' ', '-')}`);
    const dateB = new Date(`${yearB}-${b.date.replace(' ', '-')}`);
    return dateB.getTime() - dateA.getTime();
  });
}; 