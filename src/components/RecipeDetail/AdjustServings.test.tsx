import { render, screen, fireEvent } from "@testing-library/react";

import AdjustServings from "./AdjustServings";

describe("AdjustServings", () => {
  it("renders the current servings", () => {
    render(
      <AdjustServings
        servings={5}
        onIncrease={() => {}}
        onDecrease={() => {}}
      />
    );
    expect(screen.getByText("Servings:")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("calls onIncrease when the plus button is clicked", () => {
    const onIncrease = jest.fn();
    render(
      <AdjustServings
        servings={2}
        onIncrease={onIncrease}
        onDecrease={() => {}}
      />
    );
    const plusButton = screen.getByLabelText(/increase servings/i);
    fireEvent.click(plusButton);
    expect(onIncrease).toHaveBeenCalled();
  });

  it("calls onDecrease when the minus button is clicked", () => {
    const onDecrease = jest.fn();
    render(
      <AdjustServings
        servings={2}
        onIncrease={() => {}}
        onDecrease={onDecrease}
      />
    );
    const minusButton = screen.getByLabelText(/decrease servings/i);
    fireEvent.click(minusButton);
    expect(onDecrease).toHaveBeenCalled();
  });
});
