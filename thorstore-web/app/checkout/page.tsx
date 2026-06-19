"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { placeOrder, initiatePayment } from "@/lib/api/orders";

const SHIPPING_COST = 120;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const { token } = useAuthStore();

  // Structured address fields - joined into one string to match backend
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const subTotal = totalPrice();
  const total = subTotal + SHIPPING_COST;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Must be logged in to place order
    if (!token) {
      router.push("/login?redirect=/checkout");
      return;
    }

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setIsSubmitting(true);

    try {
      const shippingAddress = `${street}, ${city}, ${province}, ${postalCode}`;

      const order = await placeOrder({
        shippingAddress,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      });

      const payment = await initiatePayment({
        orderId: order.id,
        succesUrl: `${window.location.origin}/order/success`,
        cancelUrl: `${window.location.origin}/order/cancel`,
      });

      clearCart();
    } catch (err: any) {
      setError(
        err.response?.data ||
          "Something went wrong placing your order. Please try again.",
      );
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--blush)] flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🛒</div>
          <p className="font-titan text-xl text-[var(--charcoal)]">
            Your cart is empty
          </p>
          <p className="text-sm text-[var(--muted)] mt-2">
            Add something cute before checking out ✦
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--blush)]">
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-10">
        <h1 className="font-titan text-3xl text-[var(--charcoal)] mb-8">
          Checkout <span className="text-[var(--pink)]">✦</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="font-extra-bold text-[var(--charcoal)]  mb-2">
              Shipping Address
            </h2>

            <div>
              <label className="text-xs font-extrabold text-[var(--muted)] mb-1 block ">
                Street Address
              </label>
              <input
                type="text"
                required
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="123 Avenue Street"
                className="w-full px-4 py-3 bg-white rounded-xl border-2 border-[var(--pink-border)] text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-extrabold text-[var(--muted)] mb-1 block ">
                City
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Johannesburg"
                className="w-full px-4 py-3 bg-white rounded-xl border-2 border-[var(--pink-border)] text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-extrabold text-[var(--muted)] mb-1 block ">
                Province
              </label>
              <input
                type="text"
                required
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                placeholder="Gauteng"
                className="w-full px-4 py-3 bg-white rounded-xl border-2 border-[var(--pink-border)] text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-extrabold text-[var(--muted)] mb-1 block ">
                Postal Code
              </label>
              <input
                type="text"
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="4321"
                className="w-full px-4 py-3 bg-white rounded-xl border-2 border-[var(--pink-border)] text-sm"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-res-600 text-sm font-semibold rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[var(--pink)] text-white font-extrabold py-4 rounded-full hover:bg-[#ff3b9a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting
                ? "Processing..."
                : `Pay R${total.toFixed(2)} with Yoco ✦`}
            </button>
          </form>

          <div className="bg-white rounded-2xl border-2 border-[var(--pink-border)] p-6 h-fit">
            <h2 className="font-extrabold text-[var(--charcoal)]">
              Order Summary
            </h2>

            <div className="space-y3 mb-4">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between text-sm"
                >
                  <span className="text-[var(--muted)] font-semibold">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-extrabold text-[var(--charcoal)]">
                    R{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-[var(--pink-border)] pt-4 space-y-2">
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
              <div className="flex justify-between items-center pt-2">
                <span className="font-extrabold text-[var(--charcoal)]">
                  Total
                </span>
                <span className="font-titan text-xl text-[var(--pink)]">
                  R{total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
