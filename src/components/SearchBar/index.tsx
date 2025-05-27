"use client";

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useSearchStore } from "@/store/useSearchStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SearchType } from "@/types/search";
import { clsx } from "clsx";

import SearchTypeButtons from "./SearchTypeButtons";

const SearchBar = ({
  defaultQuery,
  defaultType,
  inputVariant = "outlined", // new prop
}: {
  defaultQuery?: string;
  defaultType?: SearchType;
  inputVariant?: "outlined" | "fill";
}) => {
  const { searchType, setSearchType, addToHistory } = useSearchStore();
  const [query, setQuery] = useState(defaultQuery || "");

  useEffect(() => {
    // Initialize the store with default values if provided
    if (defaultQuery) {
      setQuery(defaultQuery);
    }
    if (defaultType) {
      setSearchType(defaultType);
    }
  }, [defaultQuery, defaultType, setSearchType]);
  // Initialize the store with default values if provided

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedQuery = query?.trim();
    if (!trimmedQuery) {
      toast.error("Search query is empty", {
        description:
          "Please enter ingredients or keywords to search for recipes.",
      });
      return;
    }

    // Update the store with the new query and search type for a future history suggestion like google
    addToHistory(trimmedQuery, searchType);
    router.push(
      `/search?q=${encodeURIComponent(trimmedQuery)}&type=${searchType}`
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleTypeChange = (type: SearchType) => {
    setSearchType(type);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-2">
        <div className="flex">
          <input
            type="text"
            className={clsx(
              "w-full py-3 px-6 rounded-l-full bg-white focus:bg-neutral-100 focus:outline-none focus:ring-0 text-neutral-500",
              inputVariant === "outlined"
                ? " shadow-lg"
                : "border border-border"
            )}
            placeholder="Search for recipes or ingredients..."
            aria-label="Search for recipes"
            value={query}
            onChange={handleInputChange}
          />
          <button
            aria-label="Search"
            title="Search"
            type="submit"
            className="bg-secondary hover:bg-secondary-dark text-white rounded-r-full px-6 transition-all shadow-lg"
          >
            <Search className="text-white h-5 w-5" />
          </button>
        </div>

        <div className="flex rounded-md justify-center">
          <SearchTypeButtons
            searchType={searchType}
            onTypeChange={handleTypeChange}
          />
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
