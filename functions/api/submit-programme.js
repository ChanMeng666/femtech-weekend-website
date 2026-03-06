/**
 * Cloudflare Pages Function for programme application submission
 * Stores data in Neon PostgreSQL and sends confirmation via Resend
 */
import { neon } from '@neondatabase/serverless';

const brandStyles = {
  primaryColor: '#AA7C52',
  primaryDark: '#996F49',
  backgroundColor: '#faf9f8',
  textColor: '#1a1a1a',
  mutedColor: '#6b7280',
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

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
  console.log('[Resend] Email sent:', data.id);
  return { success: true, data };
}

function getProgrammeConfirmationEmail({ firstName }) {
  const safeName = escapeHtml(firstName);

  const subject = 'China Programme Application Received - FemTech Weekend';

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;background-color:${brandStyles.backgroundColor};">
  <table role="presentation" style="width:100%;border-collapse:collapse;">
    <tr><td style="padding:40px 20px;">
      <table role="presentation" style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
        <tr><td style="background:linear-gradient(135deg,${brandStyles.primaryColor} 0%,${brandStyles.primaryDark} 100%);padding:40px 30px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:28px;">FemTech Weekend</h1>
          <p style="color:rgba(255,255,255,0.9);margin:10px 0 0;font-size:16px;">China Programme Application</p>
        </td></tr>
        <tr><td style="padding:40px 30px;">
          <h2 style="color:${brandStyles.textColor};margin:0 0 20px;font-size:22px;">Hello ${safeName},</h2>
          <p style="color:${brandStyles.textColor};font-size:16px;line-height:1.6;margin:0 0 20px;">
            Thank you for applying to the FemTech Weekend China Programme! We're excited about your interest in joining our community.
          </p>
          <div style="background:${brandStyles.backgroundColor};border-radius:8px;padding:20px;margin:30px 0;">
            <h3 style="color:${brandStyles.primaryColor};margin:0 0 15px;font-size:18px;">What Happens Next?</h3>
            <ol style="color:${brandStyles.textColor};font-size:14px;line-height:1.8;margin:0;padding-left:20px;">
              <li>Our team reviews your application</li>
              <li>We'll schedule an intro call to explore your objectives</li>
              <li>Selected participants receive confirmation pack</li>
            </ol>
          </div>
          <p style="color:${brandStyles.mutedColor};font-size:14px;line-height:1.6;margin:30px 0 0;">
            Questions? Contact us at <a href="mailto:hello@femtechweekend.com" style="color:${brandStyles.primaryColor};">hello@femtechweekend.com</a>
          </p>
        </td></tr>
        <tr><td style="background:${brandStyles.backgroundColor};padding:30px;text-align:center;border-top:1px solid #e5e7eb;">
          <p style="color:${brandStyles.mutedColor};font-size:12px;margin:0;">FemTech Weekend - China Programme</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();

  const text = `Hello ${firstName},\n\nThank you for applying to the FemTech Weekend China Programme!\n\nNext steps:\n1. Our team reviews your application\n2. We'll schedule an intro call\n3. Selected participants receive confirmation pack\n\nQuestions? Contact us at hello@femtechweekend.com\n\n---\nFemTech Weekend - China Programme`;

  return { subject, html, text };
}

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, message: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  try {
    const formData = await request.json();
    console.log('[Programme] Received submission:', JSON.stringify(formData, null, 2));

    if (!env.DATABASE_URL) {
      console.error('[Programme] Missing DATABASE_URL');
      return new Response(JSON.stringify({ success: false, message: 'Server configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const {
      firstName, lastName, linkedin, email, whatsapp, basedIn,
      gender, age, university, major, primaryOrganization, jobTitle,
      companyOrProject, industry, whyJoin, cohort, deckUrl,
      referral, consentData,
    } = formData;

    if (!firstName || !lastName || !linkedin || !email) {
      return new Response(JSON.stringify({ success: false, message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const sql = neon(env.DATABASE_URL);
    await sql`INSERT INTO programme_applications (
      first_name, last_name, linkedin, email, whatsapp, based_in,
      gender, age, university, major, primary_organization, job_title,
      company_or_project, industry, why_join, cohort, deck_url,
      referral, consent_data
    ) VALUES (
      ${firstName}, ${lastName}, ${linkedin}, ${email},
      ${whatsapp || null}, ${basedIn || null},
      ${gender || null}, ${age || null}, ${university || null}, ${major || null},
      ${primaryOrganization || null}, ${jobTitle || null},
      ${companyOrProject || null}, ${industry || null},
      ${whyJoin || null},
      ${Array.isArray(cohort) ? JSON.stringify(cohort) : cohort || null},
      ${deckUrl || null},
      ${referral || null}, ${consentData || false}
    )`;

    console.log('[Programme] Inserted into database');

    // Send confirmation email
    try {
      if (env.RESEND_API_KEY) {
        const fromEmail = env.RESEND_FROM_EMAIL || 'noreply@femtechweekend.com';
        const adminEmails = env.ADMIN_EMAILS ? env.ADMIN_EMAILS.split(',').map(e => e.trim()).filter(Boolean) : [];

        const emailContent = getProgrammeConfirmationEmail(formData);
        await sendEmailViaResend(env.RESEND_API_KEY, {
          to: email,
          subject: emailContent.subject,
          html: emailContent.html,
          text: emailContent.text,
          from: fromEmail,
        });

        if (adminEmails.length > 0) {
          await sendEmailViaResend(env.RESEND_API_KEY, {
            to: adminEmails,
            subject: `[New Programme Application] ${firstName} ${lastName} - China Programme`,
            html: `<p>New programme application from <strong>${escapeHtml(firstName)} ${escapeHtml(lastName)}</strong></p><p>Email: ${escapeHtml(email)}</p><p>Organization: ${escapeHtml(primaryOrganization || 'N/A')}</p><p>Cohort: ${Array.isArray(cohort) ? cohort.join(', ') : cohort || 'N/A'}</p>`,
            text: `New programme application from ${firstName} ${lastName}. Email: ${email}. Organization: ${primaryOrganization || 'N/A'}. Cohort: ${Array.isArray(cohort) ? cohort.join(', ') : cohort || 'N/A'}`,
            from: fromEmail,
            replyTo: email,
          });
        }
      }
    } catch (emailError) {
      console.error('[Programme] Email error (non-fatal):', emailError.message);
    }

    return new Response(JSON.stringify({ success: true, message: 'Programme application submitted successfully' }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    console.error('[Programme] Error:', error);
    return new Response(JSON.stringify({ success: false, message: 'Submission failed', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}
