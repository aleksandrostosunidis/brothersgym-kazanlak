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
    const { blog_post_id, reason, details } = await req.json()

    // Validate input
    if (!blog_post_id || typeof blog_post_id !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Валиден ID на пост е задължителен' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    if (!reason || typeof reason !== 'string' || reason.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Причината е задължителна' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    if (reason.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Причината трябва да бъде под 100 символа' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    if (details && details.length > 500) {
      return new Response(
        JSON.stringify({ error: 'Детайлите трябва да бъдат под 500 символа' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Get client IP address
    const forwarded = req.headers.get("x-forwarded-for")
    const reporter_ip = forwarded ? forwarded.split(',')[0] : req.headers.get("x-real-ip") || "unknown"

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Check if this IP has already reported this post
    const { data: existing, error: checkError } = await supabase
      .from('blog_reports')
      .select('id')
      .eq('blog_post_id', blog_post_id)
      .eq('reporter_ip', reporter_ip)
      .eq('status', 'pending')
      .single()

    if (existing) {
      return new Response(
        JSON.stringify({ error: 'Вече сте докладвали този пост' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Insert report
    const { data, error } = await supabase
      .from('blog_reports')
      .insert([
        {
          blog_post_id,
          reason: reason.trim(),
          details: details ? details.trim() : null,
          reporter_ip,
          status: 'pending'
        }
      ])
      .select()

    if (error) {
      console.error('Error inserting report:', error)
      return new Response(
        JSON.stringify({ error: 'Грешка при подаване на доклад' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Докладът е подаден успешно', data }),
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
