"use client"; // <-- This directive makes it a Client Component

import { Bookmark } from "lucide-react";
import dynamic from "next/dynamic";
import React from "react";

// The actual component you want to load only on the client
const FavoriteButton = dynamic(
  () => import("./FavoriteButton"), // The path to your client-only component
  {
    ssr: false, // Now ssr: false is allowed because this is a Client Component
    loading: () => (
      <button
        className="absolute top-2 right-2 p-2 bg-white/60 backdrop-blur-sm rounded-full transition-colors hover:bg-white/80"
        type="button"
        aria-label="Loading favorite state"
        disabled
      >
        <Bookmark className="text-gray-300 h-5 w-5 animate-pulse" />
      </button>
    ),
  }
);

// This is a Client Component that serves as a wrapper to load your client-only component
export default function FavoriteButtonWrapper(
  props: React.ComponentProps<typeof FavoriteButton>
) {
  return <FavoriteButton {...props} />;
}
