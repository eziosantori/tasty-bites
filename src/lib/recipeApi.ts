import { Recipe } from "../types/recipe";
import api from "../lib/api";

export const searchRecipesByName = async (name: string): Promise<Recipe[]> => {
  const response = await api.get(`/search.php?s=${encodeURIComponent(name)}`);
  return response.data;
};

export const searchRecipesByIngredient = async (ingredient: string): Promise<Recipe[]> => {
  const response = await api.get(`/filter.php?i=${encodeURIComponent(ingredient)}`);
  return response.data;
};

export const fetchRecipeDetails = async (id: string): Promise<Recipe> => {
  const response = await api.get(`/lookup.php?i=${encodeURIComponent(id)}`);
  return response.data;
};

export const fetchRandomRecipe = async (): Promise<{meals:Recipe[]}> => {
  const response = await api.get(`/random.php`);
  return response.data;
};
