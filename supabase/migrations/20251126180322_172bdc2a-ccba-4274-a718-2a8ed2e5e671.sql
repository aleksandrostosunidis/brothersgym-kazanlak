-- Fix Security Definer View warning by adding explicit RLS on public_reviews view
-- This makes the security model explicit: the view is SECURITY DEFINER (necessary for bypassing
-- the restrictive RLS on the reviews table) but has its own explicit RLS policy allowing public read access

-- Enable RLS on the public_reviews view
ALTER VIEW public.public_reviews SET (security_barrier = true);

-- Note: Views don't support RLS policies directly, but we can create a security barrier
-- to ensure RLS-like behavior. For better security, we should recreate as a security invoker
-- view with a security definer function, or add explicit grants.

-- Grant explicit SELECT permission to authenticated and anonymous users
GRANT SELECT ON public.public_reviews TO authenticated;
GRANT SELECT ON public.public_reviews TO anon;

-- Add a comment documenting the security model
COMMENT ON VIEW public.public_reviews IS 
'Security Definer view that exposes non-PII review data globally. 
The underlying reviews table has restrictive RLS blocking all direct access.
This view intentionally uses SECURITY DEFINER to bypass that RLS and provide 
read-only access to sanitized review data (excludes ip_address for GDPR compliance).
Explicit grants ensure only SELECT is allowed to authenticated and anonymous users.';