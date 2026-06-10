"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api/products";
import { Category } from "@/types";

interface CategoryPillsProps {
  selected: string;
  onSelect: (name: string) => void;
}

const CategoryPills = ({ selected, onSelect }: CategoryPillsProps) => {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <div className="flex gap-3 flex-wrap px-6 md:px-10 py-4 border-b border-[var(--pink-border)]">
      <button
        onClick={() => onSelect("all")}
        className={`text-sm font-extrabold px-5 py-2 rounded-full transition-colors ${
          selected === "all"
            ? "bg-[var(--pink)] text-white"
            : "bg-white text-[var(--muted)] border border-[#e8dde8] hover:text-[var(--pink)]"
        }`}
      >
        ✦ All
      </button>

      {/* Dynamic Categories from API */}
      {categories.map((cat: Category) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.name)}
          className={`text-sm font-extrabold px-5 py-2 rounded-full transition-colours ${
            selected == cat.name
              ? "bg-[var(--pink)] text-white"
              : "bg-[var(--lavender-light)] text-[#6b5ba0]"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryPills;
