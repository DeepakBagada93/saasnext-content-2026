"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { supabase } from "@/lib/supabase";
import { Search, Sparkles, Edit3, ArrowRight, Check, X, Filter, Loader2, Plus, FolderPlus, BookOpen } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  sub_category?: string;
  description: string;
  image_url: string;
}

interface MemoryItem {
  id: string;
  title: string;
  category: string;
  content: string;
  updated_at?: string;
}

interface ResearchItem {
  id: string;
  title: string;
  snippet: string;
  tag: string;
  read_time: string;
  date: string;
}

export default function DashboardView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [memoryItems, setMemoryItems] = useState<MemoryItem[]>([]);
  const [researchItems, setResearchItems] = useState<ResearchItem[]>([]);

  const [editingMemoryId, setEditingMemoryId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Projects
      const { data: projData, error: projErr } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (projErr) console.error("Error fetching projects:", projErr);
      setProjects(projData || []);

      // 2. Fetch Memories
      const { data: memData, error: memErr } = await supabase
        .from("brain_memories")
        .select("*")
        .order("created_at", { ascending: false });

      if (memErr) console.error("Error fetching memories:", memErr);
      setMemoryItems(memData || []);

      // 3. Fetch Research
      const { data: resData, error: resErr } = await supabase
        .from("research_threads")
        .select("*")
        .order("created_at", { ascending: false });

      if (resErr) console.error("Error fetching research:", resErr);
      setResearchItems(
        (resData || []).map((r: any) => ({
          id: r.id,
          title: r.title,
          snippet: r.snippet,
          tag: r.tag || "Research",
          read_time: r.read_time || "5 min read",
          date: new Date(r.created_at).toLocaleDateString(),
        }))
      );
    } catch (e) {
      console.error("Dashboard initialization error:", e);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleEditClick = (id: string, currentContent: string) => {
    setEditingMemoryId(id);
    setEditContent(currentContent);
  };

  const handleSaveMemory = async () => {
    if (!editingMemoryId) return;

    const { error } = await supabase
      .from("brain_memories")
      .update({ content: editContent, updated_at: new Date().toISOString() })
      .eq("id", editingMemoryId);

    if (error) {
      alert("Error updating memory: " + error.message);
    } else {
      setMemoryItems((prev) =>
        prev.map((item) =>
          item.id === editingMemoryId
            ? { ...item, content: editContent, updated_at: new Date().toISOString() }
            : item
        )
      );
    }
    setEditingMemoryId(null);
  };

  return (
    <div className="flex min-h-screen bg-background text-on-background font-body">
      <Sidebar />

      <main className="flex-1 ml-0 lg:ml-64 pt-20 lg:pt-12 p-4 sm:p-6 md:p-12 pb-24 min-h-screen">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <nav className="flex items-center text-xs font-semibold text-on-surface-variant gap-2 uppercase tracking-wider">
            <span className="opacity-60">Content Brain</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-bold">Workspace</span>
          </nav>
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across your workspace projects..."
              className="w-full pl-11 pr-4 py-2.5 bg-surface-container-high border-none rounded-full text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-on-surface-variant/50"
            />
          </div>
        </header>

        {/* Quick Actions Row */}
        <section className="mb-10">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/research"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 bg-surface-container-highest rounded-xl text-primary font-semibold text-xs sm:text-sm hover:bg-surface-container-lowest transition-colors border border-outline-variant/60 shadow-xs"
            >
              <span className="material-symbols-outlined text-[20px]">biotech</span>
              <span>New Research</span>
            </Link>
            <Link
              href="/moodboard"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 bg-surface-container-highest rounded-xl text-primary font-semibold text-xs sm:text-sm hover:bg-surface-container-lowest transition-colors border border-outline-variant/60 shadow-xs"
            >
              <span className="material-symbols-outlined text-[20px]">palette</span>
              <span>New Moodboard</span>
            </Link>
            <Link
              href="/studio"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-primary text-on-primary rounded-xl font-semibold text-xs sm:text-sm hover:opacity-90 transition-all shadow-xs"
            >
              <span className="material-symbols-outlined text-[20px]">smart_toy</span>
              <span>Open AI Studio</span>
            </Link>
          </div>
        </section>

        {loading ? (
          <div className="flex items-center justify-center py-24 text-primary gap-3">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-sm font-semibold">Loading Workspace from Supabase...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Projects & Active Research (8 Cols) */}
            <div className="col-span-1 lg:col-span-8 flex flex-col gap-10">
              {/* Recent Projects */}
              <section>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <h2 className="font-display text-2xl font-bold text-on-surface">
                    Workspace Projects ({filteredProjects.length})
                  </h2>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
                    <div className="flex items-center gap-1 text-xs text-on-surface-variant bg-surface-container-high px-3 py-1 rounded-lg shrink-0">
                      <Filter className="w-3 h-3" />
                      <span>Filter:</span>
                    </div>
                    {["All", "Marketing", "Internal", "Media"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-xs font-semibold px-3 py-1 rounded-lg transition-colors shrink-0 ${
                          selectedCategory === cat
                            ? "bg-primary text-on-primary"
                            : "text-on-surface-variant hover:text-primary"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredProjects.length === 0 ? (
                  <div className="desert-stone-card rounded-2xl p-8 sm:p-12 text-center flex flex-col items-center justify-center border-dashed">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                      <FolderPlus className="w-7 h-7" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-on-surface mb-1">
                      No Projects Created Yet
                    </h3>
                    <p className="text-xs text-on-surface-variant max-w-sm mb-6">
                      Create your first project in Supabase to start organizing research, AI drafts, and moodboards.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {filteredProjects.map((project) => (
                      <Link
                        key={project.id}
                        href="/studio"
                        className="desert-stone-card rounded-xl overflow-hidden group flex flex-col hover:shadow-md transition-all duration-300"
                      >
                        <div className="h-44 w-full relative overflow-hidden bg-surface-container-high">
                          <img
                            src={
                              project.image_url ||
                              "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
                            }
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-3 left-3 flex gap-2">
                            <span className="bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-on-surface">
                              {project.category}
                            </span>
                            {project.sub_category && (
                              <span className="bg-primary/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-white">
                                {project.sub_category}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-display text-lg font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
                              {project.title}
                            </h3>
                            <p className="text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                              {project.description}
                            </p>
                          </div>
                          <div className="mt-4 pt-3 border-t border-outline-variant/30 flex items-center justify-between text-xs text-primary font-semibold">
                            <span>Open in Studio</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </section>

              {/* Active Research */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-2xl font-bold text-on-surface">
                    Research & Knowledge Threads
                  </h2>
                  <Link href="/research" className="text-xs font-semibold text-primary hover:underline">
                    Browse repository &rarr;
                  </Link>
                </div>

                {researchItems.length === 0 ? (
                  <div className="desert-stone-card p-8 rounded-xl text-center flex flex-col items-center">
                    <BookOpen className="w-8 h-8 text-outline mb-2" />
                    <p className="text-xs text-on-surface-variant">No research threads added yet.</p>
                    <Link
                      href="/research"
                      className="text-xs text-primary font-bold mt-2 hover:underline"
                    >
                      + Add Research Thread
                    </Link>
                  </div>
                ) : (
                  <div className="flex overflow-x-auto gap-4 pb-4 custom-scrollbar">
                    {researchItems.map((item) => (
                      <div
                        key={item.id}
                        className="min-w-[260px] sm:min-w-[280px] desert-stone-card p-6 rounded-xl relative overflow-hidden flex flex-col justify-between shrink-0"
                      >
                        <div>
                          <p className="text-xs font-bold text-primary mb-2">{item.date}</p>
                          <h4 className="font-display text-lg font-semibold mb-2">
                            {item.title}
                          </h4>
                          <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                            {item.snippet}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-tertiary">
                            {item.tag}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* Right Column: Memory & AI Pulse (4 Cols) */}
            <div className="col-span-1 lg:col-span-4 flex flex-col gap-8">
              {/* Brain Memory */}
              <section>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-xl font-bold text-on-surface">
                      Brain Memory Context
                    </h2>
                  </div>
                  <Link href="/memory" className="text-xs font-bold text-primary hover:underline">
                    Manage &rarr;
                  </Link>
                </div>

                {memoryItems.length === 0 ? (
                  <div className="desert-stone-card p-6 rounded-xl text-center">
                    <p className="text-xs text-on-surface-variant mb-2">No active brain memory rules.</p>
                    <Link
                      href="/memory"
                      className="text-xs font-bold text-primary hover:underline"
                    >
                      + Add Memory Rule
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {memoryItems.map((item, idx) => {
                      const borderColors = [
                        "border-l-primary",
                        "border-l-tertiary",
                        "border-l-secondary",
                      ];
                      const borderClass = borderColors[idx % borderColors.length];

                      return (
                        <div
                          key={item.id}
                          className={`desert-stone-card p-5 rounded-xl border-l-4 ${borderClass} group relative`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-sm font-bold text-on-surface">{item.title}</h4>
                            <button
                              onClick={() => handleEditClick(item.id, item.content)}
                              className="text-outline-variant hover:text-primary transition-colors p-1"
                              title="Edit memory context in Supabase"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs text-on-surface-variant italic leading-relaxed mb-1">
                            "{item.content}"
                          </p>
                          <p className="text-[10px] text-outline mt-2">
                            {item.updated_at
                              ? `Updated ${new Date(item.updated_at).toLocaleDateString()}`
                              : "Synced with Supabase"}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>

              {/* AI Pulse Status Banner */}
              <section className="bg-surface-container-high/60 p-6 rounded-3xl border border-outline-variant/60 flex flex-col items-center text-center">
                <div className="mb-4 relative">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center breathing-pulse">
                    <span className="material-symbols-outlined text-primary text-[28px]">
                      temp_preferences_custom
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-primary/10 rounded-full blur-lg scale-125"></div>
                </div>
                <h3 className="font-display text-lg font-bold mb-1">Supabase DB Syncing</h3>
                <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                  Content Brain is syncing your projects & memory context with PostgreSQL.
                </p>
                <Link
                  href="/memory"
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <span>Explore Knowledge Graph</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </section>
            </div>
          </div>
        )}
      </main>

      {/* Edit Memory Modal */}
      {editingMemoryId && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setEditingMemoryId(null)}
              className="absolute right-4 top-4 text-on-surface-variant hover:text-on-surface"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-display text-xl font-bold text-on-surface mb-2">
              Edit Supabase Brain Memory
            </h3>
            <p className="text-xs text-on-surface-variant mb-4">
              Updating this instruction will persist changes directly to your Supabase database.
            </p>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={4}
              className="w-full p-4 rounded-xl bg-surface-container border border-outline-variant text-sm text-on-surface focus:ring-2 focus:ring-primary focus:outline-none font-body"
            />
            <div className="flex justify-end gap-3 mt-4 pt-3 border-t border-outline-variant/30">
              <button
                onClick={() => setEditingMemoryId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-surface-container-high"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveMemory}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-primary text-on-primary hover:opacity-90 flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save to Supabase</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Status Bar */}
      <footer className="fixed bottom-0 left-0 lg:left-64 right-0 bg-surface-container-lowest/90 backdrop-blur-md px-4 sm:px-8 py-3 flex items-center justify-between border-t border-outline-variant/30 text-xs text-on-surface-variant z-40">
        <div className="flex items-center gap-6">
          <span>&copy; 2026 Content Brain AI</span>
          <div className="hidden md:flex gap-4 opacity-70">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <Link href="/studio" className="hover:text-primary">
              AI Studio
            </Link>
            <Link href="/moodboard" className="hover:text-primary">
              Moodboard
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-tertiary rounded-full animate-pulse"></span>
          <span className="font-semibold text-tertiary">Supabase DB Live</span>
        </div>
      </footer>
    </div>
  );
}
