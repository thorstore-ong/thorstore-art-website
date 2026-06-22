"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getMyOrders } from "@/lib/api/orders";
import { useAuthStore } from "@/store/authStore";
import OrderCard from "@/components/account/OrderCard";

export default function MyOrdersPage() {
  const router = useRouter();
  const { token } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !token) {
      router.push("/login?redirect=/account/orders");
    }
  }, [mounted, token, router]);

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["my-orders"],
    queryFn: getMyOrders,
    enabled: mounted && !!token,
  });

  if (!mounted || !token) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[var(--blush)]">
      <div className="max-w-2xl mx-auto px-6 md:px-10 py-10">
        <h1 className="font-titan text-3xl text-[var(--charcoal)] mb-8">
          My Orders <span className="text-[var(--pink)]">✦</span>
        </h1>

        {isLoading && (
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border-2 border-[var(--pink-border)] h-40 animate-pulse"
              />
            ))}
          </div>
        )}

        {!isLoading && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && orders.length === 0 && (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">📦</div>
            <p className="font-titan text-xl text-[var(--charcoal)]">
              No orders yet
            </p>
            <p className="text-sm text-[var(--muted)] mt-2">
              Your future orders will show up here ✦
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
