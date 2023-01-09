import React from "react";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import Avatar from "./Avatar";

describe("Avatar", () => {
  test("snapshot", () => {
    const { baseElement } = render(<Avatar src="ibm.com/fake/path/to/img.png" userName="Rick Deckard" />);
    expect(baseElement).toMatchSnapshot();
  });

  test("functional", async () => {
    render(<Avatar src="ibm.com/fake/path/to/img.png" userName="Rick Deckard" />);
    expect(await screen.findByAltText("Avatar for Rick Deckard")).toBeInTheDocument();
  });

  test("a11y", async () => {
    const { container } = render(<Avatar src="ibm.com/fake/path/to/img.png" userName="Rick Deckard" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
