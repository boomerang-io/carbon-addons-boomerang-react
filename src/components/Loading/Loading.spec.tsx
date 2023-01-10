import React from "react";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import Loading from "./Loading";

describe("Feedback", () => {
  test("snapshot", async () => {
    const { baseElement } = render(<Loading />);
    expect(baseElement).toMatchSnapshot();
  });

  test("functional", async () => {
    render(<Loading />);

    expect(await screen.findByTitle("loading")).toBeInTheDocument();
  });

  test("a11y", async () => {
    const { container } = render(<Loading />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
