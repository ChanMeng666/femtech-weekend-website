/**
 * Vercel serverless function for admin approval emails
 * Forwards to the main implementation in src/api
 */
const handler = require('../../../src/api/admin/send-approval');

module.exports = handler;
