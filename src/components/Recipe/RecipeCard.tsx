import React from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Recipe } from "@/types/recipe";

import { Badge } from "../ui/badge";
import FavoriteButtonWrapper from "./FavoriteButtonWrapper";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <Card className="overflow-hidden h-full recipe-card-hover cursor-pointer relative">
      <div className="relative h-48">
        <Image
          src={recipe.strMealThumb || "/placeholder.svg"}
          alt={recipe.strMeal}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-full object-cover"
        />
        <FavoriteButtonWrapper idMeal={recipe.idMeal} />
      </div>
      <CardContent className="p-4">
        <h3 className="font-display text-lg font-semibold mb-1 line-clamp-1">
          {recipe.strMeal}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {recipe.strCategory && <span>{recipe.strCategory}</span>}
          {recipe.strCategory && recipe.strArea && <span>•</span>}
          {recipe.strArea && <span>{recipe.strArea}</span>}
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0">
        <div className="flex items-center text-xs space-x-2">
          {recipe.strTags &&
            recipe.strTags
              .split(",")
              .slice(0, 3)
              .map((tag, index) => <Badge key={index}>{tag.trim()}</Badge>)}
        </div>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
