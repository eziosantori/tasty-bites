import { renderHook } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";

import { useSearchRecipesByName, useSearchRecipesByIngredient, useRecipeDetails, useRandomRecipes } from "./queries";


jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

const mockUseQuery = useQuery as jest.Mock;

describe("queries hooks", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("useSearchRecipesByName calls useQuery with correct params", () => {
    mockUseQuery.mockReturnValue({ data: [] });
    const name = "pasta";
    renderHook(() => useSearchRecipesByName(name));
    expect(mockUseQuery).toHaveBeenCalledWith({
      queryKey: ["recipesByName", "name", name],
      queryFn: expect.any(Function),
      enabled: true,
    });
  });

  it("useSearchRecipesByIngredient calls useQuery with correct params", () => {
    mockUseQuery.mockReturnValue({ data: [] });
    const ingredient = "tomato";
    renderHook(() => useSearchRecipesByIngredient(ingredient));
    expect(mockUseQuery).toHaveBeenCalledWith({
      queryKey: ["recipesByIngredient", "ingredient", ingredient],
      queryFn: expect.any(Function),
      enabled: true,
    });
  });

  it("useRecipeDetails calls useQuery with correct params", () => {
    mockUseQuery.mockReturnValue({ data: {} });
    const id = "123";
    renderHook(() => useRecipeDetails(id));
    expect(mockUseQuery).toHaveBeenCalledWith({
      queryKey: ["recipe", id],
      queryFn: expect.any(Function),
      enabled: true,
    });
  });

  it("useRandomRecipes calls useQuery with correct params", () => {
    mockUseQuery.mockReturnValue({ data: [] });
    renderHook(() => useRandomRecipes(3));
    expect(mockUseQuery).toHaveBeenCalledWith({
      queryKey: ["randomRecipes", 3],
      queryFn: expect.any(Function),
      enabled: true,
    });
  });

  it("disables queries when enabled is false", () => {
    mockUseQuery.mockReturnValue({ data: [] });
    renderHook(() => useSearchRecipesByName("", false));
    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({ enabled: false })
    );
    renderHook(() => useSearchRecipesByIngredient("", false));
    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({ enabled: false })
    );
    renderHook(() => useRecipeDetails("", false));
    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({ enabled: false })
    );
    renderHook(() => useRandomRecipes(1, false));
    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({ enabled: false })
    );
  });

});
