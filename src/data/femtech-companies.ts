import {sortBy} from '../utils/jsUtils';
import {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useMemo} from 'react';

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
export const TagDefaults: Record<TagType, {defaultLabel: string; defaultDescription: string; color: string}> = {
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

// Create a hook to get translated tags
export function useTranslatedTags() {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  
  return useMemo(() => {
    // Function to get translation for a tag
    const getTranslatedTag = (tagKey: TagType) => {
      // Direct translations for Chinese locale
      if (currentLocale === 'zh-Hans') {
        const zhTranslations: Record<TagType, {label: string; description: string}> = {
          '女性疾病': {
            label: '女性疾病',
            description: '专注于女性疾病的诊断、治疗和管理的公司'
          },
          '大众女性健康': {
            label: '大众女性健康',
            description: '提供通用女性健康服务和产品的公司'
          },
          '医美': {
            label: '医美',
            description: '针对女性医疗美容服务和产品的公司'
          },
          '盆底健康与产后修复': {
            label: '盆底健康与产后修复',
            description: '专注于盆底健康和产后修复的公司'
          },
          '心理健康': {
            label: '心理健康',
            description: '提供心理健康服务和解决方案的公司'
          },
          '更年期健康': {
            label: '更年期健康',
            description: '关注更年期健康管理的公司'
          },
          '中医药与女性健康融合': {
            label: '中医药与女性健康',
            description: '将中医药与现代女性健康服务相结合的公司'
          },
          '孕产妇健康': {
            label: '孕产妇健康',
            description: '专注于孕期和产后健康服务的公司'
          }
        };
        return zhTranslations[tagKey];
      }
      
      // Default to Docusaurus translations for other locales
      return {
        label: translate({
          id: `femtech-tags.${tagKey}.label`,
          message: TagDefaults[tagKey].defaultLabel,
        }),
        description: translate({
          id: `femtech-tags.${tagKey}.description`,
          message: TagDefaults[tagKey].defaultDescription,
        }),
      };
    };
    
    // Create Tags object with translations
    const translatedTags: Record<TagType, {label: string; description: string; color: string; defaultLabel: string; defaultDescription: string}> = {
      '女性疾病': {
        ...getTranslatedTag('女性疾病'),
        color: TagDefaults['女性疾病'].color,
        defaultLabel: TagDefaults['女性疾病'].defaultLabel,
        defaultDescription: TagDefaults['女性疾病'].defaultDescription
      },
      '大众女性健康': {
        ...getTranslatedTag('大众女性健康'),
        color: TagDefaults['大众女性健康'].color,
        defaultLabel: TagDefaults['大众女性健康'].defaultLabel,
        defaultDescription: TagDefaults['大众女性健康'].defaultDescription
      },
      '医美': {
        ...getTranslatedTag('医美'),
        color: TagDefaults['医美'].color,
        defaultLabel: TagDefaults['医美'].defaultLabel,
        defaultDescription: TagDefaults['医美'].defaultDescription
      },
      '盆底健康与产后修复': {
        ...getTranslatedTag('盆底健康与产后修复'),
        color: TagDefaults['盆底健康与产后修复'].color,
        defaultLabel: TagDefaults['盆底健康与产后修复'].defaultLabel,
        defaultDescription: TagDefaults['盆底健康与产后修复'].defaultDescription
      },
      '心理健康': {
        ...getTranslatedTag('心理健康'),
        color: TagDefaults['心理健康'].color,
        defaultLabel: TagDefaults['心理健康'].defaultLabel,
        defaultDescription: TagDefaults['心理健康'].defaultDescription
      },
      '更年期健康': {
        ...getTranslatedTag('更年期健康'),
        color: TagDefaults['更年期健康'].color,
        defaultLabel: TagDefaults['更年期健康'].defaultLabel,
        defaultDescription: TagDefaults['更年期健康'].defaultDescription
      },
      '中医药与女性健康融合': {
        ...getTranslatedTag('中医药与女性健康融合'),
        color: TagDefaults['中医药与女性健康融合'].color,
        defaultLabel: TagDefaults['中医药与女性健康融合'].defaultLabel,
        defaultDescription: TagDefaults['中医药与女性健康融合'].defaultDescription
      },
      '孕产妇健康': {
        ...getTranslatedTag('孕产妇健康'),
        color: TagDefaults['孕产妇健康'].color,
        defaultLabel: TagDefaults['孕产妇健康'].defaultLabel,
        defaultDescription: TagDefaults['孕产妇健康'].defaultDescription
      }
    };
    
    return translatedTags;
  }, [currentLocale]);
}

// Basic tags for non-React contexts (will use default labels)
export const Tags: Record<TagType, {label: string; description: string; color: string; defaultLabel: string; defaultDescription: string}> = Object.entries(TagDefaults).reduce((acc, [tag, defaults]) => {
  acc[tag as TagType] = {
    label: defaults.defaultLabel,
    description: defaults.defaultDescription,
    color: defaults.color,
    defaultLabel: defaults.defaultLabel,
    defaultDescription: defaults.defaultDescription
  };
  return acc;
}, {} as Record<TagType, {label: string; description: string; color: string; defaultLabel: string; defaultDescription: string}>);

export const TagList: TagType[] = Object.keys(Tags) as TagType[];

// Load the data from JSON file
export const companies: Company[] = require('../../static/data/femtech-companies.json');

// Sort companies alphabetically
export const sortedCompanies = sortBy(companies, (company) => company.title.toLowerCase()); 