"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { supabase } from "@/lib/supabase";
import {
  Plus,
  BookOpen,
  Heart,
  ExternalLink,
  Brain,
  X,
  Layers,
  Palette,
  Loader2,
  Image as ImageIcon
} from "lucide-react";

interface MoodCardItem {
  id: string;
  type: "research" | "image" | "note" | "synthesis" | "palette";
  title?: string;
  content?: string;
  author?: string;
  image_url?: string;
  tag?: string;
  x: number;
  y: number;
  colors?: string[];
  liked?: boolean;
}

export default function MoodboardView() {
  const [cards, setCards] = useState<MoodCardItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newType, setNewType] = useState<"note" | "research" | "image">("note");
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");

  useEffect(() => {
    fetchMoodboardCards();
  }, []);

  const fetchMoodboardCards = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("moodboard_cards")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching moodboard cards:", error);
      } else {
        setCards(
          (data || []).map((c: any) => ({
            id: c.id,
            type: c.type,
            title: c.title,
            content: c.content,
            author: c.author,
            image_url: c.image_url,
            tag: c.tag,
            x: c.x || 100,
            y: c.y || 100,
            colors: c.colors,
            liked: c.liked,
          }))
        );
      }
    } catch (e) {
      console.error("Moodboard fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (id: string, currentLiked?: boolean) => {
    const updatedLiked = !currentLiked;
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, liked: updatedLiked } : c))
    );

    await supabase
      .from("moodboard_cards")
      .update({ liked: updatedLiked })
      .eq("id", id);
  };

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newX = Math.floor(Math.random() * 300) + 120;
    const newY = Math.floor(Math.random() * 300) + 120;

    const insertPayload = {
      type: newType,
      title: newTitle,
      content: newContent || null,
      image_url:
        newType === "image"
          ? newImageUrl ||
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
          : null,
      x: newX,
      y: newY,
      liked: false,
    };

    const { data, error } = await supabase
      .from("moodboard_cards")
      .insert([insertPayload])
      .select();

    if (error) {
      alert("Error adding card: " + error.message);
    } else if (data && data[0]) {
      const dbCard = data[0];
      setCards((prev) => [
        ...prev,
        {
          id: dbCard.id,
          type: dbCard.type,
          title: dbCard.title,
          content: dbCard.content,
          author: dbCard.author,
          image_url: dbCard.image_url,
          tag: dbCard.tag,
          x: dbCard.x,
          y: dbCard.y,
          colors: dbCard.colors,
          liked: dbCard.liked,
        },
      ]);
    }

    setNewTitle("");
    setNewContent("");
    setNewImageUrl("");
    setShowAddModal(false);
  };

  return (
    <div className="flex h-screen text-on-surface bg-background overflow-hidden font-body">
      <Sidebar />

      <main className="flex-1 ml-64 relative overflow-hidden h-full canvas-grid">
        {/* Floating Canvas Toolbar */}
        <div className="absolute top-6 left-6 z-30 flex items-center gap-3 bg-surface-container-lowest/90 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-outline-variant/60 shadow-md">
          <div className="flex items-center gap-2 text-primary font-display font-bold text-base">
            <Layers className="w-5 h-5" />
            <span>Workspace Moodboard Canvas</span>
          </div>
          <div className="h-4 w-px bg-outline-variant/60"></div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-primary text-on-primary rounded-xl text-xs font-bold hover:opacity-90 transition-opacity shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Card</span>
          </button>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex items-center justify-center h-full text-primary gap-3">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-sm font-semibold">Loading Moodboard from Supabase...</span>
          </div>
        ) : (
          <>
            {/* SVG Connection Lines Layer */}
            {cards.length > 1 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <path
                  d="M 380 180 Q 400 180 440 180"
                  fill="none"
                  stroke="#964417"
                  strokeDasharray="4 4"
                  strokeWidth="1.5"
                  opacity="0.4"
                />
              </svg>
            )}

            {/* Canvas Items */}
            {cards.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <ImageIcon className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-on-surface mb-2">
                  Moodboard Canvas is Empty
                </h3>
                <p className="text-sm text-on-surface-variant max-w-md mb-6 leading-relaxed">
                  Start collecting research citations, brand colors, images, and visual notes directly into Supabase.
                </p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-6 py-3 bg-primary text-on-primary font-bold text-xs rounded-xl shadow-md hover:opacity-90 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add First Canvas Card</span>
                </button>
              </div>
            ) : (
              <div className="relative w-full h-full overflow-auto p-12 custom-scrollbar">
                {cards.map((card) => {
                  if (card.type === "research") {
                    return (
                      <div
                        key={card.id}
                        style={{ left: card.x, top: card.y }}
                        className="absolute w-80 p-6 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing group z-10"
                      >
                        <div className="flex items-center gap-2 mb-3 text-tertiary">
                          <BookOpen className="w-4 h-4" />
                          <span className="text-[10px] font-bold uppercase tracking-wider">
                            {card.title}
                          </span>
                        </div>
                        <p className="font-body text-sm text-on-surface mb-4 italic leading-relaxed">
                          {card.content}
                        </p>
                        <div className="flex justify-between items-center text-xs text-on-surface-variant font-medium">
                          <span>{card.author || "Research Citation"}</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                        </div>
                      </div>
                    );
                  }

                  if (card.type === "image") {
                    return (
                      <div
                        key={card.id}
                        style={{ left: card.x, top: card.y }}
                        className="absolute w-80 group cursor-grab active:cursor-grabbing z-10"
                      >
                        <div className="aspect-[4/3] bg-surface-container-high rounded-xl overflow-hidden border border-outline-variant/60 shadow-md group-hover:shadow-lg transition-all">
                          <img
                            src={card.image_url}
                            alt={card.title || "Moodboard Image"}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="mt-2.5 flex items-center justify-between px-2 text-xs font-semibold text-on-surface-variant">
                          <span>{card.title}</span>
                          <button
                            onClick={() => toggleLike(card.id, card.liked)}
                            className="text-primary hover:scale-110 transition-transform"
                          >
                            <Heart
                              className="w-4 h-4"
                              fill={card.liked ? "currentColor" : "none"}
                            />
                          </button>
                        </div>
                      </div>
                    );
                  }

                  if (card.type === "note") {
                    return (
                      <div
                        key={card.id}
                        style={{ left: card.x, top: card.y }}
                        className="absolute w-64 p-6 bg-surface-container border border-outline-variant rounded-lg -rotate-1 shadow-md hover:rotate-0 transition-transform cursor-grab active:cursor-grabbing z-10"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-primary/60"></div>
                          <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                            {card.title}
                          </span>
                        </div>
                        <p className="font-handwriting text-xl leading-tight text-on-surface">
                          {card.content}
                        </p>
                      </div>
                    );
                  }

                  if (card.type === "synthesis") {
                    return (
                      <div
                        key={card.id}
                        style={{ left: card.x, top: card.y }}
                        className="absolute w-96 bg-primary text-on-primary p-7 rounded-2xl shadow-xl z-20 cursor-grab active:cursor-grabbing"
                      >
                        <div className="flex items-center gap-2.5 mb-3">
                          <Brain className="w-6 h-6" />
                          <h3 className="font-display text-lg font-bold">AI Synthesis</h3>
                        </div>
                        <p className="text-sm opacity-90 leading-relaxed mb-5">
                          {card.content}
                        </p>
                      </div>
                    );
                  }

                  if (card.type === "palette") {
                    return (
                      <div
                        key={card.id}
                        style={{ left: card.x, top: card.y }}
                        className="absolute w-72 p-5 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm z-10 cursor-grab active:cursor-grabbing"
                      >
                        <div className="flex items-center gap-2 mb-3 text-primary">
                          <Palette className="w-4 h-4" />
                          <span className="text-xs font-bold text-on-surface">
                            {card.title}
                          </span>
                        </div>
                        <div className="flex rounded-lg overflow-hidden h-12 border border-outline-variant/40 mb-3">
                          {card.colors?.map((c) => (
                            <div
                              key={c}
                              style={{ backgroundColor: c }}
                              className="flex-1 h-full"
                              title={c}
                            ></div>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            )}
          </>
        )}
      </main>

      {/* Add Card Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute right-4 top-4 text-on-surface-variant hover:text-on-surface"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-primary mb-2">
              <h3 className="font-display text-xl font-bold text-on-surface">
                Drop Item onto Moodboard
              </h3>
            </div>

            <form onSubmit={handleAddCard} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                  Card Type
                </label>
                <div className="flex gap-2">
                  {(["note", "research", "image"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setNewType(t)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold capitalize border transition-all ${
                        newType === t
                          ? "bg-primary text-on-primary border-primary"
                          : "border-outline-variant text-on-surface-variant hover:bg-surface-container"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Desert Stone Texture"
                  className="w-full px-4 py-2 rounded-xl bg-surface-container border border-outline-variant text-sm text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
                  required
                />
              </div>

              {newType === "image" && (
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-2 rounded-xl bg-surface-container border border-outline-variant text-sm text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                  Content / Citation Note
                </label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={3}
                  placeholder="Enter details or quote..."
                  className="w-full px-4 py-2 rounded-xl bg-surface-container border border-outline-variant text-sm text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
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
                  Save to Supabase
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
