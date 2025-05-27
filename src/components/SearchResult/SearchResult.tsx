"use client";

import { useSearchRecipesByName } from "@/lib/queries";
import { useCardDialog } from "@/hooks/useCardDialog";
import { Recipe } from "@/types/recipe";

import RecipeCard from "../Recipe/RecipeCard";
import NoResults from "./NoResults";
import Loading from "./Loading";
import RecipeLazyHydrator from "../Recipe/RecipeLazyHydrator";
import RecipeDetailDialog from "../RecipeDetail/RecipeDetailDialog";

const SearchResultItem = ({
  recipe,
  onCardClick,
}: {
  recipe: Recipe;
  onCardClick: (recipe: Recipe) => void;
}) => {
  // Handler functions to avoid inline arrow functions in JSX
  const handleClick = () => {
    onCardClick(recipe);
  };

  // Handler functions to avoid inline arrow functions in JSX
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onCardClick(recipe);
    }
  };
  return (
    <RecipeLazyHydrator>
      {() => (
        <div
          role="button"
          tabIndex={0}
          className="w-full text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          aria-label={`Open details for ${recipe.strMeal}`}
        >
          <RecipeCard recipe={recipe} />
        </div>
      )}
    </RecipeLazyHydrator>
  );
};

const SearchResult = ({ query }: { query: string }) => {
  const { data: recipes, isLoading, error } = useSearchRecipesByName(query);
  const { selectedRecipe, open, setOpen, handleCardClick } = useCardDialog();

  // Handler functions to avoid inline arrow functions in JSX
  const handleClick = (recipe: Recipe) => {
    handleCardClick(recipe);
  };

  // quick exits
  if (isLoading) return <Loading />;
  if (error) return <div>Error loading recipe.</div>;
  if (!recipes || recipes.length === 0) return <NoResults query={query} />;

  return (
    <>
      {recipes?.map((recipe) => (
        <div key={recipe.idMeal} role="listitem">
          <SearchResultItem recipe={recipe} onCardClick={handleClick} />
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
