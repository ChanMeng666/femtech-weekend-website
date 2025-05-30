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
  INVESTMENT: 'investment'
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
    isFeatured: true
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
  return reports.sort((a, b) => 
    new Date('2024-' + b.date.replace(' ', '-')).getTime() - 
    new Date('2024-' + a.date.replace(' ', '-')).getTime()
  );
}; 