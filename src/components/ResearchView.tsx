"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Search, BookOpen, Plus, ExternalLink, Bookmark, Filter, FileText } from "lucide-react";

export default function ResearchView() {
  const [search, setSearch] = useState("");
  const [filterTag, setFilterTag] = useState("All");

  const articles = [
    {
      id: "1",
      title: "Post-SaaS Aesthetics & Physical-Digital Hybrids",
      source: "ArchDigest & Design Quarterly",
      date: "3 hours ago",
      tag: "Design Strategy",
      snippet:
        "Analyzing the paradigm shift away from harsh clinical SaaS blue towards warm, tactile digital sanctuaries grounded in earth tones and natural textures.",
      readTime: "6 min read",
      saved: true,
    },
    {
      id: "2",
      title: "Modern Desert Architecture: Materials & Harmony",
      source: "Architectural Review",
      date: "Yesterday",
      tag: "Architecture",
      snippet:
        "Materials study exploring how rammed earth, brushed copper, and local sandstone create low-eye-strain environments ideal for deep focus.",
      readTime: "12 min read",
      saved: false,
    },
    {
      id: "3",
      title: "Mindful Consumer Psychology among Executives",
      source: "Consumer Psychology Lab",
      date: "Nov 12, 2026",
      tag: "Psychology",
      snippet:
        "Investigation into why high-impact creators prioritize cognitive stillness over rapid-fire notifications in modern productivity tools.",
      readTime: "8 min read",
      saved: true,
    },
    {
      id: "4",
      title: "Kinetic Typography in Editorial Video Essays",
      source: "Motion Design Journal",
      date: "Nov 04, 2026",
      tag: "Media",
      snippet:
        "How high-contrast serif typography paired with subtle micro-animations increases video retention rates by 38%.",
      readTime: "5 min read",
      saved: false,
    },
  ];

  const filtered = articles.filter((a) => {
    const matchTag = filterTag === "All" || a.tag === filterTag;
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.snippet.toLowerCase().includes(search.toLowerCase());
    return matchTag && matchSearch;
  });

  return (
    <div className="flex min-h-screen bg-background text-on-background">
      <Sidebar />

      <main className="flex-1 ml-64 p-8 md:p-12 pb-24 min-h-screen">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-on-surface">
              Research Repository
            </h1>
            <p className="text-sm text-on-surface-variant mt-1">
              Curated articles, citations, and knowledge threads powering your Brain Graph.
            </p>
          </div>
          <button
            onClick={() => alert("Add Research Source dialog initialized!")}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl font-semibold text-xs hover:opacity-90 transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Research Source</span>
          </button>
        </header>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search research citations & excerpts..."
              className="w-full pl-11 pr-4 py-2.5 bg-surface-container border border-outline-variant/60 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            {["All", "Design Strategy", "Architecture", "Psychology", "Media"].map((t) => (
              <button
                key={t}
                onClick={() => setFilterTag(t)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  filterTag === t
                    ? "bg-primary text-on-primary border-primary"
                    : "border-outline-variant bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Research List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="desert-stone-card p-6 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-surface-container-high rounded-full text-[11px] font-bold text-primary">
                    {item.tag}
                  </span>
                  <span className="text-xs text-outline font-medium">{item.date}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                  {item.snippet}
                </p>
              </div>
              <div className="pt-4 border-t border-outline-variant/40 flex items-center justify-between text-xs text-on-surface-variant font-medium">
                <span>{item.source} • {item.readTime}</span>
                <button
                  onClick={() => alert(`Opening citation source: ${item.title}`)}
                  className="flex items-center gap-1 text-primary font-bold hover:underline"
                >
                  <span>View Source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
