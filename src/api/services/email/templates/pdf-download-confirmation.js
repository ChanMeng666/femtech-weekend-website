/**
 * Email templates for PDF download
 */

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
 * Generate PDF download confirmation email for user
 * @param {Object} formData - Form submission data
 */
function getPdfDownloadConfirmationEmail(formData) {
  const { firstName, lastName, pdfUrl } = formData;
  const fullName = `${firstName} ${lastName}`.trim();
  const safeFullName = escapeHtml(fullName);
  const safePdfUrl = escapeHtml(pdfUrl);

  const subject = `Your FemTech Weekend Report Download`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Report Download</title>
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
                Your Report is Ready
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: ${brandStyles.textColor}; margin: 0 0 20px; font-size: 22px;">
                Hello ${safeFullName || 'there'},
              </h2>

              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Thank you for your interest in FemTech Weekend's research insights! Your report download should have opened automatically in your browser.
              </p>

              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                If you missed it or need to access it again, you can download it using the button below:
              </p>

              <!-- Download Button -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="${safePdfUrl}" style="display: inline-block; background: linear-gradient(135deg, ${brandStyles.primaryColor} 0%, ${brandStyles.primaryDark} 100%); color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
                  Download Report Again
                </a>
              </div>

              <!-- More Resources -->
              <div style="background-color: ${brandStyles.backgroundColor}; border-radius: 8px; padding: 20px; margin: 30px 0;">
                <h3 style="color: ${brandStyles.primaryColor}; margin: 0 0 15px; font-size: 18px;">
                  Explore More Resources
                </h3>
                <ul style="color: ${brandStyles.textColor}; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                  <li><a href="https://femtechweekend.com/reports" style="color: ${brandStyles.primaryColor};">View all research reports</a></li>
                  <li><a href="https://femtechweekend.com/ecosystem" style="color: ${brandStyles.primaryColor};">Join our ecosystem</a></li>
                  <li><a href="https://femtechweekend.com/competition" style="color: ${brandStyles.primaryColor};">Learn about our competition</a></li>
                </ul>
              </div>

              <p style="color: ${brandStyles.mutedColor}; font-size: 14px; line-height: 1.6; margin: 30px 0 0;">
                Questions about our research? Contact us at <a href="mailto:hello@femtechweekend.com" style="color: ${brandStyles.primaryColor};">hello@femtechweekend.com</a>
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
Hello ${fullName || 'there'},

Thank you for your interest in FemTech Weekend's research insights! Your report download should have opened automatically in your browser.

If you missed it or need to access it again, you can download it here:
${pdfUrl}

EXPLORE MORE RESOURCES:
- View all research reports: https://femtechweekend.com/reports
- Join our ecosystem: https://femtechweekend.com/ecosystem
- Learn about our competition: https://femtechweekend.com/competition

Questions about our research? Contact us at hello@femtechweekend.com

---
FemTech Weekend - China's First Women's Health Technology Innovation Organization
https://femtechweekend.com
  `.trim();

  return { subject, html, text };
}

/**
 * Generate admin notification email for PDF download
 * @param {Object} formData - Form submission data
 */
function getPdfAdminNotificationEmail(formData) {
  const { firstName, lastName, email, company, country, pdfUrl } = formData;
  const fullName = `${firstName} ${lastName}`.trim();

  const safeFullName = escapeHtml(fullName);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(company);
  const safeCountry = escapeHtml(country);
  const safePdfUrl = escapeHtml(pdfUrl);

  // Extract PDF name from URL
  const pdfName = pdfUrl ? pdfUrl.split('/').pop() || 'Report' : 'Report';
  const safePdfName = escapeHtml(pdfName);

  const subject = `[PDF Download] ${fullName} - ${pdfName}`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New PDF Download</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background-color: #3b82f6; padding: 20px 30px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px;">
                New PDF Download
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; width: 120px;">
                    <strong style="color: ${brandStyles.mutedColor};">Name:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    ${safeFullName || 'Not provided'}
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
                    ${safeCompany || 'Not provided'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: ${brandStyles.mutedColor};">Country:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    ${safeCountry || 'Not provided'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: ${brandStyles.mutedColor};">Report:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <a href="${safePdfUrl}" style="color: ${brandStyles.primaryColor};">${safePdfName}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px; background-color: #f9fafb; text-align: center;">
              <p style="color: ${brandStyles.mutedColor}; font-size: 12px; margin: 0;">
                This is an automated notification from FemTech Weekend Platform.
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
NEW PDF DOWNLOAD

Name: ${fullName || 'Not provided'}
Email: ${email}
Company: ${company || 'Not provided'}
Country: ${country || 'Not provided'}
Report: ${pdfUrl}

---
This is an automated notification from FemTech Weekend Platform.
  `.trim();

  return { subject, html, text };
}

module.exports = {
  getPdfDownloadConfirmationEmail,
  getPdfAdminNotificationEmail
};
