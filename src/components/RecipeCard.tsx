'use client'

import React from "react";
import Image from "next/image";
import { useRandomRecipe } from "@/lib/queries";

export const RecipeCard: React.FC = () => {
  const { data, isLoading, error } = useRandomRecipe();

  if (isLoading) return <div>Loading random recipe...</div>;
  if (error) return <div>Error loading recipe.</div>;

  // TheMealDB returns { meals: [...] }
    const recipe = data?.meals[0];
  if (!recipe) return <div>No recipe found.</div>;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:shrink-0">
          <Image
            className="h-48 w-full object-cover md:w-48"
            src={recipe?.strMealThumb}
            alt={recipe?.strMeal}
            width={192}
            height={192}
            style={{ objectFit: "cover", width: "100%", height: "12rem" }}
            priority
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-orange-600 font-bold">
            {recipe.strCategory}
          </div>
          <h2 className="block mt-1 text-lg leading-tight font-medium text-black">
            {recipe.strMeal}
          </h2>
          <p className="mt-2 text-gray-500 line-clamp-3">
            {recipe.strInstructions}
          </p>
          <a
            href={recipe.strSource || recipe.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-green-600 hover:underline"
          >
            View Full Recipe
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;