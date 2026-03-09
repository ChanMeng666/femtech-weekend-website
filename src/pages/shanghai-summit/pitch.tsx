import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import zhLocale from 'i18n-iso-countries/langs/zh.json';
import {
  COMPANY_TYPE_OPTIONS,
  HEALTH_FOCUS_OPTIONS,
  WORK_AREA_OPTIONS,
  BUSINESS_MODEL_OPTIONS,
  REVENUE_OPTIONS,
} from '../../data/shanghai-summit';
import { FormSuccess } from '../../components/ShanghaiSummit';

countries.registerLocale(enLocale);
countries.registerLocale(zhLocale);

type OptionItem = { value: string; label: string };
const toOptions = (arr: string[]): OptionItem[] => arr.map((s) => ({ value: s, label: s }));

const translations = {
  en: {
    pageTitle: 'Pitch Application - Shanghai Summit',
    pageDescription: 'Apply for the Women\'s Health Capital Spotlight at FemTech Weekend Shanghai Summit 2026.',
    heading: 'Pitch Application',
    subtitleLine1: 'Apply for the Women\'s Health Capital Spotlight',
    subtitleTheme: 'Beyond Gender, Beyond Borders — Women\'s Health for a Shared Future',
    subtitleCollab: 'In collaboration with',
    howItWorks: 'How It Works',
    steps: ['Contact Information', 'Company Profile'],
    howItWorksCards: [
      {
        title: 'Apply for free',
        desc: 'Complete the application form below and share your company details, traction, and China relevance.',
      },
      {
        title: 'Curated selection',
        desc: 'Selected startups will be invited to join the Women\u2019s Health Capital Spotlight based on innovation quality, strategic fit, and relevance to the session.',
      },
      {
        title: 'Confirm your place',
        desc: 'Invited companies can secure their participation through the Pitch Package (\u00A3199), which includes one Day 1 conference pass.',
      },
    ],
    draftRestored: 'Draft restored from your previous session.',
    // Step 1: Contact Information
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
    // Step 2: Company Profile
    companyType: 'Company Type',
    primaryHealthFocus: 'Primary Health Focus',
    workAreas: 'Work Areas (select all that apply)',
    businessModel: 'Business Model',
    annualRevenue: 'Annual Revenue',
    pitchDeck: 'Pitch Deck (PDF)',
    // Placeholders
    searchCountry: 'Search or select a country...',
    noCountriesFound: 'No countries found',
    selectMarkets: 'Select or type markets...',
    selectEcosystems: 'Select or type ecosystems...',
    select: 'Select...',
    pleaseSpecify: 'Please specify...',
    describeCompanyType: 'Describe your company type...',
    describeHealthFocus: 'Describe your health focus area...',
    describeWorkArea: 'Describe your work area...',
    describeBusinessModel: 'Describe your business model...',
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
    editContactInfo: 'Edit contact info',
    name: 'Name',
    company: 'Company',
    website: 'Website',
    headquarters: 'Headquarters',
    role: 'Role',
    marketsServedReview: 'Markets Served',
    ecosystem: 'Ecosystem',
    type: 'Type',
    healthFocus: 'Health Focus',
    businessModelReview: 'Business Model',
    revenue: 'Revenue',
    workAreasReview: 'Work Areas',
    pitchDeckReview: 'Pitch Deck',
    // Buttons
    back: 'Back',
    next: 'Next',
    submitApplication: 'Submit Application',
    submitting: 'Submitting...',
    // Submit phases
    uploadingDeck: 'Uploading pitch deck...',
    submittingApp: 'Submitting application...',
    // Errors
    firstNameRequired: 'First name is required',
    lastNameRequired: 'Last name is required',
    emailRequired: 'Email is required',
    invalidEmail: 'Please enter a valid email address',
    companyNameRequired: 'Company name is required',
    uploadFailed: 'Failed to upload pitch deck. Please try again.',
    uploadNetworkError: 'Failed to upload pitch deck. Please check your connection and try again.',
    submitFailed: 'Submission failed. Please try again.',
    networkError: 'Network error. Please try again.',
    // Success
    successPageTitle: 'Pitch Application Submitted',
    successPageDescription: 'Your pitch application has been submitted.',
    successTitle: 'Application Submitted',
    successMessageWithRef: (ref: string) => `Your reference number is ${ref}. We're excited to review your submission.`,
    successMessage: "Thank you for applying to pitch at the Shanghai Summit 2026. We're excited to review your submission.",
    successSteps: [
      'Our team reviews your application (1–2 weeks)',
      'Selected companies receive an invitation to pitch',
      'Confirm your spot with a £199 participation fee (includes Day 1 conference pass)',
    ],
    successNextStepsHeading: 'What Happens Next',
    successCta: 'Back to Summit',
    // Options (en: value === label)
    companyTypeOptions: toOptions(COMPANY_TYPE_OPTIONS),
    healthFocusOptions: toOptions(HEALTH_FOCUS_OPTIONS),
    workAreaOptions: toOptions(WORK_AREA_OPTIONS),
    businessModelOptions: toOptions(BUSINESS_MODEL_OPTIONS),
    revenueOptions: toOptions(REVENUE_OPTIONS),
    marketPresets: [
      'China', 'United States', 'United Kingdom', 'Europe (EU)',
      'Southeast Asia', 'Japan', 'South Korea', 'India',
      'Middle East', 'Africa', 'Latin America', 'Australia / NZ',
      'Canada', 'Global',
    ],
  },
  zh: {
    pageTitle: '路演申请 - 上海峰会',
    pageDescription: '申请参加FemTech Weekend 2026上海峰会"女性健康资本聚焦"路演。',
    heading: '路演申请',
    subtitleLine1: '申请参加"女性健康资本聚焦"路演',
    subtitleTheme: '超越性别，跨越边界——共筑女性健康共同未来',
    subtitleCollab: '联合发起',
    howItWorks: '申请流程',
    steps: ['联系方式', '公司信息'],
    howItWorksCards: [
      {
        title: '免费申请',
        desc: '填写以下申请表，提供您的公司详情、业务进展和中国市场相关性。',
      },
      {
        title: '择优筛选',
        desc: '入选初创企业将受邀加入"女性健康资本聚焦"环节，评选标准包括创新质量、战略匹配度及与峰会议题的相关性。',
      },
      {
        title: '确认名额',
        desc: '受邀企业可通过路演套餐（£199）确认参与，包含一张第一天峰会门票。',
      },
    ],
    draftRestored: '已从上次会话中恢复草稿。',
    // Step 1
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
    // Step 2
    companyType: '公司类型',
    primaryHealthFocus: '主要健康领域',
    workAreas: '工作领域（可多选）',
    businessModel: '商业模式',
    annualRevenue: '年收入',
    pitchDeck: '路演文稿 (PDF)',
    // Placeholders
    searchCountry: '搜索或选择国家/地区...',
    noCountriesFound: '未找到匹配的国家/地区',
    selectMarkets: '选择或输入市场...',
    selectEcosystems: '选择或输入生态/社区...',
    select: '请选择...',
    pleaseSpecify: '请说明...',
    describeCompanyType: '请描述您的公司类型...',
    describeHealthFocus: '请描述您的健康领域...',
    describeWorkArea: '请描述您的工作领域...',
    describeBusinessModel: '请描述您的商业模式...',
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
    editContactInfo: '编辑联系方式',
    name: '姓名',
    company: '公司',
    website: '网站',
    headquarters: '总部',
    role: '职位',
    marketsServedReview: '服务市场',
    ecosystem: '生态/社区',
    type: '类型',
    healthFocus: '健康领域',
    businessModelReview: '商业模式',
    revenue: '收入',
    workAreasReview: '工作领域',
    pitchDeckReview: '路演文稿',
    // Buttons
    back: '返回',
    next: '下一步',
    submitApplication: '提交申请',
    submitting: '提交中...',
    // Submit phases
    uploadingDeck: '正在上传路演文稿...',
    submittingApp: '正在提交申请...',
    // Errors
    firstNameRequired: '请填写名字',
    lastNameRequired: '请填写姓氏',
    emailRequired: '请填写电子邮箱',
    invalidEmail: '请输入有效的电子邮箱地址',
    companyNameRequired: '请填写公司名称',
    uploadFailed: '路演文稿上传失败，请重试。',
    uploadNetworkError: '路演文稿上传失败，请检查网络连接后重试。',
    submitFailed: '提交失败，请重试。',
    networkError: '网络错误，请重试。',
    // Success
    successPageTitle: '路演申请已提交',
    successPageDescription: '您的路演申请已提交。',
    successTitle: '申请已提交',
    successMessageWithRef: (ref: string) => `您的参考编号为 ${ref}。我们非常期待审阅您的申请。`,
    successMessage: '感谢您申请在2026上海峰会上路演。我们非常期待审阅您的申请。',
    successSteps: [
      '我们的团队将审核您的申请（1-2周）',
      '入选企业将收到路演邀请',
      '支付£199参与费确认名额（含第一天峰会门票）',
    ],
    successNextStepsHeading: '接下来',
    successCta: '返回峰会页面',
    // Options (zh: value=English for API, label=Chinese for display)
    companyTypeOptions: [
      { value: 'Digital health / care delivery', label: '数字健康/医疗服务' },
      { value: 'Medical device', label: '医疗器械' },
      { value: 'Diagnostics', label: '诊断' },
      { value: 'Biotech / therapeutics', label: '生物技术/治疗' },
      { value: 'Consumer health / wellness brand', label: '消费健康/健康品牌' },
      { value: 'Data / AI / infrastructure', label: '数据/AI/基础设施' },
      { value: 'Other', label: '其他' },
    ] as OptionItem[],
    healthFocusOptions: [
      { value: 'Gynaecological Health', label: '妇科健康' },
      { value: 'Menstrual Health', label: '月经健康' },
      { value: 'Reproductive Health / Contraception', label: '生殖健康/避孕' },
      { value: 'Sexual Health', label: '性健康' },
      { value: 'Maternity / Postpartum', label: '孕产/产后' },
      { value: 'Perimenopause / Menopause', label: '围绝经期/更年期' },
      { value: 'Pelvic Health', label: '盆底健康' },
      { value: 'Oncology', label: '肿瘤' },
      { value: 'Chronic Conditions', label: '慢性疾病' },
      { value: 'Mental / Neurological Health', label: '精神/神经健康' },
      { value: "Women's General Health", label: '女性综合健康' },
      { value: 'Other', label: '其他' },
    ] as OptionItem[],
    workAreaOptions: [
      { value: 'Female Infertility', label: '女性不孕' },
      { value: 'Male Infertility', label: '男性不育' },
      { value: 'Endometriosis', label: '子宫内膜异位症' },
      { value: 'PCOS', label: '多囊卵巢综合征 (PCOS)' },
      { value: 'Menopause', label: '更年期' },
      { value: 'Not listed', label: '未列出' },
    ] as OptionItem[],
    businessModelOptions: [
      { value: 'B2C (to patients)', label: 'B2C（面向患者）' },
      { value: 'B2B (to clinics)', label: 'B2B（面向诊所）' },
      { value: 'B2B2C (clinics to patients)', label: 'B2B2C（诊所到患者）' },
      { value: 'All of the above', label: '以上全部' },
      { value: 'Other', label: '其他' },
    ] as OptionItem[],
    revenueOptions: [
      { value: 'Pre-Revenue', label: '尚无收入' },
      { value: 'Under USD$100K', label: '低于10万美元' },
      { value: 'USD$100K - $1M', label: '10万-100万美元' },
      { value: 'USD$1M - $10M', label: '100万-1000万美元' },
      { value: 'USD$10M+', label: '1000万美元以上' },
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

const TOTAL_STEPS = 2;
const DRAFT_KEY = 'pitch-application-draft';

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
  ecosystem: string[];
  companyName: string;
  companyWebsite: string;
  roleTitle: string;
  marketServed: string[];
  companyType: string;
  companyTypeOther: string;
  healthFocus: string;
  healthFocusOther: string;
  workAreas: string[];
  workAreasOther: string;
  businessModel: string;
  businessModelOther: string;
  annualRevenue: string;
  pitchDeckUrl: string;
};

const initial: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  linkedin: '',
  headquarters: '',
  ecosystem: [],
  companyName: '',
  companyWebsite: '',
  roleTitle: '',
  marketServed: [],
  companyType: '',
  companyTypeOther: '',
  healthFocus: '',
  healthFocusOther: '',
  workAreas: [],
  workAreasOther: '',
  businessModel: '',
  businessModelOther: '',
  annualRevenue: '',
  pitchDeckUrl: '',
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

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

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
        // Reset query to selected value when closing
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
      {/* Selected tags + input */}
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

      {/* Suggestion dropdown */}
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

      {/* Hint */}
      <p className="text-[11px] text-muted-foreground/60 mt-1">
        {hint || 'Select from suggestions or type a custom value and press Enter'}
      </p>
    </div>
  );
}

const OTHER_TRIGGERS = ['Other', 'Not listed'];

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

export default function PitchApplication() {
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const locale = currentLocale === 'zh-Hans' ? 'zh' : 'en';
  const t = translations[locale];

  // Look up the display label for an English option value
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
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [draftRestored, setDraftRestored] = useState(false);

  // PDF upload state
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUploading, setPdfUploading] = useState(false);
  const [pdfError, setPdfError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Draft auto-save debounce ref
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Restore draft on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && parsed.firstName) {
          // Migrate old drafts: ensure array fields are arrays
          const ensureArray = (v: unknown): string[] =>
            Array.isArray(v) ? v : typeof v === 'string' && v ? [v] : [];
          const migrated = {
            ...initial,
            ...parsed,
            ecosystem: ensureArray(parsed.ecosystem),
            marketServed: ensureArray(parsed.marketServed),
            workAreas: ensureArray(parsed.workAreas),
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

  const set = (field: keyof FormData, value: string | string[]) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      saveDraft(updated);
      return updated;
    });
    // Clear error on change
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const toggleWorkArea = (area: string) => {
    const updated = {
      ...form,
      workAreas: form.workAreas.includes(area)
        ? form.workAreas.filter((a) => a !== area)
        : [...form.workAreas, area],
    };
    setForm(updated);
    saveDraft(updated);
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
    // Validate all sections
    if (!validateStep(0)) {
      setStep(0);
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      let deckUrl = form.pitchDeckUrl;

      // Upload PDF if selected
      if (pdfFile && !deckUrl) {
        setSubmitPhase(t.uploadingDeck);
        setPdfUploading(true);
        try {
          const base64 = await readFileAsBase64(pdfFile);
          const uploadRes = await fetch('/api/upload-pitch-deck', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ file: base64, email: form.email }),
          });
          const uploadData = await uploadRes.json();
          if (uploadData.success) {
            deckUrl = uploadData.url;
          } else {
            setError(uploadData.message || t.uploadFailed);
            setSubmitting(false);
            setPdfUploading(false);
            setSubmitPhase('');
            return;
          }
        } catch {
          setError(t.uploadNetworkError);
          setSubmitting(false);
          setPdfUploading(false);
          setSubmitPhase('');
          return;
        }
        setPdfUploading(false);
      }

      setSubmitPhase(t.submittingApp);
      // Merge "Other" custom values into the main fields for submission
      const resolveOther = (val: string, other: string) =>
        OTHER_TRIGGERS.includes(val) && other ? `Other: ${other}` : val;
      const resolvedWorkAreas = form.workAreas.map((a) =>
        a === 'Not listed' && form.workAreasOther ? form.workAreasOther : a,
      );
      const payload = {
        ...form,
        pitchDeckUrl: deckUrl,
        companyType: resolveOther(form.companyType, form.companyTypeOther),
        healthFocus: resolveOther(form.healthFocus, form.healthFocusOther),
        businessModel: resolveOther(form.businessModel, form.businessModelOther),
        workAreas: resolvedWorkAreas,
      };
      const res = await fetch('/api/submit-pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setReferenceNumber(data.referenceNumber || '');
        setSubmitted(true);
        window.scrollTo({ top: 0 });
        try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
      } else {
        setError(data.message || t.submitFailed);
      }
    } catch {
      setError(t.networkError);
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
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              {t.subtitleLine1}
            </p>
            <p className="text-muted-foreground/70 text-xs italic mt-2 max-w-lg mx-auto">
              {t.subtitleTheme}
            </p>
            <div className="flex items-center justify-center gap-2.5 mt-4">
              <span className="text-muted-foreground/60 text-xs">{t.subtitleCollab}</span>
              <img
                src="/img/summit-partners/bayer-womens-healthcare-logo.svg"
                alt="Bayer Women's Healthcare China"
                className="h-5 dark:hidden"
              />
              <img
                src="/img/summit-partners/bayer-womens-healthcare-logo-white.svg"
                alt="Bayer Women's Healthcare China"
                className="h-5 hidden dark:block"
              />
            </div>
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
          <div className="flex items-center justify-center gap-2 mb-8">
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
                  {label}
                </button>
              </React.Fragment>
            ))}
          </div>

          {/* Form card */}
          <div className="border border-border bg-card p-6 sm:p-8 border-t-2 border-t-[#AA7C52]/20">
            {/* Section 1: Contact Information */}
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

            {/* Section 2: Company Profile */}
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
                <SelectWithOther
                  label={t.primaryHealthFocus}
                  options={t.healthFocusOptions as unknown as OptionItem[]}
                  value={form.healthFocus}
                  otherValue={form.healthFocusOther}
                  onSelect={(v) => { set('healthFocus', v); if (!OTHER_TRIGGERS.includes(v)) set('healthFocusOther', ''); }}
                  onOtherChange={(v) => set('healthFocusOther', v)}
                  otherPlaceholder={t.describeHealthFocus}
                  disabled={submitting}
                  selectText={t.select}
                />
                <div>
                  <label className={labelClass}>{t.workAreas}</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {(t.workAreaOptions as unknown as OptionItem[]).map((opt) => (
                      <label key={opt.value} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.workAreas.includes(opt.value)}
                          onChange={() => toggleWorkArea(opt.value)}
                          className="rounded border-border"
                          disabled={submitting}
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                  {form.workAreas.includes('Not listed') && (
                    <input
                      className={`${inputClass} mt-2`}
                      type="text"
                      value={form.workAreasOther}
                      onChange={(e) => set('workAreasOther', e.target.value)}
                      placeholder={t.describeWorkArea}
                      disabled={submitting}
                      autoFocus
                    />
                  )}
                </div>
                <SelectWithOther
                  label={t.businessModel}
                  options={t.businessModelOptions as unknown as OptionItem[]}
                  value={form.businessModel}
                  otherValue={form.businessModelOther}
                  onSelect={(v) => { set('businessModel', v); if (!OTHER_TRIGGERS.includes(v)) set('businessModelOther', ''); }}
                  onOtherChange={(v) => set('businessModelOther', v)}
                  otherPlaceholder={t.describeBusinessModel}
                  disabled={submitting}
                  selectText={t.select}
                />
                <div>
                  <label className={labelClass}>{t.annualRevenue}</label>
                  <select className={inputClass} value={form.annualRevenue} onChange={(e) => set('annualRevenue', e.target.value)} disabled={submitting}>
                    <option value="">{t.select}</option>
                    {(t.revenueOptions as unknown as OptionItem[]).map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>

                {/* PDF Upload */}
                <div>
                  <label className={labelClass}>{t.pitchDeck}</label>
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
                          // Simulate file input change
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

                {/* Review panel */}
                <div className="relative border border-border bg-card p-6 mt-8">
                  <div className="absolute top-0 right-0 w-6 h-6">
                    <div className="absolute top-0 right-0 w-full h-px bg-[#AA7C52]/30" />
                    <div className="absolute top-0 right-0 h-full w-px bg-[#AA7C52]/30" />
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">{t.reviewTitle}</h3>
                    <button
                      type="button"
                      onClick={() => setStep(0)}
                      className="text-xs text-primary hover:underline"
                      disabled={submitting}
                    >
                      {t.editContactInfo}
                    </button>
                  </div>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                    {([
                      [t.name, `${form.firstName} ${form.lastName}`],
                      [t.email, form.email],
                      [t.company, form.companyName],
                      [t.website, form.companyWebsite || '—'],
                      [t.headquarters, form.headquarters || '—'],
                      [t.role, form.roleTitle || '—'],
                      [t.marketsServedReview, form.marketServed.length > 0 ? form.marketServed.join(', ') : '—'],
                      [t.ecosystem, form.ecosystem.length > 0 ? form.ecosystem.join(', ') : '—'],
                      [t.type, OTHER_TRIGGERS.includes(form.companyType) && form.companyTypeOther ? form.companyTypeOther : form.companyType ? optLabel(form.companyType, t.companyTypeOptions as unknown as OptionItem[]) : '—'],
                      [t.healthFocus, OTHER_TRIGGERS.includes(form.healthFocus) && form.healthFocusOther ? form.healthFocusOther : form.healthFocus ? optLabel(form.healthFocus, t.healthFocusOptions as unknown as OptionItem[]) : '—'],
                      [t.businessModelReview, OTHER_TRIGGERS.includes(form.businessModel) && form.businessModelOther ? form.businessModelOther : form.businessModel ? optLabel(form.businessModel, t.businessModelOptions as unknown as OptionItem[]) : '—'],
                      [t.revenue, form.annualRevenue ? optLabel(form.annualRevenue, t.revenueOptions as unknown as OptionItem[]) : '—'],
                      [t.workAreasReview, (() => {
                        const woOpts = t.workAreaOptions as unknown as OptionItem[];
                        const areas = form.workAreas
                          .filter((a) => a !== 'Not listed')
                          .map((a) => optLabel(a, woOpts));
                        if (form.workAreas.includes('Not listed') && form.workAreasOther) areas.push(form.workAreasOther);
                        else if (form.workAreas.includes('Not listed')) areas.push(optLabel('Not listed', woOpts));
                        return areas.length > 0 ? areas.join(', ') : '—';
                      })()],
                      [t.pitchDeckReview, pdfFile ? pdfFile.name : '—'],
                    ] as [string, string][]).map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-muted-foreground">{label}</dt>
                        <dd className="text-foreground font-medium mt-0.5">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                    {error}
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
                disabled={submitting}
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
