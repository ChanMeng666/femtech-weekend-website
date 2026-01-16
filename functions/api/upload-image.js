/**
 * Cloudflare Pages Function for image upload to Cloudinary
 * Accepts Base64 image data and uploads to Cloudinary
 */

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

/**
 * Upload image to Cloudinary using REST API
 * @param {string} imageData - Base64 encoded image data
 * @param {Object} env - Environment variables
 * @returns {Promise<{success: boolean, url?: string, error?: string}>}
 */
async function uploadToCloudinary(imageData, env) {
  const cloudName = env.CLOUDINARY_CLOUD_NAME;
  const apiKey = env.CLOUDINARY_API_KEY;
  const apiSecret = env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return { success: false, error: 'Cloudinary not configured' };
  }

  // Generate signature for authenticated upload
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = 'femtech-ecosystem-logos';

  // Create signature string (parameters in alphabetical order)
  const signatureString = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;

  // Generate SHA1 signature
  const encoder = new TextEncoder();
  const data = encoder.encode(signatureString);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  // Prepare form data for upload
  const formData = new FormData();
  formData.append('file', imageData);
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp.toString());
  formData.append('signature', signature);
  formData.append('folder', folder);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Cloudinary] Upload failed:', errorText);
      return { success: false, error: `Upload failed: ${response.status}` };
    }

    const result = await response.json();
    console.log('[Cloudinary] Upload successful:', result.secure_url);
    return { success: true, url: result.secure_url };
  } catch (error) {
    console.error('[Cloudinary] Upload error:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Main request handler
 */
export async function onRequest(context) {
  const { request, env } = context;

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, message: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  try {
    console.log('[Upload Image] Received upload request');

    const body = await request.json();
    const { image } = body;

    // Validate image data
    if (!image || !image.startsWith('data:image')) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Invalid image data'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Check Cloudinary configuration
    if (!env.CLOUDINARY_CLOUD_NAME || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET) {
      console.error('[Upload Image] Missing Cloudinary configuration');
      return new Response(JSON.stringify({
        success: false,
        message: 'Image upload service not configured'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Upload to Cloudinary
    const result = await uploadToCloudinary(image, env);

    if (!result.success) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Image upload failed',
        error: result.error
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    return new Response(JSON.stringify({
      success: true,
      url: result.url
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error) {
    console.error('[Upload Image] Error:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Image upload failed',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}
