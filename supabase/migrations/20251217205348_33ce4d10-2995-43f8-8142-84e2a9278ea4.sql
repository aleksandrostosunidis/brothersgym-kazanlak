-- Drop and recreate the public_blog_posts view to ensure ip_address is excluded
DROP VIEW IF EXISTS public.public_blog_posts;

CREATE VIEW public.public_blog_posts AS
SELECT 
  id,
  title,
  content,
  excerpt,
  author_name,
  category,
  tags,
  rating_sum,
  rating_count,
  CASE 
    WHEN rating_count > 0 THEN ROUND((rating_sum::numeric / rating_count::numeric), 1)
    ELSE 0
  END as average_rating,
  created_at,
  updated_at
FROM public.blog_posts;

-- Grant SELECT access to the view for anonymous and authenticated users
GRANT SELECT ON public.public_blog_posts TO anon;
GRANT SELECT ON public.public_blog_posts TO authenticated;