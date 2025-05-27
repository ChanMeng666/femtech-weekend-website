// Import Cloudinary and dotenv for environment variables
const { v2: cloudinary } = require("cloudinary");
require('dotenv').config({ path: '.env.local' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = async (req, res) => {
  // Set CORS headers to allow cross-origin requests (if needed)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    // Get the Base64 image data from the request body
    const { image } = req.body;
    
    if (!image || !image.startsWith('data:image')) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid image data" 
      });
    }
    
    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        image,
        { 
          folder: "femtech-ecosystem-logos",
          resource_type: "image" 
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });

    // Return the image URL
    return res.status(200).json({
      success: true,
      url: uploadResult.secure_url
    });
  } catch (error) {
    console.error("Image upload failed:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Image upload failed", 
      error: error.message 
    });
  }
} 