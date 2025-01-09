/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import ErrorMessage from "./ErrorMessage";

const status = "testStatus";
const statusText = "testText";

describe("ErrorMessage", () => {
  test("snapshot", async () => {
    const { baseElement } = render(<ErrorMessage status={status} statusText={statusText} />);
    expect(baseElement).toMatchSnapshot();
  });
  
  test("functional", async () => {
    const { findByText } = render(<ErrorMessage status={status} statusText={statusText} />);
    const testStatus = await findByText(/testStatus/i);
    expect(testStatus).toBeInTheDocument();
    const testStatusText = await findByText(/testText/i);
    expect(testStatusText).toBeInTheDocument();
  });

  test("a11y", async () => {
    const { container } = render(<ErrorMessage status={status} statusText={statusText} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
