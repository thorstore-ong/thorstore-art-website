"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRegister } from "@/lib/hooks/useAuth";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerMutation = useRegister();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      await registerMutation.mutateAsync({ name, email, password });
      router.push("/");
    } catch (err) {}
  };

  const errorMessage = (registerMutation.error as any)?.response?.data;

  return (
    <div className="min-h-screen bg-[var(--blush)] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-titan text-3xl text-[var(--charcoal)] mb-2">
            !! Join the club <span className="text-[var(--pink)]">✦</span>
          </h1>
          <p className="text-sm text-[var(--muted)]">Create your account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-extrabold text-[var(--muted)] mb-1 block">
                Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl border-2 border-[var(--pink-border)] focus:outline-none focus:border-[var(--pink)] text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-extrabold text-[var(--muted)] mb-1 block">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-[var(--pink-border)] focus:outline-none focus:border-[var(--pink)] text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-extrabold text-[var(--muted)] mb-1 block">
                Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-4 py-3 rounded-xl border-2 border-[var(--pink-border)] focus:outline-none focus:border-[var(--pink)] text-sm"
              />
            </div>

            {registerMutation.isError && (
              <div className="bg-red-50 border-2 border-red-200 text-red-600 text-sm font-semibold rounded-xl px-4 py-3">
                {errorMessage || "Something went wrong. Please try again."}
              </div>
            )}

            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="w-full bg-[var(--pink)] text-white font-extrabold py-4 rounded-full hover:bg-[#ff3b9a] transition-colors disabled:opacity-50 mt-2"
            >
              {registerMutation.isPending ? "Creating account..." : "Sign up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
