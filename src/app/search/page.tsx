import type { Metadata } from "next";
import SearchResultWrapper from "@/components/SearchResult/SearchResultWrapper";
import { SearchType } from "@/types/search";

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

  const searchType = (
    type === "ingredient" ? "ingredient" : "name"
  ) as SearchType;

  return (
    <>
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
