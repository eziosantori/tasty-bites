"use client";

import { useState, useCallback } from "react";
import { getAdjustedMeasure } from "@/lib/utils";
import { Recipe } from "@/types/recipe";
import { Checkbox } from "@/components/ui/checkbox";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

import AdjustServings from "./AdjustServings";

const RecipeDetailSideBar = ({ recipe }: { recipe: Recipe }) => {
  const [servings, setServings] = useState(4);

  const adjustServings = useCallback(
    (type: "increase" | "decrease") => {
      if (type === "increase" && servings < 12) {
        setServings((prev) => prev + 1);
      } else if (type === "decrease" && servings > 1) {
        setServings((prev) => prev - 1);
      }
    },
    [servings]
  );

  // Memoized callback for adjusted measure
  const getAdjustedMeasureCb = useCallback(
    (measure: string) => getAdjustedMeasure(measure, servings),
    [servings]
  );

  if (!recipe) return null;

  return (
    <>
      {/* Ingredients */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="font-display text-xl font-bold mb-4 text-neutral-500">
          Ingredients
        </h2>
        <div className="space-y-4">
          {recipe.ingredients?.map((item, index) => (
            <div key={index} className="flex items-start">
              <Checkbox
                id={`ing${index}`}
                className="mr-3 h-5 w-5 mt-0.5"
                aria-labelledby={`ing-label-${index}`}
              />
              <label
                id={`ing-label-${index}`}
                htmlFor={`ing${index}`}
                className="text-neutral-500"
              >
                {getAdjustedMeasureCb(item.measure)} {item.name}
              </label>
            </div>
          ))}
        </div>

        {/* Servings Adjuster */}
        <div className="mt-6 pt-6 border-t border-neutral-100">
          <AdjustServings
            servings={servings}
            onDecrease={() => adjustServings("decrease")}
            onIncrease={() => adjustServings("increase")}
          />
        </div>

        {/* Shopping List Button */}
        <Button
          className="mt-6 w-full bg-secondary hover:bg-secondary-dark text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
          aria-label="Add all ingredients to shopping list"
        >
          <ShoppingBag aria-hidden="true" />
          <span>Add to Shopping List</span>
        </Button>
      </div>
    </>
  );
};

export default RecipeDetailSideBar;
