import SearchBar from "@/components/SearchBar";
import React from "react";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto px-4 py-8">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        role="list"
        aria-label="Recipe results"
      >
        <div className="col-span-full">
          <SearchBar />
        </div>
        {children}
      </div>
    </main>
  );
}
