import { vi, expect, test } from "vitest";
import { render } from "@testing-library/react";

import ErrorBoundary from "./ErrorBoundary";

const ErrorComponent = () => {
  throw new Error("test");
};

test("render ErrorBoundary with Message", async () => {
  const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  const { findByText } = render(
    <ErrorBoundary>
      <ErrorComponent />
    </ErrorBoundary>
  );
  const testStatus = await findByText(/Oops, something went wrong/i);
  expect(testStatus).toBeInTheDocument();
  expect(consoleSpy).toHaveBeenCalled();
});
