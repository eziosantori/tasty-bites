import { useRecipeDetails } from "@/lib/queries";
import React from "react";
import { render, screen } from "@testing-library/react";
import { RecipeBase } from "@/types/recipe";

import RecipeCardDynamic from "./RecipeCardDynamic";

// Mock RecipeCard and RecipeCardSkeleton for isolation
jest.mock("./RecipeCard");
jest.mock("./RecipeCardSkeleton");

// Mock useRecipeDetails
jest.mock("@/lib/queries", () => {
  const original = jest.requireActual("@/lib/queries");
  return {
    ...original,
    useRecipeDetails: jest.fn(),
  };
});

const baseRecipe: RecipeBase = {
  idMeal: "123",
  strMeal: "Test Meal",
  strMealThumb: "test.jpg",
};

describe("RecipeCardDynamic", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders RecipeCardSkeleton when loading", () => {
    (useRecipeDetails as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    render(<RecipeCardDynamic recipe={baseRecipe} inView={true} />);
    expect(screen.getByTestId("recipe-card-skeleton")).toBeInTheDocument();
    expect(screen.queryByTestId("recipe-card")).not.toBeInTheDocument();
  });

  it("renders RecipeCard with details when loaded", () => {
    const details = { ...baseRecipe, strMeal: "Loaded Meal", ingredients: [] };
    (useRecipeDetails as jest.Mock).mockReturnValue({
      data: details,
      isLoading: false,
    });

    render(<RecipeCardDynamic recipe={baseRecipe} inView={true} />);
    expect(
      screen.queryByTestId("recipe-card-skeleton")
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("recipe-card")).toBeInTheDocument();
  });

  it("renders RecipeCard with base recipe if details are not loaded", () => {
    (useRecipeDetails as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
    });

    render(<RecipeCardDynamic recipe={baseRecipe} inView={true} />);
    expect(screen.getByTestId("recipe-card")).toBeInTheDocument();
  });

  it("does not fetch details if inView is false", () => {
    (useRecipeDetails as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
    });

    render(<RecipeCardDynamic recipe={baseRecipe} inView={false} />);
    expect(useRecipeDetails as jest.Mock).toHaveBeenCalledWith(
      baseRecipe.idMeal,
      false
    );
    expect(screen.getByTestId("recipe-card")).toBeInTheDocument();
  });
});
