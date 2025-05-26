import { render, screen, fireEvent } from "@testing-library/react";

import SearchResult from "./SearchResult";

jest.mock("@/lib/queries", () => ({
  useSearchRecipesByName: jest.fn(),
}));
jest.mock("@/hooks/useCardDialog", () => ({
  useCardDialog: jest.fn(() => ({
    selectedRecipe: null,
    open: false,
    setOpen: jest.fn(),
    handleCardClick: jest.fn(),
  })),
}));

// Provide explicit mock implementations for RecipeCard and RecipeLazyHydrator
jest.mock("../Recipe/RecipeCard");
jest.mock("../Recipe/RecipeLazyHydrator");
jest.mock("../RecipeDetail/RecipeDetailDialog");
jest.mock("./NoResults");
jest.mock("./Loading");

import { useSearchRecipesByName as _useSearchRecipesByName } from "@/lib/queries";
import { useCardDialog as _useCardDialog } from "@/hooks/useCardDialog";

const mockUseSearchRecipesByName = _useSearchRecipesByName as jest.Mock;
const mockUseCardDialog = _useCardDialog as jest.Mock;

describe("SearchResult", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCardDialog.mockReturnValue({
      selectedRecipe: null,
      open: false,
      setOpen: jest.fn(),
      handleCardClick: jest.fn(),
    });
  });

  it("shows loading state", () => {
    mockUseSearchRecipesByName.mockReturnValue({ isLoading: true });
    render(<SearchResult query="pasta" />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("shows error state", () => {
    mockUseSearchRecipesByName.mockReturnValue({
      isLoading: false,
      error: true,
    });
    render(<SearchResult query="pasta" />);
    expect(screen.getByText(/error loading recipe/i)).toBeInTheDocument();
  });

  it("shows no results", () => {
    mockUseSearchRecipesByName.mockReturnValue({
      isLoading: false,
      error: false,
      data: null,
    });
    render(<SearchResult query="pizza" />);
    expect(screen.getByTestId("no-results")).toHaveTextContent("pizza");
  });

  it("renders recipe cards and handles dialog open", () => {
    const recipes = [
      { idMeal: "1", strMeal: "A", strMealThumb: "a.jpg" },
      { idMeal: "2", strMeal: "B", strMealThumb: "b.jpg" },
    ];
    mockUseSearchRecipesByName.mockReturnValue({
      isLoading: false,
      error: false,
      data: recipes,
    });
    const handleCardClick = jest.fn();
    mockUseCardDialog.mockReturnValue({
      selectedRecipe: recipes[0],
      open: true,
      setOpen: jest.fn(),
      handleCardClick,
    });
    render(<SearchResult query="cake" />);
    expect(screen.getAllByTestId("recipe-card")).toHaveLength(2);
    expect(screen.getByTestId("dialog")).toHaveTextContent("Dialog Open");
    // Simulate click on the outer button
    fireEvent.click(screen.getAllByRole("button")[0]);
    expect(handleCardClick).toHaveBeenCalledWith(recipes[0]);
  });

  it("handles keyboard interaction for card dialog open", () => {
    const recipes = [{ idMeal: "1", strMeal: "A", strMealThumb: "a.jpg" }];
    mockUseSearchRecipesByName.mockReturnValue({
      isLoading: false,
      error: false,
      data: recipes,
    });
    const handleCardClick = jest.fn();
    mockUseCardDialog.mockReturnValue({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      selectedRecipe: recipes[0] as any, // Cast to any to avoid type issues
      open: false,
      setOpen: jest.fn(),
      handleCardClick,
    });

    render(<SearchResult query="cake" />);
    // Use getAllByRole to avoid duplicate role error
    const cardButtons = screen.getAllByRole("button");
    fireEvent.keyDown(cardButtons[0], { key: "Enter" });
    fireEvent.keyDown(cardButtons[0], { key: " " });
    expect(handleCardClick).toHaveBeenCalledTimes(2);
  });
});
