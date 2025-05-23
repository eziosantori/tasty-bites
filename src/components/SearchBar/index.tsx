"use client";

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useSessionStorage } from "react-use";

import SearchTypeButtons from "./SearchTypeButtons";

const SearchBar = () => {
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useSessionStorage<"name" | "ingredient">(
    "searchType",
    "name"
  );

  const handleSubmit = (e: React.FormEvent) => {
    console.log(query, searchType);
    e.preventDefault();
    if (query.trim()) {
      console.log(`Searching for ${query.trim()} by ${searchType}`);
    }
  };

  useEffect(() => {
    // Prevent SSR mismatch
    setMounted(true);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-2">
        <div className="flex">
          <input
            type="text"
            className="w-full py-3 px-6 rounded-l-full bg-white  shadow-lg focus:ring-2 focus:ring-primary text-neutral-500"
            placeholder="Search for recipes or ingredients..."
            aria-label="Search for recipes"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-secondary hover:bg-secondary-dark text-white rounded-r-full px-6 transition-all shadow-lg"
          >
            <Search className="text-white h-5 w-5" />
          </button>
        </div>

        <div className="flex rounded-md justify-center h-40">
          <SearchTypeButtons
            searchType={mounted ? searchType : "name"}
            onTypeChange={(type) => setSearchType(type)}
          />
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
