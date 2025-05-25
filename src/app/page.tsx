import HeroHeader from "@/components/HeroHeader";
import { lazy, Suspense } from "react";

const FeaturedRecipes = lazy(() => import("@/components/FeaturedRecipes"));

export default function Home() {
  return (
    <>
      <HeroHeader />
      <main className="container max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-neutral-500">
          Featured Recipes
        </h2>
        <p className="text-neutral-300 mb-8">
          Discover our handpicked selection of delicious meals
        </p>
        <Suspense
          fallback={
            <div className="text-center py-10">Loading featured recipes...</div>
          }
        >
          <FeaturedRecipes />
        </Suspense>
      </main>
    </>
  );
}
