ALTER TABLE products ADD COLUMN IF NOT EXISTS video_url TEXT;

-- Create Supabase Storage bucket for videos
INSERT INTO storage.buckets (id, name, public)
VALUES ('vigil-videos', 'vigil-videos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to videos
CREATE POLICY IF NOT EXISTS "Public video access"
ON storage.objects FOR SELECT
USING (bucket_id = 'vigil-videos');

-- Allow service role to upload videos
CREATE POLICY IF NOT EXISTS "Service role video upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'vigil-videos');
