import {sortBy} from '../utils/jsUtils';

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

export const Tags: Record<TagType, {label: string; description: string; color: string}> = {
  '女性疾病': {
    label: '女性疾病',
    description: '专注于女性疾病的诊断、治疗和管理的公司',
    color: '#e41a1c'
  },
  '大众女性健康': {
    label: '大众女性健康',
    description: '提供通用女性健康服务和产品的公司',
    color: '#377eb8'
  },
  '医美': {
    label: '医美',
    description: '针对女性医疗美容服务和产品的公司',
    color: '#4daf4a'
  },
  '盆底健康与产后修复': {
    label: '盆底健康与产后修复',
    description: '专注于盆底健康和产后修复的公司',
    color: '#984ea3'
  },
  '心理健康': {
    label: '心理健康',
    description: '提供心理健康服务和解决方案的公司',
    color: '#ff7f00'
  },
  '更年期健康': {
    label: '更年期健康',
    description: '关注更年期健康管理的公司',
    color: '#ffff33'
  },
  '中医药与女性健康融合': {
    label: '中医药与女性健康',
    description: '将中医药与现代女性健康服务相结合的公司',
    color: '#a65628'
  },
  '孕产妇健康': {
    label: '孕产妇健康',
    description: '专注于孕期和产后健康服务的公司',
    color: '#f781bf'
  }
};

export const TagList: TagType[] = Object.keys(Tags) as TagType[];

// Load the data from JSON file
export const companies: Company[] = require('../../static/data/femtech-companies.json');

// Sort companies alphabetically
export const sortedCompanies = sortBy(companies, (company) => company.title.toLowerCase()); 