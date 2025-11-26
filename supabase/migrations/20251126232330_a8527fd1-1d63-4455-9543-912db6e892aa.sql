-- Drop existing permissive RLS policies that expose IP addresses
DROP POLICY IF EXISTS "Anyone can view blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Anyone can insert blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Anyone can view blog ratings" ON public.blog_ratings;
DROP POLICY IF EXISTS "Anyone can insert blog ratings" ON public.blog_ratings;

-- Create strict RLS policies to block direct table access (similar to reviews table)
CREATE POLICY "No direct blog_posts access"
ON public.blog_posts
FOR ALL
TO authenticated, anon
USING (false);

CREATE POLICY "No direct blog_ratings access"
ON public.blog_ratings
FOR ALL
TO authenticated, anon
USING (false);

-- Drop and recreate security definer view for blog posts (without IP addresses)
DROP VIEW IF EXISTS public.public_blog_posts;

CREATE VIEW public.public_blog_posts 
WITH (security_invoker = false)
AS
SELECT 
  id,
  title,
  excerpt,
  content,
  author_name,
  category,
  tags,
  rating_sum,
  rating_count,
  CASE 
    WHEN rating_count > 0 THEN ROUND(CAST(rating_sum AS numeric) / rating_count, 1)
    ELSE 0
  END as average_rating,
  created_at,
  updated_at
FROM public.blog_posts
ORDER BY created_at DESC;