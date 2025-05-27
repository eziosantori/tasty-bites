import { render, screen, fireEvent } from "@testing-library/react";
import { useInView } from "react-intersection-observer";
import { mockDeep } from "jest-mock-extended";

import GoToTopButton from "./GoToTopButton";

// Mock window.scrollTo
jest.mock("react-intersection-observer");

describe("GoToTopButton", () => {
  beforeAll(() => {
    jest.clearAllMocks();
    window.scrollTo = jest.fn();
    jest.mocked(useInView).mockReturnValue(
      mockDeep<ReturnType<typeof useInView>>({
        ref: jest.fn(),
        inView: true, // Default to true for initial render
      })
    );
  });
  it("renders invisible marker at the top of the page", () => {
    render(<GoToTopButton />);
    // The marker is a div with aria-hidden
    const marker = screen.getByRole("presentation", { hidden: true });
    expect(marker).toBeInTheDocument();
  });

  it("button is hidden when inView is true (at top)", () => {
    render(<GoToTopButton />);
    const button = screen.getByRole("button", { name: /go to top/i });
    expect(button).toHaveClass("opacity-0");
  });

  it("button is visible when inView is false (scrolled down)", () => {
    jest.mocked(useInView).mockReturnValue(
      mockDeep<ReturnType<typeof useInView>>({
        ref: jest.fn(),
        inView: false, // Default to true for initial render
      })
    );
    render(<GoToTopButton />);
    const button = screen.getByRole("button", { name: /go to top/i });
    expect(button).toHaveClass("opacity-100");
  });

  it("scrolls to top when clicked", () => {
    render(<GoToTopButton />);
    const button = screen.getByRole("button", { name: /go to top/i });
    fireEvent.click(button);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });
});
