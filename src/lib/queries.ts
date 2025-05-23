import { useQuery } from '@tanstack/react-query';
import { searchRecipesByName, searchRecipesByIngredient, fetchRecipeDetails, fetchRandomRecipes } from '@/lib/recipeApi';

export const useSearchRecipesByName = ( name: string, enabled = true) => {
  return useQuery({
    queryKey: ['recipesByName', 'name', name],
    queryFn: () => searchRecipesByName(name) ,
    enabled: !!name && enabled,
  });
}

export const useSearchRecipesByIngredient = ( ingredient: string, enabled = true) => {
  return useQuery({
    queryKey: ['recipesByIngredient', 'ingredient', ingredient, ],
    queryFn: () => searchRecipesByIngredient(ingredient),
    enabled: !!ingredient && enabled,
  });
}

export const useRecipeDetails =(id: string, enabled = true) => {
  return useQuery({
    queryKey: ['recipe', id],
    queryFn: () => fetchRecipeDetails(id),
    enabled: !!id && enabled,
  });
}

export const useRandomRecipes = (numOfRecipes=1, enabled = true) => {
  //todo implement teh possibility of getting multiple random recipes
  return useQuery({
    queryKey: ['randomRecipes', numOfRecipes],
    queryFn: () => fetchRandomRecipes(numOfRecipes),
    enabled,
  });
}
