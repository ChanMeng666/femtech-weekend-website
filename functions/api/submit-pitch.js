/**
 * Cloudflare Pages Function for pitch application submission
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

function getPitchConfirmationEmail({ firstName, companyName }) {
  const safeName = escapeHtml(firstName);
  const safeCompany = escapeHtml(companyName);

  const subject = 'Pitch Application Received - FemTech Weekend Shanghai Summit';

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
          <p style="color:rgba(255,255,255,0.9);margin:10px 0 0;font-size:16px;">Shanghai Summit - Pitch Application</p>
        </td></tr>
        <tr><td style="padding:40px 30px;">
          <h2 style="color:${brandStyles.textColor};margin:0 0 20px;font-size:22px;">Hello ${safeName},</h2>
          <p style="color:${brandStyles.textColor};font-size:16px;line-height:1.6;margin:0 0 20px;">
            Thank you for applying to pitch at the FemTech Weekend Shanghai Summit! We're excited to learn more about <strong>${safeCompany}</strong>.
          </p>
          <div style="background:${brandStyles.backgroundColor};border-radius:8px;padding:20px;margin:30px 0;">
            <h3 style="color:${brandStyles.primaryColor};margin:0 0 15px;font-size:18px;">What Happens Next?</h3>
            <ol style="color:${brandStyles.textColor};font-size:14px;line-height:1.8;margin:0;padding-left:20px;">
              <li>Our selection committee reviews your application</li>
              <li>Shortlisted companies will be notified</li>
              <li>Selected companies confirm their spot</li>
            </ol>
          </div>
          <p style="color:${brandStyles.mutedColor};font-size:14px;line-height:1.6;margin:30px 0 0;">
            Questions? Contact us at <a href="mailto:hello@femtechweekend.com" style="color:${brandStyles.primaryColor};">hello@femtechweekend.com</a>
          </p>
        </td></tr>
        <tr><td style="background:${brandStyles.backgroundColor};padding:30px;text-align:center;border-top:1px solid #e5e7eb;">
          <p style="color:${brandStyles.mutedColor};font-size:12px;margin:0;">FemTech Weekend - Shanghai Summit 2026</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();

  const text = `Hello ${firstName},\n\nThank you for applying to pitch at the FemTech Weekend Shanghai Summit! We're excited to learn more about ${companyName}.\n\nNext steps:\n1. Our selection committee reviews your application\n2. Shortlisted companies will be notified\n3. Selected companies confirm their spot\n\nQuestions? Contact us at hello@femtechweekend.com\n\n---\nFemTech Weekend - Shanghai Summit 2026`;

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
    console.log('[Pitch] Received submission:', JSON.stringify(formData, null, 2));

    if (!env.DATABASE_URL) {
      console.error('[Pitch] Missing DATABASE_URL');
      return new Response(JSON.stringify({ success: false, message: 'Server configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const {
      firstName, lastName, email, linkedin, headquarters, ecosystem,
      companyName, companyWebsite, roleTitle, companyType, healthFocus,
      workAreas, businessModel, annualRevenue, pitchDeckUrl,
    } = formData;

    if (!firstName || !lastName || !email || !companyName) {
      return new Response(JSON.stringify({ success: false, message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const sql = neon(env.DATABASE_URL);
    await sql`INSERT INTO pitch_applications (
      first_name, last_name, email, linkedin, headquarters, ecosystem,
      company_name, company_website, role_title, company_type, health_focus,
      work_areas, business_model, annual_revenue, pitch_deck_url
    ) VALUES (
      ${firstName}, ${lastName}, ${email}, ${linkedin || null}, ${headquarters || null}, ${ecosystem || null},
      ${companyName}, ${companyWebsite || null}, ${roleTitle || null}, ${companyType || null}, ${healthFocus || null},
      ${Array.isArray(workAreas) ? JSON.stringify(workAreas) : workAreas || null},
      ${businessModel || null}, ${annualRevenue || null}, ${pitchDeckUrl || null}
    )`;

    console.log('[Pitch] Inserted into database');

    // Send confirmation email
    try {
      if (env.RESEND_API_KEY) {
        const fromEmail = env.RESEND_FROM_EMAIL || 'noreply@femtechweekend.com';
        const adminEmails = env.ADMIN_EMAILS ? env.ADMIN_EMAILS.split(',').map(e => e.trim()).filter(Boolean) : [];

        const emailContent = getPitchConfirmationEmail(formData);
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
            subject: `[New Pitch Application] ${companyName} - Shanghai Summit`,
            html: `<p>New pitch application from <strong>${escapeHtml(firstName)} ${escapeHtml(lastName)}</strong> (${escapeHtml(companyName)})</p><p>Email: ${escapeHtml(email)}</p>`,
            text: `New pitch application from ${firstName} ${lastName} (${companyName}). Email: ${email}`,
            from: fromEmail,
            replyTo: email,
          });
        }
      }
    } catch (emailError) {
      console.error('[Pitch] Email error (non-fatal):', emailError.message);
    }

    return new Response(JSON.stringify({ success: true, message: 'Pitch application submitted successfully' }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    console.error('[Pitch] Error:', error);
    return new Response(JSON.stringify({ success: false, message: 'Submission failed', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}
