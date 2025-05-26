import { Recipe } from "@/types/recipe";
import React from "react";

// const RecipeCard = jest.fn(({ recipe: Recipe} ) => <div data-testid="recipe-card" >{}</div>);

// export default RecipeCard;

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return <div data-testid="recipe-card">{recipe?.strMeal}</div>;
};
export default RecipeCard;
