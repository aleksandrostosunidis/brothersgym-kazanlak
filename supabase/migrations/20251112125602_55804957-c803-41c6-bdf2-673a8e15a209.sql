-- Recreate the view with explicit SECURITY INVOKER to fix linter warning
-- This ensures the view uses the querying user's permissions, not the creator's
DROP VIEW IF EXISTS public.public_reviews;

CREATE VIEW public.public_reviews 
WITH (security_invoker = true) AS
SELECT id, name, rating, comment, tags, created_at
FROM public.reviews;

-- Re-grant SELECT permissions
GRANT SELECT ON public.public_reviews TO anon, authenticated;

-- Add documentation
COMMENT ON VIEW public.public_reviews IS 'Public-facing view of reviews without IP addresses. Uses SECURITY INVOKER for proper permission checking. Complies with GDPR data minimization principles.';