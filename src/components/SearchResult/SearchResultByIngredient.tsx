"use client";

import { useSearchRecipesByIngredient } from "@/lib/queries";
import { useCardDialog } from "@/hooks/useCardDialog";

import Loading from "./Loading";
import NoResults from "./NoResults";
import RecipeLazyHydrator from "../Recipe/RecipeLazyHydrator";
import RecipeCardDynamic from "../Recipe/RecipeCardDynamic";
import RecipeDetailDialog from "../RecipeDetail/RecipeDetailDialog";

const SearchResultByIngredient = ({ query }: { query: string }) => {
  const {
    data: recipes,
    isLoading,
    error,
  } = useSearchRecipesByIngredient(query);

  const { selectedRecipe, open, setOpen, handleCardClick } = useCardDialog();

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
              <RecipeCardDynamic
                recipe={recipe}
                inView={inView ?? false}
                onCardClick={handleCardClick}
              />
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

export default SearchResultByIngredient;
