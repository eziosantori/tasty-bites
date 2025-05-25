"use client";

import Link from "next/link";
import { Utensils, Bookmark } from "lucide-react";
import { memo } from "react";
import { useFavoritesStore } from "@/store/useFavoritesStore";

import { Badge } from "./ui/badge";

const Navbar = () => {
  const { favorites } = useFavoritesStore();
  const favMessage = `You have ${favorites.length} favorite${
    favorites.length > 1 ? "s" : ""
  }`;
  return (
    <header className="bg-white shadow-md z-20 sticky top-0" role="banner">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" aria-label="Go to home page">
          <div className="flex items-center gap-2">
            <Utensils
              className="text-primary"
              size={32}
              strokeWidth={3}
              aria-hidden="true"
              focusable="false"
            />
            <h1 className="text-xl md:text-2xl font-display font-bold text-neutral-500">
              <span className="text-primary">Tasty</span>Bites
            </h1>
          </div>
        </Link>
        <nav className="flex items-center gap-6" aria-label="Main navigation">
          <Link href="/" aria-label="Go to home page">
            <span
              className="hidden md:block text-neutral-400 hover:text-primary transition-all"
              tabIndex={0}
              role="link"
            >
              Home
            </span>
          </Link>
          <Link href="/favorites" aria-label="View favorites">
            <div className="text-neutral-400 flex items-center gap-1 hover:text-primary transition-all">
              <Bookmark aria-hidden="true" focusable="false" />
              <span className="hidden md:inline">Favorites</span>
              {favorites.length > 0 && (
                <Badge aria-label={favMessage} role="status" title={favMessage}>
                  {favorites.length}
                </Badge>
              )}
            </div>
          </Link>
          {/* <button
            className="ml-2 md:hidden text-neutral-500"
            aria-label="Open menu"
            // onClick={toggleMobileMenu} todo: implement mobile menu toggle
            type="button"
          >
            <Menu className="h-5 w-5" aria-hidden="true" focusable="false" />
          </button> */}
        </nav>
      </div>
    </header>
  );
};

export default memo(Navbar);
