/**
 * API route handler for newsletter subscription
 * This handler adds subscribers to the Resend segment and sends a welcome email
 */
const { getResendClient, sendEmail } = require('./services/email/resend-client');
const { getNewsletterWelcomeEmail } = require('./services/email/templates/newsletter-welcome');

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

// FemTech Weekend Newsletter Segment ID
const NEWSLETTER_SEGMENT_ID = '7ed0369b-5209-4a19-a99b-1decde318083';

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
 * Newsletter subscription handler
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 */
async function handler(req, res) {
  console.log(`${colors.magenta}Newsletter subscription handler called${colors.reset}`);
  console.log(`${colors.magenta}Request URL: ${req.url}${colors.reset}`);
  console.log(`${colors.magenta}Request Method: ${req.method}${colors.reset}`);

  // Only allow POST requests
  if (req.method !== 'POST') {
    console.log(`${colors.yellow}Method not allowed: ${req.method}${colors.reset}`);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;
    console.log(`${colors.cyan}Newsletter subscription request for: ${email}${colors.reset}`);

    // Validate email
    if (!email || !isValidEmail(email)) {
      console.log(`${colors.red}Invalid email provided: ${email}${colors.reset}`);
      return res.status(400).json({ error: 'Valid email is required' });
    }

    // Check if we have the required environment variable
    if (!process.env.RESEND_API_KEY) {
      console.log(`${colors.red}Missing RESEND_API_KEY environment variable${colors.reset}`);
      return res.status(500).json({
        error: 'Server configuration error',
        message: 'Email service not configured'
      });
    }

    const resend = getResendClient();

    if (!resend) {
      console.log(`${colors.red}Failed to initialize Resend client${colors.reset}`);
      return res.status(500).json({
        error: 'Server configuration error',
        message: 'Email service not available'
      });
    }

    // 1. Add contact to Resend segment
    console.log(`${colors.cyan}Adding contact to segment: ${NEWSLETTER_SEGMENT_ID}${colors.reset}`);

    let segmentAddSuccess = false;
    try {
      const { data: segmentData, error: segmentError } = await resend.contacts.segments.add({
        email: email,
        segmentId: NEWSLETTER_SEGMENT_ID,
      });

      if (segmentError) {
        console.error(`${colors.yellow}Segment add error:${colors.reset}`, segmentError);
        // Check if it's because contact already exists - this is not a fatal error
        if (segmentError.message?.includes('already') || segmentError.name === 'validation_error') {
          console.log(`${colors.yellow}Contact may already be subscribed${colors.reset}`);
        }
      } else {
        console.log(`${colors.green}Contact added to segment successfully${colors.reset}`, segmentData);
        segmentAddSuccess = true;
      }
    } catch (segmentErr) {
      console.error(`${colors.yellow}Segment add exception:${colors.reset}`, segmentErr.message);
      // Continue - we still want to send the welcome email if possible
    }

    // 2. Send welcome email
    console.log(`${colors.cyan}Sending welcome email to: ${email}${colors.reset}`);

    const { subject, html, text } = getNewsletterWelcomeEmail(email);
    const emailResult = await sendEmail({
      to: email,
      subject,
      html,
      text
    });

    if (!emailResult.success) {
      console.error(`${colors.yellow}Welcome email failed:${colors.reset}`, emailResult.error);
    } else {
      console.log(`${colors.green}Welcome email sent successfully, id: ${emailResult.data?.id}${colors.reset}`);
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Subscription successful',
      emailSent: emailResult.success,
      segmentAdded: segmentAddSuccess
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
