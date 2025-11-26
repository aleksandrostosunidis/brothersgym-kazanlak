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

    // Comprehensive input validation
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Title is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Content is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    if (!excerpt || typeof excerpt !== 'string' || excerpt.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Excerpt is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    if (!author_name || typeof author_name !== 'string' || author_name.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Author name is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    if (!category || typeof category !== 'string' || category.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Category is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Validate string lengths
    if (title.length > 200) {
      return new Response(
        JSON.stringify({ error: 'Title must be less than 200 characters' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    if (content.length > 10000) {
      return new Response(
        JSON.stringify({ error: 'Content must be less than 10000 characters' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    if (excerpt.length > 500) {
      return new Response(
        JSON.stringify({ error: 'Excerpt must be less than 500 characters' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    if (author_name.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Author name must be less than 100 characters' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Validate tags array
    if (tags && !Array.isArray(tags)) {
      return new Response(
        JSON.stringify({ error: 'Tags must be an array' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    if (tags && tags.length > 10) {
      return new Response(
        JSON.stringify({ error: 'Maximum 10 tags allowed' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    if (tags && tags.some((tag: any) => typeof tag !== 'string' || tag.length > 50)) {
      return new Response(
        JSON.stringify({ error: 'Each tag must be a string with maximum 50 characters' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Sanitize inputs (trim whitespace)
    const sanitizedTitle = title.trim()
    const sanitizedContent = content.trim()
    const sanitizedExcerpt = excerpt.trim()
    const sanitizedAuthorName = author_name.trim()
    const sanitizedCategory = category.trim()
    const sanitizedTags = tags ? tags.map((tag: string) => tag.trim()) : []

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

    // Insert blog post with sanitized data
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([
        {
          title: sanitizedTitle,
          content: sanitizedContent,
          excerpt: sanitizedExcerpt,
          author_name: sanitizedAuthorName,
          category: sanitizedCategory,
          tags: sanitizedTags,
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