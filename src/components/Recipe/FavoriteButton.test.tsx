import React from "react";
import { render, fireEvent } from "@testing-library/react";

import FavoriteButton from "./FavoriteButton";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  Bookmark: (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="bookmark" {...props} />
  ),
  BookmarkCheck: (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="bookmark-check" {...props} />
  ),
}));

// Mock useFavoritesStore
const addFavorite = jest.fn();
const removeFavorite = jest.fn();
const isFavorite = jest.fn();

jest.mock("@/store/useFavoritesStore", () => ({
  useFavoritesStore: () => ({
    isFavorite,
    addFavorite,
    removeFavorite,
  }),
}));

describe("FavoriteButton", () => {
  const idMeal = "12345";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with 'Add to favorites' state when not favorite", () => {
    isFavorite.mockReturnValue(false);
    const { getByRole, getByTestId } = render(
      <FavoriteButton idMeal={idMeal} />
    );
    expect(
      getByRole("button", { name: /add to favorites/i })
    ).toBeInTheDocument();
    expect(getByTestId("bookmark")).toBeInTheDocument();
  });

  it("renders with 'Remove from favorites' state when favorite", () => {
    isFavorite.mockReturnValue(true);
    const { getByRole, getByTestId } = render(
      <FavoriteButton idMeal={idMeal} />
    );
    expect(
      getByRole("button", { name: /remove from favorites/i })
    ).toBeInTheDocument();
    expect(getByTestId("bookmark-check")).toBeInTheDocument();
  });

  it("calls addFavorite when button is clicked and not favorite", () => {
    isFavorite.mockReturnValue(false);
    const { getByRole } = render(<FavoriteButton idMeal={idMeal} />);
    const button = getByRole("button");
    fireEvent.click(button);
    expect(addFavorite).toHaveBeenCalledWith(idMeal);
    expect(removeFavorite).not.toHaveBeenCalled();
  });

  it("calls removeFavorite when button is clicked and is favorite", () => {
    isFavorite.mockReturnValue(true);
    const { getByRole } = render(<FavoriteButton idMeal={idMeal} />);
    const button = getByRole("button");
    fireEvent.click(button);
    expect(removeFavorite).toHaveBeenCalledWith(idMeal);
    expect(addFavorite).not.toHaveBeenCalled();
  });

  it("toggles icon and label after click", () => {
    isFavorite.mockReturnValue(false);
    const { getByRole, getByTestId, rerender } = render(
      <FavoriteButton idMeal={idMeal} />
    );
    const button = getByRole("button");
    expect(getByTestId("bookmark")).toBeInTheDocument();
    fireEvent.click(button);
    // Simulate state change by rerendering with isFavorite returning true
    isFavorite.mockReturnValue(true);
    rerender(<FavoriteButton idMeal={idMeal} />);
    expect(getByTestId("bookmark-check")).toBeInTheDocument();
  });
});
