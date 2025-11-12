-- Fix the public_reviews view to allow global read access
-- The issue is that security_invoker = true makes the view check caller's permissions
-- Since the reviews table is restricted by RLS, users can't read through the view
-- Solution: Use security_definer (default) so the view has elevated permissions

DROP VIEW IF EXISTS public.public_reviews;

CREATE VIEW public.public_reviews AS
SELECT id, name, rating, comment, tags, created_at
FROM public.reviews;

-- Grant SELECT to allow anyone to read reviews through the view
GRANT SELECT ON public.public_reviews TO anon, authenticated;

COMMENT ON VIEW public.public_reviews IS 'Public-facing view of reviews without IP addresses. Uses default security settings to allow global read access while keeping the underlying table restricted.';