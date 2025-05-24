import React from "react";
import { mockDeep } from "jest-mock-extended";
import { render, screen } from "@testing-library/react";
import { Recipe } from "@/types/recipe";

import RecipeCard from "./RecipeCard";

jest.mock("@/components/ui/badge");
jest.mock("@/components/Recipe/FavoriteButtonWrapper");

const baseRecipe = {
  ...mockDeep<Recipe>(),
  idMeal: "12345",
  strMeal: "Test Meal",
  strMealThumb: "/test.jpg",
  strCategory: "Dessert",
  strArea: "French",
  strTags: "Sweet,Quick,Easy",
  strInstructions: "Test instructions",
  ingredients: [],
};

describe("RecipeCard", () => {
  it("renders recipe name, category, area, and tags", () => {
    render(<RecipeCard recipe={baseRecipe} />);
    expect(screen.getByText("Test Meal")).toBeInTheDocument();
    expect(screen.getByText("Dessert")).toBeInTheDocument();
    expect(screen.getByText("French")).toBeInTheDocument();
    expect(screen.getAllByTestId("badge")).toHaveLength(3);
    expect(screen.getByText("Sweet")).toBeInTheDocument();
    expect(screen.getByText("Quick")).toBeInTheDocument();
    expect(screen.getByText("Easy")).toBeInTheDocument();
  });

  it("renders only category if area is missing", () => {
    const recipe = { ...baseRecipe, strArea: undefined };
    render(<RecipeCard recipe={recipe} />);
    expect(screen.getByText("Dessert")).toBeInTheDocument();
    expect(screen.queryByText("•")).not.toBeInTheDocument();
    expect(screen.queryByText("French")).not.toBeInTheDocument();
  });

  it("renders only area if category is missing", () => {
    const recipe = { ...baseRecipe, strCategory: undefined };
    render(<RecipeCard recipe={recipe} />);
    expect(screen.getByText("French")).toBeInTheDocument();
    expect(screen.queryByText("Dessert")).not.toBeInTheDocument();
    expect(screen.queryByText("•")).not.toBeInTheDocument();
  });

  it("renders no tags if strTags is missing", () => {
    const recipe = { ...baseRecipe, strTags: undefined };
    render(<RecipeCard recipe={recipe} />);
    expect(screen.queryByTestId("badge")).not.toBeInTheDocument();
  });

  it("renders up to 3 tags only", () => {
    const recipe = { ...baseRecipe, strTags: "One,Two,Three,Four,Five" };
    render(<RecipeCard recipe={recipe} />);
    expect(screen.getAllByTestId("badge")).toHaveLength(3);
    expect(screen.queryByText("Four")).not.toBeInTheDocument();
    expect(screen.queryByText("Five")).not.toBeInTheDocument();
  });

  it("renders placeholder image if strMealThumb is missing", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recipe = { ...baseRecipe, strMealThumb: undefined } as any;
    render(<RecipeCard recipe={recipe} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/placeholder.svg");
  });

  it("renders FavoriteButtonWrapper with correct idMeal", () => {
    render(<RecipeCard recipe={baseRecipe} />);
    const favBtn = screen.getByTestId("favorite-btn");
    expect(favBtn).toHaveAttribute("data-id", "12345");
  });
});
