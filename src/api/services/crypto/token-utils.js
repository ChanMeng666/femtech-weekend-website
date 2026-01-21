/**
 * Token utilities for double opt-in email verification
 * Uses HMAC signature for stateless token validation
 */
const crypto = require('crypto');

// Token validity period: 24 hours
const TOKEN_EXPIRY_HOURS = 24;

/**
 * Get HMAC secret from environment variable or use default
 * @returns {string} HMAC secret key
 */
function getHmacSecret() {
  return process.env.NEWSLETTER_TOKEN_SECRET || 'femtech-weekend-newsletter-default-secret-change-me';
}

/**
 * Generate a confirmation token for email verification
 * Format: base64url(email|timestamp|signature)
 * @param {string} email - User's email address
 * @returns {string} URL-safe base64 encoded token
 */
function generateConfirmationToken(email) {
  const timestamp = Date.now();
  const data = `${email}|${timestamp}`;

  const hmac = crypto.createHmac('sha256', getHmacSecret());
  hmac.update(data);
  const signature = hmac.digest('hex');

  const payload = `${data}|${signature}`;
  // Use URL-safe base64 encoding
  return Buffer.from(payload).toString('base64url');
}

/**
 * Verify a confirmation token
 * @param {string} token - Base64url encoded token
 * @returns {{valid: boolean, email?: string, error?: string}}
 */
function verifyConfirmationToken(token) {
  try {
    // Decode token
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const parts = decoded.split('|');

    if (parts.length !== 3) {
      return { valid: false, error: 'Invalid token format' };
    }

    const [email, timestampStr, providedSignature] = parts;
    const timestamp = parseInt(timestampStr, 10);

    // Check timestamp validity
    if (isNaN(timestamp)) {
      return { valid: false, error: 'Invalid timestamp' };
    }

    // Check if token has expired
    const now = Date.now();
    const expiryMs = TOKEN_EXPIRY_HOURS * 60 * 60 * 1000;
    if (now - timestamp > expiryMs) {
      return { valid: false, error: 'Token has expired. Please subscribe again.' };
    }

    // Verify signature
    const data = `${email}|${timestamp}`;
    const hmac = crypto.createHmac('sha256', getHmacSecret());
    hmac.update(data);
    const expectedSignature = hmac.digest('hex');

    // Use timing-safe comparison to prevent timing attacks
    if (!crypto.timingSafeEqual(
      Buffer.from(providedSignature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    )) {
      return { valid: false, error: 'Invalid signature' };
    }

    return { valid: true, email };
  } catch (error) {
    console.error('Token verification error:', error.message);
    return { valid: false, error: 'Token verification failed' };
  }
}

module.exports = {
  generateConfirmationToken,
  verifyConfirmationToken,
  TOKEN_EXPIRY_HOURS
};
