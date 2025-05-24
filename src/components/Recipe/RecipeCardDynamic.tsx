import React from "react";
import { useInView } from "react-intersection-observer";
import { useRecipeDetails } from "@/lib/queries";
import { RecipeBase } from "@/types/recipe";

import RecipeCard from "./RecipeCard";
import RecipeCardSkeleton from "./RecipeCardSkeleton";

const RecipeCardDynamic = ({ recipe }: { recipe: RecipeBase }) => {
  // Use react-intersection-observer with a lower threshold and rootMargin
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0,
    rootMargin: "50px 0px 50px 0px",
  });

  // Only fetch details if in view and leverage on cahching of react-query
  const { data: details, isLoading } = useRecipeDetails(recipe.idMeal, inView);

  // Show a skeleton or fallback while loading or not in view
  if (!inView || isLoading) {
    return (
      <div ref={ref}>
        <RecipeCardSkeleton />
      </div>
    );
  }

  // If details are loaded, use them, otherwise fallback to base
  return (
    <div ref={ref}>
      <RecipeCard recipe={details || recipe} />
    </div>
  );
};

export default RecipeCardDynamic;
