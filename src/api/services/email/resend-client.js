/**
 * Resend email client wrapper
 * Provides a centralized email sending service with error handling
 */
const { Resend } = require('resend');

// Lazy initialization to avoid issues when env vars are not set
let resendClient = null;

function getResendClient() {
  if (!resendClient && process.env.RESEND_API_KEY) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

/**
 * Get admin email addresses from environment variable
 * @returns {string[]} Array of admin email addresses
 */
function getAdminEmails() {
  const adminEmails = process.env.ADMIN_EMAILS || '';
  return adminEmails.split(',').map(email => email.trim()).filter(Boolean);
}

/**
 * Send an email using Resend
 * @param {Object} options - Email options
 * @param {string|string[]} options.to - Recipient email address(es)
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML content
 * @param {string} options.text - Plain text content (fallback)
 * @param {string} [options.from] - Sender email (optional, uses default)
 * @param {string} [options.replyTo] - Reply-to address (optional)
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
async function sendEmail({ to, subject, html, text, from, replyTo }) {
  const client = getResendClient();

  if (!client) {
    console.warn('[Email Service] Resend API key not configured, skipping email send');
    return { success: false, error: 'Email service not configured' };
  }

  const fromEmail = from || process.env.RESEND_FROM_EMAIL || 'noreply@femtechweekend.com';

  try {
    console.log(`[Email Service] Sending email to: ${Array.isArray(to) ? to.join(', ') : to}`);
    console.log(`[Email Service] Subject: ${subject}`);

    const result = await client.emails.send({
      from: `FemTech Weekend <${fromEmail}>`,
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
 * Send multiple emails in parallel
 * @param {Array<Object>} emails - Array of email options
 * @returns {Promise<Array<{success: boolean, data?: any, error?: string}>>}
 */
async function sendEmails(emails) {
  const results = await Promise.allSettled(
    emails.map(email => sendEmail(email))
  );

  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value;
    }
    return { success: false, error: result.reason?.message || 'Unknown error' };
  });
}

module.exports = {
  sendEmail,
  sendEmails,
  getResendClient,
  getAdminEmails
};
