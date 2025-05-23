export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
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


