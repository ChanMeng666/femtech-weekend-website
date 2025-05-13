import {sortBy} from '../utils/jsUtils';
import {translate} from '@docusaurus/Translate';

export type TagType =
  | '女性疾病'
  | '大众女性健康'
  | '医美'
  | '盆底健康与产后修复'
  | '心理健康'
  | '更年期健康'
  | '中医药与女性健康融合'
  | '孕产妇健康';

export type FundingInfo = {
  round: string;
  date: string;
  amount: string;
};

export type Company = {
  title: string;
  description: string;
  preview: string | null;
  website: string;
  founders: string;
  location: string;
  investors: string[];
  fundingInfo: FundingInfo[];
  tags: TagType[];
};

// Default tag values (fallbacks when translation is unavailable)
const TagDefaults: Record<TagType, {defaultLabel: string; defaultDescription: string; color: string}> = {
  '女性疾病': {
    defaultLabel: 'Women\'s Diseases',
    defaultDescription: 'Companies focusing on the diagnosis, treatment and management of women\'s diseases',
    color: '#e41a1c'
  },
  '大众女性健康': {
    defaultLabel: 'General Women\'s Health',
    defaultDescription: 'Companies providing general women\'s health services and products',
    color: '#377eb8'
  },
  '医美': {
    defaultLabel: 'Medical Aesthetics',
    defaultDescription: 'Companies providing medical aesthetic services and products for women',
    color: '#4daf4a'
  },
  '盆底健康与产后修复': {
    defaultLabel: 'Pelvic Health',
    defaultDescription: 'Companies focusing on pelvic health and postpartum recovery',
    color: '#984ea3'
  },
  '心理健康': {
    defaultLabel: 'Mental Health',
    defaultDescription: 'Companies providing mental health services and solutions',
    color: '#ff7f00'
  },
  '更年期健康': {
    defaultLabel: 'Menopause Health',
    defaultDescription: 'Companies focused on menopause health management',
    color: '#ffff33'
  },
  '中医药与女性健康融合': {
    defaultLabel: 'TCM & Women\'s Health',
    defaultDescription: 'Companies combining Traditional Chinese Medicine with modern women\'s health services',
    color: '#a65628'
  },
  '孕产妇健康': {
    defaultLabel: 'Maternal Health',
    defaultDescription: 'Companies focused on maternal health services',
    color: '#f781bf'
  }
};

// Initialize Tags with defaults - we'll add translations later
export const Tags: Record<TagType, {label: string; description: string; color: string; defaultLabel: string; defaultDescription: string}> = {
  '女性疾病': {
    label: TagDefaults['女性疾病'].defaultLabel,
    description: TagDefaults['女性疾病'].defaultDescription,
    color: TagDefaults['女性疾病'].color,
    defaultLabel: TagDefaults['女性疾病'].defaultLabel,
    defaultDescription: TagDefaults['女性疾病'].defaultDescription
  },
  '大众女性健康': {
    label: TagDefaults['大众女性健康'].defaultLabel,
    description: TagDefaults['大众女性健康'].defaultDescription,
    color: TagDefaults['大众女性健康'].color,
    defaultLabel: TagDefaults['大众女性健康'].defaultLabel,
    defaultDescription: TagDefaults['大众女性健康'].defaultDescription
  },
  '医美': {
    label: TagDefaults['医美'].defaultLabel,
    description: TagDefaults['医美'].defaultDescription,
    color: TagDefaults['医美'].color,
    defaultLabel: TagDefaults['医美'].defaultLabel,
    defaultDescription: TagDefaults['医美'].defaultDescription
  },
  '盆底健康与产后修复': {
    label: TagDefaults['盆底健康与产后修复'].defaultLabel,
    description: TagDefaults['盆底健康与产后修复'].defaultDescription,
    color: TagDefaults['盆底健康与产后修复'].color,
    defaultLabel: TagDefaults['盆底健康与产后修复'].defaultLabel,
    defaultDescription: TagDefaults['盆底健康与产后修复'].defaultDescription
  },
  '心理健康': {
    label: TagDefaults['心理健康'].defaultLabel,
    description: TagDefaults['心理健康'].defaultDescription,
    color: TagDefaults['心理健康'].color,
    defaultLabel: TagDefaults['心理健康'].defaultLabel,
    defaultDescription: TagDefaults['心理健康'].defaultDescription
  },
  '更年期健康': {
    label: TagDefaults['更年期健康'].defaultLabel,
    description: TagDefaults['更年期健康'].defaultDescription,
    color: TagDefaults['更年期健康'].color,
    defaultLabel: TagDefaults['更年期健康'].defaultLabel,
    defaultDescription: TagDefaults['更年期健康'].defaultDescription
  },
  '中医药与女性健康融合': {
    label: TagDefaults['中医药与女性健康融合'].defaultLabel,
    description: TagDefaults['中医药与女性健康融合'].defaultDescription,
    color: TagDefaults['中医药与女性健康融合'].color,
    defaultLabel: TagDefaults['中医药与女性健康融合'].defaultLabel,
    defaultDescription: TagDefaults['中医药与女性健康融合'].defaultDescription
  },
  '孕产妇健康': {
    label: TagDefaults['孕产妇健康'].defaultLabel,
    description: TagDefaults['孕产妇健康'].defaultDescription,
    color: TagDefaults['孕产妇健康'].color,
    defaultLabel: TagDefaults['孕产妇健康'].defaultLabel,
    defaultDescription: TagDefaults['孕产妇健康'].defaultDescription
  }
};

// Now that Tags is defined, we can get translations
function applyTranslations() {
  // Apply translations for each tag
  Object.keys(Tags).forEach((tag) => {
    const tagKey = tag as TagType;
    Tags[tagKey].label = translate({
      id: `femtech-tags.${tagKey}.label`,
      message: Tags[tagKey].defaultLabel,
    });
    
    Tags[tagKey].description = translate({
      id: `femtech-tags.${tagKey}.description`,
      message: Tags[tagKey].defaultDescription,
    });
  });
}

// Apply translations
applyTranslations();

export const TagList: TagType[] = Object.keys(Tags) as TagType[];

// Load the data from JSON file
export const companies: Company[] = require('../../static/data/femtech-companies.json');

// Sort companies alphabetically
export const sortedCompanies = sortBy(companies, (company) => company.title.toLowerCase()); 