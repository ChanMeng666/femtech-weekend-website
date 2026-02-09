/**
 * API route handler for newsletter subscription (Step 1: Double Opt-in)
 * This handler sends a confirmation email with a verification link
 * The actual subscription happens in confirm-subscription.js after user clicks the link
 */
const { sendEmail } = require('./services/email/resend-client');
const { getNewsletterConfirmationEmail } = require('./services/email/templates/newsletter-confirmation');
const { generateConfirmationToken } = require('./services/crypto/token-utils');

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m'
};

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} Whether the email is valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Verify Cloudflare Turnstile token
 * @param {string} token - Turnstile token from frontend
 * @returns {Promise<boolean>} Whether the token is valid
 */
async function verifyTurnstile(token) {
  if (!token) return false;

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
      }),
    });
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error(`${colors.red}Turnstile verification error:${colors.reset}`, error.message);
    return false;
  }
}

/**
 * Newsletter subscription handler (Double Opt-in Step 1)
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 */
async function handler(req, res) {
  console.log(`${colors.magenta}Newsletter subscription handler called${colors.reset}`);
  console.log(`${colors.magenta}Request Method: ${req.method}${colors.reset}`);

  // Only allow POST requests
  if (req.method !== 'POST') {
    console.log(`${colors.yellow}Method not allowed: ${req.method}${colors.reset}`);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, website, turnstileToken } = req.body;

    // 1. Honeypot check - if filled, it's a bot
    if (website && website.trim() !== '') {
      console.log(`${colors.yellow}[Honeypot] Bot detected, silently returning success${colors.reset}`);
      // Return success to not alert the bot, but don't actually send any email
      return res.status(200).json({
        success: true,
        message: 'Please check your email to confirm subscription',
        requiresConfirmation: true
      });
    }

    // 2. Validate email
    if (!email || !isValidEmail(email)) {
      console.log(`${colors.red}Invalid email provided: ${email}${colors.reset}`);
      return res.status(400).json({ error: 'Valid email is required' });
    }

    console.log(`${colors.cyan}Newsletter subscription request for: ${email}${colors.reset}`);

    // 3. Turnstile verification (if configured)
    if (process.env.TURNSTILE_SECRET_KEY) {
      console.log(`${colors.cyan}Verifying Turnstile token...${colors.reset}`);
      const turnstileValid = await verifyTurnstile(turnstileToken);
      if (!turnstileValid) {
        console.log(`${colors.red}Turnstile verification failed${colors.reset}`);
        return res.status(400).json({ error: 'Security verification failed. Please try again.' });
      }
      console.log(`${colors.green}Turnstile verification passed${colors.reset}`);
    }

    // 4. Check if we have the required environment variable
    if (!process.env.RESEND_API_KEY) {
      console.log(`${colors.red}Missing RESEND_API_KEY environment variable${colors.reset}`);
      return res.status(500).json({
        error: 'Server configuration error',
        message: 'Email service not configured'
      });
    }

    // 5. Generate confirmation token
    const token = generateConfirmationToken(email);
    const baseUrl = process.env.SITE_URL || 'https://www.femtechweekend.com';
    const confirmUrl = `${baseUrl}/confirm-subscription?token=${token}`;

    console.log(`${colors.cyan}Generated confirmation URL for: ${email}${colors.reset}`);

    // 6. Send confirmation email (not welcome email yet)
    const { subject, html, text } = getNewsletterConfirmationEmail(email, confirmUrl);
    const emailResult = await sendEmail({
      to: email,
      subject,
      html,
      text
    });

    if (!emailResult.success) {
      console.error(`${colors.red}Confirmation email failed:${colors.reset}`, emailResult.error);
      return res.status(500).json({
        error: 'Failed to send confirmation email. Please try again.',
        message: emailResult.error
      });
    }

    console.log(`${colors.green}Confirmation email sent successfully, id: ${emailResult.data?.id}${colors.reset}`);

    // Return success response indicating confirmation is required
    return res.status(200).json({
      success: true,
      message: 'Please check your email to confirm subscription',
      requiresConfirmation: true
    });
  } catch (error) {
    console.error(`${colors.red}Error processing subscription:${colors.reset}`, error);
    return res.status(500).json({
      error: 'Error processing subscription',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

module.exports = handler;
