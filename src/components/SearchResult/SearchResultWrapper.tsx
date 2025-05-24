"use client";

import { SearchType } from "@/types/search";
import dynamic from "next/dynamic";
import React from "react";

import Loading from "./Loading";

// The actual component you want to load only on the client
const SearchResult = dynamic(() => import("./SearchResult"), {
  ssr: false, // Now ssr: false is allowed because this is a Client Component
  loading: () => (
    <Loading /> // Use the Loading component for a consistent loading state
  ),
});

const SearchResultByIngredient = dynamic(
  () => import("./SearchResultByIngredient"),
  {
    ssr: false, // Now ssr: false is allowed because this is a Client Component
    loading: () => (
      <Loading /> // Use the Loading component for a consistent loading state
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
