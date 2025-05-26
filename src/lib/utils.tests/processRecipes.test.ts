import { processRecipes } from "../utils";

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
});
// Move all test files to utils.tests folder
// (No code change needed, just move the files)
