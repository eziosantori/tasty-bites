"use client";

import { useRandomRecipes } from "@/lib/queries";
import Link from "next/link";
import { slugify } from "@/lib/utils";

import RecipeCard from "./Recipe/RecipeCard";
import RecipeCardSkeleton from "./Recipe/RecipeCardSkeleton";

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
        {recipes?.map((recipe, index) => (
          <Link
            href={`/recipes/${slugify(recipe)}`}
            key={`${recipe.idMeal}-${index}`}
            role="listitem"
          >
            <RecipeCard recipe={recipe} />
          </Link>
        ))}
      </Layout>
    </>
  );
};

export default FeaturedRecipes;
