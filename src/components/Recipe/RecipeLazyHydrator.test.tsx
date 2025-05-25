import React from "react";
import { render, screen } from "@testing-library/react";
import { useInView } from "react-intersection-observer";

import RecipeLazyHydrator from "./RecipeLazyHydrator";

// Mock RecipeCardSkeleton to make assertions easier
jest.mock("./RecipeCardSkeleton");

// Mock useInView from react-intersection-observer
jest.mock("react-intersection-observer", () => ({
  useInView: jest.fn(),
}));

describe("RecipeLazyHydrator", () => {
  const mockUseInView = useInView as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders skeleton when not in view", () => {
    mockUseInView.mockReturnValue({ ref: jest.fn(), inView: false });

    render(
      <RecipeLazyHydrator>
        {(inView) => <div data-testid="content">{String(inView)}</div>}
      </RecipeLazyHydrator>
    );

    expect(screen.getByTestId("recipe-card-skeleton")).toBeInTheDocument();
    expect(screen.queryByTestId("content")).not.toBeInTheDocument();
  });

  it("renders children when in view", () => {
    mockUseInView.mockReturnValue({ ref: jest.fn(), inView: true });

    render(
      <RecipeLazyHydrator>
        {(inView) => <div data-testid="content">{String(inView)}</div>}
      </RecipeLazyHydrator>
    );

    expect(screen.getByTestId("content")).toHaveTextContent("true");
    expect(screen.queryByTestId("skeleton")).not.toBeInTheDocument();
  });

  it("passes inView=false to children if inView is false and children is rendered", () => {
    // This case doesn't happen in current logic, but test for robustness
    mockUseInView.mockReturnValue({ ref: jest.fn(), inView: false });

    render(
      <RecipeLazyHydrator>
        {(inView) =>
          inView === false ? (
            <div data-testid="content-false">Not in view</div>
          ) : null
        }
      </RecipeLazyHydrator>
    );

    expect(screen.getByTestId("recipe-card-skeleton")).toBeInTheDocument();
    expect(screen.queryByTestId("content-false")).not.toBeInTheDocument();
  });

  it("attaches ref to the wrapper div", () => {
    const refFn = jest.fn();
    mockUseInView.mockReturnValue({ ref: refFn, inView: false });

    render(
      <RecipeLazyHydrator>
        {(inView) => <div data-testid="content">{String(inView)}</div>}
      </RecipeLazyHydrator>
    );

    // The ref function should have been called by React
    expect(refFn).toHaveBeenCalled();
  });
});
