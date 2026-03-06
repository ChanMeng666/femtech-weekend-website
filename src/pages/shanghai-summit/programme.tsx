import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { PROGRAMME_COHORTS } from '../../data/shanghai-summit';

const inputClass =
  'w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition';
const labelClass = 'block text-sm font-medium text-foreground mb-1.5';
const btnPrimary =
  'bg-primary text-white hover:bg-primary/90 px-8 py-3 rounded-lg font-medium transition';
const btnSecondary =
  'border border-border text-foreground hover:bg-muted px-8 py-3 rounded-lg font-medium transition';

const STEPS = ['Personal Info', 'Background', 'Motivation & Cohort', 'Referral & Consent'];

type FormData = {
  firstName: string;
  lastName: string;
  linkedin: string;
  email: string;
  whatsapp: string;
  basedIn: string;
  gender: string;
  age: string;
  university: string;
  major: string;
  primaryOrganization: string;
  jobTitle: string;
  companyOrProject: string;
  industry: string;
  whyJoin: string;
  cohort: string[];
  deckUrl: string;
  referral: string;
  consentData: boolean;
};

const initial: FormData = {
  firstName: '',
  lastName: '',
  linkedin: '',
  email: '',
  whatsapp: '',
  basedIn: '',
  gender: '',
  age: '',
  university: '',
  major: '',
  primaryOrganization: '',
  jobTitle: '',
  companyOrProject: '',
  industry: '',
  whyJoin: '',
  cohort: [],
  deckUrl: '',
  referral: '',
  consentData: false,
};

export default function ProgrammeApplication() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const set = (field: keyof FormData, value: string | string[] | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleCohort = (id: string) => {
    setForm((prev) => ({
      ...prev,
      cohort: prev.cohort.includes(id)
        ? prev.cohort.filter((c) => c !== id)
        : [...prev.cohort, id],
    }));
  };

  const canNext = () => {
    if (step === 0) return form.firstName && form.lastName && form.linkedin && form.email;
    if (step === 3) return form.consentData;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/submit-programme', {
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
      <Layout title="Programme Application Submitted" description="Your programme application has been submitted.">
        <div className="bg-background min-h-[60vh] flex items-center justify-center px-4 py-20">
          <div className="max-w-lg text-center">
            <div className="text-5xl mb-6">&#10003;</div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Application Submitted!</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Thank you for applying to the China Programme. We'll review your application and schedule an intro call.
            </p>
            <a href="/shanghai-summit" className={btnPrimary}>
              Back to Summit
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="China Programme Application" description="Apply for the FemTech Weekend China Programme.">
      <div className="bg-background min-h-screen px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Process header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-foreground mb-3">China Programme Application</h1>
            <p className="text-muted-foreground text-sm">
              1. Apply &rarr; 2. Intro Call &rarr; 3. Selection (2,800 EUR)
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
            {STEPS.map((label, i) => (
              <React.Fragment key={label}>
                {i > 0 && <div className="w-6 h-px bg-border" />}
                <button
                  type="button"
                  onClick={() => i < step && setStep(i)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition ${
                    i === step
                      ? 'bg-primary text-white'
                      : i < step
                        ? 'bg-primary/10 text-primary cursor-pointer'
                        : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                    {i + 1}
                  </span>
                  <span className="hidden sm:inline">{label}</span>
                </button>
              </React.Fragment>
            ))}
          </div>

          {/* Step 1: Personal Info */}
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
                <label className={labelClass}>LinkedIn Profile *</label>
                <input className={inputClass} value={form.linkedin} onChange={(e) => set('linkedin', e.target.value)} placeholder="https://linkedin.com/in/..." required />
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <input className={inputClass} type="email" value={form.email} onChange={(e) => set('email', e.target.value)} required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>WhatsApp</label>
                  <input className={inputClass} value={form.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} placeholder="+44..." />
                </div>
                <div>
                  <label className={labelClass}>Based In</label>
                  <input className={inputClass} value={form.basedIn} onChange={(e) => set('basedIn', e.target.value)} placeholder="City, Country" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Gender</label>
                  <select className={inputClass} value={form.gender} onChange={(e) => set('gender', e.target.value)}>
                    <option value="">Select...</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Age</label>
                  <input className={inputClass} value={form.age} onChange={(e) => set('age', e.target.value)} placeholder="e.g. 28" />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Background */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>University</label>
                  <input className={inputClass} value={form.university} onChange={(e) => set('university', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Major</label>
                  <input className={inputClass} value={form.major} onChange={(e) => set('major', e.target.value)} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Primary Organization</label>
                <input className={inputClass} value={form.primaryOrganization} onChange={(e) => set('primaryOrganization', e.target.value)} placeholder="Current employer or organization" />
              </div>
              <div>
                <label className={labelClass}>Job Title</label>
                <input className={inputClass} value={form.jobTitle} onChange={(e) => set('jobTitle', e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Company or Project You've Built</label>
                <input className={inputClass} value={form.companyOrProject} onChange={(e) => set('companyOrProject', e.target.value)} placeholder="If applicable" />
              </div>
              <div>
                <label className={labelClass}>Industry</label>
                <input className={inputClass} value={form.industry} onChange={(e) => set('industry', e.target.value)} placeholder="e.g. Healthcare, FemTech, Biotech..." />
              </div>
            </div>
          )}

          {/* Step 3: Motivation & Cohort */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className={labelClass}>Why do you want to join? What do you hope to take away?</label>
                <textarea
                  className={inputClass}
                  rows={5}
                  value={form.whyJoin}
                  onChange={(e) => set('whyJoin', e.target.value)}
                  placeholder="Tell us about your motivation and what you hope to achieve..."
                />
              </div>
              <div>
                <label className={labelClass}>Select your preferred cohort(s)</label>
                <div className="space-y-2 mt-2">
                  {PROGRAMME_COHORTS.map((cohort) => (
                    <label
                      key={cohort.id}
                      className={`flex items-center gap-3 p-3 border rounded-lg text-sm cursor-pointer transition ${
                        cohort.disabled
                          ? 'border-border bg-muted/50 opacity-60 cursor-not-allowed'
                          : form.cohort.includes(cohort.id)
                            ? 'border-primary bg-primary/5 text-foreground'
                            : 'border-border text-foreground hover:border-primary/50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.cohort.includes(cohort.id)}
                        onChange={() => !cohort.disabled && toggleCohort(cohort.id)}
                        disabled={cohort.disabled}
                        className="rounded border-border"
                      />
                      <span>{cohort.label}</span>
                      {cohort.note && (
                        <span className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                          {cohort.note}
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelClass}>Pitch Deck URL (optional)</label>
                <input
                  className={inputClass}
                  value={form.deckUrl}
                  onChange={(e) => set('deckUrl', e.target.value)}
                  placeholder="Link to your deck (Google Drive, Dropbox, etc.)"
                />
              </div>
            </div>
          )}

          {/* Step 4: Referral & Consent */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <label className={labelClass}>How did you hear about us?</label>
                <input
                  className={inputClass}
                  value={form.referral}
                  onChange={(e) => set('referral', e.target.value)}
                  placeholder="e.g. LinkedIn, friend, conference..."
                />
              </div>

              <div className="border border-border rounded-lg p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.consentData}
                    onChange={(e) => set('consentData', e.target.checked)}
                    className="mt-1 rounded border-border"
                  />
                  <span className="text-sm text-foreground">
                    I consent to FemTech Weekend storing and processing my data for the purpose of this
                    programme application. My data will be handled in accordance with applicable data
                    protection regulations. *
                  </span>
                </label>
              </div>

              <div className="bg-muted/50 rounded-lg p-6 mt-8">
                <h3 className="font-semibold text-foreground mb-3">Review Your Application</h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  <div><dt className="text-muted-foreground">Name</dt><dd className="text-foreground">{form.firstName} {form.lastName}</dd></div>
                  <div><dt className="text-muted-foreground">Email</dt><dd className="text-foreground">{form.email}</dd></div>
                  <div><dt className="text-muted-foreground">Organization</dt><dd className="text-foreground">{form.primaryOrganization || '-'}</dd></div>
                  <div><dt className="text-muted-foreground">Job Title</dt><dd className="text-foreground">{form.jobTitle || '-'}</dd></div>
                  <div><dt className="text-muted-foreground">Cohort(s)</dt><dd className="text-foreground">{form.cohort.length ? form.cohort.join(', ') : '-'}</dd></div>
                  <div><dt className="text-muted-foreground">University</dt><dd className="text-foreground">{form.university || '-'}</dd></div>
                </dl>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
            </div>
          )}

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
