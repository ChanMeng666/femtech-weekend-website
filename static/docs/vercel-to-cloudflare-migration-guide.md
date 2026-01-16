# Vercel to Cloudflare Pages Migration Guide

This guide documents the complete process of migrating serverless API functions from Vercel to Cloudflare Pages. It covers the key differences between platforms and provides step-by-step instructions for adapting your code.

## Table of Contents

1. [Overview](#overview)
2. [Key Differences](#key-differences)
3. [Migration Steps](#migration-steps)
4. [API Endpoints Migration](#api-endpoints-migration)
5. [Environment Variables](#environment-variables)
6. [Common Issues and Solutions](#common-issues-and-solutions)
7. [Testing and Verification](#testing-and-verification)

---

## Overview

### Why Migrate?

- Cloudflare Pages offers global edge deployment with excellent performance
- Unified platform for static hosting and serverless functions
- Cost-effective for many use cases
- Built-in DDoS protection and CDN

### What This Guide Covers

This guide documents the migration of the following API endpoints:

| API Endpoint | Functionality |
|--------------|---------------|
| `/api/pdf-form-submit` | Form submission to Notion + Email via Resend |
| `/api/submit-ecosystem` | Ecosystem membership application |
| `/api/upload-image` | Image upload to Cloudinary |
| `/api/chat-stream` | AI chatbot with Google Gemini |

---

## Key Differences

### Directory Structure

| Vercel | Cloudflare Pages |
|--------|------------------|
| `/api/` directory | `/functions/` directory |
| `api/endpoint/index.js` | `functions/api/endpoint.js` |

### Function Format

**Vercel (Node.js style):**
```javascript
module.exports = async function handler(req, res) {
  res.status(200).json({ success: true });
};
```

**Cloudflare Pages (Web Workers style):**
```javascript
export async function onRequest(context) {
  const { request, env } = context;
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
```

### SDK Compatibility

**Critical Issue:** Many Node.js SDKs don't work in Cloudflare Workers environment due to "Illegal invocation" errors.

| SDK | Vercel | Cloudflare |
|-----|--------|------------|
| `@notionhq/client` | ✅ Works | ❌ Use REST API |
| `resend` | ✅ Works | ❌ Use REST API |
| `cloudinary` | ✅ Works | ❌ Use REST API |
| `@google/generative-ai` | ✅ Works | ❌ Use REST API |

**Solution:** Replace all SDK calls with native `fetch` calls to REST APIs.

---

## Migration Steps

### Step 1: Create Functions Directory

Create the Cloudflare Pages Functions directory structure:

```
functions/
└── api/
    ├── pdf-form-submit.js
    ├── submit-ecosystem.js
    ├── upload-image.js
    └── chat-stream.js
```

### Step 2: Update wrangler.toml

Add Node.js compatibility flag (optional, for some packages):

```toml
# Cloudflare Pages configuration
name = "your-project-name"
pages_build_output_dir = "build"
compatibility_date = "2025-01-15"
compatibility_flags = ["nodejs_compat"]
```

### Step 3: Convert Function Format

Transform each Vercel function to Cloudflare Pages format.

**Before (Vercel):**
```javascript
const { Client } = require('@notionhq/client');

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const notion = new Client({ auth: process.env.NOTION_TOKEN });
  // ... business logic

  res.status(200).json({ success: true });
};
```

**After (Cloudflare):**
```javascript
// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Use native fetch instead of SDK
async function createNotionPage(notionToken, databaseId, properties) {
  const response = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${notionToken}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties: properties,
    }),
  });

  if (!response.ok) {
    throw new Error(`Notion API error: ${response.status}`);
  }

  return response.json();
}

export async function onRequest(context) {
  const { request, env } = context;

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  try {
    const formData = await request.json();

    // Access environment variables via env object
    const result = await createNotionPage(
      env.NOTION_TOKEN,
      env.DATABASE_ID,
      properties
    );

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}
```

---

## API Endpoints Migration

### 1. Notion API (Form Submissions)

Replace `@notionhq/client` with direct REST API calls:

```javascript
async function createNotionPage(notionToken, databaseId, properties) {
  const response = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${notionToken}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties: properties,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('[Notion] API error:', errorData);
    throw new Error(`Notion API error: ${response.status}`);
  }

  return response.json();
}
```

### 2. Resend API (Email)

Replace `resend` SDK with direct REST API calls:

```javascript
async function sendEmailViaResend(apiKey, { to, subject, html, text, from, replyTo }) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `Your App <${from}>`,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
      ...(replyTo && { reply_to: replyTo }),
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('[Resend] API error:', errorData);
    return { success: false, error: `Resend API error: ${response.status}` };
  }

  const data = await response.json();
  return { success: true, data };
}
```

### 3. Cloudinary API (Image Upload)

Replace `cloudinary` SDK with direct REST API calls:

```javascript
async function uploadToCloudinary(imageData, env) {
  const cloudName = env.CLOUDINARY_CLOUD_NAME;
  const apiKey = env.CLOUDINARY_API_KEY;
  const apiSecret = env.CLOUDINARY_API_SECRET;

  // Generate timestamp and signature
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = 'your-folder-name';

  // Create signature string (parameters in alphabetical order)
  const signatureString = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;

  // Generate SHA1 signature using Web Crypto API
  const encoder = new TextEncoder();
  const data = encoder.encode(signatureString);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  // Prepare form data
  const formData = new FormData();
  formData.append('file', imageData);
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp.toString());
  formData.append('signature', signature);
  formData.append('folder', folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: 'POST', body: formData }
  );

  if (!response.ok) {
    throw new Error(`Cloudinary upload failed: ${response.status}`);
  }

  const result = await response.json();
  return { success: true, url: result.secure_url };
}
```

### 4. Google Gemini API (AI Chat)

Replace `@google/generative-ai` SDK with direct REST API calls:

```javascript
// Streaming response
const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=${env.GOOGLE_GENERATIVE_AI_API_KEY}`;

const geminiResponse = await fetch(geminiUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    contents: messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    })),
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }]
    },
    generationConfig: {
      maxOutputTokens: 500,
      temperature: 0.7,
      topP: 0.95,
      topK: 40
    }
  }),
});
```

**Important:** Use the same model name as Vercel (`gemini-2.5-flash`). Different models have separate rate limits!

---

## Environment Variables

### Configure in Cloudflare Pages Dashboard

1. Go to Cloudflare Pages Dashboard
2. Select your project → Settings → Environment variables
3. Add the following variables:

| Variable | Description |
|----------|-------------|
| `NOTION_TOKEN` | Notion integration token |
| `NOTION_DATABASE_ID` | Notion database ID for ecosystem |
| `PDF_FORM_DATABASE_ID` | Notion database ID for PDF forms |
| `RESEND_API_KEY` | Resend email service API key |
| `RESEND_FROM_EMAIL` | Sender email address |
| `ADMIN_EMAILS` | Comma-separated admin email addresses |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google Gemini API key |

### Accessing Environment Variables

**Vercel:**
```javascript
process.env.NOTION_TOKEN
```

**Cloudflare:**
```javascript
// In onRequest function
export async function onRequest(context) {
  const { env } = context;
  const token = env.NOTION_TOKEN;
}
```

---

## Common Issues and Solutions

### Issue 1: 405 Method Not Allowed

**Cause:** Cloudflare Pages doesn't route to your function.

**Solution:**
- Ensure function is in `functions/api/` directory
- File should export `onRequest` function
- Handle OPTIONS preflight requests

```javascript
if (request.method === 'OPTIONS') {
  return new Response(null, { headers: corsHeaders });
}
```

### Issue 2: 500 Error - "Illegal invocation"

**Cause:** Node.js SDK incompatible with Cloudflare Workers.

**Solution:** Replace SDK with native `fetch` REST API calls.

### Issue 3: 429 Rate Limit Error (Gemini API)

**Cause:**
- Using wrong model name (different models have separate quotas)
- API quota exhausted

**Solution:**
- Use exactly the same model name as your working Vercel setup
- Check model name: SDK uses `gemini-2.5-flash`, ensure REST API uses the same
- Wait for quota to reset (RPM resets after 60 seconds, RPD resets at midnight PT)

### Issue 4: 404 Not Found (Gemini API)

**Cause:** Invalid model name in REST API URL.

**Solution:** Use correct model name format. Valid examples:
- `gemini-2.5-flash` (recommended - matches SDK)
- `gemini-1.5-flash`
- `gemini-pro`

### Issue 5: CORS Errors

**Cause:** Missing CORS headers in response.

**Solution:** Include CORS headers in all responses:

```javascript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Include in every response
return new Response(JSON.stringify(data), {
  headers: { 'Content-Type': 'application/json', ...corsHeaders },
});
```

---

## Testing and Verification

### 1. Local Testing (Optional)

```bash
# Build the project first
npm run build

# Test with Wrangler
npx wrangler pages dev build
```

### 2. Deployment Testing

After pushing to GitHub:

1. Wait for Cloudflare Pages deployment to complete (1-2 minutes)
2. Test each API endpoint:
   - PDF form submission
   - Ecosystem membership form
   - Image upload (if applicable)
   - AI chatbot

### 3. Verification Checklist

- [ ] Form submissions save to Notion database
- [ ] Confirmation emails are received
- [ ] Admin notification emails are received
- [ ] AI chatbot responds correctly
- [ ] No CORS errors in browser console
- [ ] No 405/429/500 errors

---

## Project Files Reference

After migration, your project should have these additional files:

```
functions/
└── api/
    ├── pdf-form-submit.js    # PDF download form → Notion + Resend
    ├── submit-ecosystem.js   # Ecosystem form → Notion + Resend
    ├── upload-image.js       # Image upload → Cloudinary
    └── chat-stream.js        # AI chat → Google Gemini

wrangler.toml                 # Cloudflare Pages configuration
```

---

## Summary

### Key Takeaways

1. **Directory Change:** `/api/` → `/functions/api/`
2. **Function Format:** `module.exports` → `export async function onRequest`
3. **SDK Replacement:** All SDKs → Native `fetch` REST API calls
4. **Environment Variables:** `process.env` → `context.env`
5. **Response Format:** `res.json()` → `new Response()`
6. **CORS Handling:** Must be explicit in every response
7. **Model Consistency:** Use identical model names between platforms

### Migration Effort

| Component | Complexity |
|-----------|------------|
| Simple form submission | Low |
| Email integration | Medium |
| Image upload | Medium |
| AI streaming | High |

---

## Resources

- [Cloudflare Pages Functions Documentation](https://developers.cloudflare.com/pages/functions/)
- [Notion API Reference](https://developers.notion.com/reference)
- [Resend API Documentation](https://resend.com/docs/api-reference)
- [Cloudinary Upload API](https://cloudinary.com/documentation/image_upload_api_reference)
- [Google Gemini API](https://ai.google.dev/gemini-api/docs)

---

*Last updated: January 2025*
*Based on migration experience from this project*
