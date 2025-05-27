import { Recipe, RecipeBase } from "../types/recipe";
import api from "./api";
import { intersectionByIdMeal, processRecipes } from "./utils";



export const searchRecipesByName = async (name: string): Promise<Recipe[]> => {
  const response = await api.get(`/search.php?s=${encodeURIComponent(name)}`);
  return processRecipes(response?.data?.meals || []);
};

export const searchRecipesByIngredient = async (ingredient: string): Promise<RecipeBase[]> => {
  // Support multiple ingredients split by space
  const terms = ingredient
    .split(' ')
    .map((s) => s.trim())
    .filter(Boolean);
  if (terms.length === 0) return [];
  // Fetch for each term, collect arrays
  const results = await Promise.all(
    terms.map((term) => api.get(`/filter.php?i=${encodeURIComponent(term)}`))
  );
  const arrays = results.map((response) => response?.data?.meals || []);
  // Only keep recipes present in all arrays (intersection)
  const intersection = intersectionByIdMeal(arrays) as RecipeBase[];
  return intersection;
};

export const fetchRecipeDetails = async (id: string): Promise<Recipe> => {
  const response = await api.get(`/lookup.php?i=${encodeURIComponent(id)}`);

  return processRecipes(response.data.meals)[0];
};

export const fetchRandomRecipes = async (numOfRecipes=6): Promise<Recipe[]> => {

  const requests = Array(numOfRecipes)
    .fill(null)
    .map(() => api.get("/random.php"))
  const responses = await Promise.all(requests)

  const meals = responses.map((response) => response.data.meals[0])
  return processRecipes(meals)
};
