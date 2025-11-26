-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  author_name TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  rating_sum INTEGER DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  ip_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create public view without IP addresses
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
    WHEN rating_count > 0 THEN ROUND((rating_sum::DECIMAL / rating_count), 1)
    ELSE 0
  END as average_rating,
  created_at,
  updated_at
FROM public.blog_posts;

-- Policy: Anyone can view blog posts via the public view
CREATE POLICY "Anyone can view blog posts"
ON public.blog_posts
FOR SELECT
USING (true);

-- Policy: Anyone can insert blog posts (rate limiting handled by edge function)
CREATE POLICY "Anyone can insert blog posts"
ON public.blog_posts
FOR INSERT
WITH CHECK (true);

-- Create blog_ratings table for tracking ratings
CREATE TABLE public.blog_ratings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id UUID NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  ip_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(blog_post_id, ip_address)
);

-- Enable RLS on blog_ratings
ALTER TABLE public.blog_ratings ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view ratings
CREATE POLICY "Anyone can view blog ratings"
ON public.blog_ratings
FOR SELECT
USING (true);

-- Policy: Anyone can insert ratings
CREATE POLICY "Anyone can insert blog ratings"
ON public.blog_ratings
FOR INSERT
WITH CHECK (true);

-- Create function to update blog post ratings
CREATE OR REPLACE FUNCTION public.update_blog_post_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.blog_posts
  SET 
    rating_sum = (SELECT COALESCE(SUM(rating), 0) FROM public.blog_ratings WHERE blog_post_id = NEW.blog_post_id),
    rating_count = (SELECT COUNT(*) FROM public.blog_ratings WHERE blog_post_id = NEW.blog_post_id),
    updated_at = now()
  WHERE id = NEW.blog_post_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic rating updates
CREATE TRIGGER update_blog_ratings_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.blog_ratings
FOR EACH ROW
EXECUTE FUNCTION public.update_blog_post_rating();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_blog_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_blog_updated_at_column();