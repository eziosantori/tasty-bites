import type { Metadata } from "next";
import SearchResultWrapper from "@/components/SearchResult/SearchResultWrapper";
import { SearchType } from "@/types/search";
import SearchBar from "@/components/SearchBar";

export const metadata: Metadata = {
  title: "Search Recipes",
  description: "Search for recipes by ingredients or keywords",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: SearchType }>;
}) {
  const { q, type } = await searchParams;

  // If the type is not provided, default to "name"
  const searchType = (
    type === "ingredient" ? "ingredient" : "name"
  ) as SearchType;

  return (
    <>
      <div className="col-span-full">
        <SearchBar defaultQuery={q ?? ""} defaultType={searchType} />
      </div>
      {q ? (
        <SearchResultWrapper query={q} searchType={searchType} />
      ) : (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            Enter ingredients or keywords to search for recipes
          </p>
        </div>
      )}
    </>
  );
}
