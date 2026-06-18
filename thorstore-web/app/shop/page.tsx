"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getProductsByCategory } from "@/lib/api/products";
import CategoryPills from "@/components/home/CategoryPills";
import ProductCard from "@/components/home/ProductCard";
import { Product } from "@/types";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: allProducts = [], isLoading: loadingAll } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    enabled: selectedCategory === "all",
  });

  const { data: categoryProducts = [], isLoading: loadingCategory } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () => getProductsByCategory(selectedCategory),
    enabled: selectedCategory !== "all",
  });

  const products: Product[] =
    selectedCategory === "all" ? allProducts : categoryProducts;
  const isLoading = loadingAll || loadingCategory;

  return (
    <div className="bg-[var(--blush)] min-h-screen">
      <div className="bg-[var(--charcoal)] px-6 md:px-10 py-10">
        <h1 className="font-titan text-4xl text-white mb-2">
          Thor's <span className="text-[var(--pink)]"> ✦ Store </span>
        </h1>
        <p className="text-sm text-white/50">
          Comics, Prints, Stickers and Merchandise
        </p>
      </div>
      <div className="bg-white border-b border-[var(--pink-border)] sticky top-16 z-40">
        <CategoryPills
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      <div className="px-6 md:px-10 pt-6 pb-2">
        {isLoading && (
          <p className="text-sm text-[--muted] font-semi-bold">
            {products.length} {products.length === 1 ? "product" : "products"}
            {selectedCategory !== "all" ? `in ${selectedCategory}` : ""}
          </p>
        )}
      </div>

      <section className="px-6 md:px-10 py-4 pb-12">
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              ...Array(8).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border-2 border-[var(--pink-border)] h-64 animate-pulse"
                />
              )),
            ]}
          </div>
        )}

        {!isLoading && products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!isLoading && products.length === 0 && (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🎨</div>
            <p className="font-titan text-xl text-[var(--charcoal)]">
              Nothing here yet
            </p>
            <p className="text-sm text-[var(--muted)] mt-2">
              Check back soon for new drops ✦
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
