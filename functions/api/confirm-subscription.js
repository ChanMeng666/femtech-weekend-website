/**
 * Cloudflare Pages Function for confirming newsletter subscription (Double Opt-in Step 2)
 * Verifies the token, adds the contact to Resend segment, and sends welcome email
 */

// Token validity period: 24 hours
const TOKEN_EXPIRY_HOURS = 24;

// FemTech Weekend Newsletter Segment ID
const NEWSLETTER_SEGMENT_ID = '7ed0369b-5209-4a19-a99b-1decde318083';

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
 * Verify a confirmation token using Web Crypto API (Cloudflare Workers compatible)
 * Token format: base64url(email|timestamp|hmac_hex)
 */
async function verifyConfirmationToken(token, secret) {
  try {
    // base64url decode
    const base64 = token.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - base64.length % 4) % 4);
    const decoded = atob(padded);
    const parts = decoded.split('|');

    if (parts.length !== 3) {
      return { valid: false, error: 'Invalid token format' };
    }

    const [email, timestampStr, providedSignature] = parts;
    const timestamp = parseInt(timestampStr, 10);

    if (isNaN(timestamp)) {
      return { valid: false, error: 'Invalid timestamp' };
    }

    // Check if token has expired
    const now = Date.now();
    const expiryMs = TOKEN_EXPIRY_HOURS * 60 * 60 * 1000;
    if (now - timestamp > expiryMs) {
      return { valid: false, error: 'Token has expired. Please subscribe again.' };
    }

    // Verify HMAC signature using Web Crypto API
    const data = `${email}|${timestamp}`;
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
    const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    // Constant-time comparison
    if (providedSignature.length !== expectedSignature.length) {
      return { valid: false, error: 'Invalid signature' };
    }
    let mismatch = 0;
    for (let i = 0; i < providedSignature.length; i++) {
      mismatch |= providedSignature.charCodeAt(i) ^ expectedSignature.charCodeAt(i);
    }
    if (mismatch !== 0) {
      return { valid: false, error: 'Invalid signature' };
    }

    return { valid: true, email };
  } catch (error) {
    console.error('Token verification error:', error.message);
    return { valid: false, error: 'Token verification failed' };
  }
}

/**
 * Generate newsletter welcome email
 */
function getNewsletterWelcomeEmail(email) {
  const safeEmail = escapeHtml(email);

  const subject = `Welcome to FemTech Weekend Newsletter!`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to FemTech Weekend Newsletter</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: ${brandStyles.backgroundColor};">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, ${brandStyles.primaryColor} 0%, ${brandStyles.primaryDark} 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">FemTech Weekend</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Welcome to Our Newsletter!</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: ${brandStyles.textColor}; margin: 0 0 20px; font-size: 22px;">Thank you for subscribing!</h2>
              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                You're now part of our growing community of innovators, entrepreneurs, and advocates dedicated to advancing women's health technology.
              </p>
              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                Here's what you can expect from us:
              </p>
              <div style="background-color: ${brandStyles.backgroundColor}; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <ul style="color: ${brandStyles.textColor}; font-size: 14px; line-height: 2; margin: 0; padding-left: 20px;">
                  <li><strong>Latest Research & Insights</strong> - Stay informed about FemTech trends and market analysis</li>
                  <li><strong>Community Updates</strong> - News from our ecosystem of founders, investors, and partners</li>
                  <li><strong>Event Invitations</strong> - Be the first to know about competitions, hackathons, and networking events</li>
                  <li><strong>Exclusive Resources</strong> - Access to reports, guides, and industry intelligence</li>
                </ul>
              </div>
              <div style="text-align: center; margin: 30px 0;">
                <p style="color: ${brandStyles.textColor}; font-size: 16px; margin: 0 0 15px;">
                  While you wait for our next update, explore what we have to offer:
                </p>
                <a href="https://www.femtechweekend.com/insights" style="display: inline-block; background: linear-gradient(135deg, ${brandStyles.primaryColor} 0%, ${brandStyles.primaryDark} 100%); color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; margin: 5px;">
                  Explore Insights
                </a>
              </div>
              <div style="background-color: ${brandStyles.backgroundColor}; border-radius: 8px; padding: 20px; margin: 30px 0;">
                <h3 style="color: ${brandStyles.primaryColor}; margin: 0 0 15px; font-size: 18px;">Quick Links</h3>
                <ul style="color: ${brandStyles.textColor}; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                  <li><a href="https://www.femtechweekend.com/about-us" style="color: ${brandStyles.primaryColor};">Learn about our mission</a></li>
                  <li><a href="https://www.femtechweekend.com/stories" style="color: ${brandStyles.primaryColor};">Read inspiring stories</a></li>
                  <li><a href="https://www.femtechweekend.com/opinions" style="color: ${brandStyles.primaryColor};">Expert opinions & perspectives</a></li>
                </ul>
              </div>
              <p style="color: ${brandStyles.mutedColor}; font-size: 14px; line-height: 1.6; margin: 30px 0 0;">
                Questions or feedback? We'd love to hear from you at <a href="mailto:hello@femtechweekend.com" style="color: ${brandStyles.primaryColor};">hello@femtechweekend.com</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: ${brandStyles.backgroundColor}; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: ${brandStyles.mutedColor}; font-size: 12px; margin: 0 0 10px;">
                FemTech Weekend - China's First Women's Health Technology Innovation Organization
              </p>
              <p style="color: ${brandStyles.mutedColor}; font-size: 12px; margin: 0 0 15px;">
                <a href="https://www.femtechweekend.com" style="color: ${brandStyles.primaryColor}; text-decoration: none;">femtechweekend.com</a>
              </p>
              <p style="color: ${brandStyles.mutedColor}; font-size: 11px; margin: 0;">
                You're receiving this email because you subscribed at ${safeEmail}.<br>
                If you didn't subscribe, you can safely ignore this email.
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
WELCOME TO FEMTECH WEEKEND NEWSLETTER!

Thank you for subscribing!

You're now part of our growing community of innovators, entrepreneurs, and advocates dedicated to advancing women's health technology.

HERE'S WHAT YOU CAN EXPECT FROM US:

- Latest Research & Insights - Stay informed about FemTech trends and market analysis
- Community Updates - News from our ecosystem of founders, investors, and partners
- Event Invitations - Be the first to know about competitions, hackathons, and networking events
- Exclusive Resources - Access to reports, guides, and industry intelligence

EXPLORE OUR RESOURCES:
- Explore Insights: https://www.femtechweekend.com/insights
- Learn about our mission: https://www.femtechweekend.com/about-us
- Read inspiring stories: https://www.femtechweekend.com/stories
- Expert opinions & perspectives: https://www.femtechweekend.com/opinions

Questions or feedback? We'd love to hear from you at hello@femtechweekend.com

---
FemTech Weekend - China's First Women's Health Technology Innovation Organization
https://www.femtechweekend.com

You're receiving this email because you subscribed at ${email}.
If you didn't subscribe, you can safely ignore this email.
  `.trim();

  return { subject, html, text };
}

/**
 * Add contact to Resend segment via REST API
 */
async function addContactToSegment(apiKey, email, segmentId) {
  // Try creating contact with segment assignment first
  const createResponse = await fetch('https://api.resend.com/contacts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      unsubscribed: false,
      segments: [{ id: segmentId }],
    }),
  });

  if (createResponse.ok) {
    return { success: true };
  }

  const responseText = await createResponse.text();

  // If contact already exists, try adding to segment directly
  if (createResponse.status === 409 || responseText.includes('already exists')) {
    const encodedEmail = encodeURIComponent(email);
    const addResponse = await fetch(
      `https://api.resend.com/contacts/${encodedEmail}/segments/${segmentId}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (addResponse.ok) {
      return { success: true };
    }

    const addError = await addResponse.text();
    return { success: false, error: addError };
  }

  return { success: false, error: responseText };
}

/**
 * Send email via Resend REST API
 */
async function sendEmailViaResend(apiKey, { to, subject, html, text, from }) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `FemTech Weekend <${from}>`,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('[ConfirmSubscription] Email send error:', errorData);
    return { success: false, error: `Resend API error: ${response.status}` };
  }

  const data = await response.json();
  return { success: true, data };
}

/**
 * Main request handler
 */
export async function onRequest(context) {
  const { request, env } = context;

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Allow both GET and POST
  if (request.method !== 'GET' && request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  try {
    // Get token from query params (GET) or body (POST)
    const url = new URL(request.url);
    let token = url.searchParams.get('token');

    if (!token && request.method === 'POST') {
      const body = await request.json();
      token = body.token;
    }

    if (!token) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing confirmation token'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Verify the token
    const secret = env.NEWSLETTER_TOKEN_SECRET || 'femtech-weekend-newsletter-default-secret-change-me';
    const verification = await verifyConfirmationToken(token, secret);

    if (!verification.valid) {
      return new Response(JSON.stringify({
        success: false,
        error: verification.error || 'Invalid or expired confirmation link'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const email = verification.email;
    console.log('[ConfirmSubscription] Token verified for:', email);

    // Check Resend configuration
    if (!env.RESEND_API_KEY) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Email service not configured'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const fromEmail = env.RESEND_FROM_EMAIL || 'noreply@femtechweekend.com';

    // Add contact to segment
    let segmentAddSuccess = false;
    try {
      const segmentResult = await addContactToSegment(env.RESEND_API_KEY, email, NEWSLETTER_SEGMENT_ID);
      segmentAddSuccess = segmentResult.success;
      if (!segmentResult.success) {
        console.warn('[ConfirmSubscription] Segment add failed:', segmentResult.error);
      }
    } catch (segmentErr) {
      console.error('[ConfirmSubscription] Segment add exception:', segmentErr.message);
    }

    // Send welcome email
    const welcomeEmail = getNewsletterWelcomeEmail(email);
    const emailResult = await sendEmailViaResend(env.RESEND_API_KEY, {
      to: email,
      subject: welcomeEmail.subject,
      html: welcomeEmail.html,
      text: welcomeEmail.text,
      from: fromEmail,
    });

    if (!emailResult.success) {
      console.warn('[ConfirmSubscription] Welcome email failed:', emailResult.error);
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Subscription confirmed successfully',
      email: email,
      emailSent: emailResult.success,
      segmentAdded: segmentAddSuccess
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error) {
    console.error('[ConfirmSubscription] Error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Error confirming subscription',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}
