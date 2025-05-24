export interface RecipeBase {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strTags?: string;
  strCategory?: string;
  strArea?: string;
}
export interface Recipe extends RecipeBase {
  strInstructions?: string;
  strYoutube?: string;
  strSource?: string;
  strImageSource?: string,
  strCreativeCommonsConfirmed?: string,
  dateModified?: string  
  ingredients: {
    name: string;
    measure: string;
  }[];
}


