import { render, screen } from "@testing-library/react";

import NavBar from "./NavBar";

// Mock the useFavoritesStore hook from Zustand
jest.mock("@/store/useFavoritesStore", () => ({
  useFavoritesStore: jest.fn(),
}));

import { useFavoritesStore } from "@/store/useFavoritesStore";

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
    // Check that at least one element contains 'Explore'
    expect(screen.queryAllByText("Explore").length).toBeGreaterThanOrEqual(1);
    // The favorites link is always present
    expect(
      screen.getByRole("link", { name: /view favorites/i })
    ).toBeInTheDocument();
  });

  it("shows the favorites badge with correct count", () => {
    mockedUseFavoritesStore.mockReturnValue({ favorites: ["1", "2"] });
    render(<NavBar />);
    expect(screen.getByLabelText("2 favorites")).toBeInTheDocument();
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
});
