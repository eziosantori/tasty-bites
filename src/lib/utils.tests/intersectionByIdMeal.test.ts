import { intersectionByIdMeal } from "../utils";

describe("intersectionByIdMeal", () => {
  it("returns an empty array if input is empty", () => {
    expect(intersectionByIdMeal([])).toEqual([]);
  });
  it("returns all items from the single array if only one array is provided", () => {
    const arr = [{ idMeal: "1" }, { idMeal: "2" }];
    expect(intersectionByIdMeal([arr])).toEqual(arr);
  });
  it("returns only items with idMeal present in all arrays", () => {
    const arr1 = [{ idMeal: "1" }, { idMeal: "2" }, { idMeal: "3" }];
    const arr2 = [{ idMeal: "2" }, { idMeal: "3" }, { idMeal: "4" }];
    const arr3 = [{ idMeal: "3" }, { idMeal: "2" }, { idMeal: "5" }];
    const result = intersectionByIdMeal([arr1, arr2, arr3]);
    expect(result).toEqual([
      { idMeal: "2" },
      { idMeal: "3" }
    ]);
  });
  it("returns an empty array if there is no intersection", () => {
    const arr1 = [{ idMeal: "1" }];
    const arr2 = [{ idMeal: "2" }];
    expect(intersectionByIdMeal([arr1, arr2])).toEqual([]);
  });
  it("returns the first occurrence from the first array when ids are duplicated", () => {
    const arr1 = [{ idMeal: "1", name: "A" }, { idMeal: "2", name: "B" }, { idMeal: "2", name: "C" }];
    const arr2 = [{ idMeal: "2", name: "X" }, { idMeal: "1", name: "Y" }];
    const result = intersectionByIdMeal([arr1, arr2]);
    expect(result).toEqual([
      { idMeal: "1", name: "A" },
      { idMeal: "2", name: "B" }
    ]);
  });
  it("works with arrays containing objects with extra properties", () => {
    const arr1 = [{ idMeal: "1", foo: "bar" }, { idMeal: "2", foo: "baz" }];
    const arr2 = [{ idMeal: "2", foo: "qux" }, { idMeal: "1", foo: "quux" }];
    expect(intersectionByIdMeal([arr1, arr2])).toEqual([
      { idMeal: "1", foo: "bar" },
      { idMeal: "2", foo: "baz" }
    ]);
  });
  it("returns an empty array if any input array is empty", () => {
    const arr1 = [{ idMeal: "1" }];
    const arr2: { idMeal: string }[] = [];
    expect(intersectionByIdMeal([arr1, arr2])).toEqual([]);
  });
});
