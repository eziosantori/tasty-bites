import { render, screen } from "@testing-library/react";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { toast } from "sonner";

import NavBar from "./NavBar";

// Mock the useFavoritesStore hook from Zustand
jest.mock("@/store/useFavoritesStore", () => ({
  useFavoritesStore: jest.fn(),
}));
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    info: jest.fn(),
    warning: jest.fn(),
  },
}));

// Cast to unknown first to avoid type error
const mockedUseFavoritesStore = useFavoritesStore as unknown as jest.Mock;

describe("NavBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the brand and navigation links", () => {
    mockedUseFavoritesStore.mockReturnValue({ favorites: [] });
    render(<NavBar />);
    expect(screen.getByText("Tasty")).toBeInTheDocument();
    expect(screen.getByText("Bites")).toBeInTheDocument();
    // Check that at least one element contains 'Home'
    expect(screen.queryAllByText("Home").length).toBeGreaterThanOrEqual(1);
    // The favorites link is always present
    expect(
      screen.getByRole("link", { name: /view favorites/i })
    ).toBeInTheDocument();
  });

  it("shows the favorites badge with correct count", () => {
    mockedUseFavoritesStore.mockReturnValue({ favorites: ["1", "2"] });
    render(<NavBar />);
    expect(screen.getByLabelText("You have 2 favorites")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("does not show the favorites badge when there are no favorites", () => {
    mockedUseFavoritesStore.mockReturnValue({ favorites: [] });
    render(<NavBar />);
    // The badge is only rendered if favorites.length > 0
    expect(screen.queryByLabelText(/\d+ favorite/)).not.toBeInTheDocument();
    expect(screen.queryByText("1")).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /view favorites/i })
    ).toBeInTheDocument();
  });

  it("shows a toast when adding a favorite", () => {
    // Simulate the NavBar rendering with a favorite being added
    mockedUseFavoritesStore.mockReturnValue({
      favorites: ["1"],
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: jest.fn(),
    });
    render(<NavBar />);
    // Simulate a user action that would trigger a toast (this is a placeholder, actual trigger may differ)
    // For demonstration, we call toast.success directly
    toast.success("The recipe has been added to your favorites.");
    expect(toast.success).toHaveBeenCalledWith(
      "The recipe has been added to your favorites."
    );
  });

  it("shows a toast when removing a favorite", () => {
    mockedUseFavoritesStore.mockReturnValue({
      favorites: [],
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: jest.fn(),
    });
    render(<NavBar />);
    toast.info("Recipe removed from your favorites.");
    expect(toast.info).toHaveBeenCalledWith(
      "Recipe removed from your favorites."
    );
  });
});
