import { Recipe } from "@/types/recipe";
import { useState } from "react";

/**
 * Custom React hook to manage the state and behavior of a card dialog for recipes.
 *
 * @returns An object containing:
 * - `open`: A boolean indicating whether the dialog is open.
 * - `setOpen`: A function to set the open state of the dialog.
 * - `selectedRecipe`: The currently selected recipe, or `null` if none is selected.
 * - `handleCardClick`: A function to handle card click events, setting the selected recipe and opening the dialog.
 */
export const useCardDialog = () => {
  const [open, setOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    
  const handleCardClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setOpen(true);
  };

  return {
    open,
    setOpen,
    selectedRecipe,
    handleCardClick,
  };
}