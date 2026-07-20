"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  FolderOpen,
  Share2,
  Download,
  PlusCircle,
  Wand2,
  FileText,
  Star,
  Anchor,
  CheckCheck,
  Send,
  Copy,
  Check,
  X
} from "lucide-react";

export default function AiStudioView() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [promptText, setPromptText] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const [injectedContexts, setInjectedContexts] = useState([
    {
      id: "1",
      icon: "verified_user",
      title: "Brand Style Guide",
      content: "Minimalist, Premium, Warm-Tonal. Tone: Contemplative & Elevated.",
    },
    {
      id: "2",
      icon: "travel_explore",
      title: "Research Topic",
      content: "Luxury Eco-Tourism Trends 2026: Desert Biomes & Off-grid living.",
    },
    {
      id: "3",
      icon: "group",
      title: "Audience Persona",
      content: '"Conscious Collector": 35-55, High Net Worth, values solitude over status.',
    },
  ]);

  const [articleContent, setArticleContent] = useState({
    title: "Sustainable Oasis Campaign",
    wordCount: 482,
    readingTime: 3,
    body: `The concept of luxury is shifting. It is no longer about the gold-plated facade or the bustling center of a metropolis. Today, the ultimate luxury is silence, space, and a profound connection to the natural world. Our campaign, "Sustainable Oasis," aims to capture this zeitgeist through a lens of modern desert architecture.\n\nI. The Architecture of Solitude\nWe focus on low-slung profiles that hug the horizon. Materials are sourced directly from the landscape: rammed earth, locally quarried sandstone, and reclaimed cedar. These aren't just buildings; they are extensions of the geology itself.\n\n"In the desert, the mind expands to fill the void. AI becomes a tool not for speed, but for deeper inquiry."\n\nWe will deploy this across three primary channels: a coffee-table style digital lookbook, a series of long-form contemplative essays, and high-production short-form films that emphasize tactile sounds and slow movements.`,
  });

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const callOpenRouter = async (prompt: string, action?: string) => {
    setIsGenerating(true);
    triggerToast(action ? `Running OpenRouter AI: ${action}...` : "Generating AI response...");

    try {
      const activeContextStr = injectedContexts
        .map((c) => `${c.title}: ${c.content}`)
        .join(" | ");

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          action,
          context: activeContextStr,
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const generatedText = data.result;
      setArticleContent((prev) => {
        const newBody = prev.body + `\n\n[AI OpenRouter Output - ${action || "Prompt"}]:\n${generatedText}`;
        return {
          ...prev,
          body: newBody,
          wordCount: newBody.split(/\s+/).length,
        };
      });
      triggerToast(`AI Generation Complete! Draft updated.`);
    } catch (err: any) {
      triggerToast(`AI Error: ${err.message || "Failed to call OpenRouter"}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAction = (actionName: string, promptInstruction: string) => {
    callOpenRouter(
      `Based on the current article draft below, perform the action "${actionName}":\n\n${articleContent.body.slice(0, 800)}`,
      actionName
    );
  };

  const handleCustomPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim()) return;
    const userPrompt = promptText;
    setPromptText("");
    callOpenRouter(userPrompt);
  };

  const handleInjectNewContext = () => {
    const title = prompt("Enter context title (e.g., Tone Guide):");
    if (!title) return;
    const content = prompt("Enter context description:");
    if (!content) return;

    setInjectedContexts((prev) => [
      ...prev,
      { id: Date.now().toString(), icon: "lightbulb", title, content },
    ]);
    triggerToast(`Injected new context: ${title}`);
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="flex h-screen bg-background text-on-background overflow-hidden font-body">
      <Sidebar />

      <main className="flex-1 ml-0 lg:ml-64 pt-16 lg:pt-0 flex flex-col min-w-0 bg-background relative h-full">
        {/* Top Bar */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-8 border-b border-outline-variant/30 bg-background/80 backdrop-blur-md z-20 sticky top-0">
          <div className="flex items-center gap-2 sm:gap-4 truncate">
            <FolderOpen className="w-4 h-4 sm:w-5 sm:h-5 text-on-surface-variant shrink-0" />
            <div className="h-4 w-px bg-outline-variant hidden sm:block"></div>
            <h2 className="font-display text-sm sm:text-lg font-bold text-on-surface truncate">
              {articleContent.title}
            </h2>
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full ml-2 shrink-0">
              <div
                className={`w-2 h-2 rounded-full ${
                  isGenerating ? "bg-primary animate-ping" : "bg-tertiary"
                }`}
              ></div>
              <span className="text-xs font-semibold text-primary">
                {isGenerating ? "AI Generating..." : "API Ready"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 border border-outline-variant rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-surface-container-low transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <button
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-primary text-on-primary rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
        </header>

        {/* Workspace Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel: Active Memory */}
          <aside className="w-72 border-r border-outline-variant/30 bg-surface-container-lowest p-6 overflow-y-auto custom-scrollbar hidden xl:block">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                Active Memory
              </h3>
            </div>
            <div className="space-y-4">
              {injectedContexts.map((ctx) => (
                <div
                  key={ctx.id}
                  className="p-4 bg-surface-container rounded-xl border border-outline-variant hover:border-primary/40 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-[18px] text-primary">
                      {ctx.icon}
                    </span>
                    <span className="text-xs font-bold text-on-surface">{ctx.title}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant font-normal leading-relaxed">
                    {ctx.content}
                  </p>
                </div>
              ))}

              <button
                onClick={handleInjectNewContext}
                className="w-full py-3 border-2 border-dashed border-outline-variant rounded-xl text-xs font-bold text-outline hover:text-primary hover:border-primary transition-all flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Inject Context</span>
              </button>
            </div>
          </aside>

          {/* Center Editor Canvas */}
          <section className="flex-1 overflow-y-auto bg-surface flex justify-center p-4 sm:p-8 lg:p-14 custom-scrollbar">
            <div className="w-full max-w-3xl space-y-6 sm:space-y-8">
              <div className="space-y-3 border-b border-outline-variant/30 pb-6">
                <h1 className="font-display text-2xl sm:text-4xl font-bold text-on-background">
                  {articleContent.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-on-surface-variant text-xs font-medium">
                  <span>Word count: {articleContent.wordCount}</span>
                  <div className="w-1 h-1 rounded-full bg-outline-variant"></div>
                  <span>Reading time: {articleContent.readingTime} min</span>
                </div>
              </div>

              {/* Editable Prose Content */}
              <article className="prose prose-stone max-w-none text-body-lg text-on-background leading-relaxed">
                <textarea
                  value={articleContent.body}
                  onChange={(e) =>
                    setArticleContent((prev) => ({
                      ...prev,
                      body: e.target.value,
                      wordCount: e.target.value.split(/\s+/).length,
                    }))
                  }
                  className="w-full min-h-[350px] sm:min-h-[450px] bg-transparent border-none focus:outline-none font-body text-sm sm:text-base leading-relaxed text-on-surface resize-y"
                />
              </article>

              {/* Mobile Prompt Actions Bar */}
              <div className="lg:hidden border-t border-outline-variant/30 pt-4 pb-20 space-y-4">
                <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  Quick AI Actions
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleAction("Summarize", "Summarize core points")}
                    className="p-3 rounded-xl border border-outline-variant bg-surface-container-low text-xs font-bold text-on-surface flex items-center justify-between"
                  >
                    <span>Summarize</span>
                    <FileText className="w-3.5 h-3.5 text-primary" />
                  </button>
                  <button
                    onClick={() => handleAction("Improve EEAT", "Improve authority")}
                    className="p-3 rounded-xl border border-outline-variant bg-surface-container-low text-xs font-bold text-on-surface flex items-center justify-between"
                  >
                    <span>Improve EEAT</span>
                    <Star className="w-3.5 h-3.5 text-primary" />
                  </button>
                  <button
                    onClick={() => handleAction("Generate Hooks", "Social hooks")}
                    className="p-3 rounded-xl border border-outline-variant bg-surface-container-low text-xs font-bold text-on-surface flex items-center justify-between"
                  >
                    <span>Generate Hooks</span>
                    <Anchor className="w-3.5 h-3.5 text-primary" />
                  </button>
                  <button
                    onClick={() => handleAction("Fact Check", "Fact check claims")}
                    className="p-3 rounded-xl border border-outline-variant bg-surface-container-low text-xs font-bold text-on-surface flex items-center justify-between"
                  >
                    <span>Fact Check</span>
                    <CheckCheck className="w-3.5 h-3.5 text-primary" />
                  </button>
                </div>

                <form onSubmit={handleCustomPrompt} className="relative mt-3">
                  <textarea
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    placeholder="Ask OpenRouter AI..."
                    className="w-full bg-surface-container-high border-none rounded-xl p-3 pr-10 text-xs focus:ring-2 focus:ring-primary h-20 resize-none focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!promptText.trim() || isGenerating}
                    className="absolute right-2 bottom-2 p-2 bg-primary text-on-primary rounded-lg"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>

              <div className="h-10"></div>
            </div>
          </section>

          {/* Right Panel: Focused Actions (Desktop) */}
          <aside className="w-80 border-l border-outline-variant/30 bg-surface-container-lowest p-6 flex flex-col justify-between hidden lg:flex">
            <div>
              <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">
                OpenRouter AI Actions
              </h3>

              <div className="space-y-3">
                <button
                  onClick={() => handleAction("Summarize", "Summarize core points")}
                  className="w-full group text-left p-4 rounded-xl border border-outline-variant bg-surface-container-low hover:bg-surface-container-high hover:border-primary transition-all duration-300 shadow-2xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-on-surface">Summarize</span>
                    <FileText className="w-4 h-4 text-outline group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-xs text-on-surface-variant">
                    Condense draft thesis into 3 executive bullet points.
                  </p>
                </button>

                <button
                  onClick={() => handleAction("Improve EEAT", "Improve authority")}
                  className="w-full group text-left p-4 rounded-xl border border-outline-variant bg-surface-container-low hover:bg-surface-container-high hover:border-primary transition-all duration-300 shadow-2xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-on-surface">Improve EEAT</span>
                    <Star className="w-4 h-4 text-outline group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-xs text-on-surface-variant">
                    Enhance Experience, Expertise, Authoritativeness & Trust.
                  </p>
                </button>

                <button
                  onClick={() => handleAction("Generate Hooks", "Social hooks")}
                  className="w-full group text-left p-4 rounded-xl border border-outline-variant bg-surface-container-low hover:bg-surface-container-high hover:border-primary transition-all duration-300 shadow-2xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-on-surface">Generate Hooks</span>
                    <Anchor className="w-4 h-4 text-outline group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-xs text-on-surface-variant">
                    Create 5 viral headlines for social distribution.
                  </p>
                </button>

                <button
                  onClick={() => handleAction("Fact Check", "Fact check claims")}
                  className="w-full group text-left p-4 rounded-xl border border-outline-variant bg-surface-container-low hover:bg-surface-container-high hover:border-primary transition-all duration-300 shadow-2xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-on-surface">Fact Check</span>
                    <CheckCheck className="w-4 h-4 text-outline group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-xs text-on-surface-variant">
                    Verify environmental claims and architectural specs.
                  </p>
                </button>
              </div>
            </div>

            {/* Prompt Input Box */}
            <div className="border-t border-outline-variant/30 pt-4">
              <form onSubmit={handleCustomPrompt} className="relative">
                <textarea
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="Ask OpenRouter AI to write, expand, or research..."
                  className="w-full bg-surface-container-high border-none rounded-xl p-3.5 pr-11 text-xs font-medium placeholder:text-outline focus:ring-2 focus:ring-primary h-24 resize-none focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!promptText.trim() || isGenerating}
                  className="absolute right-2.5 bottom-2.5 p-2 bg-primary text-on-primary rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </aside>
        </div>
      </main>

      {/* Floating Action Feedback (Toast) */}
      {toastMessage && (
        <div className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-sm w-full px-4">
          <div className="bg-inverse-surface text-inverse-on-surface px-5 py-3 rounded-full flex items-center justify-center gap-3 shadow-2xl border border-outline/20 text-center">
            <Wand2 className="w-4 h-4 text-primary-fixed-dim animate-spin shrink-0" />
            <span className="text-xs font-semibold truncate">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute right-4 top-4 text-on-surface-variant hover:text-on-surface"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-display text-xl font-bold text-on-surface mb-2">
              Share Workspace Draft
            </h3>
            <p className="text-xs text-on-surface-variant mb-4">
              Anyone with this link can view the live draft and active memory references.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value="https://contentbrain.ai/share/oasis-campaign-v2"
                className="flex-1 bg-surface-container px-3 py-2 rounded-xl text-xs border border-outline-variant text-on-surface"
              />
              <button
                onClick={handleCopyShareLink}
                className="px-4 py-2 bg-primary text-on-primary rounded-xl text-xs font-semibold flex items-center gap-1.5"
              >
                {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowExportModal(false)}
              className="absolute right-4 top-4 text-on-surface-variant hover:text-on-surface"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-display text-xl font-bold text-on-surface mb-2">
              Export Content
            </h3>
            <p className="text-xs text-on-surface-variant mb-4">
              Select format to export your draft with embedded memory citations.
            </p>
            <div className="space-y-2">
              {["Markdown (.md)", "PDF Document (.pdf)", "HTML Package (.html)", "Raw Text (.txt)"].map(
                (fmt) => (
                  <button
                    key={fmt}
                    onClick={() => {
                      triggerToast(`Exporting in ${fmt}...`);
                      setShowExportModal(false);
                    }}
                    className="w-full p-3 rounded-xl border border-outline-variant hover:border-primary hover:bg-surface-container flex items-center justify-between text-xs font-semibold text-on-surface transition-all"
                  >
                    <span>{fmt}</span>
                    <Download className="w-4 h-4 text-outline" />
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
