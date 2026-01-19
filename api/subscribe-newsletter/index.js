/**
 * API handler for newsletter subscription
 * This forwards to the main implementation in src/api
 */
const mainHandler = require('../../src/api/subscribe-newsletter');

module.exports = async function handler(req, res) {
  console.log('API handler in api/subscribe-newsletter called, forwarding to main implementation');
  return mainHandler(req, res);
};
