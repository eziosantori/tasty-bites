"use client"; // <-- This directive makes it a Client Component

import { SearchType } from "@/types/search";
import { Utensils } from "lucide-react";
import dynamic from "next/dynamic";
import React from "react";

// The actual component you want to load only on the client
const SearchResult = dynamic(
  () => import("./SearchResult"), // The path to your client-only component
  {
    ssr: false, // Now ssr: false is allowed because this is a Client Component
    loading: () => (
      <div className="col-span-full flex flex-col items-center justify-center py-12">
        <span className="relative inline-block animate-pulse">
          <Utensils className="text-primary" size={64} strokeWidth={3} />
        </span>
        <span className="mt-4 text-neutral-400 text-sm">
          Loading recipes...
        </span>
      </div>
    ),
  }
);

const SearchResultByIngredient = dynamic(
  () => import("./SearchResultByIngredient"), // The path to your client-only component
  {
    ssr: false, // Now ssr: false is allowed because this is a Client Component
    loading: () => (
      <div className="col-span-full flex flex-col items-center justify-center py-12">
        <span className="relative inline-block animate-pulse">
          <Utensils className="text-primary" size={64} strokeWidth={3} />
        </span>
        <span className="mt-4 text-neutral-400 text-sm">
          Loading recipes...
        </span>
      </div>
    ),
  }
);

// This is a Client Component that serves as a wrapper to load your client-only component
export default function SearchResultWrapper({
  query,
  searchType,
}: {
  query: string;
  searchType: SearchType;
}) {
  return (
    <>
      {searchType === "name" && <SearchResult query={query} />}
      {searchType === "ingredient" && (
        <SearchResultByIngredient query={query} />
      )}
    </>
  );
}
