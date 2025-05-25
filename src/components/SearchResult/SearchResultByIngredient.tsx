"use client";

import { useSearchRecipesByIngredient } from "@/lib/queries";
import { slugify } from "@/lib/utils";
import Link from "next/link";

import Loading from "./Loading";
import NoResults from "./NoResults";
import RecipeLazyHydrator from "../Recipe/RecipeLazyHydrator";
import RecipeCardDynamic from "../Recipe/RecipeCardDynamic";

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
          <RecipeLazyHydrator>
            {(inView) => (
              <Link href={`/recipes/${slugify(recipe)}`}>
                <RecipeCardDynamic recipe={recipe} inView={inView ?? false} />
              </Link>
            )}
          </RecipeLazyHydrator>
        </div>
      ))}
    </>
  );
};

export default SearchResultByIngredient;
