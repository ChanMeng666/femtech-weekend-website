import React, { useState } from 'react';
import Layout from '@theme/Layout';

const inputClass =
  'w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition';
const labelClass = 'block text-sm font-medium text-foreground mb-1.5';
const btnPrimary =
  'bg-primary text-white hover:bg-primary/90 px-8 py-3 rounded-lg font-medium transition';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  company: string;
  interestedEvents: string;
  message: string;
};

const initial: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  title: '',
  company: '',
  interestedEvents: '',
  message: '',
};

export default function SpeakerApplication() {
  const [form, setForm] = useState<FormData>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const set = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const canSubmit = form.firstName && form.lastName && form.email && form.title && form.company;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/submit-speaker', {
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
      <Layout title="Speaker Interest Submitted" description="Your speaker interest has been submitted.">
        <div className="bg-background min-h-[60vh] flex items-center justify-center px-4 py-20">
          <div className="max-w-lg text-center">
            <div className="text-5xl mb-6">&#10003;</div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Thank You!</h1>
            <p className="text-muted-foreground text-lg mb-8">
              We've received your speaker interest. Our team will review and reach out if there's a match.
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
    <Layout title="Speak at Shanghai Summit" description="Express your interest in speaking at the FemTech Weekend Shanghai Summit 2026.">
      <div className="bg-background min-h-screen px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-foreground mb-3">Speak at the Shanghai Summit</h1>
            <p className="text-muted-foreground">
              Interested in speaking, moderating, or hosting a workshop? Let us know.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
              <label className={labelClass}>Title / Role *</label>
              <input className={inputClass} value={form.title} onChange={(e) => set('title', e.target.value)} required placeholder="e.g. CEO, Head of Research..." />
            </div>
            <div>
              <label className={labelClass}>Company / Organization *</label>
              <input className={inputClass} value={form.company} onChange={(e) => set('company', e.target.value)} required />
            </div>
            <div>
              <label className={labelClass}>Which events are you interested in?</label>
              <input
                className={inputClass}
                value={form.interestedEvents}
                onChange={(e) => set('interestedEvents', e.target.value)}
                placeholder="e.g. Day 1 panels, Day 2 pitch judging, workshops..."
              />
            </div>
            <div>
              <label className={labelClass}>Message</label>
              <textarea
                className={inputClass}
                rows={4}
                value={form.message}
                onChange={(e) => set('message', e.target.value)}
                placeholder="Tell us about your expertise and what you'd like to speak about..."
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className={btnPrimary}
                disabled={submitting || !canSubmit}
              >
                {submitting ? 'Submitting...' : 'Submit Interest'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
