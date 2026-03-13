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

-- Note: You also need to create a Storage Bucket called "letter-memories" in the Supabase UI.
-- Make sure the bucket is configured as "Public" so the images can be viewed without auth tokens.
-- You will need to add a storage policy to allow inserts/selects if you're writing to it from the browser.
