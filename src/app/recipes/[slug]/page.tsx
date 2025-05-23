import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import RecipeCard from "@/components/Recipe/RecipeCard";
import { getIdFromSlugUrl } from "@/lib/utils";
import { fetchRecipeDetails } from "@/lib/recipeApi";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const id = getIdFromSlugUrl(slug);

    const recipe = await fetchRecipeDetails(id);

    if (!recipe) {
      return {
        title: "Recipe Not Found",
      };
    }

    return {
      title: recipe.strMeal,
      description: `Learn how to make ${recipe.strMeal} - Ingredients, instructions, and more.`,
      openGraph: {
        title: recipe.strMeal,
        description: `Learn how to make ${recipe.strMeal} - Ingredients, instructions, and more.`,
        images: [
          {
            url: recipe.strMealThumb,
            width: 800,
            height: 600,
            alt: recipe.strMeal,
          },
        ],
        type: "article",
      },
    };
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    return {
      title: "Recipe Details",
      description: "View detailed recipe information",
    };
  }
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const id = getIdFromSlugUrl(slug);
    const recipe = await fetchRecipeDetails(id);

    if (!recipe) {
      notFound();
    }

    return (
      <main className="container mx-auto px-4 py-8">
        <Suspense
          fallback={
            <div className="text-center py-10">Loading recipe details...</div>
          }
        >
          <RecipeCard recipe={recipe} />
        </Suspense>
      </main>
    );
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    notFound();
  }
}
