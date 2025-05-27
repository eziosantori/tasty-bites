import { searchRecipesByIngredient } from "./recipeApi";
import api from "./api";
import { intersectionByIdMeal } from "./utils";

jest.mock("../lib/api");
jest.mock("./utils");

const mockedApi = api as jest.Mocked<typeof api>;
const mockedIntersectionByIdMeal = intersectionByIdMeal as jest.Mock;

describe("searchRecipesByIngredient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns empty array if ingredient is empty string", async () => {
    const result = await searchRecipesByIngredient("");
    expect(result).toEqual([]);
    expect(mockedApi.get).not.toHaveBeenCalled();
  });

  it("splits ingredient by spaces and trims terms", async () => {
    mockedApi.get.mockResolvedValueOnce({ data: { meals: [{ idMeal: "1" }] } });
    mockedIntersectionByIdMeal.mockReturnValue([{ idMeal: "1" }]);
    const result = await searchRecipesByIngredient("chicken  ");
    expect(mockedApi.get).toHaveBeenCalledWith("/filter.php?i=chicken");
    expect(result).toEqual([{ idMeal: "1" }]);
  });

  it("calls api.get for each ingredient term", async () => {
    mockedApi.get
      .mockResolvedValueOnce({ data: { meals: [{ idMeal: "1" }] } })
      .mockResolvedValueOnce({ data: { meals: [{ idMeal: "2" }] } });
    mockedIntersectionByIdMeal.mockReturnValue([{ idMeal: "1" }]);
    await searchRecipesByIngredient("chicken rice");
    expect(mockedApi.get).toHaveBeenCalledTimes(2);
    expect(mockedApi.get).toHaveBeenCalledWith("/filter.php?i=chicken");
    expect(mockedApi.get).toHaveBeenCalledWith("/filter.php?i=rice");
  });

  it("returns intersection of recipes by idMeal", async () => {
    const meals1 = [{ idMeal: "1" }, { idMeal: "2" }];
    const meals2 = [{ idMeal: "1" }, { idMeal: "3" }];
    mockedApi.get
      .mockResolvedValueOnce({ data: { meals: meals1 } })
      .mockResolvedValueOnce({ data: { meals: meals2 } });
    mockedIntersectionByIdMeal.mockReturnValue([{ idMeal: "1" }]);
    const result = await searchRecipesByIngredient("chicken rice");
    expect(mockedIntersectionByIdMeal).toHaveBeenCalledWith([meals1, meals2]);
    expect(result).toEqual([{ idMeal: "1" }]);
  });

  it("handles no meals returned from api", async () => {
    mockedApi.get.mockResolvedValueOnce({ data: { meals: null } });
    mockedIntersectionByIdMeal.mockReturnValue([]);
    const result = await searchRecipesByIngredient("unknown");
    expect(result).toEqual([]);
  });
});