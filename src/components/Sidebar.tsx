"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Settings, HelpCircle, X, LogOut, LogIn, Loader2 } from "lucide-react";

interface SidebarProps {
  onNewProject?: () => void;
}

export default function Sidebar({ onNewProject }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [showNewModal, setShowNewModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectCategory, setProjectCategory] = useState("Marketing");
  const [creating, setCreating] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim()) return;

    setCreating(true);
    try {
      const { data, error } = await supabase
        .from("projects")
        .insert([
          {
            title: projectName,
            category: projectCategory,
            sub_category: "Active Draft",
            description: `New ${projectCategory} initiative created in Content Brain workspace.`,
            image_url:
              "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
            user_id: user?.id,
          },
        ])
        .select();

      if (error) throw error;

      setProjectName("");
      setShowNewModal(false);
      router.push("/studio");
    } catch (err: any) {
      alert("Error creating project in Supabase: " + err.message);
    } finally {
      setCreating(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  const navItems = [
    { label: "Workspace", icon: "dashboard", href: "/dashboard" },
    { label: "Research", icon: "menu_book", href: "/research" },
    { label: "Moodboard", icon: "auto_awesome_motion", href: "/moodboard" },
    { label: "Brain Memory", icon: "psychology", href: "/memory" },
    { label: "AI Studio", icon: "temp_preferences_custom", href: "/studio" },
    { label: "Landing Site", icon: "public", href: "/" },
  ];

  return (
    <>
      <aside className="fixed left-0 top-0 h-screen w-64 bg-surface-container-low border-r border-outline-variant flex flex-col py-6 z-50">
        {/* Brand Header */}
        <div className="px-6 mb-8">
          <Link href="/" className="group block">
            <h1 className="font-display text-2xl font-bold text-primary tracking-tight group-hover:opacity-90 transition-opacity">
              Content Brain
            </h1>
            <p className="text-xs text-on-surface-variant/70 uppercase tracking-widest font-medium mt-0.5">
              Pro Workspace
            </p>
          </Link>
        </div>

        {/* New Project CTA */}
        <div className="px-3 mb-4">
          <button
            onClick={() => setShowNewModal(true)}
            className="w-full bg-primary text-on-primary font-medium text-sm py-3 px-4 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-sm active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1 px-3 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{
                    fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User profile & Bottom Links */}
        <div className="mt-auto px-3 pt-4 border-t border-outline-variant/30 space-y-1">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg text-xs font-semibold transition-all"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>
          <button
            onClick={() => alert("Content Brain Support: assistance@contentbrain.ai")}
            className="w-full flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg text-xs font-semibold transition-all text-left"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Support</span>
          </button>

          {user ? (
            <div className="pt-2 border-t border-outline-variant/20">
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-primary-fixed-dim border border-outline-variant flex items-center justify-center text-primary font-bold text-xs uppercase shrink-0">
                    {user.email?.slice(0, 2) || "US"}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-on-surface truncate">
                      {user.email}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-1.5 text-on-surface-variant hover:text-error transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-2 border-t border-outline-variant/20">
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 text-primary font-bold text-xs hover:bg-surface-container-high rounded-lg transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In / Register</span>
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* New Project Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowNewModal(false)}
              className="absolute right-4 top-4 text-on-surface-variant hover:text-on-surface"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-primary mb-2">
              <h3 className="font-display text-xl font-bold text-on-surface">
                Create New Project
              </h3>
            </div>
            <p className="text-sm text-on-surface-variant mb-6">
              Initialize a digital sanctuary for your next campaign or research inquiry.
            </p>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g., Sustainable Oasis Campaign"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant text-on-surface focus:ring-2 focus:ring-primary focus:outline-none text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
                  Category
                </label>
                <select
                  value={projectCategory}
                  onChange={(e) => setProjectCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant text-on-surface focus:ring-2 focus:ring-primary focus:outline-none text-sm"
                >
                  <option value="Marketing">Marketing & Campaigns</option>
                  <option value="Research">Deep Research Essay</option>
                  <option value="Brand Strategy">Brand Strategy</option>
                  <option value="Product">UI & Product Design</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-on-surface-variant hover:bg-surface-container-high"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-5 py-2 rounded-xl text-sm font-medium bg-primary text-on-primary hover:opacity-90 shadow-sm flex items-center gap-1.5"
                >
                  {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  <span>{creating ? "Creating..." : "Create Project"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
