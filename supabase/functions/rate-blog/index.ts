import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { blog_post_id, rating } = await req.json()

    // Comprehensive input validation
    if (!blog_post_id || typeof blog_post_id !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Valid blog post ID is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    if (!rating || typeof rating !== 'number' || !Number.isInteger(rating) || rating < 1 || rating > 5) {
      return new Response(
        JSON.stringify({ error: 'Rating must be an integer between 1 and 5' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Get client IP address
    const forwarded = req.headers.get("x-forwarded-for")
    const ip_address = forwarded ? forwarded.split(',')[0] : req.headers.get("x-real-ip") || "unknown"

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Try to insert or update rating
    const { data, error } = await supabase
      .from('blog_ratings')
      .upsert([
        {
          blog_post_id,
          rating,
          ip_address
        }
      ], {
        onConflict: 'blog_post_id,ip_address'
      })
      .select()

    if (error) {
      console.error('Error rating blog post:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to rate blog post' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})