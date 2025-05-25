const { Client } = require("@notionhq/client");

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

module.exports = async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    console.log("Method not allowed: " + req.method);
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    console.log("Received form submission");
    
    // Parse request body
    const formData = req.body;
    console.log("Form data:", JSON.stringify(formData, null, 2));
    
    // Get form fields
    const {
      name,
      email,
      companyName,
      companyWebsite,
      companyLinkedin, // Note: the field name is different from the sample project
      companyInstagram,
      founderName,
      founderLinkedin, // Note: the field name is different from the sample project
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
    
    console.log("Notion page params:", JSON.stringify(notionPageParams, null, 2));
    
    const response = await notion.pages.create(notionPageParams);
    console.log("Notion page created successfully:", response.id);

    // Return success response
    return res.status(200).json({ 
      success: true, 
      message: "Form data successfully submitted to Notion" 
    });
  } catch (error) {
    console.error("Error submitting to Notion:", error);
    console.error("Error details:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
    
    // Return error response
    return res.status(500).json({ 
      success: false, 
      message: "Submission failed", 
      error: error.message,
      stack: error.stack
    });
  }
} 