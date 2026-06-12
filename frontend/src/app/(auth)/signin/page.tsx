"use client";

import { useState } from "react";
import { api } from "../../../../lib/axios";
import { useAuthStore } from "../../../../store/store";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  console.log(process.env.NEXT_PUBLIC_API_URL);
  
  const setAuth:any = useAuthStore((state:any)=>state.setAuth)
  const navigate = useRouter();
    
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", { email, password });
     
      setAuth(response.data.data,response.data.token);
      navigate.push("/dashboard");
    } catch (err: any) {
      console.log(err);
      setError(err?.response?.data?.message || "Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090b] text-zinc-100 px-4 relative overflow-hidden">
      
      {/* Background Orbs / Glow (Landing page se matching) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-emerald-500/10 blur-[120px] pointer-events-none -z-10" />

      <div className="w-full max-w-md relative group">
        {/* Subtle border glow effect */}
        <div className="absolute -inset-0.5 bg-linear-to-r from-emerald-500/30 to-teal-500/30 rounded-2xl blur opacity-30 transition duration-1000 group-hover:opacity-40" />
        
        {/* Main Card */}
        <div className="relative w-full rounded-2xl bg-zinc-900/80 border border-zinc-800 p-8 shadow-2xl backdrop-blur-xl">
          
          {/* Logo / Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-10 h-10 bg-linear-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <svg className="w-5 h-5 text-black font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" />
              </svg>
            </div>
          </div>

          <h1 className="mb-2 text-center text-white text-3xl font-extrabold tracking-tight">
            Welcome back
          </h1>

          <p className="mb-8 text-center text-zinc-400 text-sm">
            Enter your details to access your pantry dashboard.
          </p>

          {/* Error Message Alert */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-zinc-300 text-xs font-semibold uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full text-zinc-100 bg-zinc-950/50 rounded-xl border border-zinc-800 px-4 py-3 text-sm outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all placeholder:text-zinc-600"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-zinc-300 text-xs font-semibold uppercase tracking-wider">
                  Password
                </label>
                <a href="#" className="text-xs text-zinc-500 hover:text-emerald-400 transition-colors">
                  Forgot?
                </a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-zinc-100 bg-zinc-950/50 rounded-xl border border-zinc-800 px-4 py-3 text-sm outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all placeholder:text-zinc-600"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 py-3 text-zinc-950 font-bold text-sm shadow-lg shadow-emerald-500/10 transition-all hover:opacity-95 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-zinc-950" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-zinc-500">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-4 transition-colors"
            >
              Sign Up free
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}