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


/**
 * Formats a string of instructions into an array of individual steps.
 *
 * Splits the input string by periods or newlines, trims whitespace from each step,
 * filters out any empty steps, and ensures each step ends with a period.
 *
 * @param instructions - The raw instruction string to format.
 * @returns An array of formatted instruction steps, each ending with a period.
 */
export const formatInstructions =(instructions: string)  =>{
  let steps = instructions
    .split(/\.\s|\n/)
    .map(step => step.trim())
    .filter(step => step.length > 0);
  
  // If a step ends without a period, add it
  steps = steps.map(step => step.endsWith('.') ? step : `${step}.`);
  
  return steps;
}

/**
 * Calculates an adjusted measurement string based on the desired number of servings.
 *
 * This utility parses the numeric portion of a measurement string (e.g., "2.5 cups"),
 * scales it according to the ratio of `servings` to `baseServings`, and returns the
 * adjusted measurement with the original unit. If the input does not contain a valid
 * number or the number of servings matches the base, the original measure is returned.
 *
 * @param measure - The measurement string to adjust (e.g., "2 cups").
 * @param servings - The desired number of servings.
 * @param baseServings - The base number of servings the original measure is for (default is 4).
 * @returns The adjusted measurement string for the specified number of servings.
 */
export const getAdjustedMeasure = (
  /**
   Utility to calculate the adjusted measure for servings
   */ 
  measure: string,
  servings: number,
  baseServings = 4
): string =>{
  if (servings !== baseServings) {
    // Extract the numeric part (may be float or int)
    const numeric = parseFloat(measure);
    if (!isNaN(numeric)) {
      // Remove the numeric part from the measure string
      const unit = measure.replace(/[0-9.]/g, "").trim();
      const adjusted = (numeric * (servings / baseServings))
        .toFixed(1)
        .replace(".0", "");
      return `${adjusted} ${unit}`.trim();
    }
  }
  return measure;
}

export const ZUS_DEVTOOLS_CFG = {
  name: 'tasty-bite-store', // Name for the devtools
  storeName: 'zustandStore', // Name for the store in devtools
  enabled: process.env.NODE_ENV === 'development', // Enable devtools only in development mode
} as const