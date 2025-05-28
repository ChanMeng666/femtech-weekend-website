/**
 * A custom Docusaurus plugin to support API routes similar to Next.js API routes
 */
module.exports = function apiRoutesPlugin(context, options) {
  return {
    name: 'docusaurus-api-routes-plugin',
    configureWebpack(config, isServer) {
      console.log('Configuring API routes plugin...');
      // In development, we need to make sure the server.js file is loaded
      if (!isServer && process.env.NODE_ENV === 'development') {
        console.log('Setting up development proxy for API routes...');
        console.log('API routes will be proxied to: http://localhost:3001');
        
        return {
          devServer: {
            proxy: {
              '/api': {
                target: 'http://localhost:3001',
                secure: false,
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: { '^/api': '/api' }, // Ensure path is preserved exactly
                headers: {
                  Connection: 'keep-alive'
                },
                onProxyReq: (proxyReq, req, res) => {
                  console.log(`[PROXY] Request: ${req.method} ${req.url} → http://localhost:3001${req.url}`);
                  
                  // If this is a POST with JSON body, we need to restream the body
                  if (req.method === 'POST' && req.body) {
                    const bodyData = JSON.stringify(req.body);
                    // Update content-length
                    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
                    // Write body to request
                    proxyReq.write(bodyData);
                    proxyReq.end();
                  }
                },
                onProxyRes: (proxyRes, req, res) => {
                  console.log(`[PROXY] Response: ${proxyRes.statusCode} for ${req.method} ${req.url}`);
                  
                  // Add CORS headers to the response
                  proxyRes.headers['Access-Control-Allow-Origin'] = '*';
                  proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
                  proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type';
                },
                onError: (err, req, res) => {
                  console.error('[PROXY] Error:', err);
                  
                  // Provide a custom error response
                  res.writeHead(500, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                  });
                  res.end(JSON.stringify({ 
                    error: 'Proxy Error', 
                    message: err.message,
                    url: req.url
                  }));
                }
              },
            },
          },
        };
      }
      return {};
    },
    // Make environment variables available in client code if needed
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'script',
            innerHTML: `
              window.ENV = {
                NOTION_DATABASE_ID: '${process.env.NOTION_DATABASE_ID || ''}',
                CLOUDINARY_CLOUD_NAME: '${process.env.CLOUDINARY_CLOUD_NAME || ''}',
              };
            `,
          },
        ],
      };
    },
  };
}; 