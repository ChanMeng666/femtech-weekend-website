// This script loads environment variables and starts the API server
require('dotenv').config({ path: '.env.local' });
const serverless = require('serverless-http');
const http = require('http');
const { parse } = require('url');
const fs = require('fs');
const path = require('path');

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

console.log(`${colors.green}Starting API server...${colors.reset}`);

// Verify all API handlers exist and load them
const API_ROUTES = {
  '/api/upload-image': require('./src/api/upload-image'),
  '/api/submit-ecosystem': require('./src/api/submit-ecosystem'),
  '/api/pdf-form-submit': null, // Will be loaded dynamically
  '/api/chat-stream': require('./src/api/chat-stream')
};

// Check if we have a local API route or a Vercel API route
const pdfFormApiSrcPath = path.join(__dirname, 'src', 'api', 'pdf-form-submit.js');
const pdfFormApiPath = path.join(__dirname, 'api', 'pdf-form-submit', 'index.js');

if (fs.existsSync(pdfFormApiSrcPath)) {
  console.log(`${colors.green}Loading PDF form handler from: ${pdfFormApiSrcPath}${colors.reset}`);
  API_ROUTES['/api/pdf-form-submit'] = require('./src/api/pdf-form-submit');
} else if (fs.existsSync(pdfFormApiPath)) {
  console.log(`${colors.green}Loading PDF form handler from: ${pdfFormApiPath}${colors.reset}`);
  API_ROUTES['/api/pdf-form-submit'] = require('./api/pdf-form-submit');
} else {
  console.error(`${colors.red}ERROR: PDF form handler not found!${colors.reset}`);
  console.error(`${colors.red}Looked in:${colors.reset}`);
  console.error(`${colors.red}- ${pdfFormApiSrcPath}${colors.reset}`);
  console.error(`${colors.red}- ${pdfFormApiPath}${colors.reset}`);
}

// Verify all API routes are loaded
Object.entries(API_ROUTES).forEach(([route, handler]) => {
  if (handler) {
    console.log(`${colors.green}✓ API route registered: ${route}${colors.reset}`);
  } else {
    console.log(`${colors.red}✗ API route missing: ${route}${colors.reset}`);
  }
});

// Simple middleware to parse JSON bodies
const parseJsonBody = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method === 'POST' && req.headers['content-type']?.includes('application/json')) {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          req.body = JSON.parse(body);
          console.log(`${colors.cyan}Parsed request body:${colors.reset}`, JSON.stringify(req.body, null, 2));
          resolve();
        } catch (error) {
          console.error(`${colors.red}Error parsing JSON body:${colors.reset}`, error);
          reject(error);
        }
      });
      req.on('error', reject);
    } else {
      resolve();
    }
  });
};

// Add Express-like response methods
const enhanceResponse = (res) => {
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  
  res.json = (data) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
    return res;
  };
};

// Handle CORS preflight requests and add CORS headers
const handleCORS = (req, res) => {
  // Add CORS headers to all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle OPTIONS preflight requests
  if (req.method === 'OPTIONS') {
    console.log(`${colors.yellow}Handling CORS preflight request for ${req.url}${colors.reset}`);
    res.statusCode = 204; // No Content
    res.end();
    return true; // Indicates that the request has been handled
  }
  return false; // Proceed with normal request handling
};

// Create a simple Express-like request handler
const app = async (req, res) => {
  try {
    // Parse URL
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;
    
    console.log(`${colors.blue}[API Server] ${req.method} ${pathname}${colors.reset}`);
    
    // Handle CORS first
    if (handleCORS(req, res)) {
      return; // Request already handled by CORS handler
    }
    
    // Add express-like methods to response
    enhanceResponse(res);
    
    // Parse JSON body if applicable
    await parseJsonBody(req);
    
    // Check if we have a handler for this route
    const handler = API_ROUTES[pathname];
    
    if (handler) {
      console.log(`${colors.green}Routing to handler for: ${pathname}${colors.reset}`);
      return await handler(req, res);
    } else {
      // Direct file match didn't work - try pattern matching
      // This is for supporting dynamic routes like /api/[id] etc.
      const matchingRoute = Object.keys(API_ROUTES).find(route => {
        // Simple pattern matching - could be improved for complex routes
        const pattern = route.replace(/\/api\/[^/]+/, '/api/.+');
        return new RegExp(`^${pattern}$`).test(pathname);
      });

      if (matchingRoute) {
        console.log(`${colors.green}Found pattern match: ${pathname} -> ${matchingRoute}${colors.reset}`);
        return await API_ROUTES[matchingRoute](req, res);
      }
      
      console.log(`${colors.red}No handler found for ${pathname}${colors.reset}`);
      return res.status(404).json({ 
        error: 'Not found', 
        path: pathname,
        availableRoutes: Object.keys(API_ROUTES)
      });
    }
  } catch (error) {
    console.error(`${colors.red}Server error:${colors.reset}`, error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ 
      error: 'Internal server error', 
      message: error.message,
      stack: error.stack
    }));
  }
};

// Create HTTP server
const server = http.createServer(app);

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`${colors.green}API server started on port ${PORT}${colors.reset}`);
  console.log(`${colors.green}Environment variables:${colors.reset}`);
  console.log(`- NOTION_TOKEN: ${process.env.NOTION_TOKEN ? '✓ Set' : '✗ Not set'}`);
  console.log(`- NOTION_DATABASE_ID: ${process.env.NOTION_DATABASE_ID ? '✓ Set' : '✗ Not set'}`);
  console.log(`- PDF_FORM_DATABASE_ID: ${process.env.PDF_FORM_DATABASE_ID ? '✓ Set' : '✗ Not set'}`);
  console.log(`${colors.yellow}Make sure to run Docusaurus with "npm start" in another terminal window${colors.reset}`);
}); 