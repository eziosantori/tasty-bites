"use client";

import { useSearchRecipesByName } from "@/lib/queries";
import { slugify } from "@/lib/utils";
import Link from "next/link";

import RecipeCard from "../Recipe/RecipeCard";
import NoResults from "./NoResults";
import Loading from "./Loading";
import RecipeLazyHydrator from "../Recipe/RecipeLazyHydrator";

const SearchResult = ({ query }: { query: string }) => {
  const { data: recipes, isLoading, error } = useSearchRecipesByName(query);

  // quick exits
  if (isLoading) return <Loading />;
  if (error) return <div>Error loading recipe.</div>;
  if (!recipes) return <NoResults query={query} />;

  return (
    <>
      {recipes?.map((recipe) => (
        <div key={recipe.idMeal} role="listitem">
          <RecipeLazyHydrator>
            {() => (
              <Link href={`/recipes/${slugify(recipe)}`}>
                <RecipeCard recipe={recipe} />
              </Link>
            )}
          </RecipeLazyHydrator>
        </div>
      ))}
    </>
  );
};

export default SearchResult;
