"use client";

import { useFavoritesStore } from "@/store/useFavoritesStore";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { memo, useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import clsx from "clsx";

const FavoriteButton = ({
  idMeal,
  className = "absolute top-2 right-2 p-2 bg-white/60 backdrop-blur-sm rounded-full transition-colors hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-primary",
  size = 5,
}: {
  idMeal: string;
  className?: string;
  size?: 5 | 8 | 16;
}) => {
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
      toast.warning("Recipe removed from your favorites.");
    } else {
      addFavorite(idMeal);
      toast.success("The recipe has been added to your favorites.");
    }
    setRecipeIsFavorite(!isRecipeFavorite);
  };

  return (
    <button
      className={className}
      onClick={handleFavoriteClick}
      type="button"
      aria-label={label}
      title={label}
    >
      {isRecipeFavorite ? (
        <BookmarkCheck
          className={clsx("text-gray-900", {
            "h-5 w-5": size === 5,
            "h-8 w-8": size === 8,
            "h-16 w-16": size === 16,
          })}
        />
      ) : (
        <Bookmark
          className={clsx("text-gray-700", {
            "h-5 w-5": size === 5,
            "h-8 w-8": size === 8,
            "h-16 w-16": size === 16,
          })}
        />
      )}
    </button>
  );
};

export default memo(FavoriteButton);
