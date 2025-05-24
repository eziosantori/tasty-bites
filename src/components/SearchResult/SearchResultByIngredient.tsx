"use client";

import { useSearchRecipesByIngredient } from "@/lib/queries";
import { slugify } from "@/lib/utils";
import Link from "next/link";
import { Utensils } from "lucide-react";

import RecipeCard from "../Recipe/RecipeCard";

const SearchResultByIngredient = ({ query }: { query: string }) => {
  const {
    data: recipes,
    isLoading,
    error,
  } = useSearchRecipesByIngredient(query);

  if (isLoading) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-12">
        <span className="relative inline-block animate-spin-slow">
          <Utensils className="text-primary" size={48} strokeWidth={3} />
          {/* You can add more icons or SVGs for more complex animation */}
        </span>
        <span className="mt-4 text-neutral-400 text-sm">
          Loading recipes...
        </span>
      </div>
    );
  }
  if (error) return <div>Error loading recipe.</div>;

  return (
    <>
      {recipes?.map((recipe) => (
        <div key={recipe.idMeal} role="listitem">
          <Link href={`/recipes/${slugify(recipe)}`}>
            <RecipeCard recipe={recipe} />
          </Link>
        </div>
      ))}
    </>
  );
};

export default SearchResultByIngredient;
