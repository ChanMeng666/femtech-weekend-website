/**
 * Cloudflare Pages Function for speaker headshot image upload to Cloudinary
 * Accepts base64-encoded image data and uploads to Cloudinary image/upload
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const ALLOWED_TYPES = ['data:image/jpeg', 'data:image/png', 'data:image/webp'];

async function uploadToCloudinary(fileData, env, email) {
  const cloudName = env.CLOUDINARY_CLOUD_NAME;
  const apiKey = env.CLOUDINARY_API_KEY;
  const apiSecret = env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return { success: false, error: 'Cloudinary not configured' };
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = 'femtech-speaker-headshots';

  const sanitizedEmail = (email || 'unknown').replace(/[^a-zA-Z0-9]/g, '_');
  const publicId = `speaker_${sanitizedEmail}_${timestamp}`;

  // Create signature string (parameters in alphabetical order)
  const signatureString = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;

  // Generate SHA-1 signature
  const encoder = new TextEncoder();
  const data = encoder.encode(signatureString);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  const formData = new FormData();
  formData.append('file', fileData);
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp.toString());
  formData.append('signature', signature);
  formData.append('folder', folder);
  formData.append('public_id', publicId);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: 'POST', body: formData }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Cloudinary] Headshot upload failed:', errorText);
      return { success: false, error: `Upload failed: ${response.status}` };
    }

    const result = await response.json();
    console.log('[Cloudinary] Headshot upload successful:', result.secure_url);
    return { success: true, url: result.secure_url };
  } catch (error) {
    console.error('[Cloudinary] Headshot upload error:', error.message);
    return { success: false, error: error.message };
  }
}

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, message: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  try {
    console.log('[Upload Headshot] Received upload request');

    const body = await request.json();
    const { image, email } = body;

    if (!image) {
      return new Response(JSON.stringify({
        success: false,
        message: 'No image provided.',
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const isValidType = ALLOWED_TYPES.some(type => image.startsWith(type));
    if (!isValidType) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Invalid file type. Only JPEG, PNG, and WebP images are accepted.',
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Estimate actual file size from base64 (base64 inflates ~1.37x)
    const base64Part = image.split(',')[1] || '';
    const estimatedSize = Math.ceil(base64Part.length * 3 / 4);
    if (estimatedSize > MAX_FILE_SIZE) {
      return new Response(JSON.stringify({
        success: false,
        message: 'File too large. Maximum size is 5MB.',
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    if (!env.CLOUDINARY_CLOUD_NAME || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET) {
      console.error('[Upload Headshot] Missing Cloudinary configuration');
      return new Response(JSON.stringify({
        success: false,
        message: 'File upload service not configured',
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const result = await uploadToCloudinary(image, env, email);

    if (!result.success) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Image upload failed',
        error: result.error,
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    return new Response(JSON.stringify({
      success: true,
      url: result.url,
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    console.error('[Upload Headshot] Error:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Image upload failed',
      error: error.message,
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}
