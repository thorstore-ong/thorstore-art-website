"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.ImageUrl,
      quantity: 1,
    });
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-var[var(--pink-border)] overflow-hidden hover:-translate-y-1 transition-transform duration-200">
      {/* Product Image */}
      <Link href={`/shop/${product.id}`}>
        <div className="relative h-48 bg-gradient-to-br from-var-[var(--pink-light)] to-[var(--lavender-light)]">
          {product.ImageUrl ? (
            <Image
              src={product.ImageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            //Placeholder Image
            <div className="absolute inset-0 flex items-center justify-center test-4xl opacity-30">
              <Image
                src="/LOGO.PNG"
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* In case stock is empty */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-white text-[var(--charcoal)] text-xs font-extrabold px-3 py-1 rounded-full">
                Out of stock
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="text-xs text-[var(--muted)] font-semibold mb-1">
          {product.categoryName}
        </div>
        <Link href={`/shop/${product.id}`}>
          <h3 className="font-extrabold text-[var(--charcoal)] text-sm mb-3 hover:text-[var(--pink)] transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <span className="font titan text-l text-[var(--pink)]">
            R{product.price}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="bg-[var(--dark)] text-white text-xs font-extrabold px-4 py-2 rounded-xl hover:bg-[var(--dark-2)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
