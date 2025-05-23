"use client";

import React from "react";
import { Search } from "lucide-react";
import { useSearchStore } from "@/store/useSearchStore";

import SearchTypeButtons from "./SearchTypeButtons";

const SearchBar = () => {
  const { query, searchType, setQuery, setSearchType } = useSearchStore();

  const handleSubmit = (e: React.FormEvent) => {
    console.log(query, searchType);
    e.preventDefault();
    if (query.trim()) {
      console.log(`Searching for ${query.trim()} by ${searchType}`);
    }
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
