"use client";

import { useSearchRecipesByIngredient } from "@/lib/queries";
import { slugify } from "@/lib/utils";
import Link from "next/link";

import RecipeCardDynamic from "../Recipe/RecipeCardDynamic";
import Loading from "./Loading";
import NoResults from "./NoResults";

const SearchResultByIngredient = ({ query }: { query: string }) => {
  const {
    data: recipes,
    isLoading,
    error,
  } = useSearchRecipesByIngredient(query);

  // quick exits
  if (isLoading) return <Loading />;
  if (error) return <div>Error loading recipe.</div>;
  if (!recipes) return <NoResults query={query} />;

  return (
    <>
      {recipes?.map((recipe) => (
        <div key={recipe.idMeal} role="listitem">
          <Link href={`/recipes/${slugify(recipe)}`}>
            <RecipeCardDynamic recipe={recipe} />
          </Link>
        </div>
      ))}
    </>
  );
};

export default SearchResultByIngredient;
