/**
 * API handler for confirming newsletter subscription
 * This forwards to the main implementation in src/api
 */
const mainHandler = require('../../src/api/confirm-subscription');

module.exports = async function handler(req, res) {
  console.log('[Vercel API] confirm-subscription handler called');
  console.log('[Vercel API] Method:', req.method);
  console.log('[Vercel API] URL:', req.url);

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    console.log('[Vercel API] Handling OPTIONS preflight');
    return res.status(200).end();
  }

  console.log('[Vercel API] Forwarding to main handler');
  return mainHandler(req, res);
};
