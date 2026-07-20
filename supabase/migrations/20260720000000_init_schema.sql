-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Marketing',
  sub_category TEXT DEFAULT 'Q4 Strategy',
  description TEXT,
  image_url TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Research Threads Table
CREATE TABLE IF NOT EXISTS public.research_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  snippet TEXT,
  source TEXT,
  tag TEXT DEFAULT 'Design Strategy',
  read_time TEXT DEFAULT '5 min read',
  saved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Brain Memories (Vector Context) Table
CREATE TABLE IF NOT EXISTS public.brain_memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT NOT NULL DEFAULT 'Brand Style',
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tokens INT DEFAULT 300,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Moodboard Cards Table
CREATE TABLE IF NOT EXISTS public.moodboard_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'research', 'image', 'note', 'synthesis', 'palette'
  title TEXT,
  content TEXT,
  author TEXT,
  image_url TEXT,
  tag TEXT,
  x INT DEFAULT 100,
  y INT DEFAULT 100,
  colors JSONB,
  liked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Drafts Table
CREATE TABLE IF NOT EXISTS public.drafts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  word_count INT DEFAULT 0,
  reading_time INT DEFAULT 1,
  body TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Row Level Security (RLS) Policies
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brain_memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moodboard_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drafts ENABLE ROW LEVEL SECURITY;

-- Allow Public / Authenticated Access Policies for Demo
CREATE POLICY "Allow public select on projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public insert on projects" ON public.projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on projects" ON public.projects FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on projects" ON public.projects FOR DELETE USING (true);

CREATE POLICY "Allow public select on research_threads" ON public.research_threads FOR SELECT USING (true);
CREATE POLICY "Allow public insert on research_threads" ON public.research_threads FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select on brain_memories" ON public.brain_memories FOR SELECT USING (true);
CREATE POLICY "Allow public insert on brain_memories" ON public.brain_memories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on brain_memories" ON public.brain_memories FOR UPDATE USING (true);

CREATE POLICY "Allow public select on moodboard_cards" ON public.moodboard_cards FOR SELECT USING (true);
CREATE POLICY "Allow public insert on moodboard_cards" ON public.moodboard_cards FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on moodboard_cards" ON public.moodboard_cards FOR UPDATE USING (true);

CREATE POLICY "Allow public select on drafts" ON public.drafts FOR SELECT USING (true);
CREATE POLICY "Allow public insert on drafts" ON public.drafts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on drafts" ON public.drafts FOR UPDATE USING (true);
