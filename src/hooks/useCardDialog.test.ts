import { renderHook, act } from "@testing-library/react";
import { Recipe } from "@/types/recipe";

import { useCardDialog } from "./useCardDialog";

describe("useCardDialog", () => {
  const mockRecipe: Recipe = {
    id: "1",
    title: "Test Recipe",
    description: "A test recipe",
    ingredients: [],
    steps: [],
    // Add other required Recipe fields if needed
  };

  it("should initialize with dialog closed and no selected recipe", () => {
    const { result } = renderHook(() => useCardDialog());
    expect(result.current.open).toBe(false);
    expect(result.current.selectedRecipe).toBeNull();
  });

  it("should set open state", () => {
    const { result } = renderHook(() => useCardDialog());
    act(() => {
      result.current.setOpen(true);
    });
    expect(result.current.open).toBe(true);

    act(() => {
      result.current.setOpen(false);
    });
    expect(result.current.open).toBe(false);
  });

  it("handleCardClick should set selectedRecipe and open dialog", () => {
    const { result } = renderHook(() => useCardDialog());
    act(() => {
      result.current.handleCardClick(mockRecipe);
    });
    expect(result.current.selectedRecipe).toEqual(mockRecipe);
    expect(result.current.open).toBe(true);
  });
});