/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { pushMock } from "@/setupTests";
import { useSearchStore } from "@/store/useSearchStore";

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

  it("accepts defaultQuery and defaultType props and initializes input and type", () => {
    render(<SearchBar defaultQuery="pizza" defaultType="ingredient" />);
    expect(screen.getByDisplayValue("pizza")).toBeInTheDocument();
    const byIngredient = screen.getByRole("button", { name: /by ingredient/i });
    expect(byIngredient).toHaveAttribute("aria-pressed", "true");
  });

  it("adds to history on submit and keeps only last 10 unique entries", async () => {
    render(<SearchBar defaultQuery="first" defaultType="name" />);
    const input = screen.getByPlaceholderText(
      /search for recipes or ingredients/i
    );
    // Add 11 unique queries
    for (let i = 0; i < 11; i++) {
      fireEvent.change(input, { target: { value: `query${i}` } });
      fireEvent.click(screen.getByRole("button", { name: "Search" }));
    }
    // Add a duplicate
    fireEvent.change(input, { target: { value: "query5" } });
    fireEvent.click(screen.getByRole("button", { name: "Search" }));
    // Wait for the store to update and check history
    await waitFor(() => {
      const { history } = useSearchStore.getState();
      expect(history.length).toBe(10);
      expect(history[0].query).toBe("query5"); // Most recent
      expect(history.some((h: { query: string }) => h.query === "query0")).toBe(
        false
      ); // Oldest removed
    });
  });
});
