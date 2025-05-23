import { getIdFromSlugUrl, processRecipes, slugify } from "./utils";


describe("processRecipes", () => {

  it("returns an empty array when input is an empty array", () => {
    expect(processRecipes([])).toEqual([]);
  });

  it("processes a single recipe with ingredients and measures", () => {
    const raw = [
      {
        idMeal: "1234",
        strMeal: "Pasta",
        strCategory: "Main",
        strArea: "Italian",
        strInstructions: "Boil pasta.",
        strMealThumb: "thumb.jpg",
        strTags: "pasta,main",
        strYoutube: "youtube.com",
        strIngredient1: "Pasta",
        strMeasure1: "200g",
        strIngredient2: "Tomato Sauce",
        strMeasure2: "100ml",
        strIngredient3: "",
        strMeasure3: "",
      }
    ];

    const result = processRecipes(raw);

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      idMeal: "1234",
      strMeal: "Pasta",
      strCategory: "Main",
      strArea: "Italian",
      strInstructions: "Boil pasta.",
      strMealThumb: "thumb.jpg",
      strTags: "pasta,main",
      strYoutube: "youtube.com",
      ingredients: [
        { name: "Pasta", measure: "200g" },
        { name: "Tomato Sauce", measure: "100ml" }
      ]
    });
  });

  it("ignores empty or whitespace-only ingredients", () => {
    const raw = [
      {
        idMeal: "5678",
        strMeal: "Salad",
        strCategory: "Side",
        strArea: "French",
        strInstructions: "Mix ingredients.",
        strMealThumb: "salad.jpg",
        strTags: null,
        strYoutube: "",
        strIngredient1: "Lettuce",
        strMeasure1: "1 head",
        strIngredient2: "  ",
        strMeasure2: "some",
        strIngredient3: "",
        strMeasure3: "",
      }
    ];

    const result = processRecipes(raw);

    expect(result[0].ingredients).toEqual([
      { name: "Lettuce", measure: "1 head" }
    ]);
  });

  it("sets measure to empty string if missing", () => {
    const raw = [
      {
        idMeal: "9999",
        strMeal: "Eggs",
        strCategory: "Breakfast",
        strArea: "American",
        strInstructions: "Fry eggs.",
        strMealThumb: "eggs.jpg",
        strTags: "",
        strYoutube: "",
        strIngredient1: "Egg",
        strMeasure1: "",
        strIngredient2: "Salt",
        // strMeasure2 is missing
      }
    ];

    const result = processRecipes(raw);

    expect(result[0].ingredients).toEqual([
      { name: "Egg", measure: "" },
      { name: "Salt", measure: "" }
    ]);
  });

  it("handles multiple recipes", () => {
    const raw = [
      {
        idMeal: "1",
        strMeal: "A",
        strCategory: "CatA",
        strArea: "AreaA",
        strInstructions: "Do A.",
        strMealThumb: "a.jpg",
        strTags: "",
        strYoutube: "",
        strIngredient1: "IngA1",
        strMeasure1: "1",
      },
      {
        idMeal: "2",
        strMeal: "B",
        strCategory: "CatB",
        strArea: "AreaB",
        strInstructions: "Do B.",
        strMealThumb: "b.jpg",
        strTags: "",
        strYoutube: "",
        strIngredient1: "IngB1",
        strMeasure1: "2",
      }
    ];

    const result = processRecipes(raw);

    expect(result).toHaveLength(2);
    expect(result[0].strMeal).toBe("A");
    expect(result[1].strMeal).toBe("B");
  });

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

      it("handles undefined meal name", () => {
        const recipe = { ...baseRecipe, strMeal: undefined };
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
  });
});