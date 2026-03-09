import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import zhLocale from 'i18n-iso-countries/langs/zh.json';
import {
  COMPANY_TYPE_OPTIONS,
  PROGRAMME_COMPANY_STAGE_OPTIONS,
  PROGRAMME_FUNDING_OPTIONS,
  PROGRAMME_CHINA_OBJECTIVES,
  PROGRAMME_TARGET_CUSTOMER_OPTIONS,
  PROGRAMME_CHINA_ENGAGEMENT_OPTIONS,
  PROGRAMME_CHINA_CONCERNS,
} from '../../data/shanghai-summit';
import { FormSuccess } from '../../components/ShanghaiSummit';

countries.registerLocale(enLocale);
countries.registerLocale(zhLocale);

type OptionItem = { value: string; label: string };
const toOptions = (arr: string[]): OptionItem[] => arr.map((s) => ({ value: s, label: s }));

const translations = {
  en: {
    pageTitle: 'Programme Application - Shanghai Summit',
    pageDescription: 'Apply for the FemTech Weekend Shanghai Summit China Programme.',
    heading: 'Application to Programme',
    description: 'A curated programme for international companies, investors, and ecosystem leaders looking to explore, enter, or expand in the China women\'s health market. Over 4 days in Shanghai, participants gain direct access to hospitals, pharma companies, regulators, and distribution partners — guided by our local team.',
    howItWorks: 'How It Works',
    steps: ['Basic Information', 'Company Snapshot', 'China Objective & Readiness'],
    howItWorksCards: [
      {
        title: 'Apply',
        desc: 'Complete the application form below with your company details and China objectives.',
      },
      {
        title: 'Intro Call',
        desc: 'Shortlisted applicants will be invited for an intro call to discuss objectives and fit.',
      },
      {
        title: 'Selection & Confirmation',
        desc: 'Selected participants confirm their spot with the programme fee (GBP 1,999).',
      },
    ],
    draftRestored: 'Draft restored from your previous session.',
    // Step 0
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    linkedinProfile: 'LinkedIn Profile',
    companyHeadquarters: 'Company Headquarters',
    companyName: 'Company Name',
    companyWebsite: 'Company Website',
    roleTitle: 'Your Role / Title',
    marketsServed: 'Markets Currently Served',
    ecosystemLabel: 'FemTech Ecosystem / Community',
    // Step 1
    companyType: 'Which best describes your company?',
    companyStage: 'Stage',
    fundingRaised: 'Funding raised to date',
    companyOverview: 'Upload company overview (PDF)',
    // Step 2
    chinaObjectives: 'What are your top objectives for China? (select up to 3)',
    chinaObjectivesMax: 'Maximum 3 selections',
    targetCustomer: 'Who is your target customer in China?',
    chinaRelevance: 'Why is China strategically relevant for your company right now?',
    chinaEngagement: 'Have you engaged with China before?',
    chinaConcerns: 'What are your top concerns about entering China?',
    worthwhileOutcome: 'What would make this programme worthwhile for you?',
    worthwhileHint: '3-5 sentences',
    consentLabel: 'I consent to FemTech Weekend storing and processing my data for the purpose of this programme application. My data will be handled in accordance with applicable data protection regulations.',
    // Placeholders
    searchCountry: 'Search or select a country...',
    noCountriesFound: 'No countries found',
    selectMarkets: 'Select or type markets...',
    selectEcosystems: 'Select or type ecosystems...',
    select: 'Select...',
    pleaseSpecify: 'Please specify...',
    describeCompanyType: 'Describe your company type...',
    describeTargetCustomer: 'Describe your target customer...',
    describeConcern: 'Please describe...',
    typeToAddMore: 'Type to add more...',
    tagHint: 'Select from suggestions or type a custom value and press Enter',
    // PDF upload
    dropPdf: 'Drop your PDF here or',
    browse: 'browse',
    pdfOnly: 'PDF only, max 10MB',
    onlyPdfAccepted: 'Only PDF files are accepted.',
    fileTooLarge: 'File is too large. Maximum size is 10MB.',
    // Review
    reviewTitle: 'Review Your Application',
    editSection: 'Edit',
    name: 'Name',
    company: 'Company',
    website: 'Website',
    headquarters: 'Headquarters',
    role: 'Role',
    marketsServedReview: 'Markets Served',
    ecosystemReview: 'Ecosystem',
    type: 'Type',
    stage: 'Stage',
    funding: 'Funding',
    overviewReview: 'Company Overview',
    objectivesReview: 'China Objectives',
    targetCustomerReview: 'Target Customer',
    relevanceReview: 'China Relevance',
    engagementReview: 'China Engagement',
    concernsReview: 'Concerns',
    outcomeReview: 'Worthwhile Outcome',
    // Buttons
    back: 'Back',
    next: 'Next',
    submitApplication: 'Submit Application',
    submitting: 'Submitting...',
    uploadingOverview: 'Uploading company overview...',
    submittingApp: 'Submitting application...',
    // Errors
    firstNameRequired: 'First name is required',
    lastNameRequired: 'Last name is required',
    emailRequired: 'Email is required',
    invalidEmail: 'Please enter a valid email address',
    companyNameRequired: 'Company name is required',
    uploadFailed: 'Failed to upload company overview. Please try again.',
    uploadNetworkError: 'Failed to upload company overview. Please check your connection and try again.',
    submitFailed: 'Submission failed. Please try again.',
    networkError: 'Network error. Please try again.',
    // Success
    successPageTitle: 'Programme Application Submitted',
    successPageDescription: 'Your programme application has been submitted.',
    successTitle: 'Application Submitted',
    successMessageWithRef: (ref: string) => `Your reference number is ${ref}. We're excited to learn more about your China objectives.`,
    successMessage: "Thank you for applying to the FemTech Weekend Shanghai Summit Programme. We're excited to learn more about your China objectives.",
    successSteps: [
      'Our team reviews your application (1–2 weeks)',
      "We'll schedule an intro call to explore your objectives",
      'Selected participants confirm their spot with a £1,999 programme fee',
    ],
    successNextStepsHeading: 'What Happens Next',
    successCta: 'Back to Summit',
    // Options
    companyTypeOptions: toOptions(COMPANY_TYPE_OPTIONS),
    companyStageOptions: toOptions(PROGRAMME_COMPANY_STAGE_OPTIONS),
    fundingOptions: toOptions(PROGRAMME_FUNDING_OPTIONS),
    chinaObjectiveOptions: toOptions(PROGRAMME_CHINA_OBJECTIVES),
    targetCustomerOptions: toOptions(PROGRAMME_TARGET_CUSTOMER_OPTIONS),
    chinaEngagementOptions: toOptions(PROGRAMME_CHINA_ENGAGEMENT_OPTIONS),
    chinaConcernOptions: toOptions(PROGRAMME_CHINA_CONCERNS),
    marketPresets: [
      'China', 'United States', 'United Kingdom', 'Europe (EU)',
      'Southeast Asia', 'Japan', 'South Korea', 'India',
      'Middle East', 'Africa', 'Latin America', 'Australia / NZ',
      'Canada', 'Global',
    ],
  },
  zh: {
    pageTitle: '项目申请 - 上海峰会',
    pageDescription: '申请参加FemTech Weekend 2026上海峰会中国项目。',
    heading: '项目申请',
    description: '面向国际企业、投资人和生态领袖的精选项目，旨在探索、进入或拓展中国女性健康市场。在上海为期4天的行程中，参与者将直接对接医院、药企、监管机构和分销合作伙伴——由我们的本地团队全程引导。',
    howItWorks: '申请流程',
    steps: ['基本信息', '公司概况', '中国目标与准备'],
    howItWorksCards: [
      {
        title: '申请',
        desc: '填写以下申请表，提供您的公司信息和中国市场目标。',
      },
      {
        title: '介绍通话',
        desc: '入围申请者将受邀进行介绍通话，讨论目标与匹配度。',
      },
      {
        title: '筛选与确认',
        desc: '入选参与者通过支付项目费用（1,999英镑）确认名额。',
      },
    ],
    draftRestored: '已从上次会话中恢复草稿。',
    // Step 0
    firstName: '名',
    lastName: '姓',
    email: '电子邮箱',
    linkedinProfile: 'LinkedIn 主页',
    companyHeadquarters: '公司总部所在地',
    companyName: '公司名称',
    companyWebsite: '公司网站',
    roleTitle: '您的职位',
    marketsServed: '当前服务市场',
    ecosystemLabel: 'FemTech 生态/社区',
    // Step 1
    companyType: '以下哪项最能描述您的公司？',
    companyStage: '公司阶段',
    fundingRaised: '累计融资金额',
    companyOverview: '上传公司概览 (PDF)',
    // Step 2
    chinaObjectives: '您在中国的首要目标是什么？（最多选3项）',
    chinaObjectivesMax: '最多选择3项',
    targetCustomer: '您在中国的目标客户是谁？',
    chinaRelevance: '为什么中国对您的公司具有战略意义？',
    chinaEngagement: '您之前是否与中国有过合作？',
    chinaConcerns: '您对进入中国最担心什么？',
    worthwhileOutcome: '什么样的成果会让这个项目对您有价值？',
    worthwhileHint: '3-5句话',
    consentLabel: '我同意FemTech Weekend为本项目申请之目的存储和处理我的数据。我的数据将依据相关数据保护法规进行处理。',
    // Placeholders
    searchCountry: '搜索或选择国家/地区...',
    noCountriesFound: '未找到匹配的国家/地区',
    selectMarkets: '选择或输入市场...',
    selectEcosystems: '选择或输入生态/社区...',
    select: '请选择...',
    pleaseSpecify: '请说明...',
    describeCompanyType: '请描述您的公司类型...',
    describeTargetCustomer: '请描述您的目标客户...',
    describeConcern: '请描述...',
    typeToAddMore: '输入以添加更多...',
    tagHint: '从建议中选择，或输入自定义内容后按回车确认',
    // PDF upload
    dropPdf: '将PDF文件拖放到此处或',
    browse: '浏览',
    pdfOnly: '仅支持PDF格式，最大10MB',
    onlyPdfAccepted: '仅接受PDF格式文件。',
    fileTooLarge: '文件过大，最大不超过10MB。',
    // Review
    reviewTitle: '审核您的申请',
    editSection: '编辑',
    name: '姓名',
    company: '公司',
    website: '网站',
    headquarters: '总部',
    role: '职位',
    marketsServedReview: '服务市场',
    ecosystemReview: '生态/社区',
    type: '类型',
    stage: '阶段',
    funding: '融资',
    overviewReview: '公司概览',
    objectivesReview: '中国目标',
    targetCustomerReview: '目标客户',
    relevanceReview: '中国战略意义',
    engagementReview: '中国合作经验',
    concernsReview: '顾虑',
    outcomeReview: '期望成果',
    // Buttons
    back: '返回',
    next: '下一步',
    submitApplication: '提交申请',
    submitting: '提交中...',
    uploadingOverview: '正在上传公司概览...',
    submittingApp: '正在提交申请...',
    // Errors
    firstNameRequired: '请填写名字',
    lastNameRequired: '请填写姓氏',
    emailRequired: '请填写电子邮箱',
    invalidEmail: '请输入有效的电子邮箱地址',
    companyNameRequired: '请填写公司名称',
    uploadFailed: '公司概览上传失败，请重试。',
    uploadNetworkError: '公司概览上传失败，请检查网络连接后重试。',
    submitFailed: '提交失败，请重试。',
    networkError: '网络错误，请重试。',
    // Success
    successPageTitle: '项目申请已提交',
    successPageDescription: '您的项目申请已提交。',
    successTitle: '申请已提交',
    successMessageWithRef: (ref: string) => `您的参考编号为 ${ref}。我们非常期待了解您的中国市场目标。`,
    successMessage: '感谢您申请FemTech Weekend上海峰会项目。我们非常期待了解您的中国市场目标。',
    successSteps: [
      '我们的团队将审核您的申请（1-2周）',
      '我们将安排介绍通话，了解您的目标',
      '入选参与者支付£1,999项目费确认名额',
    ],
    successNextStepsHeading: '接下来',
    successCta: '返回峰会页面',
    // Options
    companyTypeOptions: [
      { value: 'Digital health / care delivery', label: '数字健康/医疗服务' },
      { value: 'Medical device', label: '医疗器械' },
      { value: 'Diagnostics', label: '诊断' },
      { value: 'Biotech / therapeutics', label: '生物技术/治疗' },
      { value: 'Consumer health / wellness brand', label: '消费健康/健康品牌' },
      { value: 'Data / AI / infrastructure', label: '数据/AI/基础设施' },
      { value: 'Other', label: '其他' },
    ] as OptionItem[],
    companyStageOptions: [
      { value: 'Idea / MVP', label: '想法/MVP' },
      { value: 'Early revenue', label: '早期收入' },
      { value: 'Scaling', label: '扩展期' },
      { value: 'Mature / profitable', label: '成熟/盈利' },
    ] as OptionItem[],
    fundingOptions: [
      { value: 'Not raised', label: '未融资' },
      { value: '<$500k', label: '<50万美元' },
      { value: '$500k-$2m', label: '50万-200万美元' },
      { value: '$2m-$10m', label: '200万-1000万美元' },
      { value: '$10m+', label: '1000万美元以上' },
    ] as OptionItem[],
    chinaObjectiveOptions: [
      { value: 'Investor meetings', label: '投资人会面' },
      { value: 'Strategic partnerships (pharma/medtech/insurer/employer/research orgs)', label: '战略合作（药企/医疗器械/保险/雇主/研究机构）' },
      { value: 'Distribution/channel partners', label: '分销/渠道合作伙伴' },
      { value: 'Hospital/clinic pilots', label: '医院/诊所试点' },
      { value: 'Regulatory pathway & compliance guidance', label: '监管路径与合规指导' },
      { value: 'Manufacturing/supply chain partners', label: '制造/供应链合作伙伴' },
      { value: 'China GTM support', label: '中国市场进入支持' },
    ] as OptionItem[],
    targetCustomerOptions: [
      { value: 'Consumers (DTC)', label: '消费者 (DTC)' },
      { value: 'Hospitals/clinics', label: '医院/诊所' },
      { value: 'Pharma/medtech partners', label: '药企/医疗器械合作伙伴' },
      { value: 'Employers/insurers', label: '雇主/保险公司' },
      { value: 'Government/public health', label: '政府/公共卫生' },
      { value: 'Other', label: '其他' },
    ] as OptionItem[],
    chinaEngagementOptions: [
      { value: 'No', label: '没有' },
      { value: 'Explored only', label: '仅探索过' },
      { value: 'Already Selling', label: '已在销售' },
      { value: 'Have Local Partner', label: '有本地合作伙伴' },
      { value: 'Have Entity', label: '有实体' },
    ] as OptionItem[],
    chinaConcernOptions: [
      { value: 'Regulation', label: '监管' },
      { value: 'IP', label: '知识产权' },
      { value: 'Data compliance', label: '数据合规' },
      { value: 'Pricing', label: '定价' },
      { value: 'GTM', label: '市场进入策略' },
      { value: 'Culture', label: '文化' },
      { value: 'Finding the right partners', label: '寻找合适的合作伙伴' },
      { value: 'Other', label: '其他' },
    ] as OptionItem[],
    marketPresets: [
      '中国', '美国', '英国', '欧洲 (EU)',
      '东南亚', '日本', '韩国', '印度',
      '中东', '非洲', '拉丁美洲', '澳大利亚/新西兰',
      '加拿大', '全球',
    ],
  },
} as const;

const inputClass =
  'w-full border border-border px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition';
const inputErrorClass =
  'w-full border border-red-400 px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-red-400/50 focus:border-red-400 outline-none transition';
const labelClass = 'block text-sm font-medium text-foreground mb-1.5';
const btnPrimary =
  'bg-primary text-white hover:bg-primary/90 px-8 py-3 font-medium transition hover:shadow-[0_0_16px_rgba(170,124,82,0.15)] disabled:opacity-50 disabled:cursor-not-allowed';
const btnSecondary =
  'border border-border text-foreground hover:bg-muted px-8 py-3 font-medium transition';

const TOTAL_STEPS = 3;
const DRAFT_KEY = 'programme-application-draft';

const ECOSYSTEM_PRESETS = [
  'FemTech Weekend', 'FemTech Lab', 'FemTech Collective',
  'FemTech Association Asia', 'FemTech Future / FemTech NL',
  'Nordic Women\'s Health Hub', 'FemmeHealth Alliance',
  'Hatch (by Bayer)', 'Plug and Play', 'Y Combinator',
  'Techstars', '500 Global', 'HAX', 'IndieBio',
  'StartX', 'Rock Health', 'SOSV', 'Entrepreneur First',
];

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  headquarters: string;
  companyName: string;
  companyWebsite: string;
  roleTitle: string;
  marketServed: string[];
  ecosystem: string[];
  companyType: string;
  companyTypeOther: string;
  companyStage: string;
  fundingRaised: string;
  companyOverviewUrl: string;
  chinaObjectives: string[];
  targetCustomer: string;
  targetCustomerOther: string;
  chinaRelevance: string;
  chinaEngagement: string;
  chinaConcerns: string[];
  chinaConcernsOther: string;
  worthwhileOutcome: string;
  consentData: boolean;
};

const initial: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  linkedin: '',
  headquarters: '',
  companyName: '',
  companyWebsite: '',
  roleTitle: '',
  marketServed: [],
  ecosystem: [],
  companyType: '',
  companyTypeOther: '',
  companyStage: '',
  fundingRaised: '',
  companyOverviewUrl: '',
  chinaObjectives: [],
  targetCustomer: '',
  targetCustomerOther: '',
  chinaRelevance: '',
  chinaEngagement: '',
  chinaConcerns: [],
  chinaConcernsOther: '',
  worthwhileOutcome: '',
  consentData: false,
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ---------- CountryCombobox ---------- */
function CountryCombobox({
  value,
  onChange,
  disabled,
  locale = 'en',
  placeholderText,
  noResultsText,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  locale?: string;
  placeholderText?: string;
  noResultsText?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const countryLocale = locale === 'zh' ? 'zh' : 'en';
  const allCountries = useMemo(() => {
    const obj = countries.getNames(countryLocale, { select: 'official' });
    return Object.values(obj).sort((a, b) => a.localeCompare(b, countryLocale));
  }, [countryLocale]);

  const filtered = useMemo(() => {
    if (!query) return allCountries;
    const q = query.toLowerCase();
    return allCountries.filter((c) => c.toLowerCase().includes(q));
  }, [query, allCountries]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
        if (value) setQuery(value);
        else setQuery('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [value]);

  const handleSelect = (country: string) => {
    onChange(country);
    setQuery(country);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          className={inputClass}
          value={open ? query : value || query}
          placeholder={placeholderText || 'Search or select a country...'}
          disabled={disabled}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!open) setOpen(true);
            if (value && e.target.value !== value) onChange('');
          }}
          onFocus={() => {
            setOpen(true);
            setQuery(value || '');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setOpen(false);
              inputRef.current?.blur();
            }
            if (e.key === 'Enter' && filtered.length > 0) {
              e.preventDefault();
              handleSelect(filtered[0]);
            }
          }}
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          autoComplete="off"
        />
        <button
          type="button"
          tabIndex={-1}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition"
          onClick={() => {
            if (!disabled) {
              setOpen(!open);
              if (!open) inputRef.current?.focus();
            }
          }}
          aria-label="Toggle country list"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d={open ? 'M18 15l-6-6-6 6' : 'M6 9l6 6 6-6'} />
          </svg>
        </button>
      </div>
      {open && (
        <ul
          className="absolute z-50 mt-1 w-full max-h-56 overflow-auto border border-border bg-card shadow-lg text-sm"
          role="listbox"
        >
          {filtered.length === 0 ? (
            <li className="px-4 py-3 text-muted-foreground text-center">{noResultsText || 'No countries found'}</li>
          ) : (
            filtered.map((c) => (
              <li
                key={c}
                role="option"
                aria-selected={c === value}
                className={`px-4 py-2.5 cursor-pointer transition-colors ${
                  c === value
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-foreground hover:bg-muted'
                }`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect(c);
                }}
              >
                {c}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

/* ---------- TagInput ---------- */
function TagInput({
  value,
  onChange,
  presets,
  placeholder,
  disabled,
  typeToAddMore,
  hint,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  presets: string[];
  placeholder?: string;
  disabled?: boolean;
  typeToAddMore?: string;
  hint?: string;
}) {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredPresets = useMemo(() => {
    const q = inputValue.toLowerCase();
    return presets.filter(
      (p) => !value.includes(p) && (!q || p.toLowerCase().includes(q)),
    );
  }, [inputValue, presets, value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInputValue('');
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((v) => v !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue);
    }
    if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div
        className={`${inputClass} flex flex-wrap gap-1.5 min-h-[46px] cursor-text !py-2`}
        onClick={() => !disabled && inputRef.current?.focus()}
      >
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium pl-2.5 pr-1 py-1 max-w-full"
          >
            <span className="truncate">{tag}</span>
            {!disabled && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeTag(tag); }}
                className="p-0.5 hover:bg-primary/20 rounded-sm transition flex-shrink-0"
                aria-label={`Remove ${tag}`}
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground/60"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : (typeToAddMore || 'Type to add more...')}
          disabled={disabled}
          autoComplete="off"
        />
      </div>
      {showSuggestions && filteredPresets.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full max-h-48 overflow-auto border border-border bg-card shadow-lg text-sm">
          {filteredPresets.map((p) => (
            <li
              key={p}
              className="px-4 py-2 cursor-pointer text-foreground hover:bg-muted transition-colors"
              onMouseDown={(e) => {
                e.preventDefault();
                addTag(p);
                setShowSuggestions(false);
              }}
            >
              {p}
            </li>
          ))}
        </ul>
      )}
      <p className="text-[11px] text-muted-foreground/60 mt-1">
        {hint || 'Select from suggestions or type a custom value and press Enter'}
      </p>
    </div>
  );
}

/* ---------- SelectWithOther ---------- */
const OTHER_TRIGGERS = ['Other'];

function SelectWithOther({
  label,
  options,
  value,
  otherValue,
  onSelect,
  onOtherChange,
  otherPlaceholder,
  disabled,
  selectText,
}: {
  label: string;
  options: OptionItem[];
  value: string;
  otherValue: string;
  onSelect: (v: string) => void;
  onOtherChange: (v: string) => void;
  otherPlaceholder?: string;
  disabled?: boolean;
  selectText?: string;
}) {
  const isOther = OTHER_TRIGGERS.includes(value);
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <select className={inputClass} value={value} onChange={(e) => onSelect(e.target.value)} disabled={disabled}>
        <option value="">{selectText || 'Select...'}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {isOther && (
        <input
          className={`${inputClass} mt-2`}
          type="text"
          value={otherValue}
          onChange={(e) => onOtherChange(e.target.value)}
          placeholder={otherPlaceholder}
          disabled={disabled}
          autoFocus
        />
      )}
    </div>
  );
}

/* ---------- Main Component ---------- */
export default function ProgrammeApplication() {
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const locale = currentLocale === 'zh-Hans' ? 'zh' : 'en';
  const t = translations[locale];

  const optLabel = useCallback((value: string, opts: readonly OptionItem[]) => {
    const found = opts.find((o) => o.value === value);
    return found ? found.label : value;
  }, []);

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [submitPhase, setSubmitPhase] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');
  const [error, setError] = useState('');
  const [debugLog, setDebugLog] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [draftRestored, setDraftRestored] = useState(false);

  // PDF upload state
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUploading, setPdfUploading] = useState(false);
  const [pdfError, setPdfError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Restore draft on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && parsed.firstName) {
          const ensureArray = (v: unknown): string[] =>
            Array.isArray(v) ? v : typeof v === 'string' && v ? [v] : [];
          const migrated = {
            ...initial,
            ...parsed,
            ecosystem: ensureArray(parsed.ecosystem),
            marketServed: ensureArray(parsed.marketServed),
            chinaObjectives: ensureArray(parsed.chinaObjectives),
            chinaConcerns: ensureArray(parsed.chinaConcerns),
          };
          setForm(migrated);
          setDraftRestored(true);
          setTimeout(() => setDraftRestored(false), 3000);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Auto-save draft (debounced)
  const saveDraft = useCallback((data: FormData) => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
      } catch {
        // ignore
      }
    }, 500);
  }, []);

  const set = (field: keyof FormData, value: string | string[] | boolean) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      saveDraft(updated);
      return updated;
    });
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const toggleArrayField = (field: 'chinaObjectives' | 'chinaConcerns', item: string, max?: number) => {
    setForm((prev) => {
      const arr = prev[field] as string[];
      let updated: string[];
      if (arr.includes(item)) {
        updated = arr.filter((a) => a !== item);
      } else {
        if (max && arr.length >= max) return prev;
        updated = [...arr, item];
      }
      const newForm = { ...prev, [field]: updated };
      saveDraft(newForm);
      return newForm;
    });
  };

  const handleBlur = (field: keyof FormData) => {
    setTouchedFields((prev) => new Set(prev).add(field));
    validateField(field);
  };

  const validateField = (field: keyof FormData) => {
    const errors: Partial<Record<keyof FormData, string>> = {};
    if (field === 'firstName' && !form.firstName.trim()) errors.firstName = t.firstNameRequired;
    if (field === 'lastName' && !form.lastName.trim()) errors.lastName = t.lastNameRequired;
    if (field === 'email') {
      if (!form.email.trim()) errors.email = t.emailRequired;
      else if (!isValidEmail(form.email)) errors.email = t.invalidEmail;
    }
    if (field === 'companyName' && !form.companyName.trim()) errors.companyName = t.companyNameRequired;

    setFieldErrors((prev) => {
      const next = { ...prev };
      if (errors[field]) next[field] = errors[field];
      else delete next[field];
      return next;
    });
  };

  const validateStep = (s: number): boolean => {
    if (s === 0) {
      const errors: Partial<Record<keyof FormData, string>> = {};
      if (!form.firstName.trim()) errors.firstName = t.firstNameRequired;
      if (!form.lastName.trim()) errors.lastName = t.lastNameRequired;
      if (!form.email.trim()) errors.email = t.emailRequired;
      else if (!isValidEmail(form.email)) errors.email = t.invalidEmail;
      if (!form.companyName.trim()) errors.companyName = t.companyNameRequired;
      setFieldErrors(errors);
      return Object.keys(errors).length === 0;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPdfError('');
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setPdfError(t.onlyPdfAccepted);
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setPdfError(t.fileTooLarge);
      return;
    }
    setPdfFile(file);
  };

  const removePdf = () => {
    setPdfFile(null);
    setPdfError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async () => {
    if (!validateStep(0)) {
      setStep(0);
      return;
    }
    if (!form.consentData) {
      setStep(2);
      return;
    }

    setSubmitting(true);
    setError('');
    setDebugLog('');
    const logs: string[] = [];
    const log = (msg: string) => { logs.push(`[${new Date().toISOString()}] ${msg}`); };

    try {
      let overviewUrl = form.companyOverviewUrl;

      // Upload PDF if selected
      if (pdfFile && !overviewUrl) {
        setSubmitPhase(t.uploadingOverview);
        setPdfUploading(true);
        try {
          log('Starting PDF upload...');
          const base64 = await readFileAsBase64(pdfFile);
          log(`PDF base64 length: ${base64.length}`);
          const uploadRes = await fetch('/api/upload-company-overview', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ file: base64, email: form.email }),
          });
          log(`Upload response status: ${uploadRes.status}`);
          const uploadText = await uploadRes.text();
          log(`Upload response body: ${uploadText}`);
          let uploadData: Record<string, unknown>;
          try { uploadData = JSON.parse(uploadText); } catch { uploadData = { raw: uploadText }; }
          if (uploadData.success) {
            overviewUrl = uploadData.url as string;
            log(`Upload success, URL: ${overviewUrl}`);
          } else {
            log('Upload failed');
            setError((uploadData.message as string) || t.uploadFailed);
            setDebugLog(logs.join('\n'));
            setSubmitting(false);
            setPdfUploading(false);
            setSubmitPhase('');
            return;
          }
        } catch (uploadErr: unknown) {
          const msg = uploadErr instanceof Error ? uploadErr.message : String(uploadErr);
          log(`Upload exception: ${msg}`);
          setError(t.uploadNetworkError);
          setDebugLog(logs.join('\n'));
          setSubmitting(false);
          setPdfUploading(false);
          setSubmitPhase('');
          return;
        }
        setPdfUploading(false);
      }

      setSubmitPhase(t.submittingApp);
      const payload = {
        ...form,
        companyOverviewUrl: overviewUrl,
      };
      log('Submitting payload...');
      log(`Payload: ${JSON.stringify(payload, null, 2)}`);
      const res = await fetch('/api/submit-programme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      log(`Submit response status: ${res.status}`);
      const resText = await res.text();
      log(`Submit response body: ${resText}`);
      let data: Record<string, unknown>;
      try { data = JSON.parse(resText); } catch { data = { raw: resText }; }
      if (data.success) {
        setReferenceNumber((data.referenceNumber as string) || '');
        setSubmitted(true);
        window.scrollTo({ top: 0 });
        try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
      } else {
        setError((data.message as string) || t.submitFailed);
        setDebugLog(logs.join('\n'));
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? `${err.message}\n${err.stack}` : String(err);
      log(`Exception: ${msg}`);
      setError(t.networkError);
      setDebugLog(logs.join('\n'));
    } finally {
      setSubmitting(false);
      setSubmitPhase('');
    }
  };

  if (submitted) {
    return (
      <Layout title={t.successPageTitle} description={t.successPageDescription}>
        <FormSuccess
          title={t.successTitle}
          message={
            referenceNumber
              ? t.successMessageWithRef(referenceNumber)
              : t.successMessage
          }
          nextSteps={t.successSteps as unknown as string[]}
          nextStepsHeading={t.successNextStepsHeading}
          ctaLabel={t.successCta}
        />
      </Layout>
    );
  }

  const fieldInput = (
    field: keyof FormData,
    label: string,
    opts?: { required?: boolean; type?: string; placeholder?: string; hint?: string },
  ) => {
    const hasError = touchedFields.has(field) && fieldErrors[field];
    return (
      <div>
        <label className={labelClass}>
          {label}{opts?.required && ' *'}
        </label>
        <input
          className={hasError ? inputErrorClass : inputClass}
          type={opts?.type || 'text'}
          value={form[field] as string}
          onChange={(e) => set(field, e.target.value)}
          onBlur={() => handleBlur(field)}
          placeholder={opts?.placeholder}
          disabled={submitting}
        />
        {opts?.hint && !hasError && (
          <p className="text-xs text-muted-foreground mt-1">{opts.hint}</p>
        )}
        {hasError && (
          <p className="text-xs text-red-500 mt-1">{fieldErrors[field]}</p>
        )}
      </div>
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Layout title={t.pageTitle} description={t.pageDescription}>
      <div className="bg-background min-h-screen px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Page header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-foreground mb-4">{t.heading}</h1>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto leading-relaxed">
              {t.description}
            </p>
          </div>

          {/* How It Works */}
          <div className="mb-14">
            <p className="text-xs tracking-[0.2em] uppercase text-[#AA7C52] text-center mb-8 font-medium">{t.howItWorks}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-0">
              {t.howItWorksCards.map((card, i) => (
                <div
                  key={i}
                  className={`relative p-6 sm:p-7 ${
                    i === 0
                      ? 'border border-border sm:border-r-0'
                      : i === 1
                        ? 'border border-border sm:border-r-0'
                        : 'border border-border'
                  } ${i > 0 ? 'border-t-0 sm:border-t' : ''}`}
                >
                  <span className="text-[11px] font-mono text-[#AA7C52]/50 tracking-wider">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-semibold text-foreground text-sm mt-2 mb-2.5">{card.title}</h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Draft restored toast */}
          {draftRestored && (
            <div className="mb-4 px-4 py-2.5 bg-primary/5 border border-primary/20 text-sm text-primary text-center transition-opacity">
              {t.draftRestored}
            </div>
          )}

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
            {t.steps.map((label, i) => (
              <React.Fragment key={label}>
                {i > 0 && <div className="w-8 h-px bg-border" />}
                <button
                  type="button"
                  onClick={() => i < step && setStep(i)}
                  className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition ${
                    i === step
                      ? 'bg-primary text-white shadow-[0_0_8px_rgba(170,124,82,0.15)]'
                      : i < step
                        ? 'bg-primary/10 text-primary cursor-pointer'
                        : 'bg-muted text-muted-foreground'
                  }`}
                  disabled={submitting}
                >
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                    {i + 1}
                  </span>
                  <span className="hidden sm:inline">{label}</span>
                </button>
              </React.Fragment>
            ))}
          </div>

          {/* Form card */}
          <div className="border border-border bg-card p-6 sm:p-8 border-t-2 border-t-[#AA7C52]/20">

            {/* Step 0: Basic Information */}
            {step === 0 && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {fieldInput('firstName', t.firstName, { required: true })}
                  {fieldInput('lastName', t.lastName, { required: true })}
                </div>
                {fieldInput('email', t.email, { required: true, type: 'email' })}
                {fieldInput('linkedin', t.linkedinProfile, { placeholder: 'https://linkedin.com/in/...' })}
                <div>
                  <label className={labelClass}>{t.companyHeadquarters}</label>
                  <CountryCombobox
                    value={form.headquarters}
                    onChange={(v) => set('headquarters', v)}
                    disabled={submitting}
                    locale={locale}
                    placeholderText={t.searchCountry}
                    noResultsText={t.noCountriesFound}
                  />
                </div>
                {fieldInput('companyName', t.companyName, { required: true })}
                {fieldInput('companyWebsite', t.companyWebsite, { placeholder: 'https://...' })}
                {fieldInput('roleTitle', t.roleTitle)}
                <div>
                  <label className={labelClass}>{t.marketsServed}</label>
                  <TagInput
                    value={form.marketServed}
                    onChange={(v) => set('marketServed', v)}
                    presets={t.marketPresets as unknown as string[]}
                    placeholder={t.selectMarkets}
                    disabled={submitting}
                    typeToAddMore={t.typeToAddMore}
                    hint={t.tagHint}
                  />
                </div>
                <div>
                  <label className={labelClass}>{t.ecosystemLabel}</label>
                  <TagInput
                    value={form.ecosystem}
                    onChange={(v) => set('ecosystem', v)}
                    presets={ECOSYSTEM_PRESETS}
                    placeholder={t.selectEcosystems}
                    disabled={submitting}
                    typeToAddMore={t.typeToAddMore}
                    hint={t.tagHint}
                  />
                </div>
              </div>
            )}

            {/* Step 1: Company Snapshot */}
            {step === 1 && (
              <div className="space-y-5">
                <SelectWithOther
                  label={t.companyType}
                  options={t.companyTypeOptions as unknown as OptionItem[]}
                  value={form.companyType}
                  otherValue={form.companyTypeOther}
                  onSelect={(v) => { set('companyType', v); if (!OTHER_TRIGGERS.includes(v)) set('companyTypeOther', ''); }}
                  onOtherChange={(v) => set('companyTypeOther', v)}
                  otherPlaceholder={t.describeCompanyType}
                  disabled={submitting}
                  selectText={t.select}
                />
                <div>
                  <label className={labelClass}>{t.companyStage}</label>
                  <select className={inputClass} value={form.companyStage} onChange={(e) => set('companyStage', e.target.value)} disabled={submitting}>
                    <option value="">{t.select}</option>
                    {(t.companyStageOptions as unknown as OptionItem[]).map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>{t.fundingRaised}</label>
                  <select className={inputClass} value={form.fundingRaised} onChange={(e) => set('fundingRaised', e.target.value)} disabled={submitting}>
                    <option value="">{t.select}</option>
                    {(t.fundingOptions as unknown as OptionItem[]).map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>

                {/* PDF Upload */}
                <div>
                  <label className={labelClass}>{t.companyOverview}</label>
                  {!pdfFile ? (
                    <div
                      className={`border-2 border-dashed ${pdfError ? 'border-red-400 bg-red-50/50' : 'border-border'} p-8 text-center cursor-pointer transition hover:border-primary/50 hover:bg-primary/5`}
                      onClick={() => !submitting && fileInputRef.current?.click()}
                      onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (submitting) return;
                        const file = e.dataTransfer.files?.[0];
                        if (file) {
                          const dt = new DataTransfer();
                          dt.items.add(file);
                          if (fileInputRef.current) {
                            fileInputRef.current.files = dt.files;
                            handleFileSelect({ target: { files: dt.files } } as React.ChangeEvent<HTMLInputElement>);
                          }
                        }
                      }}
                    >
                      <svg className="mx-auto h-10 w-10 text-muted-foreground/40 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                      </svg>
                      <p className="text-sm text-muted-foreground mb-1">
                        {t.dropPdf} <span className="text-primary font-medium">{t.browse}</span>
                      </p>
                      <p className="text-xs text-muted-foreground/60">{t.pdfOnly}</p>
                    </div>
                  ) : (
                    <div className="border border-green-200 bg-green-50/50 p-4 flex items-center gap-3">
                      <svg className="h-8 w-8 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{pdfFile.name}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(pdfFile.size)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={removePdf}
                        disabled={submitting}
                        className="text-muted-foreground hover:text-red-500 transition p-1"
                        aria-label="Remove file"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    className="hidden"
                    onChange={handleFileSelect}
                    disabled={submitting}
                  />
                  {pdfError && (
                    <p className="text-xs text-red-500 mt-1.5">{pdfError}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: China Objective & Readiness */}
            {step === 2 && (
              <div className="space-y-5">
                {/* China Objectives (max 3) */}
                <div>
                  <label className={labelClass}>{t.chinaObjectives}</label>
                  <div className="space-y-2 mt-1">
                    {(t.chinaObjectiveOptions as unknown as OptionItem[]).map((opt) => {
                      const checked = form.chinaObjectives.includes(opt.value);
                      const disabled3 = !checked && form.chinaObjectives.length >= 3;
                      return (
                        <label
                          key={opt.value}
                          className={`flex items-center gap-3 p-3 border text-sm cursor-pointer transition ${
                            disabled3
                              ? 'border-border bg-muted/50 opacity-50 cursor-not-allowed'
                              : checked
                                ? 'border-primary bg-primary/5 text-foreground'
                                : 'border-border text-foreground hover:border-primary/50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleArrayField('chinaObjectives', opt.value, 3)}
                            disabled={submitting || disabled3}
                            className="rounded border-border"
                          />
                          {opt.label}
                        </label>
                      );
                    })}
                  </div>
                  {form.chinaObjectives.length >= 3 && (
                    <p className="text-xs text-muted-foreground mt-1">{t.chinaObjectivesMax}</p>
                  )}
                </div>

                {/* Target Customer */}
                <SelectWithOther
                  label={t.targetCustomer}
                  options={t.targetCustomerOptions as unknown as OptionItem[]}
                  value={form.targetCustomer}
                  otherValue={form.targetCustomerOther}
                  onSelect={(v) => { set('targetCustomer', v); if (!OTHER_TRIGGERS.includes(v)) set('targetCustomerOther', ''); }}
                  onOtherChange={(v) => set('targetCustomerOther', v)}
                  otherPlaceholder={t.describeTargetCustomer}
                  disabled={submitting}
                  selectText={t.select}
                />

                {/* China Relevance */}
                <div>
                  <label className={labelClass}>{t.chinaRelevance}</label>
                  <textarea
                    className={inputClass}
                    rows={4}
                    value={form.chinaRelevance}
                    onChange={(e) => set('chinaRelevance', e.target.value)}
                    disabled={submitting}
                  />
                </div>

                {/* China Engagement */}
                <div>
                  <label className={labelClass}>{t.chinaEngagement}</label>
                  <select className={inputClass} value={form.chinaEngagement} onChange={(e) => set('chinaEngagement', e.target.value)} disabled={submitting}>
                    <option value="">{t.select}</option>
                    {(t.chinaEngagementOptions as unknown as OptionItem[]).map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>

                {/* China Concerns */}
                <div>
                  <label className={labelClass}>{t.chinaConcerns}</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {(t.chinaConcernOptions as unknown as OptionItem[]).map((opt) => (
                      <label key={opt.value} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.chinaConcerns.includes(opt.value)}
                          onChange={() => toggleArrayField('chinaConcerns', opt.value)}
                          className="rounded border-border"
                          disabled={submitting}
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                  {form.chinaConcerns.includes('Other') && (
                    <input
                      className={`${inputClass} mt-2`}
                      type="text"
                      value={form.chinaConcernsOther}
                      onChange={(e) => set('chinaConcernsOther', e.target.value)}
                      placeholder={t.describeConcern}
                      disabled={submitting}
                      autoFocus
                    />
                  )}
                </div>

                {/* Worthwhile Outcome */}
                <div>
                  <label className={labelClass}>{t.worthwhileOutcome}</label>
                  <textarea
                    className={inputClass}
                    rows={4}
                    value={form.worthwhileOutcome}
                    onChange={(e) => set('worthwhileOutcome', e.target.value)}
                    disabled={submitting}
                  />
                  <p className="text-xs text-muted-foreground mt-1">{t.worthwhileHint}</p>
                </div>

                {/* Data consent */}
                <div className="border border-border p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.consentData}
                      onChange={(e) => set('consentData', e.target.checked)}
                      className="mt-1 rounded border-border"
                      disabled={submitting}
                    />
                    <span className="text-sm text-foreground">
                      {t.consentLabel} *
                    </span>
                  </label>
                </div>

                {/* Review panel */}
                <div className="relative border border-border bg-card p-6 mt-8">
                  <div className="absolute top-0 right-0 w-6 h-6">
                    <div className="absolute top-0 right-0 w-full h-px bg-[#AA7C52]/30" />
                    <div className="absolute top-0 right-0 h-full w-px bg-[#AA7C52]/30" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-4">{t.reviewTitle}</h3>

                  {/* Section 1: Basic Info */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs tracking-[0.1em] uppercase text-[#AA7C52] font-medium">{t.steps[0]}</h4>
                      <button type="button" onClick={() => setStep(0)} className="text-xs text-primary hover:underline" disabled={submitting}>
                        {t.editSection}
                      </button>
                    </div>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                      {([
                        [t.name, `${form.firstName} ${form.lastName}`],
                        [t.email, form.email],
                        [t.company, form.companyName],
                        [t.website, form.companyWebsite || '—'],
                        [t.headquarters, form.headquarters || '—'],
                        [t.role, form.roleTitle || '—'],
                        [t.marketsServedReview, form.marketServed.length > 0 ? form.marketServed.join(', ') : '—'],
                        [t.ecosystemReview, form.ecosystem.length > 0 ? form.ecosystem.join(', ') : '—'],
                      ] as [string, string][]).map(([label, val]) => (
                        <div key={label}>
                          <dt className="text-muted-foreground">{label}</dt>
                          <dd className="text-foreground font-medium mt-0.5">{val}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  {/* Section 2: Company Snapshot */}
                  <div className="mb-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs tracking-[0.1em] uppercase text-[#AA7C52] font-medium">{t.steps[1]}</h4>
                      <button type="button" onClick={() => setStep(1)} className="text-xs text-primary hover:underline" disabled={submitting}>
                        {t.editSection}
                      </button>
                    </div>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                      {([
                        [t.type, OTHER_TRIGGERS.includes(form.companyType) && form.companyTypeOther ? form.companyTypeOther : form.companyType ? optLabel(form.companyType, t.companyTypeOptions as unknown as OptionItem[]) : '—'],
                        [t.stage, form.companyStage ? optLabel(form.companyStage, t.companyStageOptions as unknown as OptionItem[]) : '—'],
                        [t.funding, form.fundingRaised ? optLabel(form.fundingRaised, t.fundingOptions as unknown as OptionItem[]) : '—'],
                        [t.overviewReview, pdfFile ? pdfFile.name : '—'],
                      ] as [string, string][]).map(([label, val]) => (
                        <div key={label}>
                          <dt className="text-muted-foreground">{label}</dt>
                          <dd className="text-foreground font-medium mt-0.5">{val}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  {/* Section 3: China Objective & Readiness */}
                  <div className="pt-4 border-t border-border">
                    <h4 className="text-xs tracking-[0.1em] uppercase text-[#AA7C52] font-medium mb-2">{t.steps[2]}</h4>
                    <dl className="grid grid-cols-1 gap-y-2 text-sm">
                      {([
                        [t.objectivesReview, form.chinaObjectives.length > 0 ? form.chinaObjectives.map(o => optLabel(o, t.chinaObjectiveOptions as unknown as OptionItem[])).join(', ') : '—'],
                        [t.targetCustomerReview, OTHER_TRIGGERS.includes(form.targetCustomer) && form.targetCustomerOther ? form.targetCustomerOther : form.targetCustomer ? optLabel(form.targetCustomer, t.targetCustomerOptions as unknown as OptionItem[]) : '—'],
                        [t.relevanceReview, form.chinaRelevance || '—'],
                        [t.engagementReview, form.chinaEngagement ? optLabel(form.chinaEngagement, t.chinaEngagementOptions as unknown as OptionItem[]) : '—'],
                        [t.concernsReview, (() => {
                          const concerns = form.chinaConcerns
                            .filter(c => c !== 'Other')
                            .map(c => optLabel(c, t.chinaConcernOptions as unknown as OptionItem[]));
                          if (form.chinaConcerns.includes('Other') && form.chinaConcernsOther) concerns.push(form.chinaConcernsOther);
                          else if (form.chinaConcerns.includes('Other')) concerns.push(optLabel('Other', t.chinaConcernOptions as unknown as OptionItem[]));
                          return concerns.length > 0 ? concerns.join(', ') : '—';
                        })()],
                        [t.outcomeReview, form.worthwhileOutcome || '—'],
                      ] as [string, string][]).map(([label, val]) => (
                        <div key={label}>
                          <dt className="text-muted-foreground">{label}</dt>
                          <dd className="text-foreground font-medium mt-0.5 whitespace-pre-line">{val}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                    {error}
                  </div>
                )}
                {debugLog && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono text-muted-foreground">Debug Log</span>
                      <button
                        type="button"
                        className="text-xs text-primary hover:underline"
                        onClick={() => { navigator.clipboard.writeText(debugLog); }}
                      >
                        Copy All
                      </button>
                    </div>
                    <pre className="bg-gray-900 text-green-400 text-xs p-4 overflow-auto max-h-96 whitespace-pre-wrap break-all select-all">
                      {debugLog}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-10">
            {step > 0 ? (
              <button type="button" className={btnSecondary} onClick={() => setStep(step - 1)} disabled={submitting}>
                {t.back}
              </button>
            ) : (
              <div />
            )}
            {step < TOTAL_STEPS - 1 ? (
              <button type="button" className={btnPrimary} onClick={handleNext} disabled={submitting}>
                {t.next}
              </button>
            ) : (
              <button
                type="button"
                className={`${btnPrimary} flex items-center gap-2`}
                disabled={submitting || !form.consentData}
                onClick={handleSubmit}
              >
                {submitting && (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
                {submitting ? submitPhase || t.submitting : t.submitApplication}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
