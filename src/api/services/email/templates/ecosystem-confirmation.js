/**
 * Email templates for ecosystem application
 */

// Brand colors and styles
const brandStyles = {
  primaryColor: '#AA7C52',
  primaryDark: '#996F49',
  backgroundColor: '#faf9f8',
  textColor: '#1a1a1a',
  mutedColor: '#6b7280'
};

/**
 * Escape HTML to prevent XSS
 * @param {string} str - String to escape
 * @returns {string} Escaped string
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
 * @param {Object} formData - Form submission data
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
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, ${brandStyles.primaryColor} 0%, ${brandStyles.primaryDark} 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">
                FemTech Weekend
              </h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">
                Application Received
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: ${brandStyles.textColor}; margin: 0 0 20px; font-size: 22px;">
                Hello ${safeName || 'there'},
              </h2>

              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Thank you for applying to join the FemTech Weekend Ecosystem! We're excited to learn more about ${safeCompanyName ? `<strong>${safeCompanyName}</strong>` : 'your company'} and how we can support your journey in women's health technology innovation.
              </p>

              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Our team will review your application and get back to you within <strong>5-7 business days</strong>.
              </p>

              <!-- What to Expect -->
              <div style="background-color: ${brandStyles.backgroundColor}; border-radius: 8px; padding: 20px; margin: 30px 0;">
                <h3 style="color: ${brandStyles.primaryColor}; margin: 0 0 15px; font-size: 18px;">
                  What Happens Next?
                </h3>
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

          <!-- Footer -->
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
 * @param {Object} formData - Form submission data
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
          <!-- Header -->
          <tr>
            <td style="background-color: ${brandStyles.primaryColor}; padding: 20px 30px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px;">
                New Ecosystem Application
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; width: 140px;">
                    <strong style="color: ${brandStyles.mutedColor};">Applicant Name:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    ${safeName || 'Not provided'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: ${brandStyles.mutedColor};">Email:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <a href="mailto:${safeEmail}" style="color: ${brandStyles.primaryColor};">${safeEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: ${brandStyles.mutedColor};">Company:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    ${safeCompanyName || 'Not provided'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: ${brandStyles.mutedColor};">Website:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    ${safeCompanyWebsite ? `<a href="${safeCompanyWebsite}" style="color: ${brandStyles.primaryColor};">${safeCompanyWebsite}</a>` : 'Not provided'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: ${brandStyles.mutedColor};">Founder:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    ${safeFounderName || 'Not provided'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: ${brandStyles.mutedColor};">Stage:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    ${safeBusinessStage || 'Not specified'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: ${brandStyles.mutedColor};">Categories:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    ${categoriesText}
                  </td>
                </tr>
              </table>

              <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-radius: 6px;">
                <strong style="color: ${brandStyles.mutedColor}; display: block; margin-bottom: 10px;">Business Description:</strong>
                <p style="margin: 0; color: ${brandStyles.textColor}; font-size: 14px; line-height: 1.6;">
                  ${safeBusinessDescription || 'No description provided'}
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px; background-color: #f9fafb; text-align: center;">
              <p style="color: ${brandStyles.mutedColor}; font-size: 12px; margin: 0;">
                This is an automated notification from FemTech Weekend Platform.
                <br>Reply directly to respond to the applicant.
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

module.exports = {
  getEcosystemConfirmationEmail,
  getEcosystemAdminNotificationEmail
};
