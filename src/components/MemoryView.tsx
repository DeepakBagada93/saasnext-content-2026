"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Brain, Plus, Edit2, ShieldCheck, Cpu, ArrowRight } from "lucide-react";

export default function MemoryView() {
  const [memories, setMemories] = useState([
    {
      id: "1",
      category: "Brand Style",
      title: "Tactile Digital Sanctuary Rules",
      content:
        "Prefer low-contrast earth tones (#FEF8F5 background, #964417 terracotta accents). Avoid stark pure white or harsh neon highlights.",
      tokens: 340,
      active: true,
    },
    {
      id: "2",
      category: "Writing Voice",
      title: "Serif Headline Cadence",
      content:
        "Headlines use Playfair Display with tight tracking (-0.02em). Body text uses Hanken Grotesk with 1.6x line spacing for maximum readability.",
      tokens: 280,
      active: true,
    },
    {
      id: "3",
      category: "Audience Model",
      title: "Quiet Achiever Persona",
      content:
        "Target audience values intentional whitespace, high density of thought, and zero clickbait. Tone must be grounded and authoritative.",
      tokens: 410,
      active: true,
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setMemories((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        category: "Custom Guideline",
        title: newTitle,
        content: newContent,
        tokens: Math.floor(Math.random() * 200) + 150,
        active: true,
      },
    ]);
    setNewTitle("");
    setNewContent("");
    setShowAddModal(false);
  };

  return (
    <div className="flex min-h-screen bg-background text-on-background">
      <Sidebar />

      <main className="flex-1 ml-64 p-8 md:p-12 pb-24 min-h-screen">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-1">
              <Brain className="w-4 h-4" />
              <span>Vector Vector Memory Index</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-on-surface">
              Brain Memory & Knowledge Graph
            </h1>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl font-semibold text-xs hover:opacity-90 transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Memory Vector</span>
          </button>
        </header>

        {/* Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="desert-stone-card p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-on-surface">1,030 Tokens</p>
              <p className="text-xs text-on-surface-variant">Active Brain Memory Index</p>
            </div>
          </div>
          <div className="desert-stone-card p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-on-surface">100% Vectorized</p>
              <p className="text-xs text-on-surface-variant">Semantic Recall Active</p>
            </div>
          </div>
          <div className="desert-stone-card p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-on-surface">3 Models</p>
              <p className="text-xs text-on-surface-variant">Synced with Gemini & Stitch</p>
            </div>
          </div>
        </div>

        {/* Memories List */}
        <div className="space-y-4">
          {memories.map((mem) => (
            <div
              key={mem.id}
              className="desert-stone-card p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/50 transition-all"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-surface-container-high rounded-full text-[11px] font-bold text-primary">
                    {mem.category}
                  </span>
                  <span className="text-xs text-outline font-medium">
                    {mem.tokens} tokens
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-on-surface mb-1">
                  {mem.title}
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {mem.content}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setMemories((prev) =>
                      prev.map((m) =>
                        m.id === mem.id ? { ...m, active: !m.active } : m
                      )
                    )
                  }
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    mem.active
                      ? "bg-tertiary-fixed text-on-tertiary-fixed border border-tertiary-fixed-dim"
                      : "bg-surface-container-high text-on-surface-variant"
                  }`}
                >
                  {mem.active ? "Active in Graph" : "Paused"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Add Memory Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="font-display text-xl font-bold text-on-surface mb-2">
              Add Memory Vector
            </h3>
            <p className="text-xs text-on-surface-variant mb-4">
              Inject permanent context or writing rules into Content Brain.
            </p>
            <form onSubmit={handleAddMemory} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">
                  Rule Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Tone & Vocabulary Constraints"
                  className="w-full px-4 py-2 rounded-xl bg-surface-container border border-outline-variant text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">
                  Rule Content
                </label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={4}
                  placeholder="Describe the knowledge or styling constraint..."
                  className="w-full px-4 py-2 rounded-xl bg-surface-container border border-outline-variant text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-surface-container-high"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-primary text-on-primary hover:opacity-90"
                >
                  Add Vector
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
