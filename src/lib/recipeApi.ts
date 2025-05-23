import { Recipe, RecipeBase } from "../types/recipe";
import api from "../lib/api";
import { processRecipes } from "./utils";

export const searchRecipesByName = async (name: string): Promise<Recipe[]> => {
  const response = await api.get(`/search.php?s=${encodeURIComponent(name)}`);
  return processRecipes(response?.data?.meals || []);
};

export const searchRecipesByIngredient = async (ingredient: string): Promise<RecipeBase[]> => {
  const response = await api.get(`/filter.php?i=${encodeURIComponent(ingredient)}`);
  return processRecipes(response?.data?.meals || []);
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
