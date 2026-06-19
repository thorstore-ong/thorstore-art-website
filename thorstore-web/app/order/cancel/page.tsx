import Link from "next/link";

export default function OrderCancelPage() {
  return (
    <div className="min-h-screen bg-[var(--blush)] flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <div className="text-6xl mb-4">😿</div>
        <h1 className="font-titan text-3xl text-[var(--charcoal)] mb-3">
          Payment cancelled
        </h1>
        <p className="text-sm text-[var(--muted)] mb-8 leading-relaxed">
          No worries — your order is saved. You can complete payment anytime
          from your orders page.
        </p>
        <Link
          href="/account/orders"
          className="inline-block bg-[var(--pink)] text-white font-extrabold text-sm px-6 py-3 rounded-full hover:bg-[#ff3b9a] transition-colors mr-3"
        >
          View my orders
        </Link>
        <Link
          href="/shop"
          className="inline-block text-sm font-extrabold text-[var(--muted)] hover:text-[var(--pink)] transition-colors mt-4"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
