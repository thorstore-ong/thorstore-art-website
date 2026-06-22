"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProducts,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/api/products";
import { Product, CreateProductDto, Category } from "@/types";

const emptyForm: CreateProductDto = {
  name: "",
  description: "",
  price: 0,
  stock: 0,
  imageUrl: "",
  categoryId: 0,
};

export default function AdminProductsPage() {
  const queryClient = useQueryClient();

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<CreateProductDto>(emptyForm);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setShowForm(false);
      setForm(emptyForm);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: CreateProductDto }) =>
      updateProduct(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setEditingProduct(null);
      setForm(emptyForm);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setDeleteConfirmId(null);
    },
  });

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    // Pre-fill the form with the product's current values
    const category = categories.find(
      (c: Category) => c.name === product.categoryName,
    );
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      imageUrl: product.ImageUrl,
      categoryId: category?.id ?? 0,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct.id, dto: form });
    } else {
      createMutation.mutate(form);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
    setForm(emptyForm);
  };

  const isPending = createMutation.isPending || updateMutation.isPending;
  const isFormVisible = showForm || editingProduct !== null;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-titan text-xl text-[var(--blush)]">
          Products <span className="text-[var(--pink)]">✦</span>
        </h2>
        {!isFormVisible && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-[var(--pink)] text-white font-extrabold text-sm px-5 py-2.5 rounded-full hover:bg-[#ff3b9a] transition-colors"
          >
            + Add product
          </button>
        )}
      </div>

      {/* Add / Edit form */}
      {isFormVisible && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border-2 border-[var(--pink-border)] p-6 mb-8 space-y-4"
        >
          <h3 className="font-extrabold text-[var(--charcoal)]">
            {editingProduct ? "Edit product" : "New product"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-extrabold text-[var(--muted)] mb-1 block">
                Name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-[var(--pink-border)] focus:outline-none focus:border-[var(--pink)] text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-extrabold text-[var(--muted)] mb-1 block">
                Category
              </label>
              <select
                required
                value={form.categoryId}
                onChange={(e) =>
                  setForm({ ...form, categoryId: Number(e.target.value) })
                }
                className="w-full px-4 py-3 rounded-xl border-2 border-[var(--pink-border)] focus:outline-none focus:border-[var(--pink)] text-sm bg-white"
              >
                <option value={0} disabled>
                  Select a category
                </option>
                {categories.map((cat: Category) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-extrabold text-[var(--muted)] mb-1 block">
                Price (R)
              </label>
              <input
                type="number"
                required
                min={0}
                step={0.01}
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: Number(e.target.value) })
                }
                className="w-full px-4 py-3 rounded-xl border-2 border-[var(--pink-border)] focus:outline-none focus:border-[var(--pink)] text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-extrabold text-[var(--muted)] mb-1 block">
                Stock
              </label>
              <input
                type="number"
                required
                min={0}
                value={form.stock}
                onChange={(e) =>
                  setForm({ ...form, stock: Number(e.target.value) })
                }
                className="w-full px-4 py-3 rounded-xl border-2 border-[var(--pink-border)] focus:outline-none focus:border-[var(--pink)] text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-extrabold text-[var(--muted)] mb-1 block">
              Description
            </label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border-2 border-[var(--pink-border)] focus:outline-none focus:border-[var(--pink)] text-sm resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-extrabold text-[var(--muted)] mb-1 block">
              Image URL
            </label>
            <input
              type="url"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              placeholder="https://res.cloudinary.com/..."
              className="w-full px-4 py-3 rounded-xl border-2 border-[var(--pink-border)] focus:outline-none focus:border-[var(--pink)] text-sm"
            />
          </div>

          {/* Error */}
          {(createMutation.isError || updateMutation.isError) && (
            <div className="bg-red-50 border-2 border-red-200 text-red-600 text-sm font-semibold rounded-xl px-4 py-3">
              Something went wrong. Please try again.
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="bg-[var(--pink)] text-white font-extrabold text-sm px-6 py-3 rounded-full hover:bg-[#ff3b9a] transition-colors disabled:opacity-50"
            >
              {isPending
                ? "Saving..."
                : editingProduct
                  ? "Save changes"
                  : "Add product"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-white text-[var(--muted)] font-extrabold text-sm px-6 py-3 rounded-full border-2 border-[#e8dde8] hover:text-[var(--charcoal)] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Products list */}
      {isLoading && (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-[var(--dark-3)] rounded-2xl border-2 border-[var(--pink-border)] h-20 animate-pulse"
            />
          ))}
        </div>
      )}

      {!isLoading && products.length === 0 && (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">🎨</div>
          <p className="font-extrabold text-[var(--charcoal)]">
            No products yet
          </p>
          <p className="text-sm text-[var(--muted)] mt-1">
            Add your first product above
          </p>
        </div>
      )}

      {!isLoading && products.length > 0 && (
        <div className="space-y-3">
          {products.map((product: Product) => (
            <div
              key={product.id}
              className="bg-[var(--dark-3)] rounded-2xl border-2 border-[var(--pink)] px-5 py-4 flex items-center justify-between gap-4"
            >
              <div className="min-w-0 flex-1">
                <p className="font-extrabold text-[var(--blush)] text-sm truncate">
                  {product.name}
                </p>
                <p className="text-xs text-[var(--muted)] mt-0.5">
                  {product.categoryName} · R{product.price} · {product.stock} in
                  stock
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleEdit(product)}
                  className="text-xs font-extrabold px-4 py-2 rounded-full bg-[var(--lavender-light)] text-[#6b5ba0] border border-[var(--lavender)] hover:bg-[var(--lavender)] transition-colors"
                >
                  Edit
                </button>

                {deleteConfirmId === product.id ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[var(--muted)] font-semibold">
                      Sure?
                    </span>
                    <button
                      onClick={() => deleteMutation.mutate(product.id)}
                      className="text-xs font-extrabold px-3 py-2 rounded-full bg-red-50 text-red-500 border border-red-200 hover:bg-red-100 transition-colors"
                    >
                      Yes, delete
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="text-xs font-extrabold px-3 py-2 rounded-full bg-white text-[var(--muted)] border border-[#e8dde8] hover:text-[var(--charcoal)] transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirmId(product.id)}
                    className="text-xs font-extrabold px-4 py-2 rounded-full bg-red-50 text-red-500 border border-red-200 hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
