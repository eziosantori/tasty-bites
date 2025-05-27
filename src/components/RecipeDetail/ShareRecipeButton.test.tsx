import { render, screen, fireEvent, act } from "@testing-library/react";
import { toast } from "sonner";
import ShareRecipeButton from "./ShareRecipeButton";
import { RecipeBase } from "@/types/recipe";

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    info: jest.fn(),
    error: jest.fn(),
    warning: jest.fn(),
  },
}));

describe("ShareRecipeButton", () => {
  const mockRecipe: RecipeBase = {
    idMeal: "1",
    strMeal: "Test Recipe",
    strMealThumb: "https://example.com/ytb",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders share button with correct attributes", () => {
    render(<ShareRecipeButton recipe={mockRecipe} />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute(
      "aria-label",
      "Copy recipe link to clipboard"
    );
    expect(button).toHaveAttribute("title", "Share recipe");
  });

  it("shows success message when copying link succeeds", async () => {
    const mockClipboard = {
      writeText: jest.fn().mockResolvedValue(undefined),
    };
    Object.assign(navigator, { clipboard: mockClipboard });

    render(<ShareRecipeButton recipe={mockRecipe} />);

    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });

    expect(toast.success).toHaveBeenCalledWith(
      "Recipe link copied to clipboard!"
    );
    expect(screen.getByText("Link copied!")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.queryByText("Link copied!")).not.toBeInTheDocument();
  });

  it("shows error message when copying link fails", async () => {
    const mockClipboard = {
      writeText: jest.fn().mockRejectedValue(new Error("Failed to copy")),
    };
    Object.assign(navigator, { clipboard: mockClipboard });

    render(<ShareRecipeButton recipe={mockRecipe} />);

    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });

    expect(toast.error).toHaveBeenCalledWith(
      "Failed to copy link to clipboard"
    );
    expect(screen.getByText("Failed to copy")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.queryByText("Failed to copy")).not.toBeInTheDocument();
  });

  it("clears timeout on unmount", () => {
    const { unmount } = render(<ShareRecipeButton recipe={mockRecipe} />);

    fireEvent.click(screen.getByRole("button"));
    unmount();

    act(() => {
      jest.advanceTimersByTime(2000);
    });
  });
});
