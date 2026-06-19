import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-[var(--blush)] flex items-center justify-center">
      <div className="text-center max-w-sm">
        <div className="text-6xl mb-4">✦🎉✦</div>
        <h1 className="font-titan text-3xl text-[var(--charcoal)] mb-3">
          Order Placed!
        </h1>

        <p className="text-sm text-[var(--pink)] mb-8 leading-relaxed">
          Thank you so much for purchasing from my shop! You'll receive your
          items and tracking information once payment is processed!
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
          Contiue shopping
        </Link>
      </div>
    </div>
  );
}
