/**
 * Cloudflare Pages Function for batch approving/rejecting applications
 * POST /api/admin/batch-review
 * Protected by ADMIN_API_KEY authentication
 *
 * Request body:
 * {
 *   "type": "pitch" | "programme",
 *   "action": "approved" | "rejected",
 *   "ids": [1, 2, 3]
 * }
 */

import { neon } from '@neondatabase/serverless';

// Brand styles for emails
const brandStyles = {
  primaryColor: '#AA7C52',
  primaryDark: '#996F49',
  backgroundColor: '#faf9f8',
  textColor: '#1a1a1a',
  mutedColor: '#6b7280',
  successColor: '#10b981',
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
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

/**
 * Generate Shanghai Summit rejection email
 */
function getRejectionEmail(data) {
  const safeFirstName = escapeHtml(data.firstName);
  const safeCompanyName = escapeHtml(data.companyName);

  const subject = `Update on Your Shanghai Summit Application`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Update</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: ${brandStyles.backgroundColor};">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, ${brandStyles.primaryColor} 0%, ${brandStyles.primaryDark} 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">FemTech Weekend</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Shanghai Summit 2026</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Hi ${safeFirstName},
              </p>
              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Thank you for your application to Women's Health Capital Spotlight led by Bayer, and for your patience during our review process. We received a high number of submissions, and we are grateful to ${safeCompanyName} for taking the time to apply.
              </p>
              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                After careful review, we regret to share that ${safeCompanyName} has not been selected to progress to the next stage of the process.
              </p>
              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 15px;">
                We nonetheless wanted to highlight a small number of opportunities that may be relevant for you to explore:
              </p>
              <ul style="color: ${brandStyles.textColor}; font-size: 15px; line-height: 1.8; margin: 0 0 20px; padding-left: 20px;">
                <li style="margin-bottom: 8px;">
                  <strong>Bayer Foundation Women Entrepreneurs Award 2026</strong> — open from 2 March 2026 to 13 April 2026.
                </li>
                <li style="margin-bottom: 8px;">
                  <strong>ERIA Health Innovation Spark for Women (HITS4WOMEN)</strong> — currently open, with a deadline of 3 April 2026.
                </li>
                <li style="margin-bottom: 8px;">
                  <strong>Cartier Women's Initiative 2027</strong> — opens 16 April 2026 and closes 16 June 2026.
                </li>
              </ul>
              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                We hope these may be useful as you continue building, and we wish you and ${safeCompanyName} all the best for what lies ahead.
              </p>
              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 30px 0 5px;">
                Warm regards,
              </p>
              <p style="color: ${brandStyles.primaryColor}; font-size: 16px; font-weight: 600; margin: 0;">
                FemTech Weekend
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: ${brandStyles.backgroundColor}; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: ${brandStyles.mutedColor}; font-size: 12px; margin: 0 0 10px;">FemTech Weekend - China's First Women's Health Technology Innovation Organization</p>
              <p style="color: ${brandStyles.mutedColor}; font-size: 12px; margin: 0;"><a href="https://www.femtechweekend.com" style="color: ${brandStyles.primaryColor}; text-decoration: none;">femtechweekend.com</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `Hi ${data.firstName},

Thank you for your application to Women's Health Capital Spotlight led by Bayer, and for your patience during our review process. We received a high number of submissions, and we are grateful to ${data.companyName} for taking the time to apply.

After careful review, we regret to share that ${data.companyName} has not been selected to progress to the next stage of the process.

We nonetheless wanted to highlight a small number of opportunities that may be relevant for you to explore:

- Bayer Foundation Women Entrepreneurs Award 2026 — open from 2 March 2026 to 13 April 2026.
- ERIA Health Innovation Spark for Women (HITS4WOMEN) — currently open, with a deadline of 3 April 2026.
- Cartier Women's Initiative 2027 — opens 16 April 2026 and closes 16 June 2026.

We hope these may be useful as you continue building, and we wish you and ${data.companyName} all the best for what lies ahead.

Warm regards,
FemTech Weekend

---
FemTech Weekend - China's First Women's Health Technology Innovation Organization
https://www.femtechweekend.com
  `.trim();

  return { subject, html, text };
}

/**
 * Generate Shanghai Summit approval email
 */
function getApprovalEmail(data) {
  const safeFirstName = escapeHtml(data.firstName);
  const safeCompanyName = escapeHtml(data.companyName);

  const subject = `You're Invited — Women's Health Capital Spotlight, Shanghai 2026`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Approved</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: ${brandStyles.backgroundColor};">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, ${brandStyles.successColor} 0%, #059669 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">FemTech Weekend</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Shanghai Summit 2026</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Hi ${safeFirstName},
              </p>
              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Thank you for your application and for the time ${safeCompanyName} has invested in engaging with us.
              </p>
              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Following our review, we are pleased to invite ${safeCompanyName} to join the pitch programme within the <strong>Global Women's Health Innovation China Programme 2026</strong> in Shanghai.
              </p>

              <div style="background-color: ${brandStyles.backgroundColor}; border-radius: 8px; padding: 20px; margin: 25px 0;">
                <h3 style="color: ${brandStyles.primaryColor}; margin: 0 0 15px; font-size: 17px;">The pitch package includes:</h3>
                <ul style="color: ${brandStyles.textColor}; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 20px;">
                  <li><strong>Day 1:</strong> Access to the flagship conference</li>
                  <li><strong>Day 2:</strong> Participation in the closed-door pitch session and curated closed-door 1:1 meetings with investors</li>
                </ul>
              </div>

              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Confirmed investor participation currently includes <strong>Bayer</strong>, <strong>Foreground Capital</strong>, and <strong>Fosun Health Capital</strong>, with more to be announced.
              </p>
              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                This is a paid in-person opportunity and would require travel to Shanghai.
              </p>

              <div style="background-color: #f0fdf4; border-left: 4px solid ${brandStyles.successColor}; padding: 15px 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
                <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0;">
                  <strong>The participation fee for this package is £199.</strong><br>
                  This covers both Day 1 conference access &amp; Day 2 pitch participation, and the curated investor 1:1 meetings.<br>
                  Flights and accommodation are not included and would need to be arranged separately by participants.
                </p>
              </div>

              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                For companies that may wish to make a broader visit to China, there is also the option to explore the wider four-day programme. This is a more selective and curated experience designed to help participants access relevant decision-makers and ecosystem stakeholders, including organisations such as GE HealthCare, BD Medical, Raffles Hospital, as well as selected public hospitals in China and other strategic counterparts.
              </p>
              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                This wider format is intended for companies that want to make their time in China more meaningful through deeper access, more informed dialogue, and stakeholder engagement that is often difficult to coordinate independently.
              </p>
              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Should this broader programme be of interest, we would be glad to arrange a short call to discuss whether it would be the right fit for your objectives and worth the additional time and cost.
              </p>
              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                If you would like to move forward with the pitch package, we would be happy to share the next steps.
              </p>
              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 30px 0 5px;">
                Warm regards,
              </p>
              <p style="color: ${brandStyles.primaryColor}; font-size: 16px; font-weight: 600; margin: 0;">
                FemTech Weekend
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: ${brandStyles.backgroundColor}; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: ${brandStyles.mutedColor}; font-size: 12px; margin: 0 0 10px;">FemTech Weekend - China's First Women's Health Technology Innovation Organization</p>
              <p style="color: ${brandStyles.mutedColor}; font-size: 12px; margin: 0;"><a href="https://www.femtechweekend.com" style="color: ${brandStyles.primaryColor}; text-decoration: none;">femtechweekend.com</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `Hi ${data.firstName},

Thank you for your application and for the time ${data.companyName} has invested in engaging with us.

Following our review, we are pleased to invite ${data.companyName} to join the pitch programme within the Global Women's Health Innovation China Programme 2026 in Shanghai.

The pitch package includes:
- Day 1: Access to the flagship conference
- Day 2: Participation in the closed-door pitch session and curated closed-door 1:1 meetings with investors

Confirmed investor participation currently includes Bayer, Foreground Capital, and Fosun Health Capital, with more to be announced.

This is a paid in-person opportunity and would require travel to Shanghai.

The participation fee for this package is £199.
This covers both Day 1 conference access & Day 2 pitch participation, and the curated investor 1:1 meetings.
Flights and accommodation are not included and would need to be arranged separately by participants.

For companies that may wish to make a broader visit to China, there is also the option to explore the wider four-day programme. This is a more selective and curated experience designed to help participants access relevant decision-makers and ecosystem stakeholders, including organisations such as GE HealthCare, BD Medical, Raffles Hospital, as well as selected public hospitals in China and other strategic counterparts.

This wider format is intended for companies that want to make their time in China more meaningful through deeper access, more informed dialogue, and stakeholder engagement that is often difficult to coordinate independently.

Should this broader programme be of interest, we would be glad to arrange a short call to discuss whether it would be the right fit for your objectives and worth the additional time and cost.

If you would like to move forward with the pitch package, we would be happy to share the next steps.

Warm regards,
FemTech Weekend

---
FemTech Weekend - China's First Women's Health Technology Innovation Organization
https://www.femtechweekend.com
  `.trim();

  return { subject, html, text };
}

/**
 * Send batch emails via Resend Batch API
 */
async function sendBatchEmails(apiKey, emails) {
  const response = await fetch('https://api.resend.com/emails/batch', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emails),
  });

  if (!response.ok) {
    const errorData = await response.text();
    return { success: false, error: `Resend API error: ${response.status} - ${errorData}` };
  }

  const data = await response.json();
  return { success: true, data };
}

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  // Validate admin API key
  const adminKey = env.ADMIN_API_KEY;
  const providedKey = request.headers.get('X-Admin-Key') || request.headers.get('x-admin-key');

  if (!adminKey || !providedKey || providedKey !== adminKey) {
    return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  if (!env.DATABASE_URL) {
    return new Response(JSON.stringify({ success: false, error: 'Database not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  if (!env.RESEND_API_KEY) {
    return new Response(JSON.stringify({ success: false, error: 'Email service not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  try {
    const data = await request.json();
    const { type, action, ids } = data;

    // Validate inputs
    if (!type || !['pitch', 'programme'].includes(type)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid type. Must be "pitch" or "programme"'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    if (!action || !['approved', 'rejected'].includes(action)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid action. Must be "approved" or "rejected"'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    if (!Array.isArray(ids) || ids.length === 0) {
      return new Response(JSON.stringify({
        success: false,
        error: 'ids must be a non-empty array'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    if (ids.length > 50) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Maximum 50 applications per batch'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const sql = neon(env.DATABASE_URL);
    const table = type === 'pitch' ? 'pitch_applications' : 'programme_applications';

    // Fetch selected applicants
    let applicants;
    if (type === 'pitch') {
      applicants = await sql`
        SELECT id, first_name, last_name, email, company_name, status
        FROM pitch_applications
        WHERE id = ANY(${ids})
      `;
    } else {
      applicants = await sql`
        SELECT id, first_name, last_name, email, company_name, status
        FROM programme_applications
        WHERE id = ANY(${ids})
      `;
    }

    // Filter to only submitted applications
    const toProcess = applicants.filter(a => a.status === 'submitted');
    const skipped = applicants.length - toProcess.length;

    if (toProcess.length === 0) {
      return new Response(JSON.stringify({
        success: true,
        message: 'No applications to process (all already reviewed)',
        processed: 0,
        skipped: applicants.length,
        notFound: ids.length - applicants.length,
      }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Build email payloads
    const emailPayloads = toProcess.map(applicant => {
      const emailData = {
        firstName: applicant.first_name || 'there',
        companyName: applicant.company_name || 'Your company',
      };

      const emailContent = action === 'approved'
        ? getApprovalEmail(emailData)
        : getRejectionEmail(emailData);

      const fromEmail = action === 'approved'
        ? 'team@femtechweekend.com'
        : 'noreply@femtechweekend.com';

      const payload = {
        from: `FemTech Weekend <${fromEmail}>`,
        to: [applicant.email],
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
      };

      // Only set reply_to for approval emails
      if (action === 'approved') {
        payload.reply_to = 'team@femtechweekend.com';
      }

      return payload;
    });

    // Send batch emails via Resend
    const emailResult = await sendBatchEmails(env.RESEND_API_KEY, emailPayloads);

    if (!emailResult.success) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to send emails',
        details: emailResult.error,
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Update database status for processed applications
    const processedIds = toProcess.map(a => a.id);

    if (type === 'pitch') {
      await sql`
        UPDATE pitch_applications
        SET status = ${action}, status_updated_at = NOW()
        WHERE id = ANY(${processedIds})
      `;
    } else {
      await sql`
        UPDATE programme_applications
        SET status = ${action}, status_updated_at = NOW()
        WHERE id = ANY(${processedIds})
      `;
    }

    return new Response(JSON.stringify({
      success: true,
      message: `Successfully ${action} ${toProcess.length} application(s)`,
      processed: toProcess.length,
      skipped,
      notFound: ids.length - applicants.length,
      emailIds: emailResult.data,
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    console.error('[Admin BatchReview] Error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error',
      message: error.message,
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}
