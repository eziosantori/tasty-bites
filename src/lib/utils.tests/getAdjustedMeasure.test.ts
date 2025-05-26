import { getAdjustedMeasure } from "../utils";

describe("getAdjustedMeasure", () => {
  it("returns the original measure if servings equals baseServings", () => {
    expect(getAdjustedMeasure("2 cups", 4, 4)).toBe("2 cups");
  });
  it("adjusts the numeric part for increased servings", () => {
    expect(getAdjustedMeasure("2 cups", 8, 4)).toBe("4 cups");
  });
  it("adjusts the numeric part for decreased servings", () => {
    expect(getAdjustedMeasure("2 cups", 2, 4)).toBe("1 cups");
  });
  it("handles float numbers and rounds to one decimal", () => {
    expect(getAdjustedMeasure("2.5 tbsp", 6, 4)).toBe("3.8 tbsp");
  });
  it("removes trailing .0 from adjusted numbers", () => {
    expect(getAdjustedMeasure("1.0 tsp", 8, 4)).toBe("2 tsp");
  });
  it("returns original measure if no numeric part is present", () => {
    expect(getAdjustedMeasure("pinch", 8, 4)).toBe("pinch");
  });
  it("returns original measure if measure is empty", () => {
    expect(getAdjustedMeasure("", 8, 4)).toBe("");
  });
  it("can't handle ¼ mesure", () => {
    expect(getAdjustedMeasure("¼ teaspon", 8, 4)).toBe("¼ teaspon");
  });
  it("handles measures with spaces between number and unit", () => {
    expect(getAdjustedMeasure(" 3  cups ", 2, 4)).toBe("1.5 cups");
  });
  it("handles measures with only a number", () => {
    expect(getAdjustedMeasure("5", 2, 4)).toBe("2.5");
  });
  it("handles measures with no unit and no number", () => {
    expect(getAdjustedMeasure("some", 2, 4)).toBe("some");
  });
  it("handles baseServings omitted (defaults to 4)", () => {
    expect(getAdjustedMeasure("2 cups", 8)).toBe("4 cups");
  });
});
