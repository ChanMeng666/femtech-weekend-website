/**
 * A custom Docusaurus plugin to support API routes similar to Next.js API routes
 */
module.exports = function apiRoutesPlugin(context, options) {
  return {
    name: 'docusaurus-api-routes-plugin',
    configureWebpack(config, isServer) {
      // In development, we need to make sure the server.js file is loaded
      if (!isServer && process.env.NODE_ENV === 'development') {
        return {
          devServer: {
            proxy: {
              '/api': {
                target: 'http://localhost:3001',
                secure: false,
                changeOrigin: true,
                logLevel: 'debug',
                headers: {
                  Connection: 'keep-alive'
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