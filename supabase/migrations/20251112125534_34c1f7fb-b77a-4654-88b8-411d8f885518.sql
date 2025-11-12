-- Create a public view that excludes IP addresses for GDPR compliance
CREATE OR REPLACE VIEW public.public_reviews AS
SELECT id, name, rating, comment, tags, created_at
FROM public.reviews;

-- Drop existing permissive RLS policies
DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON public.reviews;
DROP POLICY IF EXISTS "Anyone can insert reviews" ON public.reviews;

-- Block all direct access to the reviews table (protects IP addresses)
CREATE POLICY "No direct table access"
ON public.reviews
FOR ALL
USING (false);

-- Grant SELECT on the public view (exposes only non-PII data)
GRANT SELECT ON public.public_reviews TO anon, authenticated;

-- Add helpful documentation
COMMENT ON VIEW public.public_reviews IS 'Public-facing view of reviews without IP addresses. Complies with GDPR data minimization principles.';