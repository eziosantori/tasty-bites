"use client";

import React, { useState } from "react";
import Image from "next/image";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Recipe } from "@/types/recipe";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { Badge } from "../ui/badge";

const RecipeCard = ({
  recipe,
  onClick,
}: {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
}) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const [isRecipeFavorite, setRecipeIsFavorite] = useState(
    isFavorite(recipe?.idMeal)
  );

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isRecipeFavorite) {
      removeFavorite(recipe.idMeal);
    } else {
      addFavorite(recipe.idMeal);
    }

    setRecipeIsFavorite(!isRecipeFavorite);
  };

  return (
    <Card
      className="overflow-hidden h-full recipe-card-hover cursor-pointer relative"
      onClick={() => onClick(recipe)}
    >
      <div className="relative h-48">
        <Image
          src={recipe.strMealThumb || "/placeholder.svg"}
          alt={recipe.strMeal}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-full object-cover"
        />
        <button
          className="absolute top-2 right-2 p-2 bg-white/60 backdrop-blur-sm rounded-full transition-colors hover:bg-white/80"
          onClick={handleFavoriteClick}
          type="button"
          aria-label={
            isRecipeFavorite ? "Remove from favorites" : "Add to favorites"
          }
        >
          {isRecipeFavorite ? (
            <BookmarkCheck className="text-recipe-accent h-5 w-5" />
          ) : (
            <Bookmark className="text-gray-700 h-5 w-5" />
          )}
        </button>
      </div>
      <CardContent className="p-4">
        <h3 className="font-display text-lg font-semibold mb-1 line-clamp-1">
          {recipe.strMeal}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {recipe.strCategory && <span>{recipe.strCategory}</span>}
          {recipe.strCategory && recipe.strArea && <span>•</span>}
          {recipe.strArea && <span>{recipe.strArea}</span>}
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0">
        <div className="flex items-center text-xs space-x-2">
          {recipe.strTags &&
            recipe.strTags
              .split(",")
              .slice(0, 3)
              .map((tag, index) => <Badge key={index}>{tag.trim()}</Badge>)}
        </div>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
