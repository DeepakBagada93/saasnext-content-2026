# Content Brain 🧠 — The Digital Sanctuary for Thought

**Content Brain** is an intelligent knowledge workspace and AI content creation platform built for thoughtful creators, editorial strategists, and research teams. Inspired by modern desert architecture and high-end digital sanctuary design, Content Brain transforms scattered research into a permanent knowledge system that continuously improves every piece of content you write.

![Content Brain Banner](https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1400&q=80)

---

## ✨ The Core Philosophy

Unlike high-velocity, noisy SaaS tools that induce cognitive fatigue, **Content Brain** prioritizes stillness, spatial clarity, and tactile warmth:

- 🏜️ **Warm Sand & Terracotta Palette**: Minimalist earth tones (`#FEF8F5`, `#964417`, `#4E6240`) designed to minimize eye strain during long writing sessions.
- 📜 **Editorial Typography**: Pairing serif elegance (**Playfair Display**) for high-impact display titles with ultra-legible sans-serif (**Hanken Grotesk**) for long-form reading.
- 🧩 **Persistent Vector Memory**: Your brand identity, writing rules, and audience personas are stored in vector embeddings so every AI generation aligns with your voice.

---

## 🚀 Key Modules & Capabilities

### 1. Workspace Dashboard (`/dashboard`)
- **Project Bento Grid**: Manage campaigns, brand strategies, and deep research essays.
- **Active Research Carousel**: Quick access to live citations and knowledge threads.
- **Brain Memory Context**: Persistently synced rules with edit controls connected to Supabase.
- **Global Semantic Search**: Filter and search across all workspace assets.

### 2. AI Content Studio (`/studio`)
- **Focused AI Actions**: Instant one-click triggers powered by OpenRouter:
  - 📝 **Summarize**: Condense drafts into executive bullet points.
  - ⭐ **Improve EEAT**: Enhance Experience, Expertise, Authoritativeness, and Trustworthiness.
  - ⚓ **Generate Hooks**: Produce viral headlines for social distribution.
  - ✅ **Fact Check**: Verify environmental claims and technical specifications.
- **Custom Prompt Engine**: Submit custom expansion or rewrite prompts to OpenRouter (`google/gemini-2.5-flash`).
- **Real-Time Word Count & Reading Meter**: Dynamic analytics while editing.
- **Export & Share**: Export to Markdown (.md), PDF, HTML, or raw text; generate shareable draft URLs.

### 3. Infinite Moodboard (`/moodboard`)
- **Dotted Canvas Grid**: Spatial visual organization for creative research.
- **Multi-Card Types**: Research citations, high-res images, handwritten notes, AI synthesis blocks, and brand color swatches.
- **SVG Connection Lines**: Visual relationship lines mapping links between research cards.
- **Database Persistence**: Drop cards onto the canvas and save directly to Supabase (`moodboard_cards`).

### 4. Research Repository (`/research`)
- Curated article collector and tag filters (Design Strategy, Architecture, Psychology, Media).

### 5. Brain Memory & Knowledge Graph (`/memory`)
- Inspect and update active vector memory tokens, brand guidelines, and audience model rules.

### 6. Authentication (`/login`)
- Full Supabase Auth with Email and Password login/registration and session state management.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Frontend** | React 19, TypeScript, Tailwind CSS v4, Lucide React, Google Fonts |
| **Database & Auth** | Supabase (PostgreSQL with RLS), `@supabase/supabase-js`, Supabase CLI |
| **AI Intelligence** | OpenRouter API (`google/gemini-2.5-flash`), Parallel Search API |
| **Design System** | Google Stitch "Content Brain Workspace" Design Specs |

---

## 🗄️ Database Schema (Supabase PostgreSQL)

Database migration scripts are located in `supabase/migrations/20260720000000_init_schema.sql`:

- `public.projects`: Workspace projects with categories and thumbnails.
- `public.research_threads`: Saved citations and research excerpts.
- `public.brain_memories`: Memory context vectors for AI steerability.
- `public.moodboard_cards`: Canvas elements with spatial coordinates `(x, y)`.
- `public.drafts`: Long-form article drafts.
- **Row Level Security (RLS)** enabled across all tables.

---

## ⚡ Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/DeepakBagada93/saasnext-content-2026.git
cd saasnext-content-2026
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:

```env
OPENROUTER_API_KEY=your_openrouter_api_key
PARALLEL_SEARCH_API_KEY=your_parallel_search_api_key

NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
DATABASE_URL=postgresql://postgres:password@db.your-project-id.supabase.co:5432/postgres
```

### 3. Push Supabase Migrations
```bash
npx supabase db push --db-url "$DATABASE_URL"
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License
This project is proprietary software for Content Brain AI. All rights reserved.
