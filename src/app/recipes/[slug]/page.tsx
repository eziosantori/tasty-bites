import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getIdFromSlugUrl } from "@/lib/utils";
import { fetchRecipeDetails } from "@/lib/recipeApi";
import RecipeDetail from "@/components/RecipeDetail/RecipeDetail";

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
      description: `Learn how to make ${
        recipe.strMeal
      } - ${recipe.strInstructions?.substring(0, 150)}...`,
      openGraph: {
        title: recipe.strMeal,
        description: `Learn how to make ${
          recipe.strMeal
        } - ${recipe.strInstructions?.substring(0, 150)}...`,
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
      <main className="container mx-auto px-4 py-8 ">
        <Suspense
          fallback={
            <div className="text-center py-10">Loading recipe details...</div>
          }
        >
          <article className="pt-0 md:pt-6 pb-12 ">
            <RecipeDetail recipe={recipe} />
          </article>
        </Suspense>
      </main>
    );
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    notFound();
  }
}
