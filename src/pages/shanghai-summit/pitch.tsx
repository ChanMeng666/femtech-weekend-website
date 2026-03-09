import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Layout from '@theme/Layout';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import {
  COMPANY_TYPE_OPTIONS,
  HEALTH_FOCUS_OPTIONS,
  WORK_AREA_OPTIONS,
  BUSINESS_MODEL_OPTIONS,
  REVENUE_OPTIONS,
} from '../../data/shanghai-summit';
import { FormSuccess } from '../../components/ShanghaiSummit';

countries.registerLocale(enLocale);

const inputClass =
  'w-full border border-border px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition';
const inputErrorClass =
  'w-full border border-red-400 px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-red-400/50 focus:border-red-400 outline-none transition';
const labelClass = 'block text-sm font-medium text-foreground mb-1.5';
const btnPrimary =
  'bg-primary text-white hover:bg-primary/90 px-8 py-3 font-medium transition hover:shadow-[0_0_16px_rgba(170,124,82,0.15)] disabled:opacity-50 disabled:cursor-not-allowed';
const btnSecondary =
  'border border-border text-foreground hover:bg-muted px-8 py-3 font-medium transition';

const STEPS = ['Contact Information', 'Company Profile'];
const DRAFT_KEY = 'pitch-application-draft';

const MARKET_PRESETS = [
  'China', 'United States', 'United Kingdom', 'Europe (EU)',
  'Southeast Asia', 'Japan', 'South Korea', 'India',
  'Middle East', 'Africa', 'Latin America', 'Australia / NZ',
  'Canada', 'Global',
];

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
  healthFocus: string;
  workAreas: string[];
  businessModel: string;
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
  healthFocus: '',
  workAreas: [],
  businessModel: '',
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
}: {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const allCountries = useMemo(() => {
    const obj = countries.getNames('en', { select: 'official' });
    return Object.values(obj).sort((a, b) => a.localeCompare(b));
  }, []);

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
          placeholder="Search or select a country..."
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
            <li className="px-4 py-3 text-muted-foreground text-center">No countries found</li>
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
}: {
  value: string[];
  onChange: (v: string[]) => void;
  presets: string[];
  placeholder?: string;
  disabled?: boolean;
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
          placeholder={value.length === 0 ? placeholder : 'Type to add more...'}
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
                setShowSuggestions(true);
                inputRef.current?.focus();
              }}
            >
              {p}
            </li>
          ))}
        </ul>
      )}

      {/* Hint */}
      <p className="text-[11px] text-muted-foreground/60 mt-1">
        Select from suggestions or type a custom value and press Enter
      </p>
    </div>
  );
}

export default function PitchApplication() {
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
          setForm({ ...initial, ...parsed });
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
    const updated = { ...form, [field]: value };
    setForm(updated);
    saveDraft(updated);
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
    if (field === 'firstName' && !form.firstName.trim()) errors.firstName = 'First name is required';
    if (field === 'lastName' && !form.lastName.trim()) errors.lastName = 'Last name is required';
    if (field === 'email') {
      if (!form.email.trim()) errors.email = 'Email is required';
      else if (!isValidEmail(form.email)) errors.email = 'Please enter a valid email address';
    }
    if (field === 'companyName' && !form.companyName.trim()) errors.companyName = 'Company name is required';

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
      if (!form.firstName.trim()) errors.firstName = 'First name is required';
      if (!form.lastName.trim()) errors.lastName = 'Last name is required';
      if (!form.email.trim()) errors.email = 'Email is required';
      else if (!isValidEmail(form.email)) errors.email = 'Please enter a valid email address';
      if (!form.companyName.trim()) errors.companyName = 'Company name is required';
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
      setPdfError('Only PDF files are accepted.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setPdfError('File is too large. Maximum size is 10MB.');
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
        setSubmitPhase('Uploading pitch deck...');
        setPdfUploading(true);
        try {
          const base64 = await readFileAsBase64(pdfFile);
          const uploadRes = await fetch('/api/upload-pitch-deck', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ file: base64 }),
          });
          const uploadData = await uploadRes.json();
          if (uploadData.success) {
            deckUrl = uploadData.url;
          } else {
            setError(uploadData.message || 'Failed to upload pitch deck. Please try again.');
            setSubmitting(false);
            setPdfUploading(false);
            setSubmitPhase('');
            return;
          }
        } catch {
          setError('Failed to upload pitch deck. Please check your connection and try again.');
          setSubmitting(false);
          setPdfUploading(false);
          setSubmitPhase('');
          return;
        }
        setPdfUploading(false);
      }

      setSubmitPhase('Submitting application...');
      const payload = { ...form, pitchDeckUrl: deckUrl };
      const res = await fetch('/api/submit-pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setReferenceNumber(data.referenceNumber || '');
        setSubmitted(true);
        try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
      } else {
        setError(data.message || 'Submission failed. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
      setSubmitPhase('');
    }
  };

  if (submitted) {
    return (
      <Layout title="Pitch Application Submitted" description="Your pitch application has been submitted.">
        <FormSuccess
          title="Application Submitted"
          message={
            referenceNumber
              ? `Your reference number is ${referenceNumber}. We're excited to review your submission.`
              : "Thank you for applying to pitch at the Shanghai Summit 2026. We're excited to review your submission."
          }
          nextSteps={[
            'Our team reviews your application (1–2 weeks)',
            'Selected companies receive an invitation to pitch',
            'Confirm your spot with a £199 participation fee (includes Day 1 conference pass)',
          ]}
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
    <Layout title="Pitch Application - Shanghai Summit" description="Apply to pitch at the FemTech Weekend Shanghai Summit 2026.">
      <div className="bg-background min-h-screen px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Page header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-foreground mb-3">Pitch Application</h1>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              Apply to pitch at the FemTech Weekend Shanghai Summit 2026. Free to apply — selected companies confirm with a £199 pitch package.
            </p>
          </div>

          {/* How It Works */}
          <div className="mb-14">
            <p className="text-xs tracking-[0.2em] uppercase text-[#AA7C52] text-center mb-8 font-medium">How It Works</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-0">
              {[
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
              ].map((card, i) => (
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
              Draft restored from your previous session.
            </div>
          )}

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {STEPS.map((label, i) => (
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
                  {fieldInput('firstName', 'First Name', { required: true })}
                  {fieldInput('lastName', 'Last Name', { required: true })}
                </div>
                {fieldInput('email', 'Email', { required: true, type: 'email' })}
                {fieldInput('linkedin', 'LinkedIn Profile', { placeholder: 'https://linkedin.com/in/...' })}
                <div>
                  <label className={labelClass}>Company Headquarters</label>
                  <CountryCombobox
                    value={form.headquarters}
                    onChange={(v) => set('headquarters', v)}
                    disabled={submitting}
                  />
                </div>
                {fieldInput('companyName', 'Company Name', { required: true })}
                {fieldInput('companyWebsite', 'Company Website', { placeholder: 'https://...' })}
                {fieldInput('roleTitle', 'Your Role / Title')}
                <div>
                  <label className={labelClass}>Markets Currently Served</label>
                  <TagInput
                    value={form.marketServed}
                    onChange={(v) => set('marketServed', v)}
                    presets={MARKET_PRESETS}
                    placeholder="Select or type markets..."
                    disabled={submitting}
                  />
                </div>
                <div>
                  <label className={labelClass}>FemTech Ecosystem / Community</label>
                  <TagInput
                    value={form.ecosystem}
                    onChange={(v) => set('ecosystem', v)}
                    presets={ECOSYSTEM_PRESETS}
                    placeholder="Select or type ecosystems..."
                    disabled={submitting}
                  />
                </div>
              </div>
            )}

            {/* Section 2: Company Profile */}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Company Type</label>
                  <select className={inputClass} value={form.companyType} onChange={(e) => set('companyType', e.target.value)} disabled={submitting}>
                    <option value="">Select...</option>
                    {COMPANY_TYPE_OPTIONS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Primary Health Focus</label>
                  <select className={inputClass} value={form.healthFocus} onChange={(e) => set('healthFocus', e.target.value)} disabled={submitting}>
                    <option value="">Select...</option>
                    {HEALTH_FOCUS_OPTIONS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Work Areas (select all that apply)</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {WORK_AREA_OPTIONS.map((area) => (
                      <label key={area} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.workAreas.includes(area)}
                          onChange={() => toggleWorkArea(area)}
                          className="rounded border-border"
                          disabled={submitting}
                        />
                        {area}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Business Model</label>
                  <select className={inputClass} value={form.businessModel} onChange={(e) => set('businessModel', e.target.value)} disabled={submitting}>
                    <option value="">Select...</option>
                    {BUSINESS_MODEL_OPTIONS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Annual Revenue</label>
                  <select className={inputClass} value={form.annualRevenue} onChange={(e) => set('annualRevenue', e.target.value)} disabled={submitting}>
                    <option value="">Select...</option>
                    {REVENUE_OPTIONS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>

                {/* PDF Upload */}
                <div>
                  <label className={labelClass}>Pitch Deck (PDF)</label>
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
                        Drop your PDF here or <span className="text-primary font-medium">browse</span>
                      </p>
                      <p className="text-xs text-muted-foreground/60">PDF only, max 10MB</p>
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
                    <h3 className="font-semibold text-foreground">Review Your Application</h3>
                    <button
                      type="button"
                      onClick={() => setStep(0)}
                      className="text-xs text-primary hover:underline"
                      disabled={submitting}
                    >
                      Edit contact info
                    </button>
                  </div>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                    {([
                      ['Name', `${form.firstName} ${form.lastName}`],
                      ['Email', form.email],
                      ['Company', form.companyName],
                      ['Website', form.companyWebsite || '—'],
                      ['Headquarters', form.headquarters || '—'],
                      ['Role', form.roleTitle || '—'],
                      ['Markets Served', form.marketServed.length > 0 ? form.marketServed.join(', ') : '—'],
                      ['Ecosystem', form.ecosystem.length > 0 ? form.ecosystem.join(', ') : '—'],
                      ['Type', form.companyType || '—'],
                      ['Health Focus', form.healthFocus || '—'],
                      ['Revenue', form.annualRevenue || '—'],
                      ['Work Areas', form.workAreas.length > 0 ? form.workAreas.join(', ') : '—'],
                      ['Pitch Deck', pdfFile ? pdfFile.name : '—'],
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
                Back
              </button>
            ) : (
              <div />
            )}
            {step < STEPS.length - 1 ? (
              <button type="button" className={btnPrimary} onClick={handleNext} disabled={submitting}>
                Next
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
                {submitting ? submitPhase || 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
