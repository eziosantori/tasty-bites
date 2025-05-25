import type { Metadata } from "next";
import SearchResultWrapper from "@/components/SearchResult/SearchResultWrapper";
import { SearchType } from "@/types/search";
import SearchBar from "@/components/SearchBar";
import { redirect } from "next/navigation";

import GridLayout from "../grid-layout";

export const metadata: Metadata = {
  title: "Search Recipes",
  description: "Search for recipes by ingredients or keywords",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: SearchType }>;
}) {
  // If the type is not provided, default to "name"
  const { q, type } = await searchParams;
  const searchType = (
    type === "ingredient" ? "ingredient" : "name"
  ) as SearchType;

  if (!q) {
    redirect("/");
  }

  return (
    <>
      <GridLayout pageTitle="Search Results" addH1={false}>
        <div className="col-span-full">
          <SearchBar
            defaultQuery={q ?? ""}
            defaultType={searchType}
            inputVariant="fill"
          />
          <h1 className="mt-3">Search Results:</h1>
        </div>
        <SearchResultWrapper query={q} searchType={searchType} />
      </GridLayout>
    </>
  );
}
