"use client";

import { useRandomRecipes } from "@/lib/queries";
import RecipeCard from "./Recipe/RecipeCard";
import RecipeCardSkeleton from "./Recipe/RecipeCardSkeleton";
import { slugify } from "@/lib/utils";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    role="list"
    aria-label="Recipe results"
  >
    {children}
  </div>
);

const FeaturedRecipes = () => {
  const { data: recipes, isLoading, error } = useRandomRecipes(6);

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
    <Layout>
      {recipes?.map((recipe) => (
        <div key={recipe.idMeal} role="listitem">
          <Link href={`/recipes/${slugify(recipe)}`}>
            <RecipeCard recipe={recipe} />
          </Link>
        </div>
      ))}
    </Layout>
  );
};

export default FeaturedRecipes;
