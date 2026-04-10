# Resend Newsletter Subscription Integration Guide

A comprehensive guide for developers to integrate Resend's newsletter subscription functionality into web applications, specifically designed for Cloudflare Pages deployments.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Resend Setup](#resend-setup)
4. [Backend Implementation](#backend-implementation)
5. [Frontend Implementation](#frontend-implementation)
6. [Environment Configuration](#environment-configuration)
7. [Testing & Debugging](#testing--debugging)
8. [Common Issues & Solutions](#common-issues--solutions)
9. [API Reference](#api-reference)

---

## Overview

This guide demonstrates how to implement a complete newsletter subscription system using:

- **Resend** - Email API for sending transactional emails and managing contacts
- **Cloudflare Pages Functions** - Serverless backend for API endpoints
- **React** - Frontend subscription form component

### Features

- Email validation and subscription form
- Contact creation in Resend with segment assignment
- Automated welcome email to new subscribers
- Error handling and user feedback
- Bilingual support (i18n ready)

---

## Prerequisites

Before starting, ensure you have:

- A [Resend account](https://resend.com) (free tier includes 1,000 contacts)
- A Cloudflare Pages project set up
- Node.js and npm installed locally
- Basic understanding of React and serverless functions

---

## Resend Setup

### 1. Create API Key

1. Log in to [Resend Dashboard](https://resend.com)
2. Navigate to **API Keys** section
3. Click **Create API Key**
4. Give it a descriptive name (e.g., "Newsletter Subscription")
5. Copy and securely store the API key (starts with `re_`)

### 2. Create a Segment

Segments (formerly called Audiences) are groups for organizing your contacts.

1. Go to **Audiences** > **Segments** in Resend dashboard
2. Click **Create Segment**
3. Name your segment (e.g., "Newsletter Subscribers")
4. Copy the **Segment ID** (UUID format like `7ed0369b-5209-4a19-a99b-1decde318083`)

### 3. Verify Your Domain (Recommended)

For production use, verify your sending domain:

1. Go to **Domains** in Resend dashboard
2. Add your domain and follow DNS verification steps
3. Use your verified domain for the `from` email address

---

## Backend Implementation

### Cloudflare Pages Function

Create `functions/api/subscribe-newsletter.js`:

```javascript
/**
 * Cloudflare Pages Function for newsletter subscription
 * Adds subscriber to Resend segment and sends welcome email
 */

// Brand styles for emails
const brandStyles = {
  primaryColor: '#AA7C52',
  primaryDark: '#996F49',
  backgroundColor: '#faf9f8',
  textColor: '#1a1a1a',
  mutedColor: '#6b7280'
};

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Your Resend Segment ID
const NEWSLETTER_SEGMENT_ID = 'YOUR_SEGMENT_ID_HERE';

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generate newsletter welcome email
 */
function getNewsletterWelcomeEmail(email) {
  const safeEmail = escapeHtml(email);

  const subject = `Welcome to Our Newsletter!`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Our Newsletter</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: ${brandStyles.backgroundColor};">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, ${brandStyles.primaryColor} 0%, ${brandStyles.primaryDark} 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Welcome!</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Thanks for subscribing to our newsletter</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: ${brandStyles.textColor}; margin: 0 0 20px; font-size: 22px;">Thank you for subscribing!</h2>
              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                You're now part of our community. We'll keep you updated with the latest news and insights.
              </p>
              <p style="color: ${brandStyles.mutedColor}; font-size: 14px; line-height: 1.6; margin: 30px 0 0;">
                Questions? Contact us at <a href="mailto:hello@example.com" style="color: ${brandStyles.primaryColor};">hello@example.com</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: ${brandStyles.backgroundColor}; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: ${brandStyles.mutedColor}; font-size: 12px; margin: 0;">
                You're receiving this email because you subscribed at ${safeEmail}.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `
Welcome to Our Newsletter!

Thank you for subscribing!

You're now part of our community. We'll keep you updated with the latest news and insights.

Questions? Contact us at hello@example.com

---
You're receiving this email because you subscribed at ${email}.
  `.trim();

  return { subject, html, text };
}

/**
 * Create contact in Resend with segment assignment
 *
 * IMPORTANT: The segments parameter must be an array of objects with 'id' property,
 * NOT an array of strings.
 *
 * Correct:   segments: [{ id: "segment-uuid" }]
 * Incorrect: segments: ["segment-uuid"]
 */
async function createContactWithSegment(apiKey, email, segmentId) {
  const url = 'https://api.resend.com/contacts';

  const requestBody = {
    email: email,
    unsubscribed: false,
    segments: [{ id: segmentId }],  // Must be array of objects!
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  const responseText = await response.text();

  if (!response.ok) {
    // Handle case where contact already exists
    if (response.status === 409 || responseText.includes('already exists')) {
      return await addExistingContactToSegment(apiKey, email, segmentId);
    }
    return { success: false, error: `Resend API error: ${response.status} - ${responseText}` };
  }

  let data = {};
  try {
    data = JSON.parse(responseText);
  } catch (e) {
    // Response might be empty
  }

  return { success: true, data };
}

/**
 * Add existing contact to segment
 */
async function addExistingContactToSegment(apiKey, email, segmentId) {
  const encodedEmail = encodeURIComponent(email);
  const url = `https://api.resend.com/contacts/${encodedEmail}/segments/${segmentId}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const responseText = await response.text();
    return { success: false, error: `Resend API error: ${response.status} - ${responseText}` };
  }

  return { success: true, data: {} };
}

/**
 * Send email using Resend REST API
 */
async function sendEmailViaResend(apiKey, { to, subject, html, text, from }) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `Your Brand <${from}>`,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    return { success: false, error: `Resend API error: ${response.status}` };
  }

  const data = await response.json();
  return { success: true, data };
}

/**
 * Main request handler for Cloudflare Pages Functions
 */
export async function onRequest(context) {
  const { request, env } = context;

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Health check endpoint
  if (request.method === 'GET') {
    return new Response(JSON.stringify({
      status: 'ok',
      message: 'Newsletter API is running'
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  // Only allow POST for subscription
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || !isValidEmail(email)) {
      return new Response(JSON.stringify({ error: 'Valid email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Check environment variables
    if (!env.RESEND_API_KEY) {
      return new Response(JSON.stringify({
        error: 'Server configuration error',
        message: 'Email service not configured'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const fromEmail = env.RESEND_FROM_EMAIL || 'noreply@example.com';

    // 1. Create contact with segment assignment
    let segmentAddSuccess = false;
    try {
      const contactResult = await createContactWithSegment(
        env.RESEND_API_KEY,
        email,
        NEWSLETTER_SEGMENT_ID
      );
      segmentAddSuccess = contactResult.success;
    } catch (error) {
      console.error('[Newsletter] Contact creation error:', error.message);
    }

    // 2. Send welcome email
    const welcomeEmail = getNewsletterWelcomeEmail(email);
    const emailResult = await sendEmailViaResend(env.RESEND_API_KEY, {
      to: email,
      subject: welcomeEmail.subject,
      html: welcomeEmail.html,
      text: welcomeEmail.text,
      from: fromEmail,
    });

    return new Response(JSON.stringify({
      success: true,
      message: 'Subscription successful',
      emailSent: emailResult.success,
      segmentAdded: segmentAddSuccess
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error) {
    console.error('[Newsletter] Error:', error);
    return new Response(JSON.stringify({
      error: 'Error processing subscription',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}
```

### Key Points for Backend

1. **Segments Format**: The `segments` parameter MUST be an array of objects:
   ```javascript
   // Correct
   segments: [{ id: "7ed0369b-5209-4a19-a99b-1decde318083" }]

   // Incorrect - will cause 422 error
   segments: ["7ed0369b-5209-4a19-a99b-1decde318083"]
   ```

2. **CORS Headers**: Essential for cross-origin requests from your frontend.

3. **Error Handling**: Handle cases where contacts already exist (409 Conflict).

---

## Frontend Implementation

### React Component

Create `src/components/ui/NewsletterSubscribe.tsx`:

```tsx
import React, { useState } from 'react';

interface NewsletterSubscribeProps {
  variant?: 'dark' | 'light';
  className?: string;
}

type SubscribeStatus = 'idle' | 'loading' | 'success' | 'error';

export function NewsletterSubscribe({
  variant = 'dark',
  className = ''
}: NewsletterSubscribeProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubscribeStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/subscribe-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const isDark = variant === 'dark';

  if (status === 'success') {
    return (
      <div className={`p-4 rounded-lg text-center ${isDark ? 'bg-white/10 text-white' : 'bg-green-50 text-green-800'} ${className}`}>
        <svg className={`w-6 h-6 mx-auto mb-2 ${isDark ? 'text-white' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <p className="text-sm">Thank you for subscribing! Check your email for confirmation.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`w-full max-w-md mx-auto ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') {
              setStatus('idle');
              setErrorMessage('');
            }
          }}
          placeholder="Enter your email address"
          disabled={status === 'loading'}
          className={`flex-1 px-4 py-2.5 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 ${
            isDark
              ? 'bg-white/10 text-white placeholder:text-white/50 border border-white/20 focus:ring-white/30'
              : 'bg-white text-gray-900 placeholder:text-gray-400 border border-gray-300 focus:ring-blue-500/30'
          } ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`px-6 py-2.5 rounded-md text-sm font-medium transition-colors ${
            isDark
              ? 'bg-white text-gray-900 hover:bg-gray-100'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          } ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>

      {status === 'error' && errorMessage && (
        <p className={`mt-2 text-sm text-center ${isDark ? 'text-red-300' : 'text-red-500'}`}>
          {errorMessage}
        </p>
      )}
    </form>
  );
}
```

### Usage Example

```tsx
import { NewsletterSubscribe } from './components/ui/NewsletterSubscribe';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h3 className="text-2xl font-bold mb-4">Join Our Newsletter</h3>
        <p className="text-gray-400 mb-8">
          Get the latest updates delivered to your inbox.
        </p>
        <NewsletterSubscribe variant="dark" />
      </div>
    </footer>
  );
}
```

---

## Environment Configuration

### Cloudflare Pages Environment Variables

Set these in your Cloudflare Pages dashboard:

1. Go to your project **Settings** > **Environment variables**
2. Add the following variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `RESEND_API_KEY` | Your Resend API key | `re_xxxxxxxxx` |
| `RESEND_FROM_EMAIL` | Verified sender email | `noreply@yourdomain.com` |

### Local Development

Create a `.dev.vars` file in your project root:

```
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

---

## Testing & Debugging

### 1. Test API Health Check

Visit your API endpoint directly:
```
https://yourdomain.com/api/subscribe-newsletter
```

Expected response:
```json
{
  "status": "ok",
  "message": "Newsletter API is running"
}
```

### 2. Test Subscription

Use browser DevTools (F12) > Console to see detailed responses:

```javascript
// Add this to your frontend component for debugging
console.log('[Newsletter] API Response:', JSON.stringify(data, null, 2));
```

### 3. Check Resend Dashboard

After successful subscription:
1. Go to [Resend Dashboard](https://resend.com)
2. Navigate to **Audiences** > **Contacts**
3. Verify the new contact appears
4. Check the segment to confirm assignment

### 4. Debug Response Format

A successful subscription response looks like:

```json
{
  "success": true,
  "message": "Subscription successful",
  "emailSent": true,
  "segmentAdded": true
}
```

---

## Common Issues & Solutions

### Issue 1: 422 Validation Error - "Expected object, received string"

**Cause**: The `segments` parameter is formatted incorrectly.

**Solution**: Use object format with `id` property:
```javascript
// Wrong
segments: ["segment-id"]

// Correct
segments: [{ id: "segment-id" }]
```

### Issue 2: 404 Not Found on API Endpoint

**Cause**: The Cloudflare Pages Function is not deployed or route is incorrect.

**Solution**:
- Ensure file is at `functions/api/subscribe-newsletter.js`
- Check Cloudflare Pages deployment logs
- Verify the function exports `onRequest`

### Issue 3: 405 Method Not Allowed

**Cause**: CORS preflight (OPTIONS) request not handled.

**Solution**: Add OPTIONS handler:
```javascript
if (request.method === 'OPTIONS') {
  return new Response(null, { headers: corsHeaders });
}
```

### Issue 4: Contact Created but Not in Segment

**Cause**: Contact already exists from a previous attempt.

**Solution**: Implement fallback to add existing contact to segment:
```javascript
if (response.status === 409) {
  return await addExistingContactToSegment(apiKey, email, segmentId);
}
```

### Issue 5: Email Not Received

**Cause**: Domain not verified or incorrect `from` address.

**Solution**:
- Verify your domain in Resend dashboard
- Use a verified email address for the `from` field
- Check spam folder

---

## API Reference

### Resend API Endpoints Used

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/contacts` | POST | Create a new contact with segment assignment |
| `/contacts/{email}/segments/{segment_id}` | POST | Add existing contact to segment |
| `/emails` | POST | Send transactional email |

### Create Contact Request

```http
POST https://api.resend.com/contacts
Authorization: Bearer re_xxxxxxxxx
Content-Type: application/json

{
  "email": "user@example.com",
  "unsubscribed": false,
  "segments": [{ "id": "segment-uuid" }]
}
```

### Create Contact Response

```json
{
  "object": "contact",
  "id": "contact-uuid"
}
```

### Send Email Request

```http
POST https://api.resend.com/emails
Authorization: Bearer re_xxxxxxxxx
Content-Type: application/json

{
  "from": "Your Brand <noreply@yourdomain.com>",
  "to": ["user@example.com"],
  "subject": "Welcome!",
  "html": "<h1>Hello</h1>",
  "text": "Hello"
}
```

---

## Additional Resources

- [Resend Documentation](https://resend.com/docs)
- [Resend API Reference](https://resend.com/docs/api-reference)
- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/)
- [Resend Contacts API](https://resend.com/docs/api-reference/contacts/create-contact)

---

## License

This guide is provided as-is for educational purposes. Adapt the code to your specific needs and security requirements.

---

*Last updated: January 2025*
