/**
 * Cloudflare Pages Function for PDF form submission
 * Uses native fetch API for Notion and Resend to avoid SDK compatibility issues
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
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
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
 * Generate PDF download confirmation email for user
 */
function getPdfDownloadConfirmationEmail(formData) {
  const { firstName, lastName, pdfUrl } = formData;
  const fullName = `${firstName} ${lastName}`.trim();
  const safeFullName = escapeHtml(fullName);
  const safePdfUrl = escapeHtml(pdfUrl);

  const subject = `Your FemTech Weekend Report Download`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Report Download</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: ${brandStyles.backgroundColor};">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, ${brandStyles.primaryColor} 0%, ${brandStyles.primaryDark} 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">FemTech Weekend</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Your Report is Ready</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: ${brandStyles.textColor}; margin: 0 0 20px; font-size: 22px;">Hello ${safeFullName || 'there'},</h2>
              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Thank you for your interest in FemTech Weekend's research insights! Your report download should have opened automatically in your browser.
              </p>
              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                If you missed it or need to access it again, you can download it using the button below:
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${safePdfUrl}" style="display: inline-block; background: linear-gradient(135deg, ${brandStyles.primaryColor} 0%, ${brandStyles.primaryDark} 100%); color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
                  Download Report Again
                </a>
              </div>
              <div style="background-color: ${brandStyles.backgroundColor}; border-radius: 8px; padding: 20px; margin: 30px 0;">
                <h3 style="color: ${brandStyles.primaryColor}; margin: 0 0 15px; font-size: 18px;">Explore More Resources</h3>
                <ul style="color: ${brandStyles.textColor}; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                  <li><a href="https://femtechweekend.com/reports" style="color: ${brandStyles.primaryColor};">View all research reports</a></li>
                  <li><a href="https://femtechweekend.com/ecosystem" style="color: ${brandStyles.primaryColor};">Join our ecosystem</a></li>
                  <li><a href="https://femtechweekend.com/competition" style="color: ${brandStyles.primaryColor};">Learn about our competition</a></li>
                </ul>
              </div>
              <p style="color: ${brandStyles.mutedColor}; font-size: 14px; line-height: 1.6; margin: 30px 0 0;">
                Questions about our research? Contact us at <a href="mailto:hello@femtechweekend.com" style="color: ${brandStyles.primaryColor};">hello@femtechweekend.com</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: ${brandStyles.backgroundColor}; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: ${brandStyles.mutedColor}; font-size: 12px; margin: 0 0 10px;">
                FemTech Weekend - China's First Women's Health Technology Innovation Organization
              </p>
              <p style="color: ${brandStyles.mutedColor}; font-size: 12px; margin: 0;">
                <a href="https://femtechweekend.com" style="color: ${brandStyles.primaryColor}; text-decoration: none;">femtechweekend.com</a>
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
Hello ${fullName || 'there'},

Thank you for your interest in FemTech Weekend's research insights! Your report download should have opened automatically in your browser.

If you missed it or need to access it again, you can download it here:
${pdfUrl}

EXPLORE MORE RESOURCES:
- View all research reports: https://femtechweekend.com/reports
- Join our ecosystem: https://femtechweekend.com/ecosystem
- Learn about our competition: https://femtechweekend.com/competition

Questions about our research? Contact us at hello@femtechweekend.com

---
FemTech Weekend - China's First Women's Health Technology Innovation Organization
https://femtechweekend.com
  `.trim();

  return { subject, html, text };
}

/**
 * Generate admin notification email for PDF download
 */
function getPdfAdminNotificationEmail(formData) {
  const { firstName, lastName, email, company, country, pdfUrl } = formData;
  const fullName = `${firstName} ${lastName}`.trim();

  const safeFullName = escapeHtml(fullName);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(company);
  const safeCountry = escapeHtml(country);
  const safePdfUrl = escapeHtml(pdfUrl);

  const pdfName = pdfUrl ? pdfUrl.split('/').pop() || 'Report' : 'Report';
  const safePdfName = escapeHtml(pdfName);

  const subject = `[PDF Download] ${fullName} - ${pdfName}`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New PDF Download</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
          <tr>
            <td style="background-color: #3b82f6; padding: 20px 30px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px;">New PDF Download</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; width: 120px;"><strong style="color: ${brandStyles.mutedColor};">Name:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${safeFullName || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong style="color: ${brandStyles.mutedColor};">Email:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${safeEmail}" style="color: ${brandStyles.primaryColor};">${safeEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong style="color: ${brandStyles.mutedColor};">Company:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${safeCompany || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong style="color: ${brandStyles.mutedColor};">Country:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${safeCountry || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong style="color: ${brandStyles.mutedColor};">Report:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><a href="${safePdfUrl}" style="color: ${brandStyles.primaryColor};">${safePdfName}</a></td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 30px; background-color: #f9fafb; text-align: center;">
              <p style="color: ${brandStyles.mutedColor}; font-size: 12px; margin: 0;">This is an automated notification from FemTech Weekend Platform.</p>
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
NEW PDF DOWNLOAD

Name: ${fullName || 'Not provided'}
Email: ${email}
Company: ${company || 'Not provided'}
Country: ${country || 'Not provided'}
Report: ${pdfUrl}

---
This is an automated notification from FemTech Weekend Platform.
  `.trim();

  return { subject, html, text };
}

/**
 * Create a page in Notion using REST API
 */
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

/**
 * Send email using Resend REST API
 */
async function sendEmailViaResend(apiKey, { to, subject, html, text, from, replyTo }) {
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
      ...(replyTo && { reply_to: replyTo }),
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('[Resend] API error:', errorData);
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
    console.log('[PDF Form] Received submission:', JSON.stringify(formData, null, 2));

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.country) {
      return new Response(JSON.stringify({ error: 'Required fields: firstName, lastName, email, country' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Check environment variables
    if (!env.NOTION_TOKEN || !env.PDF_FORM_DATABASE_ID) {
      console.error('[PDF Form] Missing required environment variables');
      return new Response(JSON.stringify({
        error: 'Server configuration error',
        message: 'Missing required environment variables'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Format the full name
    const fullName = `${formData.firstName} ${formData.lastName}`;

    // Create Notion page properties
    const properties = {
      Name: {
        title: [{ text: { content: fullName } }],
      },
      'First Name': {
        rich_text: [{ text: { content: formData.firstName } }],
      },
      'Last Name': {
        rich_text: [{ text: { content: formData.lastName } }],
      },
      Email: {
        email: formData.email,
      },
      Company: {
        rich_text: [{ text: { content: formData.company || '' } }],
      },
      Website: {
        url: formData.website ? (formData.website.startsWith('http') ? formData.website : `https://${formData.website}`) : null,
      },
      Country: {
        rich_text: [{ text: { content: formData.country } }],
      },
      'PDF URL': {
        url: formData.pdfUrl || null,
      },
      'Submission Date': {
        date: { start: formData.timestamp || new Date().toISOString() },
      },
      'User Agent': {
        rich_text: [{ text: { content: (formData.userAgent || '').substring(0, 2000) } }],
      },
      Referrer: {
        rich_text: [{ text: { content: (formData.referrer || '').substring(0, 2000) } }],
      },
    };

    // Create the page in Notion
    console.log('[PDF Form] Creating Notion page...');
    const notionResponse = await createNotionPage(env.NOTION_TOKEN, env.PDF_FORM_DATABASE_ID, properties);
    console.log('[PDF Form] Notion page created:', notionResponse.id);

    // Send confirmation emails (non-blocking)
    try {
      if (env.RESEND_API_KEY) {
        const fromEmail = env.RESEND_FROM_EMAIL || 'noreply@femtechweekend.com';
        const adminEmails = env.ADMIN_EMAILS ? env.ADMIN_EMAILS.split(',').map(e => e.trim()).filter(Boolean) : [];

        // Send user confirmation
        const userEmail = getPdfDownloadConfirmationEmail(formData);
        const userResult = await sendEmailViaResend(env.RESEND_API_KEY, {
          to: formData.email,
          subject: userEmail.subject,
          html: userEmail.html,
          text: userEmail.text,
          from: fromEmail,
        });
        console.log('[PDF Form] User email result:', userResult.success);

        // Send admin notification
        if (adminEmails.length > 0) {
          const adminEmail = getPdfAdminNotificationEmail(formData);
          const adminResult = await sendEmailViaResend(env.RESEND_API_KEY, {
            to: adminEmails,
            subject: adminEmail.subject,
            html: adminEmail.html,
            text: adminEmail.text,
            from: fromEmail,
            replyTo: formData.email,
          });
          console.log('[PDF Form] Admin email result:', adminResult.success);
        }
      }
    } catch (emailError) {
      console.error('[PDF Form] Email error (non-fatal):', emailError.message);
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Form submitted successfully',
      pageId: notionResponse.id
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error) {
    console.error('[PDF Form] Error:', error);
    return new Response(JSON.stringify({
      error: 'Error processing form submission',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}
