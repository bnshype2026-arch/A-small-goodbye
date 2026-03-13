-- Run this script in your Supabase SQL Editor to create the necessary tables.

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create letters table
CREATE TABLE public.letters (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    recipient_name TEXT NOT NULL,
    letter_content TEXT NOT NULL,
    gallery_enabled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create comments table
CREATE TABLE public.comments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    letter_id UUID REFERENCES public.letters(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create letter_photos table
CREATE TABLE public.letter_photos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    letter_id UUID REFERENCES public.letters(id) ON DELETE CASCADE NOT NULL,
    photo_url TEXT NOT NULL,
    caption TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Enable RLS on all tables
ALTER TABLE public.letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.letter_photos ENABLE ROW LEVEL SECURITY;

-- 5. Create broad public policies (for this specific anonymous project)
-- Letters: Allow public reading, and (for admin) public writing
CREATE POLICY "Allow public select on letters" ON public.letters FOR SELECT USING (true);
CREATE POLICY "Allow public insert on letters" ON public.letters FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on letters" ON public.letters FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on letters" ON public.letters FOR DELETE USING (true);

-- Comments: Allow public select/insert
CREATE POLICY "Allow public select on comments" ON public.comments FOR SELECT USING (true);
CREATE POLICY "Allow public insert on comments" ON public.comments FOR INSERT WITH CHECK (true);

-- Letter Photos: Allow public select/insert
CREATE POLICY "Allow public select on letter_photos" ON public.letter_photos FOR SELECT USING (true);
CREATE POLICY "Allow public insert on letter_photos" ON public.letter_photos FOR INSERT WITH CHECK (true);

-- 6. Storage Setup (Run these manually or in SQL editor)
-- This creates the bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('letter-memories', 'letter-memories', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for the 'letter-memories' bucket
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'letter-memories' );

CREATE POLICY "Public Insert Access"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'letter-memories' );

CREATE POLICY "Public Delete Access"
ON storage.objects FOR DELETE
USING ( bucket_id = 'letter-memories' );
