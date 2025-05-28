/**
 * API handler for PDF form submission
 * This forwards to the main implementation in src/api
 */
const mainHandler = require('../../src/api/pdf-form-submit');

module.exports = async function handler(req, res) {
  console.log('API handler in api/pdf-form-submit called, forwarding to main implementation');
  return mainHandler(req, res);
}; 