# Newsletter Anti-Bot Protection Implementation Guide

A comprehensive guide for implementing multi-layer protection against zombie/bot email subscriptions in a Docusaurus-based website deployed on Cloudflare Pages.

## Table of Contents

1. [Problem Overview](#problem-overview)
2. [Solution Architecture](#solution-architecture)
3. [Implementation Details](#implementation-details)
   - [Layer 1: Honeypot Field](#layer-1-honeypot-field)
   - [Layer 2: Double Opt-in](#layer-2-double-opt-in)
   - [Layer 3: Cloudflare Turnstile](#layer-3-cloudflare-turnstile)
4. [File Structure](#file-structure)
5. [Environment Variables](#environment-variables)
6. [Cloudflare Configuration](#cloudflare-configuration)
7. [Testing & Verification](#testing--verification)
8. [Troubleshooting](#troubleshooting)

---

## Problem Overview

### The Issue

Newsletter subscription forms are vulnerable to bot attacks that submit fake or disposable email addresses. These "zombie emails" cause several problems:

1. **Wasted email quota** - Services like Resend have limited free tier quotas
2. **Poor deliverability metrics** - High bounce rates affect sender reputation
3. **Inaccurate subscriber counts** - Polluted contact lists
4. **Unnecessary costs** - Paying to send emails that will never be read

### Identifying Bot Emails

Common patterns of bot-generated emails:
- Excessive dots in Gmail addresses: `z.od.oroy.22.7@gmail.com`
- Random letter combinations: `r.f.e.n.d.e.ri.ii@gmail.com`
- Pattern exploitation of Gmail's dot-ignoring feature

### Example of Suspicious Subscriptions

```
z.od.oroy.22.7@gmail.com          ← Bot (excessive dots)
cha.nge.f.ou.nd.a.ti.o.nn.p@gmail.com  ← Bot (random dots)
r.f.e.n.d.e.ri.ii@gmail.com       ← Bot (random pattern)
t.o.d.d.mc.g3@gmail.com           ← Bot (abnormal format)
user@company.com                   ← Likely legitimate
```

---

## Solution Architecture

### Three-Layer Protection

```
User enters email
       ↓
[Layer 1: Honeypot] → Bot fills hidden field? → Silent reject (no email sent)
       ↓ Pass
[Layer 2: Turnstile] → Verification failed? → Show error
       ↓ Pass
Send confirmation email (1 quota used)
       ↓
User clicks confirmation link
       ↓
[Token Verification] → Invalid/Expired? → Show error page
       ↓ Valid
Add to Resend segment + Send welcome email (1 quota used)
       ↓
Success page
```

### Protection Effectiveness

| Layer | Mechanism | Blocks | User Impact |
|-------|-----------|--------|-------------|
| Honeypot | Hidden form field | Simple bots | None |
| Turnstile | Smart CAPTCHA | Advanced bots | Minimal (invisible) |
| Double Opt-in | Email confirmation | All non-clicking bots | One extra click |

### Email Quota Impact

**Before protection:**
- Every bot submission = 1 welcome email sent = 1 quota used

**After protection:**
- Bot blocked by honeypot = 0 emails sent
- Bot blocked by Turnstile = 0 emails sent
- Bot passes but doesn't click confirmation = 1 confirmation email (smaller, cheaper)
- Real user completes flow = 1 confirmation + 1 welcome email

---

## Implementation Details

### Layer 1: Honeypot Field

A honeypot is a hidden form field that real users cannot see or interact with, but bots automatically fill out.

#### Frontend Implementation

**File: `src/components/ui/NewsletterSubscribe.tsx`**

```typescript
// Add honeypot state
const [honeypot, setHoneypot] = useState('');

// Add hidden field in form (invisible to users)
<form onSubmit={handleSubmit}>
  {/* Honeypot field - hidden from users, bots will fill it */}
  <input
    type="text"
    name="website"  // Attractive name for bots
    value={honeypot}
    onChange={(e) => setHoneypot(e.target.value)}
    tabIndex={-1}
    autoComplete="off"
    style={{
      position: 'absolute',
      left: '-9999px',
      width: '1px',
      height: '1px',
      opacity: 0,
      pointerEvents: 'none',
    }}
    aria-hidden="true"
  />
  {/* ... rest of form */}
</form>

// Include in API request
body: JSON.stringify({
  email: email.trim(),
  website: honeypot,  // Send honeypot value
}),
```

#### Backend Implementation

**File: `src/api/subscribe-newsletter.js`**

```javascript
async function handler(req, res) {
  const { email, website } = req.body;

  // Honeypot check - if filled, it's a bot
  if (website && website.trim() !== '') {
    console.log('[Honeypot] Bot detected, silently returning success');
    // Return success to not alert the bot, but don't send any email
    return res.status(200).json({
      success: true,
      message: 'Subscription successful'
    });
  }

  // Continue with legitimate subscription...
}
```

### Layer 2: Double Opt-in

Double opt-in requires users to click a confirmation link in their email before being added to the subscriber list.

#### Token Generation Utility

**File: `src/api/services/crypto/token-utils.js`**

```javascript
const crypto = require('crypto');

const TOKEN_EXPIRY_HOURS = 24;

function getHmacSecret() {
  return process.env.NEWSLETTER_TOKEN_SECRET || 'default-secret-change-me';
}

/**
 * Generate a confirmation token
 * Format: base64url(email|timestamp|signature)
 */
function generateConfirmationToken(email) {
  const timestamp = Date.now();
  const data = `${email}|${timestamp}`;

  const hmac = crypto.createHmac('sha256', getHmacSecret());
  hmac.update(data);
  const signature = hmac.digest('hex');

  const payload = `${data}|${signature}`;
  return Buffer.from(payload).toString('base64url');
}

/**
 * Verify a confirmation token
 */
function verifyConfirmationToken(token) {
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const parts = decoded.split('|');

    if (parts.length !== 3) {
      return { valid: false, error: 'Invalid token format' };
    }

    const [email, timestampStr, providedSignature] = parts;
    const timestamp = parseInt(timestampStr, 10);

    // Check expiry
    const expiryMs = TOKEN_EXPIRY_HOURS * 60 * 60 * 1000;
    if (Date.now() - timestamp > expiryMs) {
      return { valid: false, error: 'Token has expired' };
    }

    // Verify signature
    const data = `${email}|${timestamp}`;
    const hmac = crypto.createHmac('sha256', getHmacSecret());
    hmac.update(data);
    const expectedSignature = hmac.digest('hex');

    if (!crypto.timingSafeEqual(
      Buffer.from(providedSignature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    )) {
      return { valid: false, error: 'Invalid signature' };
    }

    return { valid: true, email };
  } catch (error) {
    return { valid: false, error: 'Token verification failed' };
  }
}

module.exports = { generateConfirmationToken, verifyConfirmationToken, TOKEN_EXPIRY_HOURS };
```

#### Confirmation Email Template

**File: `src/api/services/email/templates/newsletter-confirmation.js`**

```javascript
function getNewsletterConfirmationEmail(email, confirmUrl) {
  const subject = 'Confirm Your Newsletter Subscription';

  const html = `
    <h1>One more step...</h1>
    <p>Click the button below to confirm your subscription:</p>
    <a href="${confirmUrl}" style="...">Confirm Subscription</a>
    <p>This link expires in 24 hours.</p>
  `;

  const text = `
    Confirm your subscription by visiting: ${confirmUrl}
    This link expires in 24 hours.
  `;

  return { subject, html, text };
}
```

#### Subscribe API (Step 1)

**File: `src/api/subscribe-newsletter.js`**

```javascript
const { sendEmail } = require('./services/email/resend-client');
const { getNewsletterConfirmationEmail } = require('./services/email/templates/newsletter-confirmation');
const { generateConfirmationToken } = require('./services/crypto/token-utils');

async function handler(req, res) {
  const { email, website, turnstileToken } = req.body;

  // 1. Honeypot check
  if (website && website.trim() !== '') {
    return res.status(200).json({ success: true });
  }

  // 2. Validate email
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  // 3. Turnstile verification (if configured)
  if (process.env.TURNSTILE_SECRET_KEY && turnstileToken) {
    const valid = await verifyTurnstile(turnstileToken);
    if (!valid) {
      return res.status(400).json({ error: 'Security verification failed' });
    }
  }

  // 4. Generate confirmation token and URL
  const token = generateConfirmationToken(email);
  const baseUrl = process.env.SITE_URL || 'https://example.com';
  const confirmUrl = `${baseUrl}/confirm-subscription?token=${token}`;

  // 5. Send confirmation email (NOT welcome email yet)
  const { subject, html, text } = getNewsletterConfirmationEmail(email, confirmUrl);
  const result = await sendEmail({ to: email, subject, html, text });

  return res.status(200).json({
    success: true,
    message: 'Please check your email to confirm subscription',
    requiresConfirmation: true
  });
}
```

#### Confirm API (Step 2)

**File: `src/api/confirm-subscription.js`**

```javascript
const { getResendClient, sendEmail } = require('./services/email/resend-client');
const { getNewsletterWelcomeEmail } = require('./services/email/templates/newsletter-welcome');
const { verifyConfirmationToken } = require('./services/crypto/token-utils');

const NEWSLETTER_SEGMENT_ID = 'your-segment-id';

async function handler(req, res) {
  const token = req.query?.token || req.body?.token;

  // 1. Verify token
  const verification = verifyConfirmationToken(token);
  if (!verification.valid) {
    return res.status(400).json({
      success: false,
      error: verification.error
    });
  }

  const email = verification.email;
  const resend = getResendClient();

  // 2. Add to Resend segment (actual subscription)
  await resend.contacts.segments.add({
    email: email,
    segmentId: NEWSLETTER_SEGMENT_ID,
  });

  // 3. Send welcome email
  const { subject, html, text } = getNewsletterWelcomeEmail(email);
  await sendEmail({ to: email, subject, html, text });

  return res.status(200).json({
    success: true,
    message: 'Subscription confirmed successfully'
  });
}
```

#### Confirmation Page

**File: `src/pages/confirm-subscription.tsx`**

```typescript
import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import { useLocation } from '@docusaurus/router';

export default function ConfirmSubscriptionPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (!token) {
      setStatus('error');
      setErrorMessage('Missing confirmation token');
      return;
    }

    fetch(`/api/confirm-subscription?token=${encodeURIComponent(token)}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStatus('success');
        } else {
          setStatus('error');
          setErrorMessage(data.error);
        }
      })
      .catch(() => {
        setStatus('error');
        setErrorMessage('An error occurred');
      });
  }, [location.search]);

  return (
    <Layout title="Confirm Subscription">
      {status === 'loading' && <p>Confirming...</p>}
      {status === 'success' && <p>Successfully subscribed!</p>}
      {status === 'error' && <p>Error: {errorMessage}</p>}
    </Layout>
  );
}
```

### Layer 3: Cloudflare Turnstile

Turnstile is Cloudflare's smart CAPTCHA alternative that provides invisible bot detection.

#### Docusaurus Configuration

**File: `docusaurus.config.ts`**

```typescript
const config: Config = {
  // ... other config

  customFields: {
    turnstileSiteKey: process.env.TURNSTILE_SITE_KEY || '',
  },
};
```

#### Frontend Integration

**File: `src/components/ui/NewsletterSubscribe.tsx`**

```typescript
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Turnstile types
declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: any) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export function NewsletterSubscribe({ variant = 'dark' }) {
  const { siteConfig } = useDocusaurusContext();
  const turnstileSiteKey = (siteConfig?.customFields?.turnstileSiteKey as string) ?? '';

  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Initialize Turnstile
  useEffect(() => {
    if (!turnstileSiteKey || !turnstileRef.current) return;

    const loadScript = () => {
      return new Promise<void>((resolve) => {
        if (window.turnstile) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        script.async = true;
        script.onload = () => resolve();
        document.head.appendChild(script);
      });
    };

    loadScript().then(() => {
      if (window.turnstile && turnstileRef.current && !widgetIdRef.current) {
        widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
          sitekey: turnstileSiteKey,
          theme: variant === 'dark' ? 'dark' : 'light',
          callback: (token: string) => setTurnstileToken(token),
          'expired-callback': () => setTurnstileToken(null),
        });
      }
    });

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [turnstileSiteKey, variant]);

  // In form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check Turnstile if configured
    if (turnstileSiteKey && !turnstileToken) {
      setErrorMessage('Please complete the security verification');
      return;
    }

    // Include token in API request
    const response = await fetch('/api/subscribe-newsletter', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        website: honeypot,
        turnstileToken: turnstileToken,
      }),
    });
    // ...
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Email input and submit button */}

      {/* Turnstile widget - only shown when configured */}
      {turnstileSiteKey && (
        <div ref={turnstileRef} className="flex justify-center mt-2" />
      )}
    </form>
  );
}
```

#### Backend Verification

**File: `src/api/subscribe-newsletter.js`**

```javascript
async function verifyTurnstile(token) {
  if (!token) return false;

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
      }),
    });
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}
```

---

## File Structure

```
project/
├── api/
│   └── confirm-subscription/
│       └── index.js              # Vercel/Cloudflare API entry
├── src/
│   ├── api/
│   │   ├── subscribe-newsletter.js    # Step 1: Send confirmation
│   │   ├── confirm-subscription.js    # Step 2: Verify & subscribe
│   │   └── services/
│   │       ├── crypto/
│   │       │   └── token-utils.js     # Token generation/verification
│   │       └── email/
│   │           ├── resend-client.js
│   │           └── templates/
│   │               ├── newsletter-welcome.js
│   │               └── newsletter-confirmation.js
│   ├── components/
│   │   └── ui/
│   │       └── NewsletterSubscribe.tsx
│   ├── constants/
│   │   ├── newsletter.ts
│   │   └── confirm-subscription.ts
│   └── pages/
│       └── confirm-subscription.tsx
├── docusaurus.config.ts
└── .env.example
```

---

## Environment Variables

### Required Variables

```bash
# Token secret for HMAC signing (generate with: openssl rand -hex 32)
NEWSLETTER_TOKEN_SECRET=your_64_character_hex_string

# Site URL for confirmation email links
SITE_URL=https://yourdomain.com

# Resend API configuration
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

### Optional Variables (for Turnstile)

```bash
# Cloudflare Turnstile (get from dash.cloudflare.com/turnstile)
TURNSTILE_SITE_KEY=0x4AAAA...    # Public key (safe for frontend)
TURNSTILE_SECRET_KEY=0x4AAAA...  # Secret key (backend only)
```

### Generating Secure Token Secret

```bash
# Using OpenSSL
openssl rand -hex 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Cloudflare Configuration

### Setting Up Turnstile

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Turnstile** in the sidebar
3. Click **Add site**
4. Configure:
   - **Site name**: Your Newsletter
   - **Domains**:
     - `yourdomain.com`
     - `www.yourdomain.com`
     - `your-project.pages.dev`
     - `localhost` (for development)
   - **Widget Mode**: `Managed` (recommended)
5. Click **Create**
6. Copy the **Site Key** and **Secret Key**

### Configuring Cloudflare Pages Secrets

Using Wrangler CLI:

```bash
# Login to Cloudflare
wrangler login

# Set environment variables
echo "your_token_secret" | wrangler pages secret put NEWSLETTER_TOKEN_SECRET --project-name your-project
echo "https://yourdomain.com" | wrangler pages secret put SITE_URL --project-name your-project
echo "your_turnstile_site_key" | wrangler pages secret put TURNSTILE_SITE_KEY --project-name your-project
echo "your_turnstile_secret_key" | wrangler pages secret put TURNSTILE_SECRET_KEY --project-name your-project

# Verify configuration
wrangler pages secret list --project-name your-project
```

### Triggering Redeployment

After setting secrets, redeploy to apply changes:

```bash
# Build the project
npm run build

# Deploy to Cloudflare Pages
wrangler pages deployment create ./build --project-name your-project --branch main
```

---

## Testing & Verification

### Testing Honeypot

```bash
# Simulate bot filling honeypot field
curl -X POST https://yourdomain.com/api/subscribe-newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","website":"spam-content"}'

# Expected: Returns success but no email sent
# Check server logs for "[Honeypot] Bot detected"
```

### Testing Double Opt-in

1. Submit a real email address
2. Check inbox for confirmation email
3. Click the confirmation link
4. Verify welcome email arrives
5. Check Resend dashboard for new contact

### Testing Token Expiry

```javascript
// Create an expired token (25 hours old)
const crypto = require('crypto');
const oldTimestamp = Date.now() - (25 * 60 * 60 * 1000);
const data = `test@example.com|${oldTimestamp}`;
const hmac = crypto.createHmac('sha256', 'your-secret');
hmac.update(data);
const signature = hmac.digest('hex');
const expiredToken = Buffer.from(`${data}|${signature}`).toString('base64url');

// Use this token - should return "Token has expired"
```

### Testing Turnstile

1. Load the newsletter form
2. Verify Turnstile widget appears (if configured)
3. Try submitting without completing verification
4. Expected: Error message about security verification

---

## Troubleshooting

### Newsletter Component Not Visible

**Symptoms**: The newsletter subscription form disappears from the page.

**Possible Causes**:
1. JavaScript error in the component
2. Missing Docusaurus context

**Solutions**:
```typescript
// Add null safety checks
const { siteConfig } = useDocusaurusContext();
const turnstileSiteKey = (siteConfig?.customFields?.turnstileSiteKey as string) ?? '';
```

### Turnstile Not Appearing

**Symptoms**: The Turnstile widget doesn't show up.

**Possible Causes**:
1. `TURNSTILE_SITE_KEY` not set in environment
2. Domain not added to Turnstile widget configuration

**Solutions**:
1. Verify environment variable is set: `wrangler pages secret list`
2. Add domain to Turnstile widget in Cloudflare Dashboard
3. For Docusaurus, ensure `customFields` is configured in `docusaurus.config.ts`

### Confirmation Emails Not Sending

**Symptoms**: Users don't receive confirmation emails.

**Possible Causes**:
1. `RESEND_API_KEY` not configured
2. `SITE_URL` incorrect (malformed confirmation links)

**Solutions**:
1. Verify Resend API key is valid
2. Check `SITE_URL` matches your actual domain
3. Check server logs for error messages

### Token Verification Failing

**Symptoms**: Users click confirmation link but get "Invalid token" error.

**Possible Causes**:
1. `NEWSLETTER_TOKEN_SECRET` changed between token generation and verification
2. Token expired (older than 24 hours)
3. URL encoding issues

**Solutions**:
1. Ensure consistent `NEWSLETTER_TOKEN_SECRET` across deployments
2. Ask user to re-subscribe if token expired
3. Use `encodeURIComponent()` when building confirmation URL

### API Returns 405 Method Not Allowed

**Symptoms**: API calls fail with 405 error.

**Solutions**:
1. Verify API route files exist in `/api` directory
2. Check that handler exports are correct
3. For Cloudflare Pages, ensure Functions are enabled

---

## Security Considerations

1. **Token Secret**: Use a strong, unique secret for HMAC signing. Never commit it to version control.

2. **Rate Limiting**: Consider adding rate limiting to prevent abuse:
   - Cloudflare Dashboard → Security → WAF → Rate Limiting Rules
   - Limit `/api/subscribe-newsletter` to 5 requests per IP per minute

3. **Email Validation**: The current regex is basic. Consider using a library like `validator.js` for production.

4. **HTTPS Only**: Ensure all confirmation links use HTTPS.

5. **Timing-Safe Comparison**: The token verification uses `crypto.timingSafeEqual()` to prevent timing attacks.

---

## Conclusion

This multi-layer protection significantly reduces bot subscriptions:

- **Honeypot**: Catches simple bots with zero user friction
- **Double Opt-in**: Ensures only engaged users complete subscription
- **Turnstile**: Provides intelligent bot detection with minimal user friction

The combination means zombie emails will at most consume one confirmation email (which is smaller and cheaper than the full welcome email), and they will never be added to your actual subscriber list.

---

## References

- [Cloudflare Turnstile Documentation](https://developers.cloudflare.com/turnstile/)
- [Resend API Documentation](https://resend.com/docs)
- [Docusaurus Configuration](https://docusaurus.io/docs/configuration)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
