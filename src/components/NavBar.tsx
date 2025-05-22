"use client"

import Link from "next/link"
import {Utensils, Bookmark, Menu } from "lucide-react"
import { useFavorites } from "@/hooks/useFavorites";
import { memo } from "react";

const Navbar = () => {
  const { favorites } = useFavorites();

  return (
    <header className="bg-white shadow-md z-10 sticky top-0" role="banner">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" aria-label="Go to home page">
          <div className="flex items-center gap-2">
            <Utensils className="text-primary" size={32} strokeWidth={3} aria-hidden="true" focusable="false" />
            <h1 className="text-xl md:text-2xl font-display font-bold text-neutral-500">
              <span className="text-primary">Tasty</span>Bites
            </h1>
          </div>
        </Link>
        <nav className="flex items-center gap-6" aria-label="Main navigation">
          <Link href="/">
            <span className="hidden md:block text-neutral-400 hover:text-primary transition-all" tabIndex={0} role="link">Home</span>
          </Link>
          <Link href="/search">
            <span className="hidden md:block text-neutral-400 hover:text-primary transition-all" tabIndex={0} role="link">Explore</span>
          </Link>
          <Link href="/favorites" aria-label="View favorites">
            <div className="text-primary flex items-center gap-1">
              <Bookmark aria-hidden="true" focusable="false" />
              <span className="hidden md:inline">Favorites</span>
              {favorites.length > 0 && (
                <span className="bg-primary text-white rounded-full text-xs w-5 h-5 flex items-center justify-center" aria-label={`${favorites.length} favorite${favorites.length > 1 ? 's' : ''}`}
                  role="status">
                  {favorites.length}
                </span>
              )}
            </div>
          </Link>
          <button
            className="ml-2 md:hidden text-neutral-500"
            aria-label="Open menu"
            // onClick={toggleMobileMenu} todo: implement mobile menu toggle
            type="button"
          >
            <Menu className="h-5 w-5" aria-hidden="true" focusable="false" />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default memo(Navbar);
