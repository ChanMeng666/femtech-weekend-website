/**
 * Cloudflare Pages Function for ecosystem form submission
 * Stores form data in Notion database and sends confirmation emails via Resend
 */

import { Client } from '@notionhq/client';
import { Resend } from 'resend';

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
 * Generate confirmation email for ecosystem applicant
 */
function getEcosystemConfirmationEmail(formData) {
  const { name, companyName } = formData;
  const safeName = escapeHtml(name);
  const safeCompanyName = escapeHtml(companyName);

  const subject = `Application Received - FemTech Weekend Ecosystem`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Received</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: ${brandStyles.backgroundColor};">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, ${brandStyles.primaryColor} 0%, ${brandStyles.primaryDark} 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">FemTech Weekend</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Application Received</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: ${brandStyles.textColor}; margin: 0 0 20px; font-size: 22px;">Hello ${safeName || 'there'},</h2>
              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Thank you for applying to join the FemTech Weekend Ecosystem! We're excited to learn more about ${safeCompanyName ? `<strong>${safeCompanyName}</strong>` : 'your company'} and how we can support your journey in women's health technology innovation.
              </p>
              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Our team will review your application and get back to you within <strong>5-7 business days</strong>.
              </p>
              <div style="background-color: ${brandStyles.backgroundColor}; border-radius: 8px; padding: 20px; margin: 30px 0;">
                <h3 style="color: ${brandStyles.primaryColor}; margin: 0 0 15px; font-size: 18px;">What Happens Next?</h3>
                <ul style="color: ${brandStyles.textColor}; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                  <li>Our team reviews your application</li>
                  <li>We may reach out for additional information</li>
                  <li>You'll receive a decision via email</li>
                  <li>If approved, you'll get access to ecosystem benefits</li>
                </ul>
              </div>
              <p style="color: ${brandStyles.mutedColor}; font-size: 14px; line-height: 1.6; margin: 30px 0 0;">
                If you have any questions, feel free to reply to this email or contact us at <a href="mailto:hello@femtechweekend.com" style="color: ${brandStyles.primaryColor};">hello@femtechweekend.com</a>
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
Hello ${name || 'there'},

Thank you for applying to join the FemTech Weekend Ecosystem! We're excited to learn more about ${companyName || 'your company'} and how we can support your journey in women's health technology innovation.

Our team will review your application and get back to you within 5-7 business days.

WHAT HAPPENS NEXT?
- Our team reviews your application
- We may reach out for additional information
- You'll receive a decision via email
- If approved, you'll get access to ecosystem benefits

If you have any questions, feel free to reply to this email or contact us at hello@femtechweekend.com

---
FemTech Weekend - China's First Women's Health Technology Innovation Organization
https://femtechweekend.com
  `.trim();

  return { subject, html, text };
}

/**
 * Generate admin notification email for new ecosystem application
 */
function getEcosystemAdminNotificationEmail(formData) {
  const {
    name,
    email,
    companyName,
    companyWebsite,
    founderName,
    businessDescription,
    businessStage,
    categories
  } = formData;

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompanyName = escapeHtml(companyName);
  const safeCompanyWebsite = escapeHtml(companyWebsite);
  const safeFounderName = escapeHtml(founderName);
  const safeBusinessDescription = escapeHtml(businessDescription);
  const safeBusinessStage = escapeHtml(businessStage);

  const subject = `[New Application] ${companyName || name} - FemTech Weekend Ecosystem`;

  const categoriesText = Array.isArray(categories) ? categories.map(c => escapeHtml(c)).join(', ') : escapeHtml(categories) || 'Not specified';

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Ecosystem Application</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
          <tr>
            <td style="background-color: ${brandStyles.primaryColor}; padding: 20px 30px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px;">New Ecosystem Application</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; width: 140px;"><strong style="color: ${brandStyles.mutedColor};">Applicant Name:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${safeName || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong style="color: ${brandStyles.mutedColor};">Email:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${safeEmail}" style="color: ${brandStyles.primaryColor};">${safeEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong style="color: ${brandStyles.mutedColor};">Company:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${safeCompanyName || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong style="color: ${brandStyles.mutedColor};">Website:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${safeCompanyWebsite ? `<a href="${safeCompanyWebsite}" style="color: ${brandStyles.primaryColor};">${safeCompanyWebsite}</a>` : 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong style="color: ${brandStyles.mutedColor};">Founder:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${safeFounderName || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong style="color: ${brandStyles.mutedColor};">Stage:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${safeBusinessStage || 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong style="color: ${brandStyles.mutedColor};">Categories:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${categoriesText}</td>
                </tr>
              </table>
              <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-radius: 6px;">
                <strong style="color: ${brandStyles.mutedColor}; display: block; margin-bottom: 10px;">Business Description:</strong>
                <p style="margin: 0; color: ${brandStyles.textColor}; font-size: 14px; line-height: 1.6;">${safeBusinessDescription || 'No description provided'}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 30px; background-color: #f9fafb; text-align: center;">
              <p style="color: ${brandStyles.mutedColor}; font-size: 12px; margin: 0;">
                This is an automated notification from FemTech Weekend Platform.<br>Reply directly to respond to the applicant.
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
NEW ECOSYSTEM APPLICATION

Applicant: ${name || 'Not provided'}
Email: ${email}
Company: ${companyName || 'Not provided'}
Website: ${companyWebsite || 'Not provided'}
Founder: ${founderName || 'Not provided'}
Stage: ${businessStage || 'Not specified'}
Categories: ${Array.isArray(categories) ? categories.join(', ') : categories || 'Not specified'}

BUSINESS DESCRIPTION:
${businessDescription || 'No description provided'}

---
This is an automated notification from FemTech Weekend Platform.
Reply directly to respond to the applicant.
  `.trim();

  return { subject, html, text };
}

/**
 * Send email using Resend
 */
async function sendEmail(resend, { to, subject, html, text, from, replyTo }) {
  if (!resend) {
    console.warn('[Email Service] Resend client not available');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    console.log(`[Email Service] Sending email to: ${Array.isArray(to) ? to.join(', ') : to}`);
    const result = await resend.emails.send({
      from: `FemTech Weekend <${from}>`,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
      ...(replyTo && { reply_to: replyTo })
    });
    console.log(`[Email Service] Email sent successfully, id: ${result.data?.id}`);
    return { success: true, data: result.data };
  } catch (error) {
    console.error('[Email Service] Failed to send email:', error.message);
    return { success: false, error: error.message };
  }
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
    return new Response(JSON.stringify({ success: false, message: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  try {
    const formData = await request.json();
    console.log('[Ecosystem] Received submission:', JSON.stringify(formData, null, 2));

    // Check environment variables
    if (!env.NOTION_TOKEN || !env.NOTION_DATABASE_ID) {
      console.error('[Ecosystem] Missing required environment variables');
      return new Response(JSON.stringify({
        success: false,
        message: 'Server configuration error'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Initialize Notion client
    const notion = new Client({ auth: env.NOTION_TOKEN });

    // Extract form fields
    const {
      name,
      email,
      companyName,
      companyWebsite,
      companyLinkedin,
      companyInstagram,
      founderName,
      founderLinkedin,
      businessDescription,
      businessStage,
      categories,
      additionalInfo,
      logo
    } = formData;

    // Create Notion page properties
    const notionPageParams = {
      parent: { database_id: env.NOTION_DATABASE_ID },
      properties: {
        Name: {
          title: [{ text: { content: name || 'No Name Provided' } }],
        },
        Email: {
          email: email || '',
        },
        'Company Name': {
          rich_text: [{ text: { content: companyName || 'No Company Name' } }],
        },
        'Company Website': {
          url: companyWebsite || null,
        },
        'Company LinkedIn': {
          url: companyLinkedin || null,
        },
        'Company Instagram': {
          url: companyInstagram || null,
        },
        'Founder Name': {
          rich_text: [{ text: { content: founderName || 'No Founder Name' } }],
        },
        'Founder LinkedIn': {
          url: founderLinkedin || null,
        },
        'Business Description': {
          rich_text: [{ text: { content: businessDescription || '' } }],
        },
        'Business Stage': {
          select: { name: businessStage || 'Idea' },
        },
        'Categories': categories && categories.length > 0 ? {
          multi_select: categories.map(category => ({ name: category })),
        } : {
          multi_select: [],
        },
        'Additional Info': {
          rich_text: [{ text: { content: additionalInfo || '' } }],
        },
        'Logo': logo ? {
          files: [{
            name: 'Company Logo',
            type: 'external',
            external: { url: logo }
          }]
        } : {
          files: []
        },
      },
    };

    console.log('[Ecosystem] Creating Notion page...');
    const response = await notion.pages.create(notionPageParams);
    console.log('[Ecosystem] Notion page created:', response.id);

    // Send confirmation emails (non-blocking)
    try {
      if (env.RESEND_API_KEY) {
        const resend = new Resend(env.RESEND_API_KEY);
        const fromEmail = env.RESEND_FROM_EMAIL || 'noreply@femtechweekend.com';
        const adminEmails = env.ADMIN_EMAILS ? env.ADMIN_EMAILS.split(',').map(e => e.trim()).filter(Boolean) : [];

        // Send user confirmation
        const userEmailContent = getEcosystemConfirmationEmail(formData);
        const userResult = await sendEmail(resend, {
          to: email,
          subject: userEmailContent.subject,
          html: userEmailContent.html,
          text: userEmailContent.text,
          from: fromEmail,
        });
        console.log('[Ecosystem] User email result:', userResult.success);

        // Send admin notification
        if (adminEmails.length > 0) {
          const adminEmailContent = getEcosystemAdminNotificationEmail(formData);
          const adminResult = await sendEmail(resend, {
            to: adminEmails,
            subject: adminEmailContent.subject,
            html: adminEmailContent.html,
            text: adminEmailContent.text,
            from: fromEmail,
            replyTo: email,
          });
          console.log('[Ecosystem] Admin email result:', adminResult.success);
        }
      }
    } catch (emailError) {
      console.error('[Ecosystem] Email error (non-fatal):', emailError.message);
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Form data successfully submitted to Notion'
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error) {
    console.error('[Ecosystem] Error:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Submission failed',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}
