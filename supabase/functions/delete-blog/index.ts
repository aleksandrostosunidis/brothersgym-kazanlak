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
    const { post_id } = await req.json()

    // Validate input
    if (!post_id || typeof post_id !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Valid post ID is required' }),
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

    // First, check if the post exists and if the IP matches
    const { data: post, error: fetchError } = await supabase
      .from('blog_posts')
      .select('ip_address')
      .eq('id', post_id)
      .single()

    if (fetchError || !post) {
      console.error('Error fetching post:', fetchError)
      return new Response(
        JSON.stringify({ error: 'Постът не е намерен' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
      )
    }

    // Check if the IP address matches
    if (post.ip_address !== ip_address) {
      return new Response(
        JSON.stringify({ error: 'Нямате право да изтриете този пост' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 403 }
      )
    }

    // Delete associated ratings first (foreign key constraint)
    const { error: ratingsError } = await supabase
      .from('blog_ratings')
      .delete()
      .eq('blog_post_id', post_id)

    if (ratingsError) {
      console.error('Error deleting ratings:', ratingsError)
      return new Response(
        JSON.stringify({ error: 'Грешка при изтриване на рейтингите' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // Now delete the post
    const { error: deleteError } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', post_id)

    if (deleteError) {
      console.error('Error deleting post:', deleteError)
      return new Response(
        JSON.stringify({ error: 'Грешка при изтриване на поста' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Постът е изтрит успешно' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Възникна неочаквана грешка' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
