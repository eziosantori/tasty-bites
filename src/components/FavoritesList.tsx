"use client";

import React from "react";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import dynamic from "next/dynamic";
import { RecipeBase } from "@/types/recipe";
import { Heart } from "lucide-react";
import Link from "next/link";

import { Button } from "./ui/button";

const RecipeCardDynamic = dynamic(() => import("./Recipe/RecipeCardDynamic"), {
  loading: () => <div className="animate-pulse h-40 bg-muted rounded-lg" />,
  ssr: false,
});

const FavoritesList = () => {
  // Favorites are stored as an array of idMeal (string)
  const favorites = useFavoritesStore((state) => state.favorites);

  if (!favorites.length) {
    return (
      <div className="col-span-full text-center py-10 space-y-4 w-full flex flex-col items-center justify-center">
        <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
        <h2 className="text-xl font-medium">No favorite recipes yet</h2>
        <p className="text-muted-foreground">
          Start adding recipes to your favorites to see them here.
        </p>
        <Button asChild className="mt-4">
          <Link href="/">Find Recipes</Link>
        </Button>
      </div>
    );
  }

  // For demo: minimal BaseCard with only idMeal, others as empty/placeholder
  return (
    <>
      {favorites.map((idMeal) => {
        const baseCard: RecipeBase = {
          idMeal,
          strMeal: "",
          strMealThumb: "/placeholder.jpg",
        };
        // we don't use the lazy hydrator here because we assume the list should be small
        // and we want to render all cards immediately
        return (
          <RecipeCardDynamic key={idMeal} recipe={baseCard} inView={true} />
        );
      })}
    </>
  );
};

export default FavoritesList;
