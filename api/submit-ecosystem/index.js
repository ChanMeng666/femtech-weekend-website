// Import Notion client
const { Client } = require("@notionhq/client");

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    console.log("Method not allowed: " + req.method);
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    console.log("Received form submission");
    
    // Initialize Notion client with the token from environment variables
    const notion = new Client({
      auth: process.env.NOTION_TOKEN,
    });
    
    // Parse request body
    const formData = req.body;
    console.log("Form data received");
    
    // Get form fields
    const {
      name,
      email,
      companyName,
      companyWebsite,
      companyLinkedin,
      companyInstagram,
      founderName,
      founderLinkedin,
      businessDescription,
      businessStage,
      categories,
      additionalInfo,
      logo
    } = formData;

    console.log("Using Notion token:", process.env.NOTION_TOKEN ? "Token exists" : "Token missing");
    console.log("Using Database ID:", process.env.NOTION_DATABASE_ID || "Missing Database ID");

    // Create Notion page in the database
    console.log("Creating Notion page...");
    
    const notionPageParams = {
      parent: {
        database_id: process.env.NOTION_DATABASE_ID,
      },
      properties: {
        // Title field must be of title type in Notion
        Name: {
          title: [
            {
              text: {
                content: name || "No Name Provided",
              },
            },
          ],
        },
        Email: {
          email: email || "",
        },
        "Company Name": {
          rich_text: [
            {
              text: {
                content: companyName || "No Company Name",
              },
            },
          ],
        },
        "Company Website": {
          url: companyWebsite || null,
        },
        "Company LinkedIn": {
          url: companyLinkedin || null,
        },
        "Company Instagram": {
          url: companyInstagram || null,
        },
        "Founder Name": {
          rich_text: [
            {
              text: {
                content: founderName || "No Founder Name",
              },
            },
          ],
        },
        "Founder LinkedIn": {
          url: founderLinkedin || null,
        },
        "Business Description": {
          rich_text: [
            {
              text: {
                content: businessDescription || "",
              },
            },
          ],
        },
        "Business Stage": {
          select: {
            name: businessStage || "Idea",
          },
        },
        "Categories": categories && categories.length > 0 ? {
          multi_select: categories.map(category => ({
            name: category,
          })),
        } : {
          multi_select: [],
        },
        "Additional Info": {
          rich_text: [
            {
              text: {
                content: additionalInfo || "",
              },
            },
          ],
        },
        // Handle Logo field - ensure your Notion database has a "Logo" column of type "Files & media"
        "Logo": logo ? {
          files: [
            {
              name: "Company Logo",
              type: "external",
              external: {
                url: logo
              }
            }
          ]
        } : {
          files: []
        },
      },
    };
    
    const response = await notion.pages.create(notionPageParams);
    console.log("Notion page created successfully:", response.id);

    // Return success response
    return res.status(200).json({ 
      success: true, 
      message: "Form data successfully submitted to Notion" 
    });
  } catch (error) {
    console.error("Error submitting to Notion:", error);
    
    // Return error response
    return res.status(500).json({ 
      success: false, 
      message: "Submission failed", 
      error: error.message
    });
  }
} 