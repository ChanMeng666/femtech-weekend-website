/**
 * API route handler for PDF form submissions
 * This handler receives form data and stores it in a Notion database
 */
const { Client } = require('@notionhq/client');
const { sendPdfDownloadEmails } = require('./services/email');

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

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

/**
 * PDF form submission handler
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 */
async function handler(req, res) {
  console.log(`${colors.magenta}PDF Form Submission handler called${colors.reset}`);
  console.log(`${colors.magenta}Request URL: ${req.url}${colors.reset}`);
  console.log(`${colors.magenta}Request Method: ${req.method}${colors.reset}`);
  console.log(`${colors.magenta}Request Headers: ${JSON.stringify(req.headers)}${colors.reset}`);
  
  // Log what database we're using
  console.log(`${colors.blue}Using PDF_FORM_DATABASE_ID: ${process.env.PDF_FORM_DATABASE_ID}${colors.reset}`);
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    console.log(`${colors.yellow}Method not allowed: ${req.method}${colors.reset}`);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = req.body;
    console.log(`${colors.green}Received PDF form submission${colors.reset}`);
    console.log(`${colors.cyan}Form data:${colors.reset}`, JSON.stringify(formData, null, 2));

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.country) {
      console.log(`${colors.red}Missing required fields${colors.reset}`);
      return res.status(400).json({ error: 'Required fields: firstName, lastName, email, country' });
    }

    // Check if we have the required environment variables
    if (!process.env.NOTION_TOKEN || !process.env.PDF_FORM_DATABASE_ID) {
      console.log(`${colors.red}Missing required environment variables${colors.reset}`);
      console.log(`NOTION_TOKEN: ${process.env.NOTION_TOKEN ? '✓' : '✗'}`);
      console.log(`PDF_FORM_DATABASE_ID: ${process.env.PDF_FORM_DATABASE_ID ? '✓' : '✗'}`);
      return res.status(500).json({ 
        error: 'Server configuration error',
        message: 'Missing required environment variables'
      });
    }

    // Format the full name from first and last name
    const fullName = `${formData.firstName} ${formData.lastName}`;

    // Create Notion page properties
    const properties = {
      // The Name property is a title field that combines first and last name
      Name: {
        title: [
          {
            text: {
              content: fullName,
            },
          },
        ],
      },
      // First Name and Last Name are rich_text fields
      'First Name': {
        rich_text: [
          {
            text: {
              content: formData.firstName,
            },
          },
        ],
      },
      'Last Name': {
        rich_text: [
          {
            text: {
              content: formData.lastName,
            },
          },
        ],
      },
      // Email is an email field
      Email: {
        email: formData.email,
      },
      // Company is a rich_text field, but optional
      Company: {
        rich_text: [
          {
            text: {
              content: formData.company || '',
            },
          },
        ],
      },
      // Website is a URL field, but optional
      Website: {
        url: formData.website ? (formData.website.startsWith('http') ? formData.website : `https://${formData.website}`) : null,
      },
      // Country is a rich_text field
      Country: {
        rich_text: [
          {
            text: {
              content: formData.country,
            },
          },
        ],
      },
      // PDF URL is a URL field
      'PDF URL': {
        url: formData.pdfUrl || '',
      },
      // Submission Date is a date field
      'Submission Date': {
        date: {
          start: formData.timestamp || new Date().toISOString(),
        },
      },
      // User Agent is a rich_text field
      'User Agent': {
        rich_text: [
          {
            text: {
              content: formData.userAgent || '',
            },
          },
        ],
      },
      // Referrer is a rich_text field
      Referrer: {
        rich_text: [
          {
            text: {
              content: formData.referrer || '',
            },
          },
        ],
      },
    };

    // Prepare the page creation parameters
    const pageParams = {
      parent: {
        database_id: process.env.PDF_FORM_DATABASE_ID,
      },
      properties: properties,
    };

    // Log the request we're about to send to Notion
    console.log(`${colors.cyan}Creating Notion page with params:${colors.reset}`, JSON.stringify(pageParams, null, 2));

    // Create the page in Notion
    const response = await notion.pages.create(pageParams);
    console.log(`${colors.green}Notion page created successfully:${colors.reset}`, response.id);

    // Send confirmation emails (non-blocking)
    // Email failures should not affect the main response
    try {
      const emailResults = await sendPdfDownloadEmails(formData);
      console.log(`${colors.cyan}Email send results:${colors.reset}`, JSON.stringify(emailResults, null, 2));

      if (!emailResults.userEmail.success) {
        console.warn(`${colors.yellow}Failed to send user confirmation email:${colors.reset}`, emailResults.userEmail.error);
      }
      if (!emailResults.adminEmail.success) {
        console.warn(`${colors.yellow}Failed to send admin notification email:${colors.reset}`, emailResults.adminEmail.error);
      }
    } catch (emailError) {
      // Log but don't fail the request
      console.error(`${colors.yellow}Email sending error (non-fatal):${colors.reset}`, emailError.message);
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Form submitted successfully',
      pageId: response.id
    });
  } catch (error) {
    console.error(`${colors.red}Error processing form submission:${colors.reset}`, error);
    return res.status(500).json({ 
      error: 'Error processing form submission', 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

module.exports = handler; 