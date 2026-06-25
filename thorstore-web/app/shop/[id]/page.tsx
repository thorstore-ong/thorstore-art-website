"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductById } from "@/lib/api/products";
import { useCartStore } from "@/store/cartStore";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(Number(id)),
    enabled: !!id,
  });

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity,
    });

    // Show a brief "Added!" confirmation then reset
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white px-6 md:px-10 py-10">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="aspect-square bg-white rounded-2xl border-2 border-[var(--pink-border)] animate-pulse" />
          <div className="space-y-4 pt-4">
            <div className="h-6 bg-white rounded-full w-1/3 animate-pulse" />
            <div className="h-10 bg-white rounded-full w-2/3 animate-pulse" />
            <div className="h-4 bg-white rounded-full animate-pulse" />
            <div className="h-4 bg-white rounded-full w-4/5 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">😿</div>
          <p className="font-titan text-xl text-[var(--charcoal)]">
            Product not found
          </p>
          <Link
            href="/shop"
            className="mt-4 inline-block text-sm font-extrabold text-[var(--pink)]"
          >
            ← Back to shop
          </Link>
        </div>
      </div>
    );
  }

  const inStock = product.stock > 0;

  return (
    <div className="min-h-screen bg-[var(--blush)]">
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-10">
        {/* Back link */}
        <button
          onClick={() => router.back()}
          className="text-sm font-extrabold text-[var(--muted)] hover:text-[var(--pink)] transition-colors mb-8 flex items-center gap-2"
        >
          ← Back
        </button>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Product image */}
          <div className="relative aspect-square bg-gradient-to-br from-[var(--pink-light)] to-[var(--lavender-light)] rounded-2xl border-2 border-[var(--pink-border)] overflow-hidden">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                🎨
              </div>
            )}

            {/* Out of stock overlay */}
            {!inStock && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="bg-white text-[var(--charcoal)] font-extrabold px-4 py-2 rounded-full">
                  Out of stock
                </span>
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="flex flex-col justify-center">
            {/* Category */}
            <span className="text-xs font-extrabold text-[var(--pink)] bg-[var(--pink-light)] px-3 py-1 rounded-full w-fit mb-4 border border-[var(--pink-border)]">
              {product.categoryName}
            </span>

            {/* Name */}
            <h1 className="font-titan text-3xl text-[var(--charcoal)] leading-tight mb-3">
              {product.name}
            </h1>

            {/* Price */}
            <div className="font-titan text-4xl text-[var(--pink)] mb-4">
              R{product.price}
            </div>

            {/* Description */}
            <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Stock indicator */}
            <div className="flex items-center gap-2 mb-6">
              <div
                className={`w-2 h-2 rounded-full ${inStock ? "bg-green-400" : "bg-red-400"}`}
              />
              <span className="text-xs font-extrabold text-[var(--muted)]">
                {inStock ? `${product.stock} in stock` : "Out of stock"}
              </span>
            </div>

            {/* Quantity selector */}
            {inStock && (
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-extrabold text-[var(--charcoal)]">
                  Qty
                </span>
                <div className="flex items-center gap-3 bg-white border-2 border-[var(--pink-border)] rounded-full px-4 py-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="font-extrabold text-[var(--pink)] text-lg w-5 text-center"
                  >
                    −
                  </button>
                  <span className="font-extrabold text-[var(--charcoal)] w-6 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    className="font-extrabold text-[var(--pink)] text-lg w-5 text-center"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Add to cart button */}
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              className={`w-full py-4 rounded-full font-extrabold text-base transition-all duration-200 ${
                added
                  ? "bg-green-400 text-white"
                  : inStock
                    ? "bg-[var(--pink)] text-white hover:bg-[#ff3b9a]"
                    : "bg-[var(--pink-light)] text-[var(--muted)] cursor-not-allowed"
              }`}
            >
              {added
                ? "✓ Added to cart!"
                : inStock
                  ? "Add to cart ✦"
                  : "Out of stock"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
