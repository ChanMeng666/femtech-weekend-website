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

function getPitchConfirmationEmail({ firstName, companyName, companyType, healthFocus, pitchDeckUrl, referenceNumber }) {
  const safeName = escapeHtml(firstName);
  const safeCompany = escapeHtml(companyName);
  const safeRef = escapeHtml(referenceNumber);
  const safeType = escapeHtml(companyType) || '—';
  const safeFocus = escapeHtml(healthFocus) || '—';
  const deckStatus = pitchDeckUrl ? 'Received &#10003;' : 'Not uploaded';

  const subject = `Application ${safeRef} Received — FemTech Weekend Shanghai Summit`;

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
          <p style="color:rgba(255,255,255,0.9);margin:10px 0 0;font-size:16px;">Shanghai Summit — Pitch Application</p>
        </td></tr>
        <tr><td style="padding:40px 30px;">
          <h2 style="color:${brandStyles.textColor};margin:0 0 20px;font-size:22px;">Hello ${safeName},</h2>
          <p style="color:${brandStyles.textColor};font-size:16px;line-height:1.6;margin:0 0 20px;">
            Thank you for applying to pitch at the FemTech Weekend Shanghai Summit! We're excited to learn more about <strong>${safeCompany}</strong>.
          </p>

          <table role="presentation" style="width:100%;border-collapse:collapse;margin:24px 0;background:${brandStyles.backgroundColor};border-radius:8px;">
            <tr><td colspan="2" style="padding:16px 20px 8px;font-size:14px;font-weight:600;color:${brandStyles.primaryColor};border-bottom:1px solid #e5e7eb;">Application Summary</td></tr>
            <tr><td style="padding:10px 20px;font-size:13px;color:${brandStyles.mutedColor};width:140px;">Reference</td><td style="padding:10px 20px;font-size:14px;font-weight:600;color:${brandStyles.textColor};">${safeRef}</td></tr>
            <tr><td style="padding:10px 20px;font-size:13px;color:${brandStyles.mutedColor};">Company</td><td style="padding:10px 20px;font-size:14px;color:${brandStyles.textColor};">${safeCompany}</td></tr>
            <tr><td style="padding:10px 20px;font-size:13px;color:${brandStyles.mutedColor};">Company Type</td><td style="padding:10px 20px;font-size:14px;color:${brandStyles.textColor};">${safeType}</td></tr>
            <tr><td style="padding:10px 20px;font-size:13px;color:${brandStyles.mutedColor};">Health Focus</td><td style="padding:10px 20px;font-size:14px;color:${brandStyles.textColor};">${safeFocus}</td></tr>
            <tr><td style="padding:10px 20px 16px;font-size:13px;color:${brandStyles.mutedColor};">Pitch Deck</td><td style="padding:10px 20px 16px;font-size:14px;color:${brandStyles.textColor};">${deckStatus}</td></tr>
          </table>

          <div style="background:${brandStyles.backgroundColor};border-radius:8px;padding:20px;margin:30px 0;">
            <h3 style="color:${brandStyles.primaryColor};margin:0 0 15px;font-size:18px;">What Happens Next?</h3>
            <ol style="color:${brandStyles.textColor};font-size:14px;line-height:1.8;margin:0;padding-left:20px;">
              <li>Our selection committee reviews your application (1–2 weeks)</li>
              <li>Shortlisted companies receive an invitation to pitch</li>
              <li>Selected companies confirm their spot with a &pound;199 participation fee (includes Day 1 conference pass)</li>
            </ol>
          </div>
          <p style="color:${brandStyles.mutedColor};font-size:14px;line-height:1.6;margin:30px 0 0;">
            Questions? Contact us at <a href="mailto:hello@femtechweekend.com" style="color:${brandStyles.primaryColor};">hello@femtechweekend.com</a>
          </p>
        </td></tr>
        <tr><td style="background:${brandStyles.backgroundColor};padding:30px;text-align:center;border-top:1px solid #e5e7eb;">
          <p style="color:${brandStyles.mutedColor};font-size:12px;margin:0;">FemTech Weekend — Shanghai Summit 2026</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();

  const text = `Hello ${firstName},

Thank you for applying to pitch at the FemTech Weekend Shanghai Summit! We're excited to learn more about ${companyName}.

Application Summary
--------------------
Reference: ${referenceNumber}
Company: ${companyName}
Company Type: ${companyType || '—'}
Health Focus: ${healthFocus || '—'}
Pitch Deck: ${pitchDeckUrl ? 'Received' : 'Not uploaded'}

What Happens Next?
1. Our selection committee reviews your application (1–2 weeks)
2. Shortlisted companies receive an invitation to pitch
3. Selected companies confirm their spot with a £199 participation fee (includes Day 1 conference pass)

Questions? Contact us at hello@femtechweekend.com

---
FemTech Weekend — Shanghai Summit 2026`;

  return { subject, html, text };
}

function joinArray(v) {
  if (Array.isArray(v)) return v.join(', ');
  return v || '';
}

function getAdminNotificationEmail(formData, referenceNumber) {
  const s = (v) => escapeHtml(Array.isArray(v) ? v.join(', ') : v) || '—';
  const workAreas = Array.isArray(formData.workAreas) ? formData.workAreas.join(', ') : (formData.workAreas || '—');
  const deckLink = formData.pitchDeckUrl
    ? `<a href="${escapeHtml(formData.pitchDeckUrl)}" style="color:${brandStyles.primaryColor};">View Pitch Deck</a>`
    : '—';

  const subject = `[New Pitch #${referenceNumber}] ${formData.companyName}`;

  const row = (label, value) =>
    `<tr><td style="padding:8px 16px;font-size:13px;color:${brandStyles.mutedColor};width:180px;border-bottom:1px solid #f3f4f6;">${label}</td><td style="padding:8px 16px;font-size:14px;color:${brandStyles.textColor};border-bottom:1px solid #f3f4f6;">${value}</td></tr>`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;background-color:#f9fafb;">
  <table role="presentation" style="width:100%;border-collapse:collapse;">
    <tr><td style="padding:30px 20px;">
      <table role="presentation" style="max-width:650px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
        <tr><td style="background:${brandStyles.primaryColor};padding:20px 24px;">
          <h2 style="color:#fff;margin:0;font-size:18px;">New Pitch Application</h2>
          <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:14px;">${escapeHtml(referenceNumber)}</p>
        </td></tr>
        <tr><td style="padding:24px;">
          <h3 style="font-size:13px;text-transform:uppercase;letter-spacing:0.05em;color:${brandStyles.primaryColor};margin:0 0 12px;">Contact</h3>
          <table role="presentation" style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            ${row('Name', `${s(formData.firstName)} ${s(formData.lastName)}`)}
            ${row('Email', s(formData.email))}
            ${row('LinkedIn', s(formData.linkedin))}
            ${row('Role / Title', s(formData.roleTitle))}
            ${row('Headquarters', s(formData.headquarters))}
          </table>

          <h3 style="font-size:13px;text-transform:uppercase;letter-spacing:0.05em;color:${brandStyles.primaryColor};margin:0 0 12px;">Company</h3>
          <table role="presentation" style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            ${row('Company Name', s(formData.companyName))}
            ${row('Website', s(formData.companyWebsite))}
            ${row('Company Type', s(formData.companyType))}
            ${row('Health Focus', s(formData.healthFocus))}
            ${row('Markets Served', s(formData.marketServed))}
            ${row('Ecosystem', s(formData.ecosystem))}
          </table>

          <h3 style="font-size:13px;text-transform:uppercase;letter-spacing:0.05em;color:${brandStyles.primaryColor};margin:0 0 12px;">Business</h3>
          <table role="presentation" style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            ${row('Business Model', s(formData.businessModel))}
            ${row('Annual Revenue', s(formData.annualRevenue))}
            ${row('Work Areas', escapeHtml(workAreas))}
            ${row('Pitch Deck', deckLink)}
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();

  const text = `New Pitch Application — ${referenceNumber}

Contact: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
LinkedIn: ${formData.linkedin || '—'}
Role: ${formData.roleTitle || '—'}
Headquarters: ${formData.headquarters || '—'}

Company: ${formData.companyName}
Website: ${formData.companyWebsite || '—'}
Type: ${formData.companyType || '—'}
Health Focus: ${formData.healthFocus || '—'}
Markets: ${joinArray(formData.marketServed) || '—'}
Ecosystem: ${joinArray(formData.ecosystem) || '—'}

Business Model: ${formData.businessModel || '—'}
Revenue: ${formData.annualRevenue || '—'}
Work Areas: ${workAreas}
Pitch Deck: ${formData.pitchDeckUrl || '—'}`;

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

    const dbUrl = env.DATABASE_URL;

    const {
      firstName, lastName, email, linkedin, headquarters, ecosystem,
      companyName, companyWebsite, roleTitle, companyType, healthFocus,
      workAreas, businessModel, annualRevenue, pitchDeckUrl, marketServed,
    } = formData;

    if (!firstName || !lastName || !email || !companyName) {
      return new Response(JSON.stringify({ success: false, message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const sql = neon(dbUrl);

    // Duplicate detection
    const existing = await sql`SELECT id FROM pitch_applications WHERE email = ${email} AND company_name = ${companyName}`;
    if (existing.length > 0) {
      return new Response(JSON.stringify({
        success: false,
        message: 'An application for this company has already been submitted with this email address.',
      }), {
        status: 409,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Insert and get the ID back
    const inserted = await sql`INSERT INTO pitch_applications (
      first_name, last_name, email, linkedin, headquarters, ecosystem,
      company_name, company_website, role_title, company_type, health_focus,
      work_areas, business_model, annual_revenue, pitch_deck_url, market_served,
      status
    ) VALUES (
      ${firstName}, ${lastName}, ${email}, ${linkedin || null}, ${headquarters || null},
      ${Array.isArray(ecosystem) ? ecosystem.join(', ') : ecosystem || null},
      ${companyName}, ${companyWebsite || null}, ${roleTitle || null}, ${companyType || null}, ${healthFocus || null},
      ${Array.isArray(workAreas) ? JSON.stringify(workAreas) : workAreas || null},
      ${businessModel || null}, ${annualRevenue || null}, ${pitchDeckUrl || null},
      ${Array.isArray(marketServed) ? marketServed.join(', ') : marketServed || null},
      'submitted'
    ) RETURNING id`;

    const id = inserted[0].id;
    const referenceNumber = `PITCH-2026-${String(id).padStart(4, '0')}`;

    // Update with reference number
    await sql`UPDATE pitch_applications SET reference_number = ${referenceNumber} WHERE id = ${id}`;

    console.log('[Pitch] Inserted into database with ref:', referenceNumber);

    // Send emails
    try {
      if (env.RESEND_API_KEY) {
        const fromEmail = env.RESEND_FROM_EMAIL || 'noreply@femtechweekend.com';
        const adminEmails = [
          'chanftw2025@gmail.com',
          'zhu@femtechweekend.com',
          ...(env.ADMIN_EMAILS ? env.ADMIN_EMAILS.split(',').map(e => e.trim()).filter(Boolean) : []),
        ];

        // Confirmation email to applicant
        const confirmEmail = getPitchConfirmationEmail({ ...formData, referenceNumber });
        await sendEmailViaResend(env.RESEND_API_KEY, {
          to: email,
          subject: confirmEmail.subject,
          html: confirmEmail.html,
          text: confirmEmail.text,
          from: fromEmail,
        });

        // Admin notification
        if (adminEmails.length > 0) {
          const adminEmail = getAdminNotificationEmail(formData, referenceNumber);
          await sendEmailViaResend(env.RESEND_API_KEY, {
            to: adminEmails,
            subject: adminEmail.subject,
            html: adminEmail.html,
            text: adminEmail.text,
            from: fromEmail,
            replyTo: email,
          });
        }
      }
    } catch (emailError) {
      console.error('[Pitch] Email error (non-fatal):', emailError.message);
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Pitch application submitted successfully',
      referenceNumber,
    }), {
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
