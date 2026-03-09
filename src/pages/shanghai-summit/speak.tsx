import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import zhLocale from 'i18n-iso-countries/langs/zh.json';
import { FormSuccess } from '../../components/ShanghaiSummit';

countries.registerLocale(enLocale);
countries.registerLocale(zhLocale);

const SPEAKING_TOPIC_PRESETS = [
  'FemTech', 'Digital Health', 'China Market', 'Regulation',
  'Investment', 'Clinical Research', 'AI & Data', 'Consumer Health',
  'Menopause', 'Fertility', 'Maternal Health', 'Pelvic Health',
  'Mental Health', 'Oncology', 'Cross-border Strategy', 'Ecosystem Building',
];

const SESSION_FORMAT_OPTIONS = [
  'Keynote', 'Panel Discussion', 'Workshop', 'Fireside Chat', 'Pitch Judge',
];

const EVENT_OPTIONS = [
  'Day 1 Conference', 'Day 2 Capital & Pitch', 'Day 3-4 Ecosystem Visits',
];

const translations = {
  en: {
    pageTitle: 'Speaker Application - Shanghai Summit',
    pageDescription: 'Apply to speak at the FemTech Weekend Shanghai Summit 2026.',
    heading: 'Speak at the Shanghai Summit',
    description: 'Interested in speaking, moderating, or hosting a workshop? Share your expertise with the global FemTech community at the Shanghai Summit 2026.',
    howItWorks: 'How It Works',
    steps: ['About You', 'Speaking Preferences'],
    howItWorksCards: [
      {
        title: 'Apply',
        desc: 'Complete the application form below with your profile and speaking interests.',
      },
      {
        title: 'Review & Match',
        desc: 'Our programme committee reviews your profile and matches you to the right session format.',
      },
      {
        title: 'Confirmation',
        desc: 'Confirmed speakers receive full event access across all summit days.',
      },
    ],
    draftRestored: 'Draft restored from your previous session.',
    // Step 0: About You
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    linkedinProfile: 'LinkedIn Profile',
    companyName: 'Company / Organization',
    roleTitle: 'Title / Role',
    companyHeadquarters: 'Location / Headquarters',
    headshot: 'Headshot Photo',
    bio: 'Short Bio',
    bioHint: '2-4 sentences about your background and expertise',
    // Step 1: Speaking Preferences
    speakingTopics: 'Speaking Topics',
    sessionFormat: 'Preferred Session Format',
    interestedEvents: 'Interested Events',
    previousExperience: 'Previous Speaking Experience',
    previousExperienceHint: 'Tell us about conferences, panels, or workshops you\'ve participated in',
    message: 'Anything Else',
    messageHint: 'Any additional information you\'d like to share',
    consentLabel: 'I consent to FemTech Weekend storing and processing my data for the purpose of this speaker application. My data will be handled in accordance with applicable data protection regulations.',
    // Image upload
    dropImage: 'Drop your photo here or',
    browse: 'browse',
    imageHint: 'JPEG, PNG, or WebP — max 5MB',
    onlyImagesAccepted: 'Only JPEG, PNG, and WebP images are accepted.',
    fileTooLarge: 'File is too large. Maximum size is 5MB.',
    // Placeholders
    searchCountry: 'Search or select a country...',
    noCountriesFound: 'No countries found',
    typeToAddMore: 'Type to add more...',
    tagHint: 'Select from suggestions or type a custom value and press Enter',
    // Review
    reviewTitle: 'Review Your Application',
    editSection: 'Edit',
    name: 'Name',
    company: 'Company',
    role: 'Role',
    headquarters: 'Headquarters',
    linkedin: 'LinkedIn',
    headshot_review: 'Headshot',
    bio_review: 'Bio',
    topics_review: 'Topics',
    format_review: 'Format',
    events_review: 'Events',
    experience_review: 'Experience',
    message_review: 'Message',
    // Buttons
    back: 'Back',
    next: 'Next',
    submitApplication: 'Submit Application',
    submitting: 'Submitting...',
    uploadingHeadshot: 'Uploading headshot...',
    submittingApp: 'Submitting application...',
    // Errors
    firstNameRequired: 'First name is required',
    lastNameRequired: 'Last name is required',
    emailRequired: 'Email is required',
    invalidEmail: 'Please enter a valid email address',
    companyNameRequired: 'Company name is required',
    roleTitleRequired: 'Title / Role is required',
    uploadFailed: 'Failed to upload headshot. Please try again.',
    uploadNetworkError: 'Failed to upload headshot. Please check your connection and try again.',
    submitFailed: 'Submission failed. Please try again.',
    networkError: 'Network error. Please try again.',
    // Success
    successPageTitle: 'Speaker Application Submitted',
    successPageDescription: 'Your speaker application has been submitted.',
    successTitle: 'Application Submitted',
    successMessageWithRef: (ref: string) => `Your reference number is ${ref}. We're excited to review your profile and explore how you could contribute to the programme.`,
    successMessage: "Thank you for your interest in speaking at the Shanghai Summit 2026. We're excited to review your profile.",
    successSteps: [
      'Our programme committee reviews your profile (1–2 weeks)',
      "We'll reach out to discuss session format and topics",
      'Confirmed speakers receive full event access',
    ],
    successNextStepsHeading: 'What Happens Next',
    successCta: 'Back to Summit',
    // Session format / event options labels (en = same as value)
    sessionFormatOptions: SESSION_FORMAT_OPTIONS,
    eventOptions: EVENT_OPTIONS,
    topicPresets: SPEAKING_TOPIC_PRESETS,
  },
  zh: {
    pageTitle: '演讲申请 - 上海峰会',
    pageDescription: '申请在FemTech Weekend 2026上海峰会上发言。',
    heading: '在上海峰会发言',
    description: '有兴趣演讲、主持或举办研讨会？与全球FemTech社区分享您的专业知识。',
    howItWorks: '申请流程',
    steps: ['关于您', '演讲偏好'],
    howItWorksCards: [
      {
        title: '申请',
        desc: '填写以下申请表，提供您的个人资料和演讲兴趣。',
      },
      {
        title: '审核与匹配',
        desc: '我们的项目委员会审核您的资料，并为您匹配合适的会议形式。',
      },
      {
        title: '确认',
        desc: '确认的演讲者将获得峰会全部活动的通行权。',
      },
    ],
    draftRestored: '已从上次会话中恢复草稿。',
    firstName: '名',
    lastName: '姓',
    email: '电子邮箱',
    linkedinProfile: 'LinkedIn 主页',
    companyName: '公司/组织',
    roleTitle: '职位/角色',
    companyHeadquarters: '所在地/总部',
    headshot: '头像照片',
    bio: '简短介绍',
    bioHint: '2-4句话介绍您的背景和专业领域',
    speakingTopics: '演讲主题',
    sessionFormat: '偏好的会议形式',
    interestedEvents: '感兴趣的活动',
    previousExperience: '过往演讲经历',
    previousExperienceHint: '请介绍您参加过的会议、圆桌讨论或研讨会',
    message: '其他信息',
    messageHint: '您想分享的任何其他信息',
    consentLabel: '我同意FemTech Weekend为本演讲申请之目的存储和处理我的数据。我的数据将依据相关数据保护法规进行处理。',
    dropImage: '将照片拖放到此处或',
    browse: '浏览',
    imageHint: 'JPEG、PNG或WebP格式，最大5MB',
    onlyImagesAccepted: '仅接受JPEG、PNG和WebP格式图片。',
    fileTooLarge: '文件过大，最大不超过5MB。',
    searchCountry: '搜索或选择国家/地区...',
    noCountriesFound: '未找到匹配的国家/地区',
    typeToAddMore: '输入以添加更多...',
    tagHint: '从建议中选择，或输入自定义内容后按回车确认',
    reviewTitle: '审核您的申请',
    editSection: '编辑',
    name: '姓名',
    company: '公司',
    role: '职位',
    headquarters: '总部',
    linkedin: 'LinkedIn',
    headshot_review: '头像',
    bio_review: '简介',
    topics_review: '主题',
    format_review: '形式',
    events_review: '活动',
    experience_review: '经历',
    message_review: '其他',
    back: '返回',
    next: '下一步',
    submitApplication: '提交申请',
    submitting: '提交中...',
    uploadingHeadshot: '正在上传头像...',
    submittingApp: '正在提交申请...',
    firstNameRequired: '请填写名字',
    lastNameRequired: '请填写姓氏',
    emailRequired: '请填写电子邮箱',
    invalidEmail: '请输入有效的电子邮箱地址',
    companyNameRequired: '请填写公司名称',
    roleTitleRequired: '请填写职位/角色',
    uploadFailed: '头像上传失败，请重试。',
    uploadNetworkError: '头像上传失败，请检查网络连接后重试。',
    submitFailed: '提交失败，请重试。',
    networkError: '网络错误，请重试。',
    successPageTitle: '演讲申请已提交',
    successPageDescription: '您的演讲申请已提交。',
    successTitle: '申请已提交',
    successMessageWithRef: (ref: string) => `您的参考编号为 ${ref}。我们非常期待了解您的演讲方向。`,
    successMessage: '感谢您申请在上海峰会2026上发言。我们非常期待审核您的资料。',
    successSteps: [
      '我们的项目委员会将审核您的资料（1-2周）',
      '我们将联系您讨论会议形式和主题',
      '确认的演讲者将获得全部活动通行权',
    ],
    successNextStepsHeading: '接下来',
    successCta: '返回峰会页面',
    sessionFormatOptions: ['主题演讲', '圆桌讨论', '研讨会', '炉边对话', '路演评委'],
    eventOptions: ['第1天 大会', '第2天 资本与路演', '第3-4天 生态走访'],
    topicPresets: [
      '女性科技', '数字健康', '中国市场', '监管',
      '投资', '临床研究', 'AI与数据', '消费健康',
      '更年期', '生育', '母婴健康', '盆底健康',
      '心理健康', '肿瘤', '跨境战略', '生态建设',
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
const DRAFT_KEY = 'speaker-application-draft';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  companyName: string;
  roleTitle: string;
  headquarters: string;
  headshotUrl: string;
  bio: string;
  speakingTopics: string[];
  sessionFormat: string[];
  interestedEvents: string[];
  previousExperience: string;
  message: string;
  consentData: boolean;
};

const initial: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  linkedin: '',
  companyName: '',
  roleTitle: '',
  headquarters: '',
  headshotUrl: '',
  bio: '',
  speakingTopics: [],
  sessionFormat: [],
  interestedEvents: [],
  previousExperience: '',
  message: '',
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

/* ---------- Main Component ---------- */
export default function SpeakerApplication() {
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const locale = currentLocale === 'zh-Hans' ? 'zh' : 'en';
  const t = translations[locale];

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

  // Image upload state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState('');
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
            speakingTopics: ensureArray(parsed.speakingTopics),
            sessionFormat: ensureArray(parsed.sessionFormat),
            interestedEvents: ensureArray(parsed.interestedEvents),
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

  // Cleanup image preview URL on unmount
  useEffect(() => {
    return () => {
      if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    };
  }, [imagePreviewUrl]);

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

  const toggleArrayField = (field: 'sessionFormat' | 'interestedEvents', item: string) => {
    setForm((prev) => {
      const arr = prev[field] as string[];
      let updated: string[];
      if (arr.includes(item)) {
        updated = arr.filter((a) => a !== item);
      } else {
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
    if (field === 'roleTitle' && !form.roleTitle.trim()) errors.roleTitle = t.roleTitleRequired;

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
      if (!form.roleTitle.trim()) errors.roleTitle = t.roleTitleRequired;
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

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageError('');
    if (!file) return;
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setImageError(t.onlyImagesAccepted);
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setImageError(t.fileTooLarge);
      return;
    }
    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    setImageFile(file);
    setImagePreviewUrl(URL.createObjectURL(file));
  };

  const removeImage = () => {
    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    setImageFile(null);
    setImagePreviewUrl(null);
    setImageError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async () => {
    if (!validateStep(0)) {
      setStep(0);
      return;
    }
    if (!form.consentData) {
      setStep(1);
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      let headshotUrl = form.headshotUrl;

      // Upload headshot if selected
      if (imageFile && !headshotUrl) {
        setSubmitPhase(t.uploadingHeadshot);
        try {
          const base64 = await readFileAsBase64(imageFile);
          const uploadRes = await fetch('/api/upload-headshot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: base64, email: form.email }),
          });
          const uploadData = await uploadRes.json();
          if (uploadData.success) {
            headshotUrl = uploadData.url;
          } else {
            setError(uploadData.message || t.uploadFailed);
            setSubmitting(false);
            setSubmitPhase('');
            return;
          }
        } catch {
          setError(t.uploadNetworkError);
          setSubmitting(false);
          setSubmitPhase('');
          return;
        }
      }

      setSubmitPhase(t.submittingApp);
      const payload = {
        ...form,
        headshotUrl,
      };
      const res = await fetch('/api/submit-speaker', {
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

            {/* Step 0: About You */}
            {step === 0 && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {fieldInput('firstName', t.firstName, { required: true })}
                  {fieldInput('lastName', t.lastName, { required: true })}
                </div>
                {fieldInput('email', t.email, { required: true, type: 'email' })}
                {fieldInput('linkedin', t.linkedinProfile, { placeholder: 'https://linkedin.com/in/...' })}
                {fieldInput('companyName', t.companyName, { required: true })}
                {fieldInput('roleTitle', t.roleTitle, { required: true, placeholder: 'e.g. CEO, Head of Research...' })}
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

                {/* Headshot Upload */}
                <div>
                  <label className={labelClass}>{t.headshot}</label>
                  {!imageFile ? (
                    <div
                      className={`border-2 border-dashed ${imageError ? 'border-red-400 bg-red-50/50' : 'border-border'} p-8 text-center cursor-pointer transition hover:border-primary/50 hover:bg-primary/5`}
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
                            handleImageSelect({ target: { files: dt.files } } as React.ChangeEvent<HTMLInputElement>);
                          }
                        }
                      }}
                    >
                      <svg className="mx-auto h-10 w-10 text-muted-foreground/40 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                      </svg>
                      <p className="text-sm text-muted-foreground mb-1">
                        {t.dropImage} <span className="text-primary font-medium">{t.browse}</span>
                      </p>
                      <p className="text-xs text-muted-foreground/60">{t.imageHint}</p>
                    </div>
                  ) : (
                    <div className="border border-green-200 bg-green-50/50 p-4 flex items-center gap-4">
                      {imagePreviewUrl && (
                        <img
                          src={imagePreviewUrl}
                          alt="Headshot preview"
                          className="w-20 h-20 rounded-full object-cover flex-shrink-0 border-2 border-white shadow-sm"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{imageFile.name}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(imageFile.size)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={removeImage}
                        disabled={submitting}
                        className="text-muted-foreground hover:text-red-500 transition p-1"
                        aria-label="Remove image"
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
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleImageSelect}
                    disabled={submitting}
                  />
                  {imageError && (
                    <p className="text-xs text-red-500 mt-1.5">{imageError}</p>
                  )}
                </div>

                {/* Short Bio */}
                <div>
                  <label className={labelClass}>{t.bio}</label>
                  <textarea
                    className={inputClass}
                    rows={4}
                    value={form.bio}
                    onChange={(e) => set('bio', e.target.value)}
                    disabled={submitting}
                  />
                  <p className="text-xs text-muted-foreground mt-1">{t.bioHint}</p>
                </div>
              </div>
            )}

            {/* Step 1: Speaking Preferences + Review */}
            {step === 1 && (
              <div className="space-y-5">
                {/* Speaking Topics */}
                <div>
                  <label className={labelClass}>{t.speakingTopics}</label>
                  <TagInput
                    value={form.speakingTopics}
                    onChange={(v) => set('speakingTopics', v)}
                    presets={t.topicPresets as unknown as string[]}
                    placeholder={t.speakingTopics}
                    disabled={submitting}
                    typeToAddMore={t.typeToAddMore}
                    hint={t.tagHint}
                  />
                </div>

                {/* Session Format (checkboxes) */}
                <div>
                  <label className={labelClass}>{t.sessionFormat}</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                    {(t.sessionFormatOptions as unknown as string[]).map((opt, i) => (
                      <label key={opt} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.sessionFormat.includes(SESSION_FORMAT_OPTIONS[i])}
                          onChange={() => toggleArrayField('sessionFormat', SESSION_FORMAT_OPTIONS[i])}
                          className="rounded border-border"
                          disabled={submitting}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Interested Events (checkboxes) */}
                <div>
                  <label className={labelClass}>{t.interestedEvents}</label>
                  <div className="space-y-2 mt-1">
                    {(t.eventOptions as unknown as string[]).map((opt, i) => (
                      <label key={opt} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.interestedEvents.includes(EVENT_OPTIONS[i])}
                          onChange={() => toggleArrayField('interestedEvents', EVENT_OPTIONS[i])}
                          className="rounded border-border"
                          disabled={submitting}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Previous Speaking Experience */}
                <div>
                  <label className={labelClass}>{t.previousExperience}</label>
                  <textarea
                    className={inputClass}
                    rows={4}
                    value={form.previousExperience}
                    onChange={(e) => set('previousExperience', e.target.value)}
                    disabled={submitting}
                  />
                  <p className="text-xs text-muted-foreground mt-1">{t.previousExperienceHint}</p>
                </div>

                {/* Anything Else */}
                <div>
                  <label className={labelClass}>{t.message}</label>
                  <textarea
                    className={inputClass}
                    rows={3}
                    value={form.message}
                    onChange={(e) => set('message', e.target.value)}
                    disabled={submitting}
                  />
                  <p className="text-xs text-muted-foreground mt-1">{t.messageHint}</p>
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

                  {/* Section 1: About You */}
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
                        [t.linkedin, form.linkedin || '—'],
                        [t.company, form.companyName],
                        [t.role, form.roleTitle],
                        [t.headquarters, form.headquarters || '—'],
                      ] as [string, string][]).map(([label, val]) => (
                        <div key={label}>
                          <dt className="text-muted-foreground">{label}</dt>
                          <dd className="text-foreground font-medium mt-0.5">{val}</dd>
                        </div>
                      ))}
                      <div>
                        <dt className="text-muted-foreground">{t.headshot_review}</dt>
                        <dd className="text-foreground font-medium mt-0.5">
                          {imagePreviewUrl ? (
                            <img src={imagePreviewUrl} alt="Headshot" className="w-12 h-12 rounded-full object-cover inline-block border border-border" />
                          ) : '—'}
                        </dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-muted-foreground">{t.bio_review}</dt>
                        <dd className="text-foreground font-medium mt-0.5 whitespace-pre-line">{form.bio || '—'}</dd>
                      </div>
                    </dl>
                  </div>

                  {/* Section 2: Speaking Preferences */}
                  <div className="pt-4 border-t border-border">
                    <h4 className="text-xs tracking-[0.1em] uppercase text-[#AA7C52] font-medium mb-2">{t.steps[1]}</h4>
                    <dl className="grid grid-cols-1 gap-y-2 text-sm">
                      {([
                        [t.topics_review, form.speakingTopics.length > 0 ? form.speakingTopics.join(', ') : '—'],
                        [t.format_review, form.sessionFormat.length > 0
                          ? form.sessionFormat.map((v) => {
                              const idx = SESSION_FORMAT_OPTIONS.indexOf(v);
                              return idx >= 0 ? (t.sessionFormatOptions as unknown as string[])[idx] : v;
                            }).join(', ')
                          : '—'],
                        [t.events_review, form.interestedEvents.length > 0
                          ? form.interestedEvents.map((v) => {
                              const idx = EVENT_OPTIONS.indexOf(v);
                              return idx >= 0 ? (t.eventOptions as unknown as string[])[idx] : v;
                            }).join(', ')
                          : '—'],
                        [t.experience_review, form.previousExperience || '—'],
                        [t.message_review, form.message || '—'],
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
                className={btnPrimary}
                onClick={handleSubmit}
                disabled={submitting || !form.consentData}
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {submitPhase || t.submitting}
                  </span>
                ) : (
                  t.submitApplication
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
