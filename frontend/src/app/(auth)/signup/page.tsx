"use client";

import { useState } from "react";
import { api } from "../../../../lib/axios";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== cpassword) {
      setError("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("/auth/register", { name, email, password });
      console.log(response.data);
      // Success hone par signin page par redirect karein
      navigate.push("/signin");
    } catch (err: any) {
      console.log(err);
      setError(err?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090b] text-zinc-100 px-4 relative overflow-hidden">
      
      {/* Background Glowing Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-teal-500/10 blur-[130px] pointer-events-none -z-10" />

      <div className="w-full max-w-md relative group my-8">
        {/* Border glow decoration */}
        <div className="absolute -inset-0.5 bg-linear-to-r from-teal-500/30 to-emerald-500/30 rounded-2xl blur opacity-30 transition duration-1000 group-hover:opacity-40" />
        
        {/* Main Card */}
        <div className="relative w-full rounded-2xl bg-zinc-900/80 border border-zinc-800 p-8 shadow-2xl backdrop-blur-xl">
          
          {/* Logo / Brand Icon */}
          <div className="flex justify-center mb-5">
            <div className="w-10 h-10 bg-linear-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/10">
              <svg className="w-5 h-5 text-black font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" />
              </svg>
            </div>
          </div>

          <h1 className="mb-2 text-center text-white text-3xl font-extrabold tracking-tight">
            Create Account
          </h1>

          <p className="mb-6 text-center text-zinc-400 text-sm">
            Sign up to start managing your household inventory.
          </p>

          {/* Dynamic Error Alert Banner */}
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-zinc-300 text-xs font-semibold uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                placeholder="John Doe"
                onChange={(e) => setName(e.target.value)}
                className="w-full text-zinc-100 bg-zinc-950/50 rounded-xl border border-zinc-800 px-4 py-2.5 text-sm outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all placeholder:text-zinc-600"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-zinc-300 text-xs font-semibold uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-zinc-100 bg-zinc-950/50 rounded-xl border border-zinc-800 px-4 py-2.5 text-sm outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all placeholder:text-zinc-600"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-zinc-300 text-xs font-semibold uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-zinc-100 bg-zinc-950/50 rounded-xl border border-zinc-800 px-4 py-2.5 text-sm outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all placeholder:text-zinc-600"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-zinc-300 text-xs font-semibold uppercase tracking-wider">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={cpassword}
                placeholder="••••••••"
                onChange={(e) => setCpassword(e.target.value)}
                className="w-full text-zinc-100 bg-zinc-950/50 rounded-xl border border-zinc-800 px-4 py-2.5 text-sm outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all placeholder:text-zinc-600"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 rounded-xl bg-linear-to-r from-teal-500 to-emerald-500 py-3 text-zinc-950 font-bold text-sm shadow-lg shadow-teal-500/10 transition-all hover:opacity-95 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-zinc-950" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <a
              href="/signin"
              className="font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-4 transition-colors"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}