import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import ErrorPageCore from "./ErrorPageCore";

const statusUrl = "https://useboomerang.io";

describe("ErrorPageCore", () => {
  test("snapshot", async () => {
    const { baseElement } = render(<ErrorPageCore statusUrl={statusUrl} />);
    expect(baseElement).toMatchSnapshot();
  });

  test("functional", async () => {
    const { getByText } = render(<ErrorPageCore statusUrl={statusUrl} />);
    expect(getByText("Oops!")).toBeInTheDocument();
    expect(getByText("Something looks off, but we're getting a handle of it.")).toBeInTheDocument();
  });

  test("a11y", async () => {
    const { container } = render(<ErrorPageCore statusUrl={statusUrl} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
