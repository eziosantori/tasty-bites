import { useQuery } from '@tanstack/react-query';
import { searchRecipesByName, searchRecipesByIngredient, fetchRecipeDetails, fetchRandomRecipe } from '../lib/recipeApi';

export function useSearchRecipesByName(name: string, enabled = true) {
  return useQuery({
    queryKey: ['recipes', 'name', name],
    queryFn: () => searchRecipesByName(name),
    enabled: !!name && enabled,
  });
}

export function useSearchRecipesByIngredient(ingredient: string, enabled = true) {
  return useQuery({
    queryKey: ['recipes', 'ingredient', ingredient],
    queryFn: () => searchRecipesByIngredient(ingredient),
    enabled: !!ingredient && enabled,
  });
}

export function useRecipeDetails(id: string, enabled = true) {
  return useQuery({
    queryKey: ['recipe', id],
    queryFn: () => fetchRecipeDetails(id),
    enabled: !!id && enabled,
  });
}

export function useRandomRecipe(numOfRecipes=1, enabled = true) {
    //todo implement teh possibility of getting multiple random recipes
  return useQuery({
    queryKey: ['randomeRecipis', numOfRecipes],
    queryFn: () => fetchRandomRecipe(),
    enabled,
  });
}
