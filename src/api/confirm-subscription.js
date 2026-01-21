/**
 * API route handler for confirming newsletter subscription (Step 2: Double Opt-in)
 * This handler verifies the token, adds the contact to Resend segment, and sends welcome email
 */
const { getResendClient, sendEmail } = require('./services/email/resend-client');
const { getNewsletterWelcomeEmail } = require('./services/email/templates/newsletter-welcome');
const { verifyConfirmationToken } = require('./services/crypto/token-utils');

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
 * Confirm subscription handler (Double Opt-in Step 2)
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 */
async function handler(req, res) {
  console.log(`${colors.magenta}Confirm subscription handler called${colors.reset}`);
  console.log(`${colors.magenta}Request Method: ${req.method}${colors.reset}`);

  // Allow both GET and POST for flexibility
  if (req.method !== 'GET' && req.method !== 'POST') {
    console.log(`${colors.yellow}Method not allowed: ${req.method}${colors.reset}`);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get token from query params (GET) or body (POST)
    const token = req.query?.token || req.body?.token;

    if (!token) {
      console.log(`${colors.red}Missing confirmation token${colors.reset}`);
      return res.status(400).json({
        success: false,
        error: 'Missing confirmation token'
      });
    }

    console.log(`${colors.cyan}Verifying confirmation token...${colors.reset}`);

    // 1. Verify the token
    const verification = verifyConfirmationToken(token);

    if (!verification.valid) {
      console.log(`${colors.red}Token verification failed: ${verification.error}${colors.reset}`);
      return res.status(400).json({
        success: false,
        error: verification.error || 'Invalid or expired confirmation link'
      });
    }

    const email = verification.email;
    console.log(`${colors.green}Token verified for: ${email}${colors.reset}`);

    // 2. Check Resend configuration
    if (!process.env.RESEND_API_KEY) {
      console.log(`${colors.red}Missing RESEND_API_KEY environment variable${colors.reset}`);
      return res.status(500).json({
        success: false,
        error: 'Email service not configured'
      });
    }

    const resend = getResendClient();

    if (!resend) {
      console.log(`${colors.red}Failed to initialize Resend client${colors.reset}`);
      return res.status(500).json({
        success: false,
        error: 'Email service not available'
      });
    }

    // 3. Add contact to Resend segment
    console.log(`${colors.cyan}Adding contact to segment: ${NEWSLETTER_SEGMENT_ID}${colors.reset}`);

    let segmentAddSuccess = false;
    try {
      const { data: segmentData, error: segmentError } = await resend.contacts.segments.add({
        email: email,
        segmentId: NEWSLETTER_SEGMENT_ID,
      });

      if (segmentError) {
        console.error(`${colors.yellow}Segment add error:${colors.reset}`, segmentError);
        // Check if contact already exists - not a fatal error
        if (segmentError.message?.includes('already') || segmentError.name === 'validation_error') {
          console.log(`${colors.yellow}Contact may already be subscribed${colors.reset}`);
          segmentAddSuccess = true; // Consider this a success since they're already in
        }
      } else {
        console.log(`${colors.green}Contact added to segment successfully${colors.reset}`, segmentData);
        segmentAddSuccess = true;
      }
    } catch (segmentErr) {
      console.error(`${colors.yellow}Segment add exception:${colors.reset}`, segmentErr.message);
      // Continue - still send welcome email
    }

    // 4. Send welcome email
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
      message: 'Subscription confirmed successfully',
      email: email,
      emailSent: emailResult.success,
      segmentAdded: segmentAddSuccess
    });
  } catch (error) {
    console.error(`${colors.red}Error confirming subscription:${colors.reset}`, error);
    return res.status(500).json({
      success: false,
      error: 'Error confirming subscription',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

module.exports = handler;
