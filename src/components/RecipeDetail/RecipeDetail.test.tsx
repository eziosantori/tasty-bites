import { render, screen } from "@testing-library/react";
import { Recipe } from "@/types/recipe";

import RecipeDetail from "./RecipeDetail";

jest.mock("./RecipeDetailSidebar");

jest.mock("../Recipe/FavoriteButtonWrapper");

describe("RecipeDetail", () => {
  const recipe: Recipe = {
    idMeal: "1",
    strMeal: "Test Meal",
    strCategory: "Main",
    strArea: "Italian",
    strInstructions: "Step 1. Step 2.",
    strMealThumb: "/test.jpg", // Use leading slash for next/image compatibility
    strTags: "tag1,tag2",
    strYoutube: "https://youtube.com/watch?v=abc123",
    ingredients: [
      { name: "Pasta", measure: "100g" },
      { name: "Tomato", measure: "50g" },
    ],
  };

  it("renders meal name, badges, and sidebar", () => {
    render(<RecipeDetail recipe={recipe} />);
    expect(screen.getByText("Test Meal")).toBeInTheDocument();
    expect(screen.getByText(/minutes/)).toBeInTheDocument();
    expect(screen.getByText("Main")).toBeInTheDocument();
    expect(screen.getByText("Italian")).toBeInTheDocument();
    // Accept two sidebars for different breakpoints
    const sidebars = screen.getAllByTestId("recipe-detail-sidebar");
    expect(sidebars.length).toBe(2);
    expect(screen.getByTestId("favorite-btn")).toBeInTheDocument();
  });

  it("renders instructions steps", () => {
    render(<RecipeDetail recipe={recipe} />);
    expect(screen.getByText("Preparation")).toBeInTheDocument();
    expect(screen.getByText("Step 1.")).toBeInTheDocument();
    expect(screen.getByText("Step 2.")).toBeInTheDocument();
  });

  it("renders video tutorial if strYoutube is present", () => {
    render(<RecipeDetail recipe={recipe} />);
    expect(screen.getByText(/video tutorial/i)).toBeInTheDocument();
    expect(screen.getByTitle(/video tutorial/i)).toBeInTheDocument();
  });

  it("renders nothing if recipe is null", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { container } = render(<RecipeDetail recipe={null as any} />);
    expect(container).toBeEmptyDOMElement();
  });
});
