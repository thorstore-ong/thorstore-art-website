"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import HeroBanner from "@/components/home/HeroBanner";
import CategoryPills from "@/components/home/CategoryPills";
import ProductCard from "@/components/home/ProductCard";
import { Product } from "@/types";
import { getProducts, getProductsByCategory } from "@/lib/api/products";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch all products when 'all' is selected
  const { data: allProducts = [], isLoading: loadingAll } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    enabled: selectedCategory === "all",
  });

  // Fetch by category when specific one is chosen
  const { data: categoryProducts = [], isLoading: loadingCategory } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () => getProductsByCategory(selectedCategory),
    enabled: selectedCategory !== "all",
  });

  const products: Product[] =
    selectedCategory === "all" ? allProducts : categoryProducts;
  const isLoading = loadingAll || loadingCategory;

  return (
    <div className="bg-[var(--blush)]">
      <HeroBanner />

      <CategoryPills
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      {/* Products Section */}
      <section className="px-6 md:px-10 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-titan text-2xl text-[var(--charcoal)]">
            {selectedCategory === "all" ? "New Drops" : selectedCategory}{" "}
            <span className="text-[var(--pink)]">✦</span>
          </h2>
          <Link
            href="/shop"
            className="text-sm font-extrabold text-[var(--pink)] bg-[var(--pink-light)] px-4 py-1.5 rounded-full border border-[var(--pink-border)] hover:bg-[var(--pink)] hover:text-white transition-colors"
          >
            See all
          </Link>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border-2 border-[var(--pink-border)] h-64 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Products grid */}
        {!isLoading && products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && products.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">🎨</div>
            <p className="font-extrabold text-[var(--charcoal)]">
              No products here yet
            </p>
            <p className="text-sm text-[var(--muted)] mt-1">
              Check back soon for new drops ✦
            </p>
          </div>
        )}
      </section>

      {/* Studio / blog section */}
      <section className="px-6 md:px-10 py-8 bg-white border-t border-[var(--pink-border)]">
        <h2 className="font-titan text-2xl text-[var(--charcoal)] mb-6">
          From the <span className="text-[var(--pink)]">Studio ✦</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Placeholder blog cards — we'll wire these to real data in Phase 8 */}
          <div className="border-2 border-[var(--pink-border)] rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform duration-200">
            <div className="h-32 bg-gradient-to-br from-[var(--pink-light)] to-[var(--lavender-light)] flex items-center justify-center text-3xl">
              🎨
            </div>
            <div className="p-4">
              <span className="text-xs font-extrabold bg-[var(--pink-light)] text-[var(--pink)] px-3 py-1 rounded-full">
                Process
              </span>
              <p className="font-extrabold text-sm text-[var(--charcoal)] mt-2 leading-snug">
                How I design my comic characters from scratch
              </p>
              <p className="text-xs text-[var(--muted)] mt-1">
                5 min read · Coming soon
              </p>
            </div>
          </div>

          <div className="border-2 border-[var(--lavender)] rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform duration-200">
            <div className="h-32 bg-gradient-to-br from-[var(--lavender-light)] to-[var(--peach-light)] flex items-center justify-center text-3xl">
              🎬
            </div>
            <div className="p-4">
              <span className="text-xs font-extrabold bg-[var(--lavender-light)] text-[#6b5ba0] px-3 py-1 rounded-full">
                YouTube
              </span>
              <p className="font-extrabold text-sm text-[var(--charcoal)] mt-2 leading-snug">
                New speed paint — Demon Slayer fan art
              </p>
              <p className="text-xs text-[var(--muted)] mt-1">Coming soon</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
