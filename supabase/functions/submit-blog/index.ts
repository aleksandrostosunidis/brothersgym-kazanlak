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
    const { title, content, excerpt, author_name, category, tags } = await req.json()

    // Get client IP address
    const forwarded = req.headers.get("x-forwarded-for")
    const ip_address = forwarded ? forwarded.split(',')[0] : req.headers.get("x-real-ip") || "unknown"

    // Rate limiting: Check if this IP has posted in the last 24 hours
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    
    const { data: recentPosts, error: checkError } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('ip_address', ip_address)
      .gte('created_at', oneDayAgo)

    if (checkError) {
      console.error('Error checking rate limit:', checkError)
      return new Response(
        JSON.stringify({ error: 'Failed to check rate limit' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    if (recentPosts && recentPosts.length > 0) {
      return new Response(
        JSON.stringify({ error: 'Можете да публикувате само една статия на ден' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 429 }
      )
    }

    // Insert blog post
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([
        {
          title,
          content,
          excerpt,
          author_name,
          category,
          tags,
          ip_address
        }
      ])
      .select()

    if (error) {
      console.error('Error inserting blog post:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to submit blog post' }),
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