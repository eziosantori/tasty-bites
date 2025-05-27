"use client";

import { useSearchRecipesByName } from "@/lib/queries";
import { useCardDialog } from "@/hooks/useCardDialog";

import RecipeCard from "../Recipe/RecipeCard";
import NoResults from "./NoResults";
import Loading from "./Loading";
import RecipeLazyHydrator from "../Recipe/RecipeLazyHydrator";
import RecipeDetailDialog from "../RecipeDetail/RecipeDetailDialog";

const SearchResult = ({ query }: { query: string }) => {
  const { data: recipes, isLoading, error } = useSearchRecipesByName(query);

  const { selectedRecipe, open, setOpen, handleCardClick } = useCardDialog();

  // quick exits
  if (isLoading) return <Loading />;
  if (error) return <div>Error loading recipe.</div>;
  if (!recipes || recipes.length === 0) return <NoResults query={query} />;

  return (
    <>
      {recipes?.map((recipe) => (
        <div key={recipe.idMeal} role="listitem">
          <RecipeLazyHydrator>
            {() => (
              <div
                role="button"
                tabIndex={0}
                className="w-full text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={() => handleCardClick(recipe)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault(); // Prevent default action for space key
                    handleCardClick(recipe);
                  }
                }}
                aria-label={`Open details for ${recipe.strMeal}`}
              >
                <RecipeCard recipe={recipe} />
              </div>
            )}
          </RecipeLazyHydrator>
        </div>
      ))}
      <RecipeDetailDialog
        open={open}
        onOpenChange={setOpen}
        recipe={selectedRecipe}
      />
    </>
  );
};

export default SearchResult;
