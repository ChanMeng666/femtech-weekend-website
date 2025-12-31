/**
 * Admin API endpoint for sending approval/rejection emails
 * Protected by ADMIN_API_KEY authentication
 */
const { sendApprovalStatusEmail } = require('../services/email');

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
 * Validate admin API key
 * @param {Object} req - HTTP request object
 * @returns {boolean} True if valid, false otherwise
 */
function validateAdminKey(req) {
  const adminKey = process.env.ADMIN_API_KEY;

  if (!adminKey) {
    console.warn(`${colors.yellow}[Admin API] ADMIN_API_KEY not configured${colors.reset}`);
    return false;
  }

  const providedKey = req.headers['x-admin-key'] || req.headers['X-Admin-Key'];

  if (!providedKey) {
    console.warn(`${colors.yellow}[Admin API] No API key provided in request${colors.reset}`);
    return false;
  }

  return providedKey === adminKey;
}

/**
 * Send approval status email handler
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 */
async function handler(req, res) {
  console.log(`${colors.magenta}[Admin API] Send approval email handler called${colors.reset}`);
  console.log(`${colors.magenta}Request Method: ${req.method}${colors.reset}`);

  // Only allow POST requests
  if (req.method !== 'POST') {
    console.log(`${colors.yellow}Method not allowed: ${req.method}${colors.reset}`);
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  // Validate admin API key
  if (!validateAdminKey(req)) {
    console.log(`${colors.red}[Admin API] Unauthorized request${colors.reset}`);
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  try {
    const data = req.body;
    console.log(`${colors.cyan}[Admin API] Request data:${colors.reset}`, JSON.stringify(data, null, 2));

    // Validate required fields
    const { email, name, companyName, status } = data;

    if (!email) {
      return res.status(400).json({ success: false, error: 'Missing required field: email' });
    }

    if (!status || !['approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Must be "approved" or "rejected"'
      });
    }

    // Send the approval/rejection email
    console.log(`${colors.blue}[Admin API] Sending ${status} email to: ${email}${colors.reset}`);

    const emailResult = await sendApprovalStatusEmail({
      email,
      name: name || 'Applicant',
      companyName: companyName || 'Your company',
      status
    });

    if (emailResult.success) {
      console.log(`${colors.green}[Admin API] Email sent successfully${colors.reset}`);
      return res.status(200).json({
        success: true,
        message: `${status} email sent successfully to ${email}`,
        emailId: emailResult.data?.id
      });
    } else {
      console.error(`${colors.red}[Admin API] Failed to send email:${colors.reset}`, emailResult.error);
      return res.status(500).json({
        success: false,
        error: 'Failed to send email',
        details: emailResult.error
      });
    }
  } catch (error) {
    console.error(`${colors.red}[Admin API] Error:${colors.reset}`, error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
}

module.exports = handler;
