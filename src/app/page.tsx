
// import RecipeCard from "@/components/RecipeCard";
import HeroSection from "@/components/HeroHeader";
// import SearchBar from "@/components/SearchBar";
import { lazy, Suspense } from "react";

const RecipeCard = lazy(() => import('@/components/RecipeCard'));

export default function Home() {
  return (
    <>
    <HeroSection />
    <main className="container max-w-7xl mx-auto px-4 py-8">
      {/* <section className="mb-10 text-center">
        <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 id="page-heading" className="text-4xl md:text-5xl font-display font-bold mb-4" tabIndex={0}>
              Discover Delicious Recipes
            </h1>
            <p className="text-lg text-muted-foreground" tabIndex={0}>
              Search for recipes by name or ingredients, filter by category, and save your favorites
            </p>
          </div>
      </section>
      <div className="max-w-4xl mx-auto">
        <SearchBar  />
      </div> */}


      <Suspense fallback={<div className="text-center py-10">Loading featured recipes...</div>}>
        <RecipeCard />
      </Suspense>
    </main>
    </>
  );
}
