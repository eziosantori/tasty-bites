import { Recipe, RecipeBase } from "@/types/recipe";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * Processes an array of raw recipe objects (as returned by TheMealDB API) and transforms them into an array of `Recipe` objects.
*
* Each raw recipe is expected to have ingredient and measure fields in the format `strIngredient1`, `strMeasure1`, ..., up to 20.
* This function extracts those fields, pairs them, and constructs a normalized `ingredients` array for each recipe.
*
* @param rawRecipes - An array of raw recipe objects of unknown structure, typically as returned by TheMealDB API.
* @returns An array of `Recipe` objects with normalized fields and an `ingredients` array.
*/
export const processRecipes = (rawRecipes: unknown[]): Recipe[] =>{
  // Helper function to process raw recipe data from the API
  if (!rawRecipes) return [];
  
  return rawRecipes.map(rawMeal => {
    const meal = rawMeal as Record<string, string>;
    const ingredients = [];
    
    // Extract ingredients and their measures (TheMealDB stores them as strIngredient1, strMeasure1, etc.)
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          name: ingredient,
          measure: measure || ""
        });
      }
    }
    
    return {
      idMeal: meal.idMeal,
      strMeal: meal.strMeal,
      strCategory: meal.strCategory,
      strArea: meal.strArea,
      strInstructions: meal.strInstructions,
      strMealThumb: meal.strMealThumb,
      strTags: meal.strTags,
      strYoutube: meal.strYoutube,
      ingredients
    };
  });
}


export const slugify = (recipe: RecipeBase): string => {
  const name = (recipe.strMeal ?? "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
  return `${recipe.idMeal}--${name}`;
}

export const getIdFromSlugUrl = (slug: string): string => {
  const parts = slug.split("--");
  const id = parts.shift(); // Get the first part of the slug
  return id || ""; // Return the id or an empty string if not found
}

export const ZUS_DEVTOOLS_CFG = {
  name: 'tasty-bite-store', // Name for the devtools
  storeName: 'zustandStore', // Name for the store in devtools
  enabled: process.env.NODE_ENV === 'development', // Enable devtools only in development mode
} as const