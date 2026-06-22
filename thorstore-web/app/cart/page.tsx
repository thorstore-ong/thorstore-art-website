"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

const SHIPPING_COST = 120;

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCartStore();

  const subTotal = totalPrice();
  const total = items.length > 0 ? subTotal + SHIPPING_COST : 0;

  //Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--blush)] flex flex-col items justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🛒</div>
          <p className="font-titan text-xl text-[var(--charcoal)]">
            Your cart is empty
          </p>
          <p className="text-sm text-[var(--muted)] mt-2 mb-6">
            Go find something cute!
          </p>
          <Link
            href="/shop"
            className="inline-block bg-[var(--pink)] text-white font-extrabold text-sm px-6 py-3 rounded-full hover:bg[#ff3b9a] transition-colors"
          >
            Browse the shop
          </Link>
        </div>
        <div className="text-left px-6 md:px-10 py-10">
          <Link
            href="/account/orders"
            className="text-sm font-extrabold text-[var(--muted)] hover:text-[var(--pink)] transition-colors"
          >
            My Orders →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--blush)]">
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-10">
        <h1 className="font-titan text-3xl text-[var(--charcoal)] mb-8">
          Your Cart <span className="text-[var(--pink)]">✦</span>
        </h1>

        {/* Cart Items */}
        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center gap-4 bg-white rounded-2xl border-2 border-[var(--pink-border)] p-4"
            >
              {/* Image */}
              <div className="relative w-20 h-20 shrink-0 bg-gradient-to-br from-[var(--pink-light)] to-[var(--lavender-light)] rounded-xl overflow-hidden">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-2xl opacity-30">
                    🎨
                  </div>
                )}
              </div>

              {/* Item Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-extrabold text-[var(--charcoal)] text-sm truncate ">
                  {item.name}
                </h3>
                <p className="font-titan text-lg text-[var(--pink)] mt-1">
                  R{item.price}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 bg-[var(--blush)] border-2 border-[var(--pink-border)] rounded-full px-3 py-1.5 shrink-0">
                <button
                  onClick={() =>
                    updateQuantity(item.productId, item.quantity - 1)
                  }
                  className="font-extrabold text-[var(--pink)] text-lg w-4 text-center"
                >
                  -
                </button>
                <span className="font-extrabold text-[var(--pink)] text-lg w-4 text-center text-sm">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    updateQuantity(item.productId, item.quantity + 1)
                  }
                  className="font-extrabold text-[var(--pink)] text-lg w-4 text-center"
                >
                  +
                </button>
              </div>

              {/* Remove product */}
              <button
                onClick={() => removeItem(item.productId)}
                className="text-[var(--muted)] hover:text-red-400 transition-colors"
                aria-label="Remove Item"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl border-2 border-[var(--pink-border)] p-6">
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--muted)] font-semibold">
                Subtotal
              </span>
              <span className="font-extrabold text-[var(--charcoal)]">
                R{subTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[var(--muted)] font-semibold">
                Shipping
              </span>
              <span className="font-extrabold text-[var(--charcoal)]">
                R{SHIPPING_COST.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="border-t border-[var(--pink-border)] pt-4 mb-6 flex justify-between items-center">
            <span className="font-extrabold text-[var(--charcoal)]">Total</span>
            <span className="font-titan text-2xl text-[var(--pink)]">
              R{total.toFixed(2)}
            </span>
          </div>

          <Link
            href="/checkout"
            className="block w-full text-center bg-[var(--pink)] text-white font-extrabold py-4 rounded-full hover:bg-[#ff3b9a] transition-colors"
          >
            Checkout
          </Link>
        </div>

        <Link
          href="/shop"
          className="inline-block mt-6 text-sm font-extrabold text-[var(--muted)] hover:text-[var(--pink)] transition-colors"
        >
          ← Continue shopping
        </Link>
        <Link
          href="/account/orders"
          className="text-sm font-extrabold text-[var(--muted)] hover:text-[var(--pink)] transition-colors"
        >
          My Orders →
        </Link>
      </div>
    </div>
  );
}
