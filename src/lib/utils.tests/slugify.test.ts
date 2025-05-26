import { getIdFromSlugUrl, slugify } from "../utils";

describe("getIdFromSlugUrl", () => {
  it("extracts the id from a typical slug", () => {
    expect(getIdFromSlugUrl("1234--pasta")).toBe("1234");
  });
  it("returns the whole string if no '--' is present", () => {
    expect(getIdFromSlugUrl("5678")).toBe("5678");
  });
  it("returns an empty string for an empty input", () => {
    expect(getIdFromSlugUrl("")).toBe("");
  });
  it("extracts the id when slug contains multiple '--'", () => {
    expect(getIdFromSlugUrl("9999--some--complex--slug")).toBe("9999");
  });
  it("returns empty string if slug starts with '--'", () => {
    expect(getIdFromSlugUrl("--slug-without-id")).toBe("");
  });
});

describe("slugify", () => {
  const baseRecipe = {
    idMeal: "1234",
    strMeal: "Pasta & Cheese",
    strCategory: "Main",
    strArea: "Italian",
    strInstructions: "Cook.",
    strMealThumb: "thumb.jpg",
    strTags: "pasta,main",
    strYoutube: "youtube.com",
    ingredients: []
  };
  it("generates a slug with id and slugified meal name", () => {
    const recipe = { ...baseRecipe, strMeal: "Pasta & Cheese" };
    expect(slugify(recipe)).toBe("1234--pasta-and-cheese");
  });
  it("handles meal names with extra spaces and special characters", () => {
    const recipe = { ...baseRecipe, strMeal: "  Fancy! Pasta   " };
    expect(slugify(recipe)).toBe("1234--fancy-pasta");
  });
  it("handles meal names with multiple dashes", () => {
    const recipe = { ...baseRecipe, strMeal: "Eggs---Benedict" };
    expect(slugify(recipe)).toBe("1234--eggs-benedict");
  });
  it("handles empty meal name", () => {
    const recipe = { ...baseRecipe, strMeal: "" };
    expect(slugify(recipe)).toBe("1234--");
  });
  it("handles meal names with only special characters", () => {
    const recipe = { ...baseRecipe, strMeal: "!@#$%^&*" };
    expect(slugify(recipe)).toBe("1234--and");
  });
  it("handles numeric meal names", () => {
    const recipe = { ...baseRecipe, strMeal: "Meal 123" };
    expect(slugify(recipe)).toBe("1234--meal-123");
  });
});
