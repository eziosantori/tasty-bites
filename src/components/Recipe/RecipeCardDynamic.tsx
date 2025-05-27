import React from "react";
import { useRecipeDetails } from "@/lib/queries";
import { Recipe, RecipeBase } from "@/types/recipe";

import RecipeCard from "./RecipeCard";
import RecipeCardSkeleton from "./RecipeCardSkeleton";

/**
 * Dynamically renders a recipe card, fetching detailed recipe information when the card is in view.
 *
 * @param recipe - The base recipe data to display or use as a fallback.
 * @param inView - Boolean indicating whether the card is currently visible in the viewport.
 * @returns A `RecipeCard` component populated with detailed data if available, or a skeleton/fallback while loading.
 *
 * Uses `useRecipeDetails` to fetch additional recipe details when `inView` is true, leveraging react-query caching.
 * Displays a loading skeleton while fetching, and falls back to the base recipe data if details are not yet loaded.
 */
const RecipeCardDynamic = ({
  recipe,
  inView,
  onCardClick,
}: {
  recipe: RecipeBase;
  inView: boolean;
  onCardClick?: (recipe: Recipe) => void;
}) => {
  // Only fetch details if in view and leverage on cahching of react-query
  const { data: details, isLoading } = useRecipeDetails(recipe.idMeal, inView);

  // Event handlers moved out of JSX to avoid inline arrow functions
  const handleClick = () => {
    if (onCardClick && details) {
      onCardClick(details);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === "Enter" || e.key === " ") && onCardClick && details) {
      e.preventDefault();
      onCardClick(details);
    }
  };

  // Show a skeleton or fallback while loading
  if (isLoading || !details) {
    return <RecipeCardSkeleton />;
  }

  // If details are loaded, use them, otherwise fallback to base
  return (
    <>
      <div
        role="button"
        tabIndex={0}
        className="w-full text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={`Open details for ${recipe.strMeal}`}
      >
        <RecipeCard recipe={details} />
      </div>
    </>
  );
};

export default RecipeCardDynamic;
