import { useState, useEffect } from "react";
import { Recipe } from "@/types/recipe";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
        localStorage.removeItem("favorites");
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (recipe: Recipe) => {
    setFavorites(prev => [...prev, recipe]);
  };

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(recipe => recipe.idMeal !== id));
  };

  const toggleFavorite = (recipe: Recipe) => {
    if (isFavorite(recipe.idMeal)) {
      removeFavorite(recipe.idMeal);
    } else {
      addFavorite(recipe);
    }
  };

  const isFavorite = (id: string) => {
    return favorites.some(recipe => recipe.idMeal === id);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite
  };
};
