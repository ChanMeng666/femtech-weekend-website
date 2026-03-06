import React, { useState } from 'react';
import Layout from '@theme/Layout';
import {
  COMPANY_TYPE_OPTIONS,
  HEALTH_FOCUS_OPTIONS,
  WORK_AREA_OPTIONS,
  BUSINESS_MODEL_OPTIONS,
  REVENUE_OPTIONS,
} from '../../data/shanghai-summit';
import { FormSuccess } from '../../components/ShanghaiSummit';

const inputClass =
  'w-full border border-border px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition';
const labelClass = 'block text-sm font-medium text-foreground mb-1.5';
const btnPrimary =
  'bg-primary text-white hover:bg-primary/90 px-8 py-3 font-medium transition hover:shadow-[0_0_16px_rgba(170,124,82,0.15)]';
const btnSecondary =
  'border border-border text-foreground hover:bg-muted px-8 py-3 font-medium transition';

const STEPS = ['Basic Info', 'Company Details', 'Pitch Deck'];

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  headquarters: string;
  ecosystem: string;
  companyName: string;
  companyWebsite: string;
  roleTitle: string;
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
  ecosystem: '',
  companyName: '',
  companyWebsite: '',
  roleTitle: '',
  companyType: '',
  healthFocus: '',
  workAreas: [],
  businessModel: '',
  annualRevenue: '',
  pitchDeckUrl: '',
};

export default function PitchApplication() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const set = (field: keyof FormData, value: string | string[]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleWorkArea = (area: string) => {
    setForm((prev) => ({
      ...prev,
      workAreas: prev.workAreas.includes(area)
        ? prev.workAreas.filter((a) => a !== area)
        : [...prev.workAreas, area],
    }));
  };

  const canNext = () => {
    if (step === 0) return form.firstName && form.lastName && form.email && form.companyName;
    if (step === 1) return true;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/submit-pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || 'Submission failed. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Layout title="Pitch Application Submitted" description="Your pitch application has been submitted.">
        <FormSuccess
          title="Application Submitted"
          message="Thank you for applying to pitch at the Shanghai Summit 2026. We're excited to review your submission."
          nextSteps={[
            'Our team reviews your application (1-2 weeks)',
            'Selected companies receive an invitation to pitch',
            'Confirm your spot with a £199 participation fee',
          ]}
        />
      </Layout>
    );
  }

  return (
    <Layout title="Pitch Application - Shanghai Summit" description="Apply to pitch at the FemTech Weekend Shanghai Summit 2026.">
      <div className="bg-background min-h-screen px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Process header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-foreground mb-3">Pitch Application</h1>
            <p className="text-muted-foreground text-sm">
              1. Apply (free) <span className="text-[#AA7C52]">&rarr;</span> 2. Selection <span className="text-[#AA7C52]">&rarr;</span> 3. Confirm spot (&pound;199)
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-10">
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
                >
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                    {i + 1}
                  </span>
                  {label}
                </button>
              </React.Fragment>
            ))}
          </div>

          {/* Form card wrapper */}
          <div className="border border-border bg-card p-6 sm:p-8 border-t-2 border-t-[#AA7C52]/20">
          {/* Step 1: Basic Info */}
          {step === 0 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>First Name *</label>
                  <input className={inputClass} value={form.firstName} onChange={(e) => set('firstName', e.target.value)} required />
                </div>
                <div>
                  <label className={labelClass}>Last Name *</label>
                  <input className={inputClass} value={form.lastName} onChange={(e) => set('lastName', e.target.value)} required />
                </div>
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <input className={inputClass} type="email" value={form.email} onChange={(e) => set('email', e.target.value)} required />
              </div>
              <div>
                <label className={labelClass}>LinkedIn Profile</label>
                <input className={inputClass} value={form.linkedin} onChange={(e) => set('linkedin', e.target.value)} placeholder="https://linkedin.com/in/..." />
              </div>
              <div>
                <label className={labelClass}>Company Name *</label>
                <input className={inputClass} value={form.companyName} onChange={(e) => set('companyName', e.target.value)} required />
              </div>
              <div>
                <label className={labelClass}>Your Role / Title</label>
                <input className={inputClass} value={form.roleTitle} onChange={(e) => set('roleTitle', e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Headquarters</label>
                <input className={inputClass} value={form.headquarters} onChange={(e) => set('headquarters', e.target.value)} placeholder="City, Country" />
              </div>
              <div>
                <label className={labelClass}>Which ecosystem are you part of?</label>
                <input className={inputClass} value={form.ecosystem} onChange={(e) => set('ecosystem', e.target.value)} placeholder="e.g. FemTech Weekend, other accelerator..." />
              </div>
            </div>
          )}

          {/* Step 2: Company Details */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className={labelClass}>Company Website</label>
                <input className={inputClass} value={form.companyWebsite} onChange={(e) => set('companyWebsite', e.target.value)} placeholder="https://..." />
              </div>
              <div>
                <label className={labelClass}>Company Type</label>
                <select className={inputClass} value={form.companyType} onChange={(e) => set('companyType', e.target.value)}>
                  <option value="">Select...</option>
                  {COMPANY_TYPE_OPTIONS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Primary Health Focus</label>
                <select className={inputClass} value={form.healthFocus} onChange={(e) => set('healthFocus', e.target.value)}>
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
                      />
                      {area}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelClass}>Business Model</label>
                <select className={inputClass} value={form.businessModel} onChange={(e) => set('businessModel', e.target.value)}>
                  <option value="">Select...</option>
                  {BUSINESS_MODEL_OPTIONS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Annual Revenue</label>
                <select className={inputClass} value={form.annualRevenue} onChange={(e) => set('annualRevenue', e.target.value)}>
                  <option value="">Select...</option>
                  {REVENUE_OPTIONS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Pitch Deck */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className={labelClass}>Pitch Deck URL</label>
                <input
                  className={inputClass}
                  value={form.pitchDeckUrl}
                  onChange={(e) => set('pitchDeckUrl', e.target.value)}
                  placeholder="Link to your pitch deck (Google Drive, Dropbox, etc.)"
                />
                <p className="text-xs text-muted-foreground mt-1.5">
                  Share a link to your pitch deck. Make sure the link is publicly accessible or shared with hello@femtechweekend.com.
                </p>
              </div>

              <div className="relative border border-border bg-card p-6 mt-8">
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-6 h-6">
                  <div className="absolute top-0 right-0 w-full h-px bg-[#AA7C52]/30" />
                  <div className="absolute top-0 right-0 h-full w-px bg-[#AA7C52]/30" />
                </div>
                <h3 className="font-semibold text-foreground mb-3">Review Your Application</h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  <div><dt className="text-muted-foreground">Name</dt><dd className="text-foreground">{form.firstName} {form.lastName}</dd></div>
                  <div><dt className="text-muted-foreground">Email</dt><dd className="text-foreground">{form.email}</dd></div>
                  <div><dt className="text-muted-foreground">Company</dt><dd className="text-foreground">{form.companyName}</dd></div>
                  <div><dt className="text-muted-foreground">Type</dt><dd className="text-foreground">{form.companyType || '-'}</dd></div>
                  <div><dt className="text-muted-foreground">Health Focus</dt><dd className="text-foreground">{form.healthFocus || '-'}</dd></div>
                  <div><dt className="text-muted-foreground">Revenue</dt><dd className="text-foreground">{form.annualRevenue || '-'}</dd></div>
                </dl>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
            </div>
          )}

          </div>{/* End form card wrapper */}

          {/* Navigation */}
          <div className="flex justify-between mt-10">
            {step > 0 ? (
              <button type="button" className={btnSecondary} onClick={() => setStep(step - 1)}>
                Back
              </button>
            ) : (
              <div />
            )}
            {step < STEPS.length - 1 ? (
              <button
                type="button"
                className={btnPrimary}
                disabled={!canNext()}
                onClick={() => setStep(step + 1)}
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                className={btnPrimary}
                disabled={submitting || !canNext()}
                onClick={handleSubmit}
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
