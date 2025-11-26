import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Simple admin secret key for moderation (store in Supabase secrets)
const ADMIN_SECRET = Deno.env.get('ADMIN_SECRET') || 'brothers-gym-admin-2025'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { action, post_id, report_id, admin_key } = await req.json()

    // Verify admin key
    if (admin_key !== ADMIN_SECRET) {
      return new Response(
        JSON.stringify({ error: 'Неоторизиран достъп' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 403 }
      )
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    if (action === 'delete_post') {
      // Delete post and its ratings
      if (!post_id) {
        return new Response(
          JSON.stringify({ error: 'Post ID е задължителен' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
      }

      // Delete ratings first
      await supabase.from('blog_ratings').delete().eq('blog_post_id', post_id)
      
      // Update related reports
      await supabase
        .from('blog_reports')
        .update({ status: 'removed', resolved_at: new Date().toISOString() })
        .eq('blog_post_id', post_id)
        .eq('status', 'pending')

      // Delete post
      const { error } = await supabase.from('blog_posts').delete().eq('id', post_id)

      if (error) {
        throw error
      }

      return new Response(
        JSON.stringify({ success: true, message: 'Постът е изтрит' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      )
    }

    if (action === 'dismiss_report') {
      if (!report_id) {
        return new Response(
          JSON.stringify({ error: 'Report ID е задължителен' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
      }

      const { error } = await supabase
        .from('blog_reports')
        .update({ status: 'dismissed', resolved_at: new Date().toISOString() })
        .eq('id', report_id)

      if (error) {
        throw error
      }

      return new Response(
        JSON.stringify({ success: true, message: 'Докладът е отхвърлен' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      )
    }

    if (action === 'list_reports') {
      const { data: reports, error } = await supabase
        .from('blog_reports')
        .select(`
          *,
          blog_posts (
            id,
            title,
            author_name,
            category
          )
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      return new Response(
        JSON.stringify({ success: true, reports }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Невалидно действие' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Възникна неочаквана грешка' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
