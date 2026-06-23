"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLogin } from "@/lib/hooks/useAuth";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useLogin();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      await loginMutation.mutateAsync({ email, password });
      // Successful login — go back to wherever they came from
      router.push(redirectTo);
    } catch (err) {
      // Error is already captured in loginMutation.error — no need to do anything else
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <h1 className="font-titan text-3xl text-[var(--charcoal)] mb-2">
          Welcome back <span className="text-[var(--pink)]">✦</span>
        </h1>
        <p className="text-sm text-[var(--muted)]">
          Log in to your Thorstore Art account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl border-2 border-[var(--pink-border)] focus:outline-none focus:border-[var(--pink)] text-sm"
          />
        </div>

        {/* Error message from the API */}
        {loginMutation.isError && (
          <div className="bg-red-50 border-2 border-red-200 text-red-600 text-sm font-semibold rounded-xl px-4 py-3">
            Invalid email or password.
          </div>
        )}

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full bg-[var(--pink)] text-white font-extrabold py-4 rounded-full hover:bg-[#ff3b9a] transition-colors disabled:opacity-50 mt-2"
        >
          {loginMutation.isPending ? "Logging in..." : "Log in ✦"}
        </button>
      </form>

      <p className="text-center text-sm text-[var(--muted)] mt-6">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-extrabold text-[var(--pink)] hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[var(--blush)] flex items-center justify-center px-6 py-12">
      <Suspense
        fallback={
          <div className="w-full max-w-sm text-center">
            <div className="text-4xl mb-4">✦</div>
            <p className="text-sm text-[var(--muted)]">...Loading </p>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
