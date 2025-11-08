-- Create reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address TEXT NOT NULL
);

-- Enable RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read reviews
CREATE POLICY "Reviews are viewable by everyone"
ON public.reviews
FOR SELECT
USING (true);

-- Allow anyone to insert reviews (we'll handle rate limiting in the edge function)
CREATE POLICY "Anyone can insert reviews"
ON public.reviews
FOR INSERT
WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_reviews_created_at ON public.reviews(created_at DESC);
CREATE INDEX idx_reviews_ip_address ON public.reviews(ip_address);