/**
 * Cloudflare Pages Function for sending approval/rejection emails
 * Protected by ADMIN_API_KEY authentication
 */

// Brand styles for emails
const brandStyles = {
  primaryColor: '#AA7C52',
  primaryDark: '#996F49',
  backgroundColor: '#faf9f8',
  textColor: '#1a1a1a',
  mutedColor: '#6b7280',
  successColor: '#10b981',
  errorColor: '#ef4444'
};

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
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
 * Generate approval email
 */
function getApprovalEmail(data) {
  const safeName = escapeHtml(data.name);
  const safeCompanyName = escapeHtml(data.companyName);

  const subject = `Welcome to FemTech Weekend Ecosystem!`;

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
              <div style="font-size: 48px; margin-bottom: 10px;">🎉</div>
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Welcome to the Ecosystem!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: ${brandStyles.textColor}; margin: 0 0 20px; font-size: 22px;">Hello ${safeName || 'there'},</h2>
              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Great news! Your application for ${safeCompanyName ? `<strong>${safeCompanyName}</strong>` : 'your company'} to join the FemTech Weekend Ecosystem has been <strong style="color: ${brandStyles.successColor};">approved</strong>!
              </p>
              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                We're thrilled to have you as part of our growing community of women's health innovators in China.
              </p>
              <div style="background-color: ${brandStyles.backgroundColor}; border-radius: 8px; padding: 20px; margin: 30px 0;">
                <h3 style="color: ${brandStyles.primaryColor}; margin: 0 0 15px; font-size: 18px;">What You Get as an Ecosystem Member</h3>
                <ul style="color: ${brandStyles.textColor}; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                  <li>Directory listing on our platform</li>
                  <li>Access to exclusive networking events</li>
                  <li>Early access to research reports and insights</li>
                  <li>Connection with investors and mentors</li>
                  <li>Collaboration opportunities with other members</li>
                </ul>
              </div>
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://www.femtechweekend.com/ecosystem" style="display: inline-block; background: linear-gradient(135deg, ${brandStyles.primaryColor} 0%, ${brandStyles.primaryDark} 100%); color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">View the Ecosystem Directory</a>
              </div>
              <p style="color: ${brandStyles.mutedColor}; font-size: 14px; line-height: 1.6; margin: 30px 0 0;">
                If you have any questions or need assistance, feel free to contact us at <a href="mailto:hello@femtechweekend.com" style="color: ${brandStyles.primaryColor};">hello@femtechweekend.com</a>
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

  const text = `
Hello ${data.name || 'there'},

Great news! Your application for ${data.companyName || 'your company'} to join the FemTech Weekend Ecosystem has been APPROVED!

We're thrilled to have you as part of our growing community of women's health innovators in China.

WHAT YOU GET AS AN ECOSYSTEM MEMBER:
- Directory listing on our platform
- Access to exclusive networking events
- Early access to research reports and insights
- Connection with investors and mentors
- Collaboration opportunities with other members

View the Ecosystem Directory: https://www.femtechweekend.com/ecosystem

If you have any questions or need assistance, feel free to contact us at hello@femtechweekend.com

---
FemTech Weekend - China's First Women's Health Technology Innovation Organization
https://www.femtechweekend.com
  `.trim();

  return { subject, html, text };
}

/**
 * Generate rejection email
 */
function getRejectionEmail(data) {
  const safeName = escapeHtml(data.name);
  const safeCompanyName = escapeHtml(data.companyName);

  const subject = `Update on Your FemTech Weekend Ecosystem Application`;

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
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">FemTech Weekend</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Application Update</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: ${brandStyles.textColor}; margin: 0 0 20px; font-size: 22px;">Hello ${safeName || 'there'},</h2>
              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Thank you for your interest in joining the FemTech Weekend Ecosystem with ${safeCompanyName ? `<strong>${safeCompanyName}</strong>` : 'your company'}.
              </p>
              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                After careful review, we've determined that your application doesn't meet our current criteria at this time. This decision was based on our specific requirements for ecosystem members.
              </p>
              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                We encourage you to continue developing your solution and consider reapplying in the future. Our community is always evolving, and we'd love to see how your company progresses.
              </p>
              <div style="background-color: ${brandStyles.backgroundColor}; border-radius: 8px; padding: 20px; margin: 30px 0;">
                <h3 style="color: ${brandStyles.primaryColor}; margin: 0 0 15px; font-size: 18px;">Stay Connected</h3>
                <ul style="color: ${brandStyles.textColor}; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                  <li><a href="https://www.femtechweekend.com/reports" style="color: ${brandStyles.primaryColor};">Access our research reports</a></li>
                  <li><a href="https://www.femtechweekend.com/competition" style="color: ${brandStyles.primaryColor};">Participate in our competitions</a></li>
                  <li>Follow us on social media for updates</li>
                </ul>
              </div>
              <p style="color: ${brandStyles.mutedColor}; font-size: 14px; line-height: 1.6; margin: 30px 0 0;">
                If you have questions about this decision, feel free to reach out to us at <a href="mailto:hello@femtechweekend.com" style="color: ${brandStyles.primaryColor};">hello@femtechweekend.com</a>
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

  const text = `
Hello ${data.name || 'there'},

Thank you for your interest in joining the FemTech Weekend Ecosystem with ${data.companyName || 'your company'}.

After careful review, we've determined that your application doesn't meet our current criteria at this time. This decision was based on our specific requirements for ecosystem members.

We encourage you to continue developing your solution and consider reapplying in the future. Our community is always evolving, and we'd love to see how your company progresses.

STAY CONNECTED:
- Access our research reports: https://www.femtechweekend.com/reports
- Participate in our competitions: https://www.femtechweekend.com/competition
- Follow us on social media for updates

If you have questions about this decision, feel free to reach out to us at hello@femtechweekend.com

---
FemTech Weekend - China's First Women's Health Technology Innovation Organization
https://www.femtechweekend.com
  `.trim();

  return { subject, html, text };
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
    return { success: false, error: `Resend API error: ${response.status} - ${errorData}` };
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

  // Only allow POST
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

  try {
    const data = await request.json();
    const { email, name, companyName, status } = data;

    if (!email) {
      return new Response(JSON.stringify({ success: false, error: 'Missing required field: email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    if (!status || !['approved', 'rejected'].includes(status)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid status. Must be "approved" or "rejected"'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    if (!env.RESEND_API_KEY) {
      return new Response(JSON.stringify({ success: false, error: 'Email service not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const fromEmail = env.RESEND_FROM_EMAIL || 'noreply@femtechweekend.com';
    const emailContent = status === 'approved'
      ? getApprovalEmail({ name: name || 'Applicant', companyName: companyName || 'Your company' })
      : getRejectionEmail({ name: name || 'Applicant', companyName: companyName || 'Your company' });

    const emailResult = await sendEmailViaResend(env.RESEND_API_KEY, {
      to: email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
      from: fromEmail,
    });

    if (emailResult.success) {
      return new Response(JSON.stringify({
        success: true,
        message: `${status} email sent successfully to ${email}`,
        emailId: emailResult.data?.id
      }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    } else {
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to send email',
        details: emailResult.error
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
  } catch (error) {
    console.error('[Admin SendApproval] Error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}
