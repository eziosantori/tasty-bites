export interface RecipeBase {
  idMeal: string;
  strMeal: string;
    strMealThumb: string;
}
export interface Recipe extends RecipeBase {
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strTags?: string;
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


