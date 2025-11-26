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
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Fetch latest blog posts
    const { data: blogPosts } = await supabase
      .from('public_blog_posts')
      .select('id, updated_at')
      .order('updated_at', { ascending: false })
      .limit(100)

    const today = new Date().toISOString().split('T')[0]
    const baseUrl = 'https://brothersgym-kazanlak.bg'

    // Static pages with their priorities
    const staticPages = [
      { path: '', priority: '1.0', changefreq: 'weekly' },
      { path: '/about', priority: '0.8', changefreq: 'monthly' },
      { path: '/services', priority: '0.9', changefreq: 'weekly' },
      { path: '/schedule', priority: '0.9', changefreq: 'weekly' },
      { path: '/team', priority: '0.8', changefreq: 'monthly' },
      { path: '/gallery', priority: '0.7', changefreq: 'weekly' },
      { path: '/videos', priority: '0.7', changefreq: 'weekly' },
      { path: '/reviews', priority: '0.8', changefreq: 'daily' },
      { path: '/blog', priority: '0.9', changefreq: 'daily' },
      { path: '/events', priority: '0.8', changefreq: 'weekly' },
      { path: '/partners', priority: '0.6', changefreq: 'monthly' },
      { path: '/wall-of-fame', priority: '0.7', changefreq: 'monthly' },
      { path: '/bar', priority: '0.7', changefreq: 'monthly' },
      { path: '/shop', priority: '0.6', changefreq: 'weekly' },
      { path: '/guides', priority: '0.7', changefreq: 'monthly' },
      { path: '/tools', priority: '0.7', changefreq: 'monthly' },
      { path: '/faq', priority: '0.7', changefreq: 'monthly' },
      { path: '/contact', priority: '0.8', changefreq: 'monthly' },
      { path: '/developer', priority: '0.5', changefreq: 'yearly' },
    ]

    // Build sitemap XML
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'

    // Add static pages
    for (const page of staticPages) {
      sitemap += '  <url>\n'
      sitemap += `    <loc>${baseUrl}${page.path}</loc>\n`
      sitemap += `    <lastmod>${today}</lastmod>\n`
      sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`
      sitemap += `    <priority>${page.priority}</priority>\n`
      sitemap += `    <xhtml:link rel="alternate" hreflang="bg" href="${baseUrl}${page.path}" />\n`
      sitemap += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page.path}" />\n`
      sitemap += `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${page.path}" />\n`
      sitemap += '  </url>\n'
    }

    // Add dynamic blog posts
    if (blogPosts && blogPosts.length > 0) {
      for (const post of blogPosts) {
        const postDate = post.updated_at ? new Date(post.updated_at).toISOString().split('T')[0] : today
        sitemap += '  <url>\n'
        sitemap += `    <loc>${baseUrl}/blog#${post.id}</loc>\n`
        sitemap += `    <lastmod>${postDate}</lastmod>\n`
        sitemap += `    <changefreq>weekly</changefreq>\n`
        sitemap += `    <priority>0.8</priority>\n`
        sitemap += '  </url>\n'
      }
    }

    sitemap += '</urlset>'

    return new Response(sitemap, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
      status: 200,
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to generate sitemap' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
