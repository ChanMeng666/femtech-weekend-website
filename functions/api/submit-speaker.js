/**
 * Cloudflare Pages Function for speaker application submission
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
    console.log('[Speaker] Received submission:', JSON.stringify(formData, null, 2));

    if (!env.DATABASE_URL) {
      console.error('[Speaker] Missing DATABASE_URL');
      return new Response(JSON.stringify({ success: false, message: 'Server configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const { firstName, lastName, email, title, company, interestedEvents, message } = formData;

    if (!firstName || !lastName || !email || !title || !company) {
      return new Response(JSON.stringify({ success: false, message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const sql = neon(env.DATABASE_URL);
    await sql`INSERT INTO speaker_applications (
      first_name, last_name, email, title, company, interested_events, message
    ) VALUES (
      ${firstName}, ${lastName}, ${email}, ${title}, ${company},
      ${interestedEvents || null}, ${message || null}
    )`;

    console.log('[Speaker] Inserted into database');

    // Send confirmation email
    try {
      if (env.RESEND_API_KEY) {
        const fromEmail = env.RESEND_FROM_EMAIL || 'noreply@femtechweekend.com';
        const adminEmails = env.ADMIN_EMAILS ? env.ADMIN_EMAILS.split(',').map(e => e.trim()).filter(Boolean) : [];

        const safeName = escapeHtml(firstName);
        const confirmHtml = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;background-color:${brandStyles.backgroundColor};">
  <table role="presentation" style="width:100%;border-collapse:collapse;">
    <tr><td style="padding:40px 20px;">
      <table role="presentation" style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
        <tr><td style="background:linear-gradient(135deg,${brandStyles.primaryColor} 0%,${brandStyles.primaryDark} 100%);padding:40px 30px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:28px;">FemTech Weekend</h1>
          <p style="color:rgba(255,255,255,0.9);margin:10px 0 0;font-size:16px;">Speaker Interest Received</p>
        </td></tr>
        <tr><td style="padding:40px 30px;">
          <h2 style="color:${brandStyles.textColor};margin:0 0 20px;font-size:22px;">Hello ${safeName},</h2>
          <p style="color:${brandStyles.textColor};font-size:16px;line-height:1.6;margin:0 0 20px;">
            Thank you for your interest in speaking at the FemTech Weekend Shanghai Summit! Our team will review your submission and reach out if there's a match.
          </p>
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

        await sendEmailViaResend(env.RESEND_API_KEY, {
          to: email,
          subject: 'Speaker Interest Received - FemTech Weekend Shanghai Summit',
          html: confirmHtml,
          text: `Hello ${firstName},\n\nThank you for your interest in speaking at the FemTech Weekend Shanghai Summit! Our team will review your submission and reach out if there's a match.\n\nQuestions? Contact us at hello@femtechweekend.com`,
          from: fromEmail,
        });

        if (adminEmails.length > 0) {
          await sendEmailViaResend(env.RESEND_API_KEY, {
            to: adminEmails,
            subject: `[Speaker Interest] ${firstName} ${lastName} (${company}) - Shanghai Summit`,
            html: `<p>New speaker interest from <strong>${escapeHtml(firstName)} ${escapeHtml(lastName)}</strong>, ${escapeHtml(title)} at ${escapeHtml(company)}</p><p>Email: ${escapeHtml(email)}</p>${message ? `<p>Message: ${escapeHtml(message)}</p>` : ''}`,
            text: `New speaker interest from ${firstName} ${lastName}, ${title} at ${company}. Email: ${email}${message ? `\nMessage: ${message}` : ''}`,
            from: fromEmail,
            replyTo: email,
          });
        }
      }
    } catch (emailError) {
      console.error('[Speaker] Email error (non-fatal):', emailError.message);
    }

    return new Response(JSON.stringify({ success: true, message: 'Speaker application submitted successfully' }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    console.error('[Speaker] Error:', error);
    return new Response(JSON.stringify({ success: false, message: 'Submission failed', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}
