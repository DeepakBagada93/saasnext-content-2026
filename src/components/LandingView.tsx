"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Play, Shield, Zap, Compass } from "lucide-react";

export default function LandingView() {
  const [activeDemoTab, setActiveDemoTab] = useState<"ai" | "moodboard" | "memory">("ai");
  const [demoPrompt, setDemoPrompt] = useState("Architectural research on rammed earth");
  const [demoResult, setDemoResult] = useState(
    "The concept of luxury is shifting towards silence, space, and local natural materials..."
  );

  const handleRunDemo = () => {
    setDemoResult(`Generating deep synthesis for "${demoPrompt}"... Synchronizing with Brain Memory Graph...`);
    setTimeout(() => {
      setDemoResult(
        `[Synthesized Output]: Modern desert UIs combine warm sand (#FEF8F5) with terracotta (#964417) to reduce cognitive fatigue during extended writing sessions.`
      );
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background text-on-background overflow-x-hidden font-body">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-outline-variant/30">
        <nav className="flex justify-between items-center px-6 md:px-16 w-full max-w-7xl mx-auto h-20">
          <Link href="/" className="font-display text-2xl font-bold text-primary tracking-tight">
            Content Brain
          </Link>
          <div className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">
              Platform
            </a>
            <a href="#demo" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">
              Interactive Demo
            </a>
            <a href="#pricing" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">
              Pricing
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-xl text-primary font-bold text-xs hover:bg-surface-container-high transition-all"
            >
              Sign In
            </Link>
            <Link
              href="/login"
              className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-xs hover:opacity-90 active:scale-98 transition-all"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative w-full py-16 md:py-24 hero-gradient overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 md:px-12 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-xs font-semibold mb-6 border border-outline-variant/30 shadow-2xs">
              <span>Introducing The Digital Sanctuary for Thought</span>
            </div>
            <h1 className="font-display text-4xl md:text-7xl font-extrabold mb-6 max-w-4xl mx-auto text-primary leading-tight">
              Research. Think. Create.
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
              Transform scattered research into a permanent knowledge system that continuously improves every piece of content you create.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-md hover:opacity-90 flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <span>Enter Pro Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#demo"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-surface-container-lowest text-on-surface border border-outline-variant font-bold text-sm hover:bg-surface-container transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 text-primary" />
                <span>Try Live Interactive Demo</span>
              </a>
            </div>

            {/* App Mockup Preview */}
            <div className="relative max-w-5xl mx-auto group">
              <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-95 -z-10"></div>
              <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-2xl overflow-hidden aspect-[16/10] flex">
                <div className="w-1/4 border-r border-outline-variant bg-surface-container-low p-6 hidden md:flex flex-col justify-between text-left">
                  <div>
                    <div className="text-primary font-display text-xl font-bold mb-6">Content Brain</div>
                    <div className="space-y-3">
                      <div className="h-3 bg-primary/20 rounded-md w-full"></div>
                      <div className="h-3 bg-on-surface-variant/10 rounded-md w-3/4"></div>
                      <div className="h-3 bg-on-surface-variant/10 rounded-md w-5/6"></div>
                    </div>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-xl text-xs text-primary font-semibold">
                    Vector Memory Active
                  </div>
                </div>
                <div className="flex-1 p-8 bg-surface text-left overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="h-6 w-36 bg-surface-container-high rounded-lg"></div>
                      <div className="h-6 w-20 bg-primary/20 rounded-lg"></div>
                    </div>
                    <div className="font-display text-2xl font-bold text-on-surface mb-3">
                      Sustainable Oasis Campaign
                    </div>
                    <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                      The concept of luxury is shifting towards silence, space, and a profound connection to the natural world...
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="desert-stone-card p-4 rounded-xl text-xs">
                        <span className="font-bold text-primary block mb-1">Brand Voice</span>
                        Contemplative & Elevated
                      </div>
                      <div className="desert-stone-card p-4 rounded-xl text-xs">
                        <span className="font-bold text-tertiary block mb-1">Knowledge Graph</span>
                        12 Connected Sources
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section id="demo" className="py-20 px-6 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-3">
              Experience Content Brain Live
            </h2>
            <p className="text-sm text-on-surface-variant">
              Test how vector memory and prompt studio interact seamlessly in real time.
            </p>
          </div>

          <div className="desert-stone-card rounded-2xl p-6 md:p-8 shadow-md">
            <div className="flex gap-2 mb-6 border-b border-outline-variant/40 pb-4">
              {(["ai", "moodboard", "memory"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveDemoTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                    activeDemoTab === tab
                      ? "bg-primary text-on-primary"
                      : "text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                >
                  {tab === "ai" ? "AI Studio Prompt" : tab === "moodboard" ? "Moodboard Canvas" : "Memory Graph"}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={demoPrompt}
                  onChange={(e) => setDemoPrompt(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ask AI studio..."
                />
                <button
                  onClick={handleRunDemo}
                  className="px-6 py-3 bg-primary text-on-primary font-bold text-xs rounded-xl hover:opacity-90 shadow-xs"
                >
                  Synthesize
                </button>
              </div>

              <div className="p-5 bg-surface-container-lowest rounded-xl border border-outline-variant/60 min-h-[100px] text-sm text-on-surface font-body leading-relaxed">
                {demoResult}
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-20 bg-surface-container-low px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-on-surface mb-4">
                Designed for Thoughtful Creators
              </h2>
              <p className="text-base text-on-surface-variant max-w-2xl mx-auto">
                No generic AI wrappers. A dedicated digital sanctuary built around architectural clarity and persistent vector memory.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="desert-stone-card p-8 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">Permanent Memory</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Your brand guidelines, tone rules, and audience personas are stored in vector embeddings so every draft stays perfectly aligned.
                </p>
              </div>

              <div className="desert-stone-card p-8 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">AI Content Studio</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Generate EEAT-enhanced drafts, viral hooks, and executive summaries with real-time word count & reading time metrics.
                </p>
              </div>

              <div className="desert-stone-card p-8 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-6">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">Infinite Moodboard</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Collect visual references, brand swatches, and research citations on an infinite canvas with SVG relationship lines.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section id="pricing" className="py-20 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-on-surface mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-sm text-on-surface-variant">
              Invest in your knowledge sanctuary. Upgrade anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free */}
            <div className="desert-stone-card p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="font-display text-xl font-bold mb-2">Free Starter</h3>
                <p className="text-3xl font-display font-bold mb-4">$0 <span className="text-xs text-on-surface-variant font-normal">/ month</span></p>
                <ul className="space-y-3 text-xs text-on-surface-variant mb-8">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> 3 Workspace Projects</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> 500 AI Studio Credits</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Basic Memory Storage</li>
                </ul>
              </div>
              <Link href="/login" className="w-full py-3 rounded-xl bg-surface-container-high text-on-surface text-xs font-bold text-center block">
                Get Started Free
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-primary text-on-primary p-8 rounded-2xl flex flex-col justify-between shadow-xl scale-105 border-2 border-primary-container">
              <div>
                <div className="inline-block px-3 py-1 bg-on-primary/20 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">Most Popular</div>
                <h3 className="font-display text-xl font-bold mb-2">Pro Sanctuary</h3>
                <p className="text-3xl font-display font-bold mb-4">$29 <span className="text-xs opacity-80 font-normal">/ month</span></p>
                <ul className="space-y-3 text-xs opacity-90 mb-8">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Unlimited Projects</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Infinite AI Studio Generations</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Advanced Knowledge Graph Vector Memory</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Moodboard SVG Canvas</li>
                </ul>
              </div>
              <Link href="/login" className="w-full py-3 rounded-xl bg-on-primary text-primary text-xs font-bold text-center block hover:opacity-90">
                Start 14-Day Trial
              </Link>
            </div>

            {/* Enterprise */}
            <div className="desert-stone-card p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="font-display text-xl font-bold mb-2">Enterprise</h3>
                <p className="text-3xl font-display font-bold mb-4">$99 <span className="text-xs text-on-surface-variant font-normal">/ month</span></p>
                <ul className="space-y-3 text-xs text-on-surface-variant mb-8">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Custom Team Workspaces</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Dedicated API & Stitch Integration</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> SLA & Priority Support</li>
                </ul>
              </div>
              <button onClick={() => alert("Contacting sales team...")} className="w-full py-3 rounded-xl bg-surface-container-high text-on-surface text-xs font-bold text-center block">
                Contact Sales
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant/30 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-on-surface-variant">
          <div>
            <span className="font-display text-lg font-bold text-primary block mb-1">Content Brain</span>
            <span>&copy; 2026 Content Brain AI. The Digital Sanctuary for Thought.</span>
          </div>
          <div className="flex gap-6">
            <Link href="/dashboard" className="hover:text-primary">Workspace</Link>
            <Link href="/studio" className="hover:text-primary">AI Studio</Link>
            <Link href="/moodboard" className="hover:text-primary">Moodboard</Link>
            <Link href="/memory" className="hover:text-primary">Knowledge Graph</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
