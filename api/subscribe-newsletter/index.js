/**
 * API handler for newsletter subscription
 * This forwards to the main implementation in src/api
 */
const mainHandler = require('../../src/api/subscribe-newsletter');

module.exports = async function handler(req, res) {
  console.log('[Vercel API] subscribe-newsletter handler called');
  console.log('[Vercel API] Method:', req.method);
  console.log('[Vercel API] URL:', req.url);
  console.log('[Vercel API] Headers:', JSON.stringify(req.headers));

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    console.log('[Vercel API] Handling OPTIONS preflight');
    return res.status(200).end();
  }

  // For debugging - respond to GET requests
  if (req.method === 'GET') {
    console.log('[Vercel API] GET request received - returning health check');
    return res.status(200).json({ status: 'ok', message: 'Newsletter API is running' });
  }

  console.log('[Vercel API] Forwarding to main handler');
  return mainHandler(req, res);
};
