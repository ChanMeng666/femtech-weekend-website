/**
 * API handler for ecosystem form submission
 * This forwards to the main implementation in src/api
 */
const mainHandler = require('../../src/api/submit-ecosystem');

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  console.log('API handler in api/submit-ecosystem called, forwarding to main implementation');
  return mainHandler(req, res);
};
