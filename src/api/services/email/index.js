/**
 * Email service module
 * Centralizes all email sending logic for the platform
 */
const { sendEmail, sendEmails, getAdminEmails } = require('./resend-client');
const {
  getEcosystemConfirmationEmail,
  getEcosystemAdminNotificationEmail
} = require('./templates/ecosystem-confirmation');
const {
  getPdfDownloadConfirmationEmail,
  getPdfAdminNotificationEmail
} = require('./templates/pdf-download-confirmation');
const {
  getApprovalStatusEmail
} = require('./templates/ecosystem-approval');
const {
  getNewsletterWelcomeEmail
} = require('./templates/newsletter-welcome');

/**
 * Send ecosystem application confirmation to applicant
 * @param {Object} formData - Form submission data
 */
async function sendEcosystemConfirmation(formData) {
  const { html, text, subject } = getEcosystemConfirmationEmail(formData);
  return sendEmail({
    to: formData.email,
    subject,
    html,
    text
  });
}

/**
 * Send notification to admins about new ecosystem application
 * @param {Object} formData - Form submission data
 */
async function sendEcosystemAdminNotification(formData) {
  const adminEmails = getAdminEmails();
  if (adminEmails.length === 0) {
    console.warn('[Email Service] No admin emails configured, skipping admin notification');
    return { success: false, error: 'No admin emails configured' };
  }

  const { html, text, subject } = getEcosystemAdminNotificationEmail(formData);
  return sendEmail({
    to: adminEmails,
    subject,
    html,
    text,
    replyTo: formData.email
  });
}

/**
 * Send PDF download confirmation to user
 * @param {Object} formData - Form submission data
 */
async function sendPdfDownloadConfirmation(formData) {
  const { html, text, subject } = getPdfDownloadConfirmationEmail(formData);
  return sendEmail({
    to: formData.email,
    subject,
    html,
    text
  });
}

/**
 * Send PDF download notification to admins
 * @param {Object} formData - Form submission data
 */
async function sendPdfAdminNotification(formData) {
  const adminEmails = getAdminEmails();
  if (adminEmails.length === 0) {
    console.warn('[Email Service] No admin emails configured, skipping admin notification');
    return { success: false, error: 'No admin emails configured' };
  }

  const { html, text, subject } = getPdfAdminNotificationEmail(formData);
  return sendEmail({
    to: adminEmails,
    subject,
    html,
    text
  });
}

/**
 * Send approval/rejection status email to applicant
 * @param {Object} data - Applicant data with status
 */
async function sendApprovalStatusEmail(data) {
  const { html, text, subject } = getApprovalStatusEmail(data);
  return sendEmail({
    to: data.email,
    subject,
    html,
    text
  });
}

/**
 * Send all ecosystem-related emails (confirmation + admin notification)
 * @param {Object} formData - Form submission data
 * @returns {Promise<{userEmail: Object, adminEmail: Object}>}
 */
async function sendEcosystemEmails(formData) {
  const [userResult, adminResult] = await Promise.allSettled([
    sendEcosystemConfirmation(formData),
    sendEcosystemAdminNotification(formData)
  ]);

  return {
    userEmail: userResult.status === 'fulfilled' ? userResult.value : { success: false, error: userResult.reason?.message || 'Unknown error' },
    adminEmail: adminResult.status === 'fulfilled' ? adminResult.value : { success: false, error: adminResult.reason?.message || 'Unknown error' }
  };
}

/**
 * Send all PDF download-related emails (confirmation + admin notification)
 * @param {Object} formData - Form submission data
 * @returns {Promise<{userEmail: Object, adminEmail: Object}>}
 */
async function sendPdfDownloadEmails(formData) {
  const [userResult, adminResult] = await Promise.allSettled([
    sendPdfDownloadConfirmation(formData),
    sendPdfAdminNotification(formData)
  ]);

  return {
    userEmail: userResult.status === 'fulfilled' ? userResult.value : { success: false, error: userResult.reason?.message || 'Unknown error' },
    adminEmail: adminResult.status === 'fulfilled' ? adminResult.value : { success: false, error: adminResult.reason?.message || 'Unknown error' }
  };
}

module.exports = {
  // Individual email functions
  sendEmail,
  sendEmails,
  sendEcosystemConfirmation,
  sendEcosystemAdminNotification,
  sendPdfDownloadConfirmation,
  sendPdfAdminNotification,
  sendApprovalStatusEmail,

  // Newsletter functions
  getNewsletterWelcomeEmail,

  // Batch email functions
  sendEcosystemEmails,
  sendPdfDownloadEmails
};
