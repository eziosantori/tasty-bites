"use client";

import React from "react";
import { Search } from "lucide-react";
import { useSearchStore } from "@/store/useSearchStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import SearchTypeButtons from "./SearchTypeButtons";

const SearchBar = () => {
  const { query, searchType, setQuery, setSearchType } = useSearchStore();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(query, searchType);

    const trimmedQuery = query.trim();
    console.log(`Searching for ${query.trim()} by ${searchType}`);

    if (!trimmedQuery) {
      toast.error("Search query is empty", {
        description:
          "Please enter ingredients or keywords to search for recipes.",
      });
      // toast(
      //   <div>
      //     <div className="font-semibold text-red-600">
      //       Search query is empty
      //     </div>
      //     <div>Please enter ingredients or keywords to search for recipes.</div>
      //   </div>
      // );
      return;
    }

    router.push(
      `/search?q=${encodeURIComponent(trimmedQuery)}&type=${searchType}`
    );
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-2">
        <div className="flex">
          <input
            type="text"
            className="w-full py-3 px-6 rounded-l-full bg-white shadow-lg focus:bg-neutral-100 focus:outline-none focus:ring-0 text-neutral-500"
            placeholder="Search for recipes or ingredients..."
            aria-label="Search for recipes"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
            onTypeChange={(type) => setSearchType(type)}
          />
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
