"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const totalItems = useCartStore((state) => state.totalItems);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/shop", label: "Shop" },
    { href: "/blogs", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[var(--blush)]">
      <nav className="flex min-h-16 w-full items-center justify-between px-4 py-2 lg:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-transform duration-200 hover:-translate-y-0.5"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden">
            <Image
              src="/panda_logo.png"
              alt="Thorstore Art Logo"
              width={40}
              height={40}
            />
          </span>
          <span className="font-titan whitespace-nowrap text-lg leading-none text-[var(--charcoal)] sm:text-2xl">
            <span>Thor</span>
            <span className="text-[var(--pink)]">store</span>
            <span className="hidden sm:inline"> Art</span>
          </span>
        </Link>

        {/* Desktop nav links — hidden on mobile */}
        <div className="hidden items-center gap-4 md:flex">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive
                    ? "rounded-full bg-[var(--pink)] px-5 py-2 text-sm font-extrabold text-white transition-colors hover:bg-[#ff3b9a]"
                    : "rounded-full px-3 py-2 text-sm font-extrabold text-[var(--charcoal)] transition-colors hover:text-[var(--pink)]"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right side — cart + hamburger */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--pink-light)] transition-colors hover:bg-[var(--pink)] hover:text-white"
            aria-label="Shopping cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {totalItems() > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--pink)] text-[10px] font-extrabold text-white">
                {totalItems()}
              </span>
            )}
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--pink-light)] md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="border-t border-[var(--pink-border)] bg-[var(--blush)] px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-2 pt-3">
            {links.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={
                    isActive
                      ? "rounded-full bg-[var(--pink)] px-5 py-3 text-center text-sm font-extrabold text-white"
                      : "rounded-full px-5 py-3 text-center text-sm font-extrabold text-[var(--charcoal)] hover:text-[var(--pink)]"
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
