import { render, screen, fireEvent } from "@testing-library/react";

import SearchTypeButtons from "./SearchTypeButtons";

describe("SearchTypeButtons", () => {
  it("renders disabled buttons when searchType is undefined", () => {
    render(
      <SearchTypeButtons searchType={undefined} onTypeChange={jest.fn()} />
    );
    expect(screen.getByText(/By Recipe/i)).toBeDisabled();
    expect(screen.getByText(/By Ingredient/i)).toBeDisabled();
  });

  it("renders both buttons enabled when searchType is provided", () => {
    render(<SearchTypeButtons searchType={"name"} onTypeChange={jest.fn()} />);
    expect(screen.getByText(/By Recipe/i)).toBeEnabled();
    expect(screen.getByText(/By Ingredient/i)).toBeEnabled();
  });

  it("highlights the correct button based on searchType", () => {
    const { rerender } = render(
      <SearchTypeButtons searchType={"name"} onTypeChange={jest.fn()} />
    );
    const recipeBtn = screen.getByText(/By Recipe/i);
    const ingredientBtn = screen.getByText(/By Ingredient/i);
    expect(recipeBtn).toHaveAttribute("aria-pressed", "true");
    expect(ingredientBtn).toHaveAttribute("aria-pressed", "false");

    rerender(
      <SearchTypeButtons searchType={"ingredient"} onTypeChange={jest.fn()} />
    );
    expect(recipeBtn).toHaveAttribute("aria-pressed", "false");
    expect(ingredientBtn).toHaveAttribute("aria-pressed", "true");
  });

  it("calls onTypeChange with 'ingredient'", () => {
    const onTypeChange = jest.fn();
    render(
      <SearchTypeButtons searchType={"name"} onTypeChange={onTypeChange} />
    );
    fireEvent.click(screen.getByText(/By Ingredient/i));
    expect(onTypeChange).toHaveBeenCalledWith("ingredient");
  });

  it("calls onTypeChange with 'name'", () => {
    const onTypeChange = jest.fn();
    render(
      <SearchTypeButtons
        searchType={"ingredient"}
        onTypeChange={onTypeChange}
      />
    );
    fireEvent.click(screen.getByText(/By Recipe/i));
    expect(onTypeChange).toHaveBeenCalledWith("name");
  });
});
