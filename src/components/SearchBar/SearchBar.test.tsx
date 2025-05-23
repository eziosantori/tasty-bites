/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen, fireEvent } from "@testing-library/react";
import { pushMock, useSearchParamsMock } from "@/setupTests";

import SearchBar from ".";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  CookingPot: () => <svg data-testid="cooking-pot" />,
  Search: () => <svg data-testid="search-icon" />,
  ShoppingBasket: () => <svg data-testid="shopping-basket" />,
}));

describe("SearchBar", () => {
  beforeEach(() => {
    pushMock.mockClear();
    useSearchParamsMock.mockImplementation(() => ({
      get: (_key: string): null => null,
    }));
  });

  it("renders input and buttons", () => {
    render(<SearchBar />);
    expect(
      screen.getByPlaceholderText(/search for recipes or ingredients/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /by recipe/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /by ingredient/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
  });

  it("calls handleSubmit on form submit", () => {
    useSearchParamsMock.mockImplementation(() => ({
      get: (_key: string): null => null,
    }));
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      /search for recipes or ingredients/i
    );
    fireEvent.change(input, { target: { value: "pasta" } });
    fireEvent.click(screen.getByRole("button", { name: "Search" })); // submit button
    expect(pushMock).toHaveBeenCalledWith("/search?q=pasta&type=name");
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
