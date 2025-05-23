"use client";

import { useFavoritesStore } from "@/store/useFavoritesStore";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { memo, useState, useEffect, useMemo } from "react";

const FavoriteButton = ({ idMeal }: { idMeal: string }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const [isRecipeFavorite, setRecipeIsFavorite] = useState(false);

  useEffect(() => {
    setRecipeIsFavorite(isFavorite(idMeal));
  }, [idMeal, isFavorite]);

  const label = useMemo(() => {
    return isRecipeFavorite ? "Remove from favorites" : "Add to favorites";
  }, [isRecipeFavorite]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isRecipeFavorite) {
      removeFavorite(idMeal);
    } else {
      addFavorite(idMeal);
    }
    setRecipeIsFavorite(!isRecipeFavorite);
  };

  return (
    <button
      className="absolute top-2 right-2 p-2 bg-white/60 backdrop-blur-sm rounded-full transition-colors hover:bg-white/80"
      onClick={handleFavoriteClick}
      type="button"
      aria-label={label}
      title={label}
    >
      {isRecipeFavorite ? (
        <BookmarkCheck className="text-recipe-accent h-5 w-5" />
      ) : (
        <Bookmark className="text-gray-700 h-5 w-5" />
      )}
    </button>
  );
};

export default memo(FavoriteButton);
