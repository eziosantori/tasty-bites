import React from "react";
import { useRecipeDetails } from "@/lib/queries";
import { RecipeBase } from "@/types/recipe";

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
}: {
  recipe: RecipeBase;
  inView: boolean;
}) => {
  // Only fetch details if in view and leverage on cahching of react-query
  const { data: details, isLoading } = useRecipeDetails(recipe.idMeal, inView);

  // Show a skeleton or fallback while loading
  if (isLoading) {
    return <RecipeCardSkeleton />;
  }

  // If details are loaded, use them, otherwise fallback to base
  return <RecipeCard recipe={details || recipe} />;
};

export default RecipeCardDynamic;
