# Full-Stack Form Development Guide

## Building Multi-Step Forms with React, Cloudflare Pages Functions, Neon PostgreSQL, and Cloudinary

This guide documents the end-to-end development of the Shanghai Summit Pitch Application form. It covers architecture decisions, implementation patterns, and — critically — the pitfalls encountered in production and how they were resolved.

**Stack:** React (Docusaurus) + TailwindCSS | Cloudflare Pages Functions | Neon PostgreSQL (via `@neondatabase/serverless`) | Cloudinary (file upload) | Resend (transactional email)

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Database Schema & Migrations](#2-database-schema--migrations)
3. [Cloudflare Pages Functions (API)](#3-cloudflare-pages-functions-api)
4. [Frontend Form Implementation](#4-frontend-form-implementation)
5. [File Upload (PDF to Cloudinary)](#5-file-upload-pdf-to-cloudinary)
6. [Email Notifications](#6-email-notifications)
7. [Pitfalls & Lessons Learned](#7-pitfalls--lessons-learned)
8. [Deployment Checklist](#8-deployment-checklist)

---

## 1. Architecture Overview

```
Browser (React)
  ├── POST /api/upload-pitch-deck  →  Cloudflare Pages Function  →  Cloudinary (raw/upload)
  └── POST /api/submit-pitch       →  Cloudflare Pages Function  →  Neon PostgreSQL
                                                                  →  Resend (confirmation email)
                                                                  →  Resend (admin notification)
```

### File Structure

```
functions/
  api/
    submit-pitch.js          # Form submission → DB + email
    upload-pitch-deck.js     # PDF upload → Cloudinary
src/
  pages/
    shanghai-summit/
      pitch.tsx              # Multi-step form UI
  data/
    shanghai-summit.ts       # Form option constants
  db/
    schema.ts                # Drizzle ORM schema
drizzle.config.ts            # Drizzle Kit configuration
```

### Key Design Decisions

- **Cloudflare Pages Functions** instead of a separate API server — zero-config serverless, co-deployed with the frontend.
- **Neon Serverless Driver** (`@neondatabase/serverless`) — connects over WebSocket, works in edge runtimes where `pg` (TCP) does not.
- **Cloudinary `raw/upload`** for PDFs — not `image/upload`. Cloudinary treats PDFs as raw files.
- **Two-phase submit** — upload the PDF first, then submit the form with the returned URL. This prevents losing form data if the upload fails.

---

## 2. Database Schema & Migrations

### Defining the Schema (Drizzle ORM)

```ts
// src/db/schema.ts
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const pitchApplications = pgTable('pitch_applications', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
  companyName: text('company_name').notNull(),
  // ... other fields ...
  marketServed: text('market_served'),
  status: text('status').default('submitted'),
  referenceNumber: text('reference_number'),
  createdAt: timestamp('created_at').defaultNow(),
});
```

### Running Migrations

**Option A: `drizzle-kit push` (recommended for rapid iteration)**

This compares your schema against the live database and applies the diff directly:

```bash
DATABASE_URL="postgresql://..." npx drizzle-kit push --force
```

**Option B: `drizzle-kit generate` + manual review**

Generates a SQL migration file you can inspect before applying:

```bash
DATABASE_URL="postgresql://..." npx drizzle-kit generate
# Review drizzle/0000_*.sql
# Then apply manually or via push
```

### Verifying Columns

After migration, verify the columns are present:

```bash
node -e "
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);
sql\`SELECT column_name, data_type, column_default
    FROM information_schema.columns
    WHERE table_name = 'pitch_applications'
    ORDER BY ordinal_position\`.then(r => console.table(r));
"
```

> **Lesson:** If `drizzle-kit generate` produces a full `CREATE TABLE` instead of `ALTER TABLE`, it means no previous migration snapshot exists. Use `drizzle-kit push` instead — it reads the actual database schema and applies only the diff.

---

## 3. Cloudflare Pages Functions (API)

### Basic Structure

Every Cloudflare Pages Function exports `onRequest(context)`:

```js
// functions/api/submit-pitch.js
import { neon } from '@neondatabase/serverless';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequest(context) {
  const { request, env } = context;

  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only POST
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, message: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }

  try {
    const formData = await request.json();

    // Validate env
    if (!env.DATABASE_URL) {
      return new Response(
        JSON.stringify({ success: false, message: 'Server configuration error' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Use Neon serverless driver
    const sql = neon(env.DATABASE_URL);

    // ... INSERT, email, etc.

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: 'Submission failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
}
```

### Duplicate Detection

```js
const existing = await sql`
  SELECT id FROM pitch_applications
  WHERE email = ${email} AND company_name = ${companyName}
`;
if (existing.length > 0) {
  return new Response(JSON.stringify({
    success: false,
    message: 'An application for this company has already been submitted with this email.',
  }), { status: 409, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
}
```

### Reference Number Generation

Use `RETURNING id` from the INSERT to generate a human-readable reference:

```js
const inserted = await sql`
  INSERT INTO pitch_applications (first_name, last_name, email, ...)
  VALUES (${firstName}, ${lastName}, ${email}, ...)
  RETURNING id
`;
const id = inserted[0].id;
const referenceNumber = `PITCH-2026-${String(id).padStart(4, '0')}`;

await sql`UPDATE pitch_applications SET reference_number = ${referenceNumber} WHERE id = ${id}`;
```

### Handling Array Fields

When the frontend sends arrays (e.g., `workAreas: ["PCOS", "Endometriosis"]`), serialize them for TEXT columns:

```js
${Array.isArray(workAreas) ? JSON.stringify(workAreas) : workAreas || null}
// or for comma-separated storage:
${Array.isArray(ecosystem) ? ecosystem.join(', ') : ecosystem || null}
```

---

## 4. Frontend Form Implementation

### Multi-Step Form Pattern

```tsx
const STEPS = ['Contact Information', 'Company Profile'];
const [step, setStep] = useState(0);

// Render current step
{step === 0 && <ContactInfoFields />}
{step === 1 && <CompanyProfileFields />}

// Navigation
<button onClick={() => {
  if (validateStep(step)) setStep(step + 1);
}}>Next</button>
```

### Inline Validation on Blur

Validate fields when they lose focus, not just on "Next":

```tsx
const [fieldErrors, setFieldErrors] = useState({});
const [touchedFields, setTouchedFields] = useState(new Set());

const handleBlur = (field) => {
  setTouchedFields(prev => new Set(prev).add(field));
  validateField(field);
};

// In JSX: show error only if field has been touched
const hasError = touchedFields.has(field) && fieldErrors[field];
<input className={hasError ? inputErrorClass : inputClass} onBlur={() => handleBlur(field)} />
{hasError && <p className="text-red-500">{fieldErrors[field]}</p>}
```

### LocalStorage Draft Auto-Save

Save form state on every change (debounced) and restore on page load:

```tsx
const DRAFT_KEY = 'pitch-application-draft';

// Restore on mount
useEffect(() => {
  try {
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setForm({ ...initial, ...parsed });
    }
  } catch {}
}, []);

// Save on change (debounced)
const saveDraft = useCallback((data) => {
  if (timerRef.current) clearTimeout(timerRef.current);
  timerRef.current = setTimeout(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
  }, 500);
}, []);

// Clear on successful submission
localStorage.removeItem(DRAFT_KEY);
```

> **Critical pitfall:** See [Section 7.1](#71-localstorage-draft-migration) for the migration bug this caused.

### Select With "Other" Custom Input

When a dropdown has an "Other" option, show a text input for custom values:

```tsx
const OTHER_TRIGGERS = ['Other', 'Not listed'];

function SelectWithOther({ value, otherValue, onSelect, onOtherChange, options }) {
  return (
    <div>
      <select value={value} onChange={(e) => onSelect(e.target.value)}>
        <option value="">Select...</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      {OTHER_TRIGGERS.includes(value) && (
        <input value={otherValue} onChange={(e) => onOtherChange(e.target.value)}
               placeholder="Please specify..." />
      )}
    </div>
  );
}
```

On submission, merge the custom value:

```tsx
const resolveOther = (val, other) =>
  OTHER_TRIGGERS.includes(val) && other ? `Other: ${other}` : val;

const payload = {
  ...form,
  companyType: resolveOther(form.companyType, form.companyTypeOther),
};
```

### Tag Input (Multi-Select + Custom Input)

For fields like "Markets Served" where users can pick from presets AND type custom values:

```tsx
function TagInput({ value, onChange, presets, placeholder }) {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filtered = presets.filter(p => !value.includes(p) && p.toLowerCase().includes(inputValue.toLowerCase()));

  const addTag = (tag) => {
    if (tag.trim() && !value.includes(tag.trim())) {
      onChange([...value, tag.trim()]);
    }
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue);
    }
    if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1)); // Remove last tag
    }
  };

  return (
    <div>
      {/* Selected tags */}
      {value.map(tag => <span key={tag}>{tag} <button onClick={() => onChange(value.filter(v => v !== tag))}>×</button></span>)}
      {/* Input */}
      <input value={inputValue} onChange={e => setInputValue(e.target.value)}
             onFocus={() => setShowSuggestions(true)} onKeyDown={handleKeyDown} />
      {/* Suggestion dropdown — close after selection */}
      {showSuggestions && filtered.map(p => (
        <li onMouseDown={(e) => { e.preventDefault(); addTag(p); setShowSuggestions(false); }}>{p}</li>
      ))}
    </div>
  );
}
```

> **Pitfall:** After selecting a preset, you must `setShowSuggestions(false)` to close the dropdown. Otherwise the dropdown stays open and users must click away and re-focus to see it again.

### Searchable Country Combobox

Use `i18n-iso-countries` for a complete country list (250+ countries):

```bash
npm install i18n-iso-countries
```

```tsx
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
countries.registerLocale(enLocale);

const allCountries = Object.values(countries.getNames('en', { select: 'official' })).sort();
```

Build a combobox with text filtering, keyboard navigation (Enter to select, Escape to close), and click-outside-to-close.

---

## 5. File Upload (PDF to Cloudinary)

### Frontend: Read File as Base64

```tsx
const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Validate before reading
if (file.type !== 'application/pdf') { /* reject */ }
if (file.size > 10 * 1024 * 1024) { /* reject: >10MB */ }
```

### Backend: Cloudinary `raw/upload`

PDFs must use `raw/upload`, not `image/upload`:

```js
// functions/api/upload-pitch-deck.js
const timestamp = Math.floor(Date.now() / 1000);
const folder = 'femtech-pitch-decks';

// SHA-1 signature (Cloudflare Workers compatible)
const signatureString = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
const encoder = new TextEncoder();
const data = encoder.encode(signatureString);
const hashBuffer = await crypto.subtle.digest('SHA-1', data);
const signature = Array.from(new Uint8Array(hashBuffer))
  .map(b => b.toString(16).padStart(2, '0')).join('');

const formData = new FormData();
formData.append('file', base64Data);  // "data:application/pdf;base64,..."
formData.append('api_key', apiKey);
formData.append('timestamp', timestamp.toString());
formData.append('signature', signature);
formData.append('folder', folder);

const response = await fetch(
  `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,  // NOT image/upload
  { method: 'POST', body: formData }
);
```

> **Important:** The signature string parameters must be in **alphabetical order** and the string must end with the API secret (no `&` before it).

### Size Validation on Backend

```js
const base64Part = file.split(',')[1] || '';
const estimatedSize = Math.ceil(base64Part.length * 3 / 4);  // Base64 → bytes
if (estimatedSize > 10 * 1024 * 1024) { /* reject */ }
```

---

## 6. Email Notifications

### Using Resend API

```js
async function sendEmailViaResend(apiKey, { to, subject, html, text, from, replyTo }) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `FemTech Weekend <${from}>`,
      to: Array.isArray(to) ? to : [to],
      subject, html, text,
      ...(replyTo && { reply_to: replyTo }),
    }),
  });
  return response.ok;
}
```

### Admin Notification with Reply-To

Set `reply_to` to the applicant's email so admins can reply directly:

```js
await sendEmailViaResend(env.RESEND_API_KEY, {
  to: adminEmails,
  subject: `[New Pitch #${referenceNumber}] ${companyName}`,
  html: adminHtml,
  text: adminText,
  from: fromEmail,
  replyTo: applicantEmail,  // Admin hits "Reply" → goes to applicant
});
```

### Always Include Plain Text Fallback

HTML emails should always have a `text` alternative for email clients that don't render HTML.

---

## 7. Pitfalls & Lessons Learned

### 7.1 LocalStorage Draft Migration

**Problem:** When you change a field's type (e.g., `ecosystem: string` → `ecosystem: string[]`), existing drafts in localStorage still have the old type. Restoring `{ ...initial, ...parsed }` overwrites the array default with the old string, and calling `.map()` on a string throws `"e.map is not a function"`.

**Solution:** Validate and migrate field types on restore:

```tsx
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
```

**Takeaway:** Any time you change the shape of persisted data (localStorage, cookies, URL params), add migration logic. Old data will exist in users' browsers indefinitely.

### 7.2 React State Batching with Closures

**Problem:** Calling `set('companyType', v)` followed by `set('companyTypeOther', '')` in the same event handler. If `set` uses `{ ...form, [field]: value }` (closure over `form`), the second call overwrites the first because both reference the pre-update `form` snapshot.

```tsx
// BROKEN — second call uses stale form
const set = (field, value) => {
  const updated = { ...form, [field]: value };  // form is stale on 2nd call
  setForm(updated);
};
set('companyType', 'B2C');       // form.companyType = 'B2C'
set('companyTypeOther', '');     // OVERWRITES companyType back to old value!
```

**Solution:** Use the functional updater form of `setState`:

```tsx
// CORRECT — each call gets the latest state
const set = (field, value) => {
  setForm(prev => ({ ...prev, [field]: value }));
};
```

**Takeaway:** Always use functional updaters (`setState(prev => ...)`) when multiple state updates may happen in the same synchronous event handler.

### 7.3 Cloudflare Pages Environment Variables: The Empty String Trap

**Problem:** After setting `DATABASE_URL` via `wrangler pages secret put`, the env var appeared in `Object.keys(env)` but its value was an empty string (`len=0`). This persisted across redeployments.

**Root Cause:** The Cloudflare Pages Dashboard or a previous CLI operation had set `DATABASE_URL` as an empty `secret_text` value. The `wrangler pages secret put` command via stdin (`<<<`) may have written an empty value due to shell encoding, or there was a stale empty entry in the deployment config.

**What did NOT work:**
1. `wrangler pages secret put DATABASE_URL <<< "value"` — wrote the secret but it remained empty at runtime.
2. `wrangler pages secret delete` + `wrangler pages secret put` — still empty.
3. Redeploying after setting the secret — still empty.

**What DID work:** Using the Cloudflare REST API to PATCH the project's `deployment_configs` directly:

```bash
curl -X PATCH \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/$PROJECT_NAME" \
  -d '{
    "deployment_configs": {
      "production": {
        "env_vars": {
          "DATABASE_URL": {
            "type": "secret_text",
            "value": "postgresql://..."
          }
        }
      }
    }
  }'
```

Then trigger a new deployment (push a commit) for the updated config to take effect.

**Debugging approach that helped:** Temporarily exposing diagnostic info in the error response (removed before production):

```js
if (!env.DATABASE_URL) {
  const availableKeys = Object.keys(env).filter(k => !k.startsWith('__'));
  return new Response(JSON.stringify({
    message: 'Server configuration error',
    debug: `type=${typeof env.DATABASE_URL}, len=${env.DATABASE_URL?.length}, keys=[${availableKeys}]`,
  }), { status: 500 });
}
```

**Takeaway:**
- Cloudflare Pages secrets set via CLI may silently fail. Always verify by deploying and testing.
- `wrangler pages secret list` only confirms a key exists, not that its value is non-empty.
- The Cloudflare REST API is the most reliable way to set secrets programmatically.
- **Never leave debug endpoints in production.** Add them temporarily, get your answer, remove immediately.

### 7.4 Scroll Position on Page Transition

**Problem:** When React re-renders from the form view to the success view, the browser retains the scroll position from the form (which was scrolled to the bottom where the submit button is). The success page content is at the top, so users see only the footer.

**Solution:**

```tsx
if (data.success) {
  setSubmitted(true);
  window.scrollTo({ top: 0 });
}
```

**Takeaway:** Whenever you conditionally render a completely different page layout in React (e.g., form → success screen), explicitly reset the scroll position.

### 7.5 Cloudinary: `image/upload` vs `raw/upload`

**Problem:** Uploading a PDF to `https://api.cloudinary.com/v1_1/.../image/upload` fails because Cloudinary tries to process it as an image.

**Solution:** Use `raw/upload` for non-image files (PDFs, documents, etc.):

```
https://api.cloudinary.com/v1_1/${cloudName}/raw/upload
```

### 7.6 Neon Connection String: `channel_binding=require`

The Neon dashboard connection string may include `channel_binding=require`. The `@neondatabase/serverless` driver handles this transparently, but if you switch to the `pg` library (Node.js TCP driver), this parameter can cause connection failures. Strip it if needed:

```
postgresql://user:pass@host/db?sslmode=require          # works with @neondatabase/serverless
postgresql://user:pass@host/db?sslmode=require&channel_binding=require  # also works, but may break pg
```

---

## 8. Deployment Checklist

### Before First Deployment

- [ ] Run `drizzle-kit push` to create/update database tables
- [ ] Verify columns: `SELECT column_name FROM information_schema.columns WHERE table_name = '...'`
- [ ] Set all Cloudflare Pages secrets (use the REST API for reliability):
  - `DATABASE_URL` — Neon connection string
  - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
  - `RESEND_API_KEY`, `RESEND_FROM_EMAIL`
  - `ADMIN_EMAILS` — comma-separated list
- [ ] `npm run typecheck` — no errors
- [ ] `npm run build` — production build succeeds

### Verifying Secrets Are Set

```bash
# List secret names (values are encrypted, so you can only see names)
CLOUDFLARE_ACCOUNT_ID=... npx wrangler pages secret list --project-name ...

# To verify values are non-empty, add a temporary diagnostic endpoint,
# deploy, test, then REMOVE it immediately.
```

### After Deployment

- [ ] Test form submission end-to-end
- [ ] Verify database has the new row
- [ ] Check confirmation email received
- [ ] Check admin notification email received
- [ ] Test duplicate detection (submit same email + company twice)
- [ ] Test with and without PDF upload
- [ ] Test localStorage draft save/restore
- [ ] Test on mobile (responsive layout)

### Monitoring

Check Cloudflare Pages function logs:

```bash
CLOUDFLARE_ACCOUNT_ID=... npx wrangler pages deployment tail --project-name ...
```

---

## Quick Reference: Environment Variables

| Variable | Used By | Purpose |
|----------|---------|---------|
| `DATABASE_URL` | `submit-pitch.js`, `submit-programme.js`, `submit-speaker.js` | Neon PostgreSQL connection |
| `CLOUDINARY_CLOUD_NAME` | `upload-pitch-deck.js`, `upload-image.js` | Cloudinary account |
| `CLOUDINARY_API_KEY` | `upload-pitch-deck.js`, `upload-image.js` | Cloudinary authentication |
| `CLOUDINARY_API_SECRET` | `upload-pitch-deck.js`, `upload-image.js` | Cloudinary signature generation |
| `RESEND_API_KEY` | `submit-pitch.js` | Email sending |
| `RESEND_FROM_EMAIL` | `submit-pitch.js` | Sender address |
| `ADMIN_EMAILS` | `submit-pitch.js` | Comma-separated admin recipients |
