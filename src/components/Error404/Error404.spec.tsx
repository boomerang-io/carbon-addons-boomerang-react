/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import Error404 from "./Error404";

describe("Error404", () => {
  test("render with defaults", async () => {
    const { getByText } = render(<Error404 statusUrl={"https://useboomerang.io"}/>);
    expect(getByText("404 Page Not Found")).toBeInTheDocument();
    expect(getByText("We spaced out and couldn’t find your page.")).toBeInTheDocument();
    expect(getByText("Try refreshing, or contact the local authorities.")).toBeInTheDocument();
  });

  test("render with custom text", async () => {
    const { getByText } = render(<Error404 header="hello" title="there" message="sir" />);
    expect(getByText("hello")).toBeInTheDocument();
    expect(getByText("there")).toBeInTheDocument();
    expect(getByText("sir")).toBeInTheDocument();
  });

  test("a11y", async () => {
    const { container } = render(<Error404 statusUrl={"https://useboomerang.io"}/>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
