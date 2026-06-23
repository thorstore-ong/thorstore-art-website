"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { token, isAdmin } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!token || !isAdmin()) {
      router.push("/");
    }
  }, [mounted, token, router]);

  if (!mounted) return null;

  if (!token || !isAdmin()) return null;

  const tabs = [
    { href: "/admin/products", label: "Products" },
    { href: "/admin/orders", label: "Orders" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--dark)] from-[70%] to-[var(--blush)]">
      <div className="bg-[var(--dark-2)] px-6 md:px-10 py-6">
        <h1 className="font-titan text-2xl text-[var(--blush)] mb-1">
          Admin <span className="text-[var(--pink)]">✦</span>
        </h1>
        <p className="text-xs text-white/40">Thorstore Art dashboard</p>
      </div>

      <div className="bg-[var(--dark-2)] text-white border-b border-[var(--pink-border)] px-6 md:px-10">
        <div className="flex gap-2">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-4 py-3 text-sm font-extrabols border-b-2 transition-colors 
                 ${isActive ? "border-[var(--pink)] text-[var(--pink)]" : "border-transparent text-[var(--muted)] hover:text-[var(--lavender)]"}`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="px-6 md:px-10 py-8">{children}</div>
    </div>
  );
}
