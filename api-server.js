// This script loads environment variables and starts the API server
require('dotenv').config({ path: '.env.local' });
require('./src/api/serverless');

console.log('API server started on port 3001');
console.log('Make sure to run Docusaurus with "npm start" in another terminal window'); 