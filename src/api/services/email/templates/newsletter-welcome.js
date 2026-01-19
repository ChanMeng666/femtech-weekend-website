/**
 * Email templates for newsletter subscription
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
 * Generate newsletter welcome email for new subscriber
 * @param {string} email - Subscriber's email address
 */
function getNewsletterWelcomeEmail(email) {
  const safeEmail = escapeHtml(email);

  const subject = `Welcome to FemTech Weekend Newsletter!`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to FemTech Weekend Newsletter</title>
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
                Welcome to Our Newsletter!
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: ${brandStyles.textColor}; margin: 0 0 20px; font-size: 22px;">
                Thank you for subscribing!
              </h2>

              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                You're now part of our growing community of innovators, entrepreneurs, and advocates dedicated to advancing women's health technology.
              </p>

              <p style="color: ${brandStyles.textColor}; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                Here's what you can expect from us:
              </p>

              <!-- What to Expect -->
              <div style="background-color: ${brandStyles.backgroundColor}; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <ul style="color: ${brandStyles.textColor}; font-size: 14px; line-height: 2; margin: 0; padding-left: 20px;">
                  <li><strong>Latest Research & Insights</strong> - Stay informed about FemTech trends and market analysis</li>
                  <li><strong>Community Updates</strong> - News from our ecosystem of founders, investors, and partners</li>
                  <li><strong>Event Invitations</strong> - Be the first to know about competitions, hackathons, and networking events</li>
                  <li><strong>Exclusive Resources</strong> - Access to reports, guides, and industry intelligence</li>
                </ul>
              </div>

              <!-- Explore Resources -->
              <div style="text-align: center; margin: 30px 0;">
                <p style="color: ${brandStyles.textColor}; font-size: 16px; margin: 0 0 15px;">
                  While you wait for our next update, explore what we have to offer:
                </p>
                <a href="https://femtechweekend.com/insights" style="display: inline-block; background: linear-gradient(135deg, ${brandStyles.primaryColor} 0%, ${brandStyles.primaryDark} 100%); color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; margin: 5px;">
                  Explore Insights
                </a>
              </div>

              <!-- Quick Links -->
              <div style="background-color: ${brandStyles.backgroundColor}; border-radius: 8px; padding: 20px; margin: 30px 0;">
                <h3 style="color: ${brandStyles.primaryColor}; margin: 0 0 15px; font-size: 18px;">
                  Quick Links
                </h3>
                <ul style="color: ${brandStyles.textColor}; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                  <li><a href="https://femtechweekend.com/about-us" style="color: ${brandStyles.primaryColor};">Learn about our mission</a></li>
                  <li><a href="https://femtechweekend.com/stories" style="color: ${brandStyles.primaryColor};">Read inspiring stories</a></li>
                  <li><a href="https://femtechweekend.com/opinions" style="color: ${brandStyles.primaryColor};">Expert opinions & perspectives</a></li>
                </ul>
              </div>

              <p style="color: ${brandStyles.mutedColor}; font-size: 14px; line-height: 1.6; margin: 30px 0 0;">
                Questions or feedback? We'd love to hear from you at <a href="mailto:hello@femtechweekend.com" style="color: ${brandStyles.primaryColor};">hello@femtechweekend.com</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: ${brandStyles.backgroundColor}; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: ${brandStyles.mutedColor}; font-size: 12px; margin: 0 0 10px;">
                FemTech Weekend - China's First Women's Health Technology Innovation Organization
              </p>
              <p style="color: ${brandStyles.mutedColor}; font-size: 12px; margin: 0 0 15px;">
                <a href="https://femtechweekend.com" style="color: ${brandStyles.primaryColor}; text-decoration: none;">femtechweekend.com</a>
              </p>
              <p style="color: ${brandStyles.mutedColor}; font-size: 11px; margin: 0;">
                You're receiving this email because you subscribed at ${safeEmail}.<br>
                If you didn't subscribe, you can safely ignore this email.
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
WELCOME TO FEMTECH WEEKEND NEWSLETTER!

Thank you for subscribing!

You're now part of our growing community of innovators, entrepreneurs, and advocates dedicated to advancing women's health technology.

HERE'S WHAT YOU CAN EXPECT FROM US:

- Latest Research & Insights - Stay informed about FemTech trends and market analysis
- Community Updates - News from our ecosystem of founders, investors, and partners
- Event Invitations - Be the first to know about competitions, hackathons, and networking events
- Exclusive Resources - Access to reports, guides, and industry intelligence

EXPLORE OUR RESOURCES:
- Explore Insights: https://femtechweekend.com/insights
- Learn about our mission: https://femtechweekend.com/about-us
- Read inspiring stories: https://femtechweekend.com/stories
- Expert opinions & perspectives: https://femtechweekend.com/opinions

Questions or feedback? We'd love to hear from you at hello@femtechweekend.com

---
FemTech Weekend - China's First Women's Health Technology Innovation Organization
https://femtechweekend.com

You're receiving this email because you subscribed at ${email}.
If you didn't subscribe, you can safely ignore this email.
  `.trim();

  return { subject, html, text };
}

module.exports = {
  getNewsletterWelcomeEmail
};
