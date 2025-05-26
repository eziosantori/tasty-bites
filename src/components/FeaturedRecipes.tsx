"use client";

import { useState } from "react";

import { useRandomRecipes } from "@/lib/queries";
import type { Recipe } from "@/types/recipe";

import RecipeCard from "./Recipe/RecipeCard";
import RecipeCardSkeleton from "./Recipe/RecipeCardSkeleton";
import RecipeDetailDialog from "./RecipeDetail/RecipeDetailDialog";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    role="list"
    aria-label="Fetured recipes"
  >
    {children}
  </div>
);

const FeaturedRecipes = () => {
  const { data: recipes, isLoading, error } = useRandomRecipes(6);
  const [open, setOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleCardClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setOpen(true);
  };

  if (isLoading) {
    return (
      <Layout>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} role="listitem">
            <RecipeCardSkeleton />
          </div>
        ))}
      </Layout>
    );
  }
  if (error) return <div>Error loading recipe.</div>;

  return (
    <>
      <Layout>
        {recipes?.map((recipe) => (
          <div key={recipe.idMeal} role="listitem">
            <button
              type="button"
              className="w-full text-left"
              onClick={() => handleCardClick(recipe)}
              aria-label={`Open details for ${recipe.strMeal}`}
            >
              <RecipeCard recipe={recipe} />
            </button>
          </div>
        ))}
      </Layout>
      <RecipeDetailDialog
        open={open}
        onOpenChange={setOpen}
        recipe={selectedRecipe}
      />
    </>
  );
};

export default FeaturedRecipes;
