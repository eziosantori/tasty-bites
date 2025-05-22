import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  CookingPot: () => <svg data-testid="cooking-pot" />,
  Search: () => <svg data-testid="search-icon" />,
  ShoppingBasket: () => <svg data-testid="shopping-basket" />,
}));

describe("SearchBar", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("renders input and buttons", () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText(/search for recipes or ingredients/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /by recipe/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /by ingredient/i })).toBeInTheDocument();
    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
  });

  it("calls handleSubmit on form submit", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(/search for recipes or ingredients/i);
    fireEvent.change(input, { target: { value: "pasta" } });
    fireEvent.click(screen.getByRole("button", { name: "" })); // submit button
    expect(logSpy).toHaveBeenCalledWith("Searching for pasta by name");
    logSpy.mockRestore();
  });

  it("switches searchType when buttons are clicked", () => {
    render(<SearchBar />);
    const byRecipe = screen.getByRole("button", { name: /by recipe/i });
    const byIngredient = screen.getByRole("button", { name: /by ingredient/i });
    expect(byRecipe).toHaveAttribute("aria-pressed", "true");
    expect(byIngredient).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(byIngredient);
    expect(byRecipe).toHaveAttribute("aria-pressed", "false");
    expect(byIngredient).toHaveAttribute("aria-pressed", "true");
  });

});
