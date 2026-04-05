/**
 * Cloudflare Pages Function for listing applications
 * GET /api/admin/applications?type=pitch|programme&status=all|submitted|approved|rejected
 * Protected by ADMIN_API_KEY authentication
 */

import { neon } from '@neondatabase/serverless';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
};

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ success: false, error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  // Validate admin API key
  const adminKey = env.ADMIN_API_KEY;
  const providedKey = request.headers.get('X-Admin-Key') || request.headers.get('x-admin-key');

  if (!adminKey || !providedKey || providedKey !== adminKey) {
    return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  if (!env.DATABASE_URL) {
    return new Response(JSON.stringify({ success: false, error: 'Database not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  try {
    const url = new URL(request.url);
    const type = url.searchParams.get('type');
    const status = url.searchParams.get('status') || 'all';

    if (!type || !['pitch', 'programme'].includes(type)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid type. Must be "pitch" or "programme"'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    if (!['all', 'submitted', 'approved', 'rejected'].includes(status)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid status. Must be "all", "submitted", "approved", or "rejected"'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const sql = neon(env.DATABASE_URL);
    let rows;

    if (type === 'pitch') {
      if (status === 'all') {
        rows = await sql`
          SELECT id, first_name, last_name, email, company_name, company_type,
                 headquarters, health_focus, status, reference_number, created_at
          FROM pitch_applications
          ORDER BY created_at DESC
        `;
      } else {
        rows = await sql`
          SELECT id, first_name, last_name, email, company_name, company_type,
                 headquarters, health_focus, status, reference_number, created_at
          FROM pitch_applications
          WHERE status = ${status}
          ORDER BY created_at DESC
        `;
      }
    } else {
      if (status === 'all') {
        rows = await sql`
          SELECT id, first_name, last_name, email, company_name, company_type,
                 headquarters, company_stage, status, reference_number, created_at
          FROM programme_applications
          ORDER BY created_at DESC
        `;
      } else {
        rows = await sql`
          SELECT id, first_name, last_name, email, company_name, company_type,
                 headquarters, company_stage, status, reference_number, created_at
          FROM programme_applications
          WHERE status = ${status}
          ORDER BY created_at DESC
        `;
      }
    }

    return new Response(JSON.stringify({ success: true, data: rows, count: rows.length }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    console.error('[Admin Applications] Error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}
