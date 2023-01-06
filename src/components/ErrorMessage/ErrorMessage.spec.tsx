import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";

import ErrorMessage from "./ErrorMessage";

const status = "testStatus";
const statusText = "testText";

test("ErrorMessage - render with message", async () => {
  const { findByText } = render(<ErrorMessage status={status} statusText={statusText} />);
  const testStatus = await findByText(/testStatus/i);
  expect(testStatus).toBeInTheDocument();
  const testStatusText = await findByText(/testText/i);
  expect(testStatusText).toBeInTheDocument();
});
