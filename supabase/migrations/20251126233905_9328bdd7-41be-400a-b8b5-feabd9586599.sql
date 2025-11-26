-- Create reports table for flagged blog posts
CREATE TABLE IF NOT EXISTS public.blog_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_post_id UUID NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  details TEXT,
  reporter_ip TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE,
  CONSTRAINT valid_status CHECK (status IN ('pending', 'reviewed', 'dismissed', 'removed'))
);

-- Enable RLS on reports table
ALTER TABLE public.blog_reports ENABLE ROW LEVEL SECURITY;

-- Block direct access to reports table
CREATE POLICY "No direct blog_reports access"
ON public.blog_reports
FOR ALL
TO authenticated, anon
USING (false);

-- Create view for public reports (without IPs)
CREATE OR REPLACE VIEW public.public_blog_reports
WITH (security_invoker = false)
AS
SELECT 
  id,
  blog_post_id,
  reason,
  details,
  status,
  created_at,
  resolved_at
FROM public.blog_reports
ORDER BY created_at DESC;

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_blog_reports_post_id ON public.blog_reports(blog_post_id);
CREATE INDEX IF NOT EXISTS idx_blog_reports_status ON public.blog_reports(status);