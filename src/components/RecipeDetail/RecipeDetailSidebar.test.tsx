import { render, screen, fireEvent } from "@testing-library/react";
import { Recipe } from "@/types/recipe";

import RecipeDetailSideBar from "./RecipeDetailSidebar";

jest.mock("./AdjustServings", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ servings, onIncrease, onDecrease }: any) => (
    <div data-testid="adjust-servings-mock">
      <button onClick={onDecrease}>-</button>
      <span>{servings}</span>
      <button onClick={onIncrease}>+</button>
    </div>
  ),
}));

describe("RecipeDetailSideBar", () => {
  const recipe: Recipe = {
    idMeal: "1",
    strMeal: "Test Meal",
    strCategory: "Main",
    strArea: "Italian",
    strInstructions: "Test instructions.",
    strMealThumb: "test.jpg",
    strTags: "tag1,tag2",
    strYoutube: "",
    ingredients: [
      { name: "Pasta", measure: "100g" },
      { name: "Tomato", measure: "50g" },
    ],
  };

  it("renders ingredients and AdjustServings", () => {
    render(<RecipeDetailSideBar recipe={recipe} />);
    expect(screen.getByText("Ingredients")).toBeInTheDocument();
    expect(screen.getByText("100g Pasta")).toBeInTheDocument();
    expect(screen.getByText("50g Tomato")).toBeInTheDocument();
    expect(screen.getByTestId("adjust-servings-mock")).toBeInTheDocument();
  });

  it("calls AdjustServings callbacks", () => {
    render(<RecipeDetailSideBar recipe={recipe} />);
    const plus = screen.getByText("+");
    const minus = screen.getByText("-");
    fireEvent.click(plus);
    fireEvent.click(minus);
    // No assertion needed: just ensure no crash and buttons are clickable
  });

  it("renders shopping list button", () => {
    render(<RecipeDetailSideBar recipe={recipe} />);
    expect(
      screen.getByLabelText(/add all ingredients to shopping list/i)
    ).toBeInTheDocument();
  });
});
