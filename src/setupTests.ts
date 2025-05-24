import '@testing-library/jest-dom';
import "jest-mock-extended";

// Global mock for next/navigation useRouter
export const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));
