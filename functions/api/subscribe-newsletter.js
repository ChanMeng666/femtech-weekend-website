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

// FemTech Weekend Newsletter Segment ID
const NEWSLETTER_SEGMENT_ID = '7ed0369b-5209-4a19-a99b-1decde318083';

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
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
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
 * Create contact in Resend with segment assignment
 * Endpoint: POST /contacts
 * See: https://resend.com/docs/api-reference/contacts/create-contact
 *
 * The correct approach is to create the contact with segments array,
 * not add to segment after creation.
 */
async function createContactWithSegment(apiKey, email, segmentId) {
  const url = 'https://api.resend.com/contacts';

  console.log('[Resend] Creating contact with segment assignment');
  console.log('[Resend] Email:', email);
  console.log('[Resend] Segment ID:', segmentId);

  const requestBody = {
    email: email,
    unsubscribed: false,
    segments: [{ id: segmentId }],
  };

  console.log('[Resend] Request body:', JSON.stringify(requestBody));

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  const responseText = await response.text();
  console.log('[Resend] Create contact response status:', response.status);
  console.log('[Resend] Create contact response:', responseText);

  if (!response.ok) {
    // Check if contact already exists (might be 409 Conflict or similar)
    if (response.status === 409 || responseText.includes('already exists')) {
      console.log('[Resend] Contact already exists, trying to update segment...');
      return await addExistingContactToSegment(apiKey, email, segmentId);
    }
    console.error('[Resend] Create contact error:', responseText);
    return { success: false, error: `Resend API error: ${response.status} - ${responseText}` };
  }

  let data = {};
  try {
    data = JSON.parse(responseText);
  } catch (e) {
    // Response might be empty or not JSON
  }

  console.log('[Resend] Contact created successfully with segment');
  return { success: true, data };
}

/**
 * Add existing contact to segment
 * Used when contact already exists and we need to update their segment
 */
async function addExistingContactToSegment(apiKey, email, segmentId) {
  const encodedEmail = encodeURIComponent(email);
  const url = `https://api.resend.com/contacts/${encodedEmail}/segments/${segmentId}`;

  console.log('[Resend] Adding existing contact to segment');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  });

  const responseText = await response.text();
  console.log('[Resend] Add to segment response status:', response.status);
  console.log('[Resend] Add to segment response:', responseText);

  if (!response.ok) {
    console.error('[Resend] Add to segment error:', responseText);
    return { success: false, error: `Resend API error: ${response.status} - ${responseText}` };
  }

  console.log('[Resend] Contact added to segment successfully');
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
      from: `FemTech Weekend <${from}>`,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('[Resend] Email send error:', errorData);
    return { success: false, error: `Resend API error: ${response.status}` };
  }

  const data = await response.json();
  console.log('[Resend] Email sent successfully:', data.id);
  return { success: true, data };
}

/**
 * Main request handler
 */
export async function onRequest(context) {
  const { request, env } = context;

  console.log('[Newsletter] Request received:', request.method, request.url);

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Handle GET for health check
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

    console.log('[Newsletter] Subscription request for:', email);

    // Validate email
    if (!email || !isValidEmail(email)) {
      console.log('[Newsletter] Invalid email:', email);
      return new Response(JSON.stringify({ error: 'Valid email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Check environment variables
    if (!env.RESEND_API_KEY) {
      console.error('[Newsletter] Missing RESEND_API_KEY');
      return new Response(JSON.stringify({
        error: 'Server configuration error',
        message: 'Email service not configured'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const fromEmail = env.RESEND_FROM_EMAIL || 'noreply@femtechweekend.com';

    // 1. Create contact in Resend with segment assignment
    console.log('[Newsletter] Creating contact with segment:', NEWSLETTER_SEGMENT_ID);
    let segmentAddSuccess = false;
    let contactApiResponse = null;
    try {
      const contactResult = await createContactWithSegment(env.RESEND_API_KEY, email, NEWSLETTER_SEGMENT_ID);
      segmentAddSuccess = contactResult.success;
      contactApiResponse = contactResult;
      if (!contactResult.success) {
        console.warn('[Newsletter] Contact creation/segment add failed:', contactResult.error);
      } else {
        console.log('[Newsletter] Contact created/added to segment successfully');
      }
    } catch (segmentError) {
      console.error('[Newsletter] Contact/segment exception:', segmentError.message);
      contactApiResponse = { error: segmentError.message };
    }

    // 2. Send welcome email
    console.log('[Newsletter] Sending welcome email to:', email);
    const welcomeEmail = getNewsletterWelcomeEmail(email);
    const emailResult = await sendEmailViaResend(env.RESEND_API_KEY, {
      to: email,
      subject: welcomeEmail.subject,
      html: welcomeEmail.html,
      text: welcomeEmail.text,
      from: fromEmail,
    });

    if (!emailResult.success) {
      console.warn('[Newsletter] Welcome email failed:', emailResult.error);
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Subscription successful',
      emailSent: emailResult.success,
      segmentAdded: segmentAddSuccess,
      // Debug info - remove in production
      debug: {
        segmentId: NEWSLETTER_SEGMENT_ID,
        emailUsed: email,
        contactApiResponse: contactApiResponse
      }
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
