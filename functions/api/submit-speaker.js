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

function joinArray(v) {
  if (Array.isArray(v)) return v.join(', ');
  return v || '';
}

function getSpeakerConfirmationEmail({ firstName, companyName, roleTitle, speakingTopics, headshotUrl, referenceNumber }) {
  const safeName = escapeHtml(firstName);
  const safeCompany = escapeHtml(companyName);
  const safeRef = escapeHtml(referenceNumber);
  const safeRole = escapeHtml(roleTitle) || '—';
  const safeTopics = escapeHtml(joinArray(speakingTopics)) || '—';
  const headshotStatus = headshotUrl ? 'Uploaded &#10003;' : 'Not uploaded';

  const subject = `Application ${safeRef} Received — FemTech Weekend Shanghai Summit Speaker`;

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
          <p style="color:rgba(255,255,255,0.9);margin:10px 0 0;font-size:16px;">Shanghai Summit — Speaker Application</p>
        </td></tr>
        <tr><td style="padding:40px 30px;">
          <h2 style="color:${brandStyles.textColor};margin:0 0 20px;font-size:22px;">Hello ${safeName},</h2>
          <p style="color:${brandStyles.textColor};font-size:16px;line-height:1.6;margin:0 0 20px;">
            Thank you for your interest in speaking at the FemTech Weekend Shanghai Summit! We're excited to review your profile and explore how you could contribute to the programme.
          </p>

          <table role="presentation" style="width:100%;border-collapse:collapse;margin:24px 0;background:${brandStyles.backgroundColor};border-radius:8px;">
            <tr><td colspan="2" style="padding:16px 20px 8px;font-size:14px;font-weight:600;color:${brandStyles.primaryColor};border-bottom:1px solid #e5e7eb;">Application Summary</td></tr>
            <tr><td style="padding:10px 20px;font-size:13px;color:${brandStyles.mutedColor};width:140px;">Reference</td><td style="padding:10px 20px;font-size:14px;font-weight:600;color:${brandStyles.textColor};">${safeRef}</td></tr>
            <tr><td style="padding:10px 20px;font-size:13px;color:${brandStyles.mutedColor};">Name</td><td style="padding:10px 20px;font-size:14px;color:${brandStyles.textColor};">${safeName}</td></tr>
            <tr><td style="padding:10px 20px;font-size:13px;color:${brandStyles.mutedColor};">Company</td><td style="padding:10px 20px;font-size:14px;color:${brandStyles.textColor};">${safeCompany}</td></tr>
            <tr><td style="padding:10px 20px;font-size:13px;color:${brandStyles.mutedColor};">Role</td><td style="padding:10px 20px;font-size:14px;color:${brandStyles.textColor};">${safeRole}</td></tr>
            <tr><td style="padding:10px 20px;font-size:13px;color:${brandStyles.mutedColor};">Topics</td><td style="padding:10px 20px;font-size:14px;color:${brandStyles.textColor};">${safeTopics}</td></tr>
            <tr><td style="padding:10px 20px 16px;font-size:13px;color:${brandStyles.mutedColor};">Headshot</td><td style="padding:10px 20px 16px;font-size:14px;color:${brandStyles.textColor};">${headshotStatus}</td></tr>
          </table>

          <div style="background:${brandStyles.backgroundColor};border-radius:8px;padding:20px;margin:30px 0;">
            <h3 style="color:${brandStyles.primaryColor};margin:0 0 15px;font-size:18px;">What Happens Next?</h3>
            <ol style="color:${brandStyles.textColor};font-size:14px;line-height:1.8;margin:0;padding-left:20px;">
              <li>Our programme committee reviews your profile (1–2 weeks)</li>
              <li>We'll reach out to discuss session format and topics</li>
              <li>Confirmed speakers receive full event access</li>
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

Thank you for your interest in speaking at the FemTech Weekend Shanghai Summit! We're excited to review your profile.

Application Summary
--------------------
Reference: ${referenceNumber}
Name: ${firstName}
Company: ${companyName}
Role: ${roleTitle || '—'}
Topics: ${joinArray(speakingTopics) || '—'}
Headshot: ${headshotUrl ? 'Uploaded' : 'Not uploaded'}

What Happens Next?
1. Our programme committee reviews your profile (1–2 weeks)
2. We'll reach out to discuss session format and topics
3. Confirmed speakers receive full event access

Questions? Contact us at hello@femtechweekend.com

---
FemTech Weekend — Shanghai Summit 2026`;

  return { subject, html, text };
}

function getAdminNotificationEmail(formData, referenceNumber) {
  const s = (v) => escapeHtml(Array.isArray(v) ? v.join(', ') : v) || '—';
  const headshotLink = formData.headshotUrl
    ? `<a href="${escapeHtml(formData.headshotUrl)}" style="color:${brandStyles.primaryColor};">View Headshot</a>`
    : '—';

  const subject = `[New Speaker #${referenceNumber}] ${formData.firstName} ${formData.lastName} (${formData.companyName})`;

  const row = (label, value) =>
    `<tr><td style="padding:8px 16px;font-size:13px;color:${brandStyles.mutedColor};width:180px;border-bottom:1px solid #f3f4f6;">${label}</td><td style="padding:8px 16px;font-size:14px;color:${brandStyles.textColor};border-bottom:1px solid #f3f4f6;">${value}</td></tr>`;

  const sessionFormat = formData.sessionFormat;
  const sessionFormatDisplay = Array.isArray(sessionFormat) ? sessionFormat.join(', ') : sessionFormat || '—';
  const interestedEvents = formData.interestedEvents;
  const interestedEventsDisplay = Array.isArray(interestedEvents) ? interestedEvents.join(', ') : interestedEvents || '—';

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;background-color:#f9fafb;">
  <table role="presentation" style="width:100%;border-collapse:collapse;">
    <tr><td style="padding:30px 20px;">
      <table role="presentation" style="max-width:650px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
        <tr><td style="background:${brandStyles.primaryColor};padding:20px 24px;">
          <h2 style="color:#fff;margin:0;font-size:18px;">New Speaker Application</h2>
          <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:14px;">${escapeHtml(referenceNumber)}</p>
        </td></tr>
        <tr><td style="padding:24px;">
          <h3 style="font-size:13px;text-transform:uppercase;letter-spacing:0.05em;color:${brandStyles.primaryColor};margin:0 0 12px;">Contact</h3>
          <table role="presentation" style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            ${row('Name', `${s(formData.firstName)} ${s(formData.lastName)}`)}
            ${row('Email', s(formData.email))}
            ${row('LinkedIn', s(formData.linkedin))}
            ${row('Company', s(formData.companyName))}
            ${row('Role / Title', s(formData.roleTitle))}
            ${row('Headquarters', s(formData.headquarters))}
            ${row('Headshot', headshotLink)}
            ${row('Bio', s(formData.bio))}
          </table>

          <h3 style="font-size:13px;text-transform:uppercase;letter-spacing:0.05em;color:${brandStyles.primaryColor};margin:0 0 12px;">Speaking</h3>
          <table role="presentation" style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            ${row('Topics', s(formData.speakingTopics))}
            ${row('Preferred Format', escapeHtml(sessionFormatDisplay))}
            ${row('Interested Events', escapeHtml(interestedEventsDisplay))}
            ${row('Previous Experience', s(formData.previousExperience))}
            ${row('Message', s(formData.message))}
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();

  const text = `New Speaker Application — ${referenceNumber}

Contact: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
LinkedIn: ${formData.linkedin || '—'}
Company: ${formData.companyName}
Role: ${formData.roleTitle || '—'}
Headquarters: ${formData.headquarters || '—'}
Headshot: ${formData.headshotUrl || '—'}
Bio: ${formData.bio || '—'}

Topics: ${joinArray(formData.speakingTopics) || '—'}
Preferred Format: ${sessionFormatDisplay}
Interested Events: ${interestedEventsDisplay}
Previous Experience: ${formData.previousExperience || '—'}
Message: ${formData.message || '—'}`;

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
    console.log('[Speaker] Received submission:', JSON.stringify(formData, null, 2));

    if (!env.DATABASE_URL) {
      console.error('[Speaker] Missing DATABASE_URL');
      return new Response(JSON.stringify({ success: false, message: 'Server configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const {
      firstName, lastName, email, linkedin, headquarters,
      companyName, roleTitle, headshotUrl, bio,
      speakingTopics, sessionFormat, interestedEvents,
      previousExperience, message, consentData,
    } = formData;

    if (!firstName || !lastName || !email || !companyName || !roleTitle) {
      return new Response(JSON.stringify({ success: false, message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const sql = neon(env.DATABASE_URL);

    // Duplicate detection
    const existing = await sql`SELECT id FROM speaker_applications WHERE email = ${email} AND company_name = ${companyName}`;
    if (existing.length > 0) {
      return new Response(JSON.stringify({
        success: false,
        message: 'A speaker application for this company has already been submitted with this email address.',
      }), {
        status: 409,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Insert and get the ID back
    const inserted = await sql`INSERT INTO speaker_applications (
      first_name, last_name, email, linkedin, headquarters,
      company_name, role_title, headshot_url, bio,
      speaking_topics, session_format, interested_events,
      previous_experience, message, consent_data, status
    ) VALUES (
      ${firstName}, ${lastName}, ${email}, ${linkedin || null}, ${headquarters || null},
      ${companyName}, ${roleTitle}, ${headshotUrl || null}, ${bio || null},
      ${Array.isArray(speakingTopics) ? speakingTopics.join(', ') : speakingTopics || null},
      ${Array.isArray(sessionFormat) ? JSON.stringify(sessionFormat) : sessionFormat || null},
      ${Array.isArray(interestedEvents) ? JSON.stringify(interestedEvents) : interestedEvents || null},
      ${previousExperience || null}, ${message || null}, ${consentData || false}, 'submitted'
    ) RETURNING id`;

    const id = inserted[0].id;
    const referenceNumber = `SPEAK-2026-${String(id).padStart(4, '0')}`;

    // Update with reference number
    await sql`UPDATE speaker_applications SET reference_number = ${referenceNumber} WHERE id = ${id}`;

    console.log('[Speaker] Inserted into database with ref:', referenceNumber);

    // Prepare data for emails
    const emailFormData = {
      ...formData,
      speakingTopics: Array.isArray(speakingTopics) ? speakingTopics.join(', ') : speakingTopics,
    };

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
        const confirmEmail = getSpeakerConfirmationEmail({ ...emailFormData, referenceNumber });
        await sendEmailViaResend(env.RESEND_API_KEY, {
          to: email,
          subject: confirmEmail.subject,
          html: confirmEmail.html,
          text: confirmEmail.text,
          from: fromEmail,
        });

        // Admin notification
        if (adminEmails.length > 0) {
          const adminEmail = getAdminNotificationEmail(emailFormData, referenceNumber);
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
      console.error('[Speaker] Email error (non-fatal):', emailError.message);
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Speaker application submitted successfully',
      referenceNumber,
    }), {
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
