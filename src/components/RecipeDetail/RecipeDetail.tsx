import { Suspense } from "react";
import { formatInstructions } from "@/lib/utils";
import { Recipe } from "@/types/recipe";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Clock, Globe, Utensils } from "lucide-react";

import FavoriteButtonWrapper from "../Recipe/FavoriteButtonWrapper";
import RecipeDetailSidebar from "./RecipeDetailSidebar";

const RecipeDetail = ({ recipe }: { recipe: Recipe }) => {
  if (!recipe) return null;

  const instructionSteps = formatInstructions(recipe.strInstructions ?? "");

  return (
    <div className="container mx-auto px-4">
      <div className="lg:flex gap-8">
        {/* Recipe Main Content */}
        <div className="lg:w-2/3">
          <div className="flex justify-between items-start mb-4">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-neutral-500">
              {recipe.strMeal}
            </h1>
            <FavoriteButtonWrapper
              idMeal={recipe.idMeal}
              size={8}
              className="-"
            />
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <Badge className="bg-neutral-100 text-neutral-400 rounded-full">
              <Clock />
              <span>{Math.floor(Math.random() * 30) + 20} minutes</span>
            </Badge>
            <Badge className="bg-neutral-100 text-neutral-400 rounded-full">
              <Utensils />
              <span>{recipe.strCategory}</span>
            </Badge>
            <Badge className="bg-neutral-100 text-neutral-400 rounded-full">
              <Globe />
              <span>{recipe.strArea}</span>
            </Badge>
          </div>

          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={recipe.strMealThumb || "/placeholder.svg"}
              alt={recipe.strMeal}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="text-neutral-500 max-w-none mt-4 mb-8">
            <p>
              {recipe.strMeal} is a {recipe.strCategory?.toLowerCase()}{" "}
              {recipe.strArea ? `from ${recipe.strArea}` : "recipe"} that&nbsp;s
              perfect for any occasion. Follow the simple instructions below to
              create this delicious dish.
            </p>
          </div>

          {/* Mobile Ingredients (only on mobile) */}
          <div className="block lg:hidden mb-8">
            <Suspense>
              <RecipeDetailSidebar recipe={recipe} />
            </Suspense>
          </div>

          {/* Tabs */}
          <div className="border-b border-neutral-200 mb-6">
            <ul className="flex -mb-px">
              <li className="mr-2">
                <button className="inline-block py-2 px-4 border-b-2 border-primary text-primary font-semibold">
                  Instructions
                </button>
              </li>
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="mb-4">Preparation</h2>

            <ol className="space-y-6 mb-8">
              {instructionSteps.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-neutral-500">{step}</p>
                  </div>
                </li>
              ))}
            </ol>
            {/* Video Tutorial (if available) */}
            {recipe.strYoutube && (
              <div className="mb-8">
                <h3 className="mb-4">Video Tutorial</h3>
                <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
                  <iframe
                    width="560"
                    height="315"
                    src={recipe.strYoutube.replace("watch?v=", "embed/")}
                    title={`${recipe.strMeal} video tutorial`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        {/* Desktop/Tablet Ingredients (hidden on mobile) */}
        <div className="hidden lg:block lg:w-1/3 mt-8 lg:mt-0">
          {/* Ingredients */}
          <Suspense>
            <RecipeDetailSidebar recipe={recipe} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
