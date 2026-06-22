"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllOrders, updateOrderStatus } from "@/lib/api/orders";
import { Order } from "@/types";
import { useState } from "react";

const STATUSES = ["Pending", "Paid", "Shipped", "Delivered", "Cancelled"];

const statusStyles: Record<string, string> = {
  Pending: "bg-[var(--peach-light)] text-[#b06020] border-[var(--peach)]",
  Paid: "bg-[var(--lavender-light)] text-[#6b5ba0] border-[var(--lavender)]",
  Shipped: "bg-blue-50 text-blue-600 border-blue-200",
  Delivered: "bg-green-50 text-green-600 border-green-200",
  Cancelled: "bg-red-50 text-red-500 border-red-200",
};

export default function AdminOrdersPage() {
  const queryClient = useQueryClient();
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: getAllOrders,
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      setUpdatingId(null);
    },
  });

  const handleStatusChange = (orderId: number, newStatus: string) => {
    setUpdatingId(orderId);
    statusMutation.mutate({ id: orderId, status: newStatus });
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-ZA", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-titan text-xl text-white">
          Orders <span className="text-[var(--pink)]">✦</span>
        </h2>
        <p className="text-sm text-[var(--muted)] font-semibold">
          {orders.length} total
        </p>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-[var(--dark-3)] rounded-2xl border-2 border-[var(--pink-border)] h-32 animate-pulse"
            />
          ))}
        </div>
      )}

      {!isLoading && orders.length === 0 && (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">📦</div>
          <p className="font-extrabold text-[var(--blush)]">No orders yet</p>
        </div>
      )}

      {!isLoading && orders.length > 0 && (
        <div className="space-y-4">
          {orders.map((order: Order) => (
            <div
              key={order.id}
              className="bg-[var(--dark-3)] rounded-2xl border-2 border-[var(--pink-border)] p-5"
            >
              {/* Order header */}
              <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                <div>
                  <p className="font-extrabold text-[var(--blush)]">
                    Order #{order.id}
                  </p>
                  <p className="text-xs text-[var(--muted)] mt-0.5">
                    {formatDate(order.createdAt)}
                  </p>
                  <p className="text-xs text-[var(--muted)] mt-0.5">
                    📦 {order.shippingAddress}
                  </p>
                </div>

                {/* Status dropdown */}
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-extrabold px-3 py-1 rounded-full border ${statusStyles[order.status]}`}
                  >
                    {order.status}
                  </span>
                  <select
                    value={order.status}
                    disabled={updatingId === order.id}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className="text-xs font-extrabold px-3 py-2 rounded-full border-2 border-[var(--pink-border)] focus:outline-none focus:border-[var(--pink)] bg-[var(--dark-3)] text-white disabled:opacity-50"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-1 mb-3 pb-3 border-b border-[var(--pink-border)]">
                {order.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-white font-semibold">
                      {item.productName} × {item.quantity}
                    </span>
                    <span className="text-[var(--muted)] font-semibold">
                      R{item.subTotal.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-xs text-[var(--muted)] font-semibold">
                  Shipping: R{order.shippingCost.toFixed(2)}
                </span>
                <span className="font-titan text-lg text-[var(--pink)]">
                  R{order.total.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
