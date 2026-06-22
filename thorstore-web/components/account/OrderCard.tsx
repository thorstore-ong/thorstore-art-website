"use client";

import { Order } from "@/types";

interface OrderCardProps {
  order: Order;
}

const statusStyles: Record<string, string> = {
  Pending: "bg-[var(--peach-light)] text-[#b06020] border-[var(--peach)]",
  Paid: "bg-[var(--lavender-light)] text-[#6b5ba0] border-[var(--lavender)]",
  Shipped: "bg-blue-50 text-blue-600 border-blue-200",
  Delivered: "bg-green-50 text-green-600 border-green-200",
  Cancelled: "bg-red-50 text-red-500 border-red-200",
};

const OrderCard = ({ order }: OrderCardProps) => {
  const statusStyle = statusStyles[order.status] || statusStyles.Pending;

  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-2xl border-2 border[var(--pink-border)] p-5">
      {/* Header - order id, date, status */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <p className="font-extrabold text-[var(--charcoal)] text-sm">
            Order #{order.id}
          </p>
          <p className="text-xs text-[var(--muted)] mt-0.5">{formattedDate}</p>
        </div>
        <span
          className={`text-xs font-extrabold px-3 py-1 rounded-full border ${statusStyle}`}
        >
          {order.status}
        </span>
      </div>

      <div className="space-y-2 mb-4 border-b border-[var(--pink-border)]">
        {order.items.map((item) => (
          <div key={item.productId} className="flex justify-between text-sm">
            <span className="text-[var(--muted)] font-semibold">
              {item.productName} x {item.quantity}
            </span>
            <span className="text-[var(--muted)] font-semibold ">
              R{item.subTotal.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs text-[var(--muted)] font-semibold mb-0.5">
            Shipping to
          </p>
          <p className="text-xs text-[var(--charcoal)] font-semibold truncate">
            {order.shippingAddress}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs text-[var(--muted)] font-semibold mb-0.5">
            Total
          </p>
          <p className="font-titan text-xl text-[var(--pink)]">
            R{order.total.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
