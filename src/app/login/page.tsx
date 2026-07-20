"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Mail, Lock, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        if (data.session) {
          setSuccessMsg("Account created! Redirecting to workspace...");
          setTimeout(() => router.push("/dashboard"), 1200);
        } else {
          setSuccessMsg("Check your email to confirm registration!");
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.session) {
          setSuccessMsg("Authenticated! Opening Digital Sanctuary...");
          setTimeout(() => router.push("/dashboard"), 1000);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Authentication failed. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col justify-center items-center p-6 hero-gradient font-body">
      <Link href="/" className="mb-8 block text-center group">
        <h1 className="font-display text-3xl font-extrabold text-primary tracking-tight group-hover:opacity-90 transition-opacity">
          Content Brain
        </h1>
        <p className="text-xs text-on-surface-variant uppercase tracking-widest mt-1">
          The Digital Sanctuary for Thought
        </p>
      </Link>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl max-w-md w-full p-8 shadow-2xl relative">
        <div className="flex items-center gap-2 text-primary mb-2">
          <h2 className="font-display text-2xl font-bold text-on-surface">
            {isSignUp ? "Create Workspace Account" : "Sign In to Content Brain"}
          </h2>
        </div>
        <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
          {isSignUp
            ? "Initialize your permanent knowledge sanctuary with email & password."
            : "Access your persistent vector memory and AI studio workspace."}
        </p>

        {errorMsg && (
          <div className="mb-4 p-3 bg-error-container text-on-error-container rounded-xl text-xs flex items-center gap-2 border border-error/20">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-tertiary-fixed text-on-tertiary-fixed rounded-xl text-xs flex items-center gap-2 border border-tertiary-fixed-dim">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@contentbrain.ai"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                required
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-on-primary font-bold text-xs rounded-xl hover:opacity-90 transition-all shadow-xs flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
          >
            <span>{loading ? "Authenticating..." : isSignUp ? "Sign Up" : "Sign In"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-on-surface-variant border-t border-outline-variant/30 pt-4">
          <span>{isSignUp ? "Already have an account?" : "Don't have an account yet?"} </span>
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
            className="text-primary font-bold hover:underline ml-1"
          >
            {isSignUp ? "Sign In" : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
}
