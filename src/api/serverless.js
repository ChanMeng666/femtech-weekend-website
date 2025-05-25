const serverless = require('serverless-http');
const { createServer } = require('http');
const { parse } = require('url');
const uploadImageHandler = require('./upload-image');
const submitEcosystemHandler = require('./submit-ecosystem');

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
          resolve();
        } catch (error) {
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

// Create a simple Express-like request handler
const app = async (req, res) => {
  try {
    // Parse URL
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;
    
    // Add express-like methods to response
    enhanceResponse(res);
    
    // Parse JSON body if applicable
    await parseJsonBody(req);
    
    // Route requests to appropriate handlers
    if (pathname === '/api/upload-image') {
      return await uploadImageHandler(req, res);
    } else if (pathname === '/api/submit-ecosystem') {
      return await submitEcosystemHandler(req, res);
    } else {
      return res.status(404).json({ error: 'Not found' });
    }
  } catch (error) {
    console.error("Server error:", error);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Internal server error', message: error.message }));
  }
};

// Create HTTP server
const server = createServer(app);

// Export serverless handler
exports.handler = serverless(server);

// For local development
if (process.env.NODE_ENV !== 'production') {
  server.listen(3001, () => {
    console.log('API server running on http://localhost:3001');
  });
} 